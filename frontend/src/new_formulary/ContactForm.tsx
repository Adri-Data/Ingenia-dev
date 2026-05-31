"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import emailjs from "@emailjs/browser";
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

export default function ContactForm() {
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
      setError("Por favor completa nombre, email y escenario.");
      return;
    }

    if (!CONTACT_EMAILJS_SERVICE_ID || !CONTACT_EMAILJS_TEMPLATE_ID || !CONTACT_EMAILJS_PUBLIC_KEY) {
      setError("Falta configurar EmailJS: NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID y NEXT_PUBLIC_EMAILJS_PUBLIC_KEY.");
      return;
    }

    const now = Date.now();
    const rateLimitState = getRateLimitState(now);

    if (rateLimitState.blockedUntil && rateLimitState.blockedUntil > now) {
      setCooldownUntil(rateLimitState.blockedUntil);
      setError("Has superado el límite diario. Vuelve mañana.");
      return;
    }

    const oneMinuteAgo = now - CONTACT_RATE_LIMIT_MIN_INTERVAL_MS;
    const recentAttempts = rateLimitState.timestamps.filter((timestamp) => timestamp >= oneMinuteAgo);

    if (recentAttempts.length > 0) {
      const lastAttempt = recentAttempts[recentAttempts.length - 1];
      const remainingMs = CONTACT_RATE_LIMIT_MIN_INTERVAL_MS - (now - lastAttempt);
      setError(`Solo puedes enviar una solicitud por minuto. Espera ${Math.ceil(remainingMs / 1000)} segundos.`);
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
      setError("No se pudo enviar la solicitud. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glassmorphism p-10 rounded-[2.5rem] border border-blue-500/30 bg-blue-500/[0.03] group relative overflow-hidden">
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-600/10 blur-[60px] group-hover:bg-purple-600/20 transition-colors" />

      <h3 className="text-lg font-bold uppercase tracking-widest italic text-blue-400 mb-2">Solicita una demo</h3>
      <p className="text-gray-300 mb-8 text-sm leading-relaxed">
        Déjanos tus datos y el escenario que quieres simular. Si quieres añadir contexto, usa el mensaje opcional y lo incluiremos en el correo preparado.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-2">Nombre *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Tu nombre"
              className="w-full px-4 py-3 rounded-lg bg-white/8 border border-white/15 text-white placeholder-gray-500 focus:border-blue-400 focus:bg-white/12 focus:outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-2">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              className="w-full px-4 py-3 rounded-lg bg-white/8 border border-white/15 text-white placeholder-gray-500 focus:border-blue-400 focus:bg-white/12 focus:outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">Empresa</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Nombre de tu empresa"
            className="w-full px-4 py-3 rounded-lg bg-white/8 border border-white/15 text-white placeholder-gray-500 focus:border-blue-400 focus:bg-white/12 focus:outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">Escenario a simular *</label>
          <textarea
            name="scenario"
            value={formData.scenario}
            onChange={handleChange}
            placeholder="Ejemplo: línea de ensamblaje con 4 estaciones, colas en estación 3 y demanda variable por turno"
            rows={4}
            className="w-full px-4 py-3 rounded-lg bg-white/8 border border-white/15 text-white placeholder-gray-500 focus:border-blue-400 focus:bg-white/12 focus:outline-none transition-all resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">Mensaje adicional opcional</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Notas de contexto, prioridades o cualquier detalle útil"
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
            ¡Gracias! Hemos enviado tu solicitud.
          </div>
        )}

        {cooldownUntil && cooldownUntil > Date.now() && (
          <div className="p-4 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-100 text-sm">
            Límite temporal activo hasta mañana. Podrás volver a enviar cuando se reinicie el bloqueo.
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
              <span>Enviando...</span>
            </>
          ) : (
            <>
              <span>Enviar solicitud</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>

        <p className="text-xs text-gray-500 leading-relaxed">
          Puedes revisar el formulario con calma y volver a la home desde{' '}
          <Link href="/" className="text-blue-300 hover:text-blue-200 underline underline-offset-4">
            la página principal
          </Link>
          .
        </p>
      </form>
    </div>
  );
}
