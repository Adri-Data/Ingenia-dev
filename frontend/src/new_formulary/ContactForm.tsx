"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import emailjs from "@emailjs/browser";
type Locale = "es" | "en";
import {
  buildContactPayload,
  CONTACT_EMAILJS_PUBLIC_KEY,
  CONTACT_EMAILJS_SERVICE_ID,
  CONTACT_EMAILJS_TEMPLATE_ID,
  CONTACT_RATE_LIMIT_BURST_WINDOW_MS,
  CONTACT_RATE_LIMIT_MAX_ATTEMPTS,
  CONTACT_RATE_LIMIT_MIN_INTERVAL_MS,
  getNextMidnightTimestamp,
  getRateLimitState,
  saveRateLimitState,
  type ContactSubmission
} from "./config/contact";

const copy = {
  es: {
    title: "Solicita una demo",
    intro: "Déjanos tus datos y el escenario que quieres simular. Si quieres añadir contexto, usa el mensaje opcional y lo incluiremos en el correo preparado.",
    name: "Nombre *",
    namePlaceholder: "Tu nombre",
    email: "Email *",
    emailPlaceholder: "tu@email.com",
    company: "Empresa",
    companyPlaceholder: "Nombre de tu empresa",
    scenario: "Escenario a simular *",
    scenarioPlaceholder: "Ejemplo: línea de ensamblaje con 4 estaciones, colas en estación 3 y demanda variable por turno",
    message: "Mensaje adicional opcional",
    messagePlaceholder: "Notas de contexto, prioridades o cualquier detalle útil",
    submit: "Enviar solicitud",
    sending: "Enviando...",
    success: "¡Gracias! Hemos enviado tu solicitud.",
    error: "No se pudo enviar la solicitud. Intenta de nuevo.",
    missingFields: "Por favor completa nombre, email y escenario.",
    missingEmailJs: "Falta configurar EmailJS: NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID y NEXT_PUBLIC_EMAILJS_PUBLIC_KEY.",
    cooldown: "Has superado el límite diario. Vuelve mañana.",
    perMinute: (seconds: number) => `Solo puedes enviar una solicitud por minuto. Espera ${seconds} segundos.`,
    daily: "Límite temporal activo hasta mañana. Podrás volver a enviar cuando se reinicie el bloqueo.",
    backHome: "Puedes revisar el formulario con calma y volver a la home desde",
    backHomeLink: "la página principal",
    backHomeEnd: "."
  },
  en: {
    title: "Request a demo",
    intro: "Leave us your details and the scenario you want to simulate. If you want to add context, use the optional message and we will include it in the prepared email.",
    name: "Name *",
    namePlaceholder: "Your name",
    email: "Email *",
    emailPlaceholder: "you@email.com",
    company: "Company",
    companyPlaceholder: "Your company name",
    scenario: "Scenario to simulate *",
    scenarioPlaceholder: "Example: assembly line with 4 stations, queues at station 3 and variable demand per shift",
    message: "Optional additional message",
    messagePlaceholder: "Context notes, priorities or any useful detail",
    submit: "Send request",
    sending: "Sending...",
    success: "Thanks! We have sent your request.",
    error: "Could not send the request. Please try again.",
    missingFields: "Please complete name, email and scenario.",
    missingEmailJs: "EmailJS is not configured: NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY are required.",
    cooldown: "You have exceeded the daily limit. Come back tomorrow.",
    perMinute: (seconds: number) => `You can only send one request per minute. Wait ${seconds} seconds.`,
    daily: "A temporary limit is active until tomorrow. You will be able to send again when the block resets.",
    backHome: "You can review the form at your own pace and return to the home page from",
    backHomeLink: "the main page",
    backHomeEnd: "."
  }
} as const;
export default function ContactForm({ locale = "es" }: { locale?: Locale }) {
  const ui = copy[locale];
  const [formData, setFormData] = useState<ContactSubmission>({
    name: "",
    email: "",
    company: "",
    scenario: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);

  useEffect(() => {
    const state = getRateLimitState();
    if (state.blockedUntil && state.blockedUntil > Date.now()) {
      setCooldownUntil(state.blockedUntil);
    }
  }, []);

  useEffect(() => {
    if (!cooldownUntil) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      const state = getRateLimitState();
      if (state.blockedUntil && state.blockedUntil > Date.now()) {
        setCooldownUntil(state.blockedUntil);
      } else {
        setCooldownUntil(null);
      }
    }, Math.max(cooldownUntil - Date.now(), 1000));

    return () => window.clearTimeout(timeoutId);
  }, [cooldownUntil]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: ContactSubmission) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.scenario) {
      setError(ui.missingFields);
      return;
    }

    if (!CONTACT_EMAILJS_SERVICE_ID || !CONTACT_EMAILJS_TEMPLATE_ID || !CONTACT_EMAILJS_PUBLIC_KEY) {
      setError(ui.missingEmailJs);
      return;
    }

    const now = Date.now();
    const rateLimitState = getRateLimitState(now);

    if (rateLimitState.blockedUntil && rateLimitState.blockedUntil > now) {
      setCooldownUntil(rateLimitState.blockedUntil);
      setError(ui.cooldown);
      return;
    }

    const oneMinuteAgo = now - CONTACT_RATE_LIMIT_MIN_INTERVAL_MS;
    const recentAttempts = rateLimitState.timestamps.filter((timestamp) => timestamp >= oneMinuteAgo);

    if (recentAttempts.length > 0) {
      const lastAttempt = recentAttempts[recentAttempts.length - 1];
      const remainingMs = CONTACT_RATE_LIMIT_MIN_INTERVAL_MS - (now - lastAttempt);
      setError(ui.perMinute(Math.ceil(remainingMs / 1000)));
      return;
    }

    const burstWindowStart = now - CONTACT_RATE_LIMIT_BURST_WINDOW_MS;
    const burstAttempts = rateLimitState.timestamps.filter((timestamp) => timestamp >= burstWindowStart);

    setLoading(true);
    setError("");

    try {
      await emailjs.send(
        CONTACT_EMAILJS_SERVICE_ID,
        CONTACT_EMAILJS_TEMPLATE_ID,
        buildContactPayload(formData),
        CONTACT_EMAILJS_PUBLIC_KEY
      );

      const nextAttempts = [...burstAttempts, now];
      const updatedState = {
        timestamps: nextAttempts,
        blockedUntil: nextAttempts.length >= CONTACT_RATE_LIMIT_MAX_ATTEMPTS ? getNextMidnightTimestamp(now) : undefined
      };
      saveRateLimitState(updatedState);

      if (updatedState.blockedUntil && updatedState.blockedUntil > now) {
        setCooldownUntil(updatedState.blockedUntil);
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", company: "", scenario: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      setError(ui.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glassmorphism p-10 rounded-[2.5rem] border border-blue-500/30 bg-blue-500/[0.03] group relative overflow-hidden">
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-600/10 blur-[60px] group-hover:bg-purple-600/20 transition-colors" />

      <h2 className="text-lg font-bold uppercase tracking-widest italic text-blue-300 mb-2">{ui.title}</h2>
      <p className="text-gray-300 mb-8 text-sm leading-relaxed">
        {ui.intro}
      </p>

      <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-2">{ui.name}</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={ui.namePlaceholder}
              className="w-full px-4 py-3 rounded-lg bg-white/8 border border-white/15 text-white placeholder-gray-500 focus:border-blue-400 focus:bg-white/12 focus:outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-2">{ui.email}</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={ui.emailPlaceholder}
              className="w-full px-4 py-3 rounded-lg bg-white/8 border border-white/15 text-white placeholder-gray-500 focus:border-blue-400 focus:bg-white/12 focus:outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">{ui.company}</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder={ui.companyPlaceholder}
            className="w-full px-4 py-3 rounded-lg bg-white/8 border border-white/15 text-white placeholder-gray-500 focus:border-blue-400 focus:bg-white/12 focus:outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">{ui.scenario}</label>
          <textarea
            name="scenario"
            value={formData.scenario}
            onChange={handleChange}
            placeholder={ui.scenarioPlaceholder}
            rows={4}
            className="w-full px-4 py-3 rounded-lg bg-white/8 border border-white/15 text-white placeholder-gray-500 focus:border-blue-400 focus:bg-white/12 focus:outline-none transition-all resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">{ui.message}</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={ui.messagePlaceholder}
            rows={4}
            className="w-full px-4 py-3 rounded-lg bg-white/8 border border-white/15 text-white placeholder-gray-500 focus:border-blue-400 focus:bg-white/12 focus:outline-none transition-all resize-none"
          />
        </div>

        {error && (
          <div className="p-4 rounded-lg bg-red-500/15 border border-red-500/30 text-red-200 text-sm">
            {error}
          </div>
        )}

        {submitted && (
          <div className="p-4 rounded-lg bg-green-500/15 border border-green-500/30 text-green-200 text-sm animate-pulse">
            {ui.success}
          </div>
        )}

        {cooldownUntil && cooldownUntil > Date.now() && (
          <div className="p-4 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-100 text-sm">
            {ui.daily}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || (cooldownUntil !== null && cooldownUntil > Date.now())}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold hover:from-blue-500 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>{ui.sending}</span>
            </>
          ) : (
            <>
              <span>{ui.submit}</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>

        <p className="text-xs text-gray-400 leading-relaxed">
          {ui.backHome}{' '}
          <Link href="/" className="text-blue-300 hover:text-blue-200 underline underline-offset-4">
            {ui.backHomeLink}
          </Link>
          {ui.backHomeEnd}
        </p>
      </form>
    </div>
  );
}
