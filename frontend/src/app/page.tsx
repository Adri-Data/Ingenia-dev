"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import {
  buildSupportPayload,
  CONTACT_EMAILJS_PUBLIC_KEY,
  CONTACT_EMAILJS_SERVICE_ID,
  CONTACT_EMAILJS_TEMPLATE_ID,
  type SupportSubmission
} from "@/new_formulary/config/contact";
import {
  ArrowRight,
  Cpu,
  Zap,
  Check,
  Settings,
  LineChart,
  ShieldCheck,
  Database,
  Monitor,
  User
} from "lucide-react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const logoSrc = `${basePath}/logo.jpeg`;

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#020617] selection:bg-blue-500/30 text-white font-sans">
      {/* Grid Pattern */}
      <div className="fixed inset-0 z-0 opacity-25 pointer-events-none page-grid-bg" />

      {/* Background Gradients */}
      <div className="fixed top-0 -left-40 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-0 -right-40 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Header */}
      <nav className="relative z-50 flex w-full items-center justify-between py-7 px-7">
        <div className="flex items-center space-x-3">
          <Image src={logoSrc} alt="Ingenia Logo" width={44} height={44} className="rounded-full object-cover" />
          <span className="text-2xl font-bold tracking-tight">Ingenia</span>
        </div>
        <div className="hidden lg:flex items-center space-x-10 text-lg font-medium text-gray-400">
          <Link href="#casos-uso" className="hover:text-white transition-colors">Para Qué Sirve</Link>
          <Link href="#sobre-nosotros" className="hover:text-white transition-colors">Quienes Somos</Link>
          <Link href="#privacidad" className="hover:text-white transition-colors">Privacidad</Link>
          <Link href="#apoyanos" className="hover:text-white transition-colors">Apóyanos</Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href="/contact"
            className="px-7 py-3 bg-blue-600 text-white rounded-lg font-bold text-base hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 hidden sm:inline-flex"
          >
            Quiero hacer una prueba
          </Link>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
      <section className="relative z-10 w-full px-6 lg:pl-12 xl:pl-16 lg:pr-8 pt-2 pb-12 min-h-fit grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1] mb-4">
              <span className="text-glow-blue">Ingenia</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 text-3xl md:text-4xl [text-shadow:0_0_8px_rgba(37,99,235,0.18)]">
                Modelado y simulación de procesos industriales <br />
                <span className="text-blue-200 [text-shadow:0_0_5px_rgba(96,165,250,0.12)]">en minutos</span>
                <span> mediante una descripción en texto de tu proceso</span>
              </span>
            </h1>

            <p className="text-xl text-blue-300 mb-4 font-semibold italic">Tu ingeniero de bolsillo.</p>
            <p className="max-w-2xl text-base md:text-lg text-gray-300 mb-8 leading-relaxed font-medium">
              Este proyecto de TFM automatiza la generación de modelos de simulación de procesos industriales usando IA. Permite analizar escenarios, detectar cuellos de botella y generar informes técnicos en minutos.
            </p>

            <div className="mt-6 flex flex-col gap-3 w-full max-w-2xl">
              <Link
                href="/contact"
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold hover:from-blue-500 hover:to-blue-600 transition-all shadow-xl shadow-blue-500/25 flex items-center justify-center space-x-2 text-sm"
              >
                <span>Quiero hacer una prueba</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide text-gray-300">
              <span className="px-3 py-1 rounded-full border border-white/15 bg-white/5">Ingeniería De Procesos</span>
              <span className="px-3 py-1 rounded-full border border-white/15 bg-white/5">Operaciones Industriales</span>
              <span className="px-3 py-1 rounded-full border border-white/15 bg-white/5">Consultoría Industrial</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[620px] flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative w-full max-w-2xl aspect-square">
              <div className="absolute inset-0 pointer-events-none z-0">
                <svg className="w-full h-full" viewBox="0 0 400 400">
                  <defs>
                    <linearGradient id="hero-flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                      <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#ec4899" stopOpacity="0.4" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  <circle
                    cx="200"
                    cy="200"
                    r="150"
                    fill="none"
                    stroke="url(#hero-flow-gradient)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    opacity="0.3"
                  />
                  <circle
                    cx="200"
                    cy="200"
                    r="142"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="0.6"
                    strokeDasharray="10 5"
                    opacity="0.25"
                  />
                  <circle
                    cx="200"
                    cy="200"
                    r="158"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="0.6"
                    strokeDasharray="2 10"
                    opacity="0.25"
                  />

                  <circle
                    cx="200"
                    cy="200"
                    r="150"
                    fill="none"
                    stroke="#60a5fa"
                    strokeWidth="3"
                    strokeDasharray="20 920"
                    className="animate-energy-flow svg-energy-glow"
                  />
                  <circle
                    cx="200"
                    cy="200"
                    r="150"
                    fill="none"
                    stroke="#c084fc"
                    strokeWidth="2"
                    strokeDasharray="15 925"
                    className="animate-energy-flow svg-energy-secondary"
                  />
                </svg>
              </div>

              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-56 z-10">
                <MiniStepCard
                  icon={<Settings className="w-6 h-6 text-blue-400" />}
                  title="1. Define tu proceso en minutos"
                  description="Describe tu línea, recursos y objetivo en lenguaje natural. Sin modelado, sin complejidad."
                  color="blue"
                />
              </div>

              <div className="absolute bottom-24 left-0 w-56 z-10 transition-transform hover:scale-105">
                <MiniStepCard
                  icon={<Monitor className="w-6 h-6 text-sky-300" />}
                  title="3. Decide con datos, no con intuición"
                  description="Detecta cuellos de botella, compara escenarios y recibe recomendaciones claras para mejorar."
                  color="blue-soft"
                />
              </div>

              <div className="absolute bottom-24 right-0 w-56 z-10 transition-transform hover:scale-105">
                <MiniStepCard
                  icon={<LineChart className="w-6 h-6 text-blue-200" />}
                  title="2. Simula sin saber simular"
                  description="La IA construye y ejecuta el modelo automáticamente. Obtienes resultados profesionales desde el primer minuto."
                  color="blue-deep"
                />
              </div>
            </div>
          </motion.div>
        </section>

        <SectionDivider />

        <section className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-6 max-w-[96rem]">
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                Ejemplo De <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">Uso</span>
              </h2>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                De la descripción operativa a una salida técnica accionable: prompt de fábrica, comparativa de escenarios e informe profesional.
              </p>
            </div>

            <div className="mb-8 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
              <div className="flex items-center justify-between gap-4 mb-4">
                <h3 className="text-2xl font-bold">Ejemplo de prompt de fábrica</h3>
                <span className="text-xs uppercase tracking-widest text-cyan-300 border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 rounded-full">Entrada</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Este es un ejemplo real de cómo un responsable de operaciones describiría su proceso para lanzar el análisis.
              </p>
              <div className="rounded-xl border border-white/10 p-5 text-sm leading-relaxed text-gray-200">
                Tengo una línea de ensamblaje con 4 estaciones en serie, 2 turnos de 8 horas y demanda variable por día.
                La estación 3 tiene mayor tiempo de ciclo y genera colas frecuentes. Quiero comparar el escenario actual
                frente a una alternativa añadiendo 1 operario en estación 3 y ajustando el tamaño de lote de 20 a 12 unidades.
                Necesito evaluar producción por turno, tiempo medio en cola, utilización de recursos y WIP para decidir qué
                cambio aplicar sin inversión en nueva maquinaria.
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
                <h3 className="text-2xl font-bold mb-5">Comparativa de escenarios: situación actual vs mejora</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start justify-between gap-6 p-4 rounded-xl bg-white/5">
                    <div>
                      <p className="text-gray-100 font-semibold">Producción / turno</p>
                      <p className="text-gray-500 text-xs mt-1">Escenario base vs optimizado</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-gray-200 font-medium">120 -&gt; 142</p>
                      <p className="text-xl font-extrabold text-emerald-400">+18%</p>
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-6 p-4 rounded-xl bg-white/5">
                    <div>
                      <p className="text-gray-100 font-semibold">Tiempo medio en cola</p>
                      <p className="text-gray-500 text-xs mt-1">Escenario base vs optimizado</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-gray-200 font-medium">8.2 min -&gt; 4.7 min</p>
                      <p className="text-xl font-extrabold text-emerald-400">-43%</p>
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-6 p-4 rounded-xl bg-white/5">
                    <div>
                      <p className="text-gray-100 font-semibold">Utilización recurso crítico</p>
                      <p className="text-gray-500 text-xs mt-1">Escenario base vs optimizado</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-gray-200 font-medium">95% -&gt; 82%</p>
                      <p className="text-xl font-extrabold text-gray-300">Equilibrado</p>
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-6 p-4 rounded-xl bg-white/5">
                    <div>
                      <p className="text-gray-100 font-semibold">WIP medio</p>
                      <p className="text-gray-500 text-xs mt-1">Escenario base vs optimizado</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-gray-200 font-medium">35 -&gt; 22</p>
                      <p className="text-xl font-extrabold text-emerald-400">-37%</p>
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-6 p-4 rounded-xl bg-white/5">
                    <div>
                      <p className="text-gray-100 font-semibold">Coste energético por turno</p>
                      <p className="text-gray-500 text-xs mt-1">Escenario base vs optimizado</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-gray-200 font-medium">100 -&gt; 104</p>
                      <p className="text-xl font-extrabold text-rose-400">+4%</p>
                    </div>
                  </div>
                </div>

                <p className="mt-6 text-sm leading-relaxed text-gray-300 border-t border-white/10 pt-5">
                  <span className="text-white font-semibold">Resultado:</span> aumento de capacidad sin necesidad de inversión adicional y eliminación del cuello de botella en la estación crítica.
                </p>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 h-full flex flex-col">
                <div className="flex items-center justify-between mb-5 gap-4">
                  <h3 className="text-2xl font-bold">Informe técnico en PDF</h3>
                  <span className="text-xs uppercase tracking-widest text-blue-300 border border-blue-400/30 bg-blue-400/10 px-3 py-1 rounded-full">Salida</span>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 flex-1">
                  <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Contenido del informe</p>
                  <ul className="space-y-3 text-gray-300 text-sm leading-relaxed">
                    <li className="flex gap-3"><Check className="w-4 h-4 text-blue-400 mt-0.5" />Resumen ejecutivo de hallazgos y riesgos operativos.</li>
                    <li className="flex gap-3"><Check className="w-4 h-4 text-blue-400 mt-0.5" />KPIs comparados entre escenario base y escenario optimizado.</li>
                    <li className="flex gap-3"><Check className="w-4 h-4 text-blue-400 mt-0.5" />Propuestas de mejora priorizadas por impacto y esfuerzo.</li>
                    <li className="flex gap-3"><Check className="w-4 h-4 text-blue-400 mt-0.5" />Supuestos del modelo y trazabilidad de decisiones.</li>
                    <li className="flex gap-3"><Check className="w-4 h-4 text-blue-400 mt-0.5" />Identificación del cuello de botella crítico y causa raíz operativa.</li>
                    <li className="flex gap-3"><Check className="w-4 h-4 text-blue-400 mt-0.5" />Análisis de sensibilidad con escenarios alternativos y riesgos asociados.</li>
                    <li className="flex gap-3"><Check className="w-4 h-4 text-blue-400 mt-0.5" />Plan recomendado de implantación por fases, sin interrupción de producción.</li>
                    <li className="flex gap-3"><Check className="w-4 h-4 text-blue-400 mt-0.5" />Anexo técnico con parámetros de modelado para validación por ingeniería.</li>
                  </ul>
                </div>

                <p className="mt-4 text-sm text-gray-300 leading-relaxed border-t border-white/10 pt-4">
                  Entregable diseñado para comités de operaciones e ingeniería: claro para dirección y técnicamente trazable para validación.
                </p>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        <section id="casos-uso" className="py-32 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-blue-600/5 blur-[120px] pointer-events-none" />
          <div className="container mx-auto px-6 max-w-[96rem]">
            <div className="flex flex-col items-center mb-12">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-center">
                Para Qué <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 text-glow-blue">Sirve</span>
              </h2>
              <div className="w-32 h-1.5 bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
            </div>

            <div className="mb-16 rounded-[2rem] border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent p-8 md:p-10">
              <p className="text-gray-200 text-base md:text-lg leading-relaxed">
                Este TFM desarrolla una solución que automatiza el modelado de simulación discreta de eventos. El objetivo es permitir a ingenieros evaluar escenarios operativos sin necesidad de conocimientos avanzados en simulación.
              </p>
              <p className="mt-5 text-gray-300 text-base md:text-lg leading-relaxed">
                La simulación es fundamental en ingeniería industrial, pero requiere tiempo y especialización. Este proyecto acelera el proceso mediante IA para generar modelos automáticamente, comparar escenarios y producir informes profesionales listos para decisiones.
              </p>
              <p className="mt-5 text-gray-300 text-base md:text-lg leading-relaxed">
                El resultado es un análisis cuantitativo accesible, reducción de tiempo en modelado y entregables profesionales que demuestran el valor académico y práctico del proyecto.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                <CheckList text="Reduce el tiempo de análisis de horas a minutos, con una disminución de procesado de hasta el 100%." />
                <CheckList text="Permite simular procesos industriales sin conocimientos técnicos previos en simulación." />
                <CheckList text="Genera informes técnicos complejos en PDF sobre tu fábrica, listos para compartir y decidir." />
                <CheckList text="Incluye propuestas de mejora accionables para elevar capacidad, productividad y eficiencia." />
                <CheckList text="Compara escenarios en minutos y elige la mejor decisión antes de invertir en planta." />
                <CheckList text="Aporta una base cuantitativa sólida para reducir riesgo operativo y económico." />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-2">
                <DetailCard text="Distribuciones estadísticas (tiempos y demanda)" icon={<Database className="w-6 h-6" />} />
                <DetailCard text="Asignación dinámica de recursos y operarios" icon={<Zap className="w-6 h-6" />} />
                <DetailCard text="Condiciones de sistemas pull y reglas de reposición" icon={<Cpu className="w-6 h-6" />} />
                <DetailCard text="Bloqueos, paradas y cuellos de botella en línea" icon={<ShieldCheck className="w-6 h-6" />} />
                <DetailCard text="Horarios de fábrica, turnos y calendarios" icon={<Monitor className="w-6 h-6" />} />
                <DetailCard text="KPIs industriales con análisis técnico y mejoras" icon={<LineChart className="w-6 h-6" />} />
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* Privacy and Call to Action */}
        <section className="py-32" id="privacidad">
          <div className="container mx-auto px-6 max-w-[96rem]">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                Seguridad <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">e Independencia</span>
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="glassmorphism p-10 rounded-[2.5rem] border border-white/10 h-fit relative overflow-hidden group">
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-600/10 blur-[60px] group-hover:bg-blue-600/20 transition-colors" />
                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-lg font-bold uppercase tracking-widest italic text-blue-400">Privacidad Y Seguridad</h3>
                  <ShieldCheck className="w-8 h-8 text-blue-500" />
                </div>
                <div className="text-gray-400 leading-relaxed text-lg">
                  <p className="mb-6">
                    <strong className="text-white font-bold">Seguridad de grado industrial</strong>: aplicamos cifrado en tránsito y en reposo, control de acceso por rol, aislamiento lógico de datos por organización y trazabilidad de acciones sobre la plataforma.
                  </p>
                  <p>
                    El diseño está orientado a entornos industriales que requieren confidencialidad, gobierno del dato y auditoría sobre la información operativa.
                  </p>
                </div>
              </div>

              <ContactForm />
            </div>
          </div>
        </section>
        <SectionDivider />

        {/* Footer Bar */}
        <footer className="container mx-auto px-6 py-12 max-w-[96rem] border-t border-white/5 flex flex-wrap justify-center gap-8 md:gap-16">
          <FooterIcon icon={<Database className="w-5 h-5" />} text="Motor basado en JaamSim" />
          <FooterIcon icon={<ShieldCheck className="w-5 h-5" />} text="Entorno Seguro" />
          <FooterIcon icon={<ShieldCheck className="w-5 h-5" />} text="Privacidad Industrial" />
        </footer>
      </main>

    </div>
  );
}

type ContactType = 'collaboration' | 'demo' | 'investment' | 'engineer' | '';

function ContactForm() {
  const [formData, setFormData] = useState<SupportSubmission>({
    contactType: '' as ContactType,
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const contactTypes = [
    { id: 'collaboration', label: 'Tengo feedback técnico o metodológico' },
    { id: 'investment', label: 'Tengo un caso de uso o escenario que debería considerar' },
    { id: 'engineer', label: 'Trabajo en industria y puedo validar la solución' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleTypeSelect = (type: ContactType) => {
    setFormData(prev => ({ ...prev, contactType: type }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.contactType || !formData.name || !formData.email || !formData.message) {
      setError('Por favor completa todos los campos');
      return;
    }

    if (!CONTACT_EMAILJS_SERVICE_ID || !CONTACT_EMAILJS_TEMPLATE_ID || !CONTACT_EMAILJS_PUBLIC_KEY) {
      setError('Falta configurar EmailJS: NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID y NEXT_PUBLIC_EMAILJS_PUBLIC_KEY.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const selectedInterest = contactTypes.find((type) => type.id === formData.contactType)?.label ?? formData.contactType;

      await emailjs.send(
        CONTACT_EMAILJS_SERVICE_ID,
        CONTACT_EMAILJS_TEMPLATE_ID,
        buildSupportPayload(formData, selectedInterest),
        CONTACT_EMAILJS_PUBLIC_KEY
      );

      setSubmitted(true);
      setFormData({ contactType: '', name: '', email: '', company: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      setError('No se pudo enviar la solicitud. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glassmorphism p-10 rounded-[2.5rem] border border-blue-500/30 bg-blue-500/[0.03] group relative overflow-hidden" id="apoyanos">
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-600/10 blur-[60px] group-hover:bg-purple-600/20 transition-colors" />
      
      <h3 className="text-lg font-bold uppercase tracking-widest italic text-blue-400 mb-2">Solicitud</h3>
      <p className="text-gray-300 mb-8 text-sm leading-relaxed">
        Este es mi proyecto de TFM en Ingeniería Industrial. Tu feedback académico, profesional o técnico me ayuda a mejorarlo. Comparte tu perspectiva y te responderé con agradecimiento e ideas concretas.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
        {/* Contact Type Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-4">¿Qué tipo de colaboración te interesa?</label>
          <div className="grid grid-cols-1 gap-3">
            {contactTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => handleTypeSelect(type.id as ContactType)}
                className={`p-4 rounded-xl border-2 transition-all text-left font-medium ${
                  formData.contactType === type.id
                    ? 'border-blue-400 bg-blue-500/15 text-white'
                    : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/20'
                }`}
              >
                <span>{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Name and Email */}
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

        {/* Company */}
        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">Organización / Universidad (opcional)</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Nombre de tu Organización / Universidad (opcional)"
            className="w-full px-4 py-3 rounded-lg bg-white/8 border border-white/15 text-white placeholder-gray-500 focus:border-blue-400 focus:bg-white/12 focus:outline-none transition-all"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">Mensaje *</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Cuéntame tu feedback, crítica, sugerencia o caso de uso. ¿Qué mejoraría mi TFM?..."
            rows={4}
            className="w-full px-4 py-3 rounded-lg bg-white/8 border border-white/15 text-white placeholder-gray-500 focus:border-blue-400 focus:bg-white/12 focus:outline-none transition-all resize-none"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 rounded-lg bg-red-500/15 border border-red-500/30 text-red-200 text-sm">
            {error}
          </div>
        )}

        {/* Success Message */}
        {submitted && (
          <div className="p-4 rounded-lg bg-green-500/15 border border-green-500/30 text-green-200 text-sm animate-pulse">
            ¡Gracias! He recibido tu feedback y te responderé en breve.
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
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
      </form>
    </div>
  );
}

function MiniStepCard({ icon, title, description, color }: { icon: React.ReactNode, title: string, description: string, color: 'blue' | 'blue-soft' | 'blue-deep' }) {
  const colors = {
    blue: 'border-blue-500/35 bg-blue-500/8 hover:border-blue-400',
    'blue-soft': 'border-sky-400/30 bg-sky-400/8 hover:border-sky-300',
    'blue-deep': 'border-indigo-500/30 bg-indigo-500/8 hover:border-indigo-400'
  };

  return (
    <div className={`p-5 rounded-full border backdrop-blur-md transition-all duration-500 ${colors[color]} group shadow-xl shadow-slate-950/20 flex flex-col items-center justify-center aspect-square`}>
      <div className="mb-2 p-2.5 bg-white/5 rounded-full border border-white/10 w-fit group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-sm font-bold mb-1.5 text-white leading-tight text-center">{title}</h3>
      <p className="text-xs text-gray-300 leading-relaxed text-center">{description}</p>
    </div>
  );
}

function SectionDivider() {
  return (
    <div className="relative w-full h-px py-12 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent blur-sm" />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute h-px w-24 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse" />
    </div>
  );
}

function DetailCard({ text, icon }: { text: string, icon: React.ReactNode }) {
  return (
    <div className="p-6 rounded-3xl border border-white/10 bg-white/[0.03] flex items-start gap-4 hover:bg-white/[0.05] transition-colors shadow-sm shadow-slate-950/10">
      <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400">{icon}</div>
      <span className="text-base font-medium text-gray-200">{text}</span>
    </div>
  );
}

function CheckList({ text }: { text: string }) {
  return (
    <div className="flex items-center space-x-4 group">
      <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
        <Check className="w-4 h-4 text-blue-400" />
      </div>
      <span className="text-lg font-medium text-gray-300 group-hover:text-white transition-colors">{text}</span>
    </div>
  );
}

function FounderCard({ name, role, points, color }: { name: string, role: string, points: string[], color: 'blue' | 'purple' }) {
  const accent = color === 'blue' ? 'bg-blue-500' : 'bg-purple-500';
  const border = color === 'blue' ? 'border-blue-500/20' : 'border-purple-500/20';

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className={`glassmorphism p-8 rounded-[2rem] border ${border} relative group overflow-hidden`}
    >
      <div className={`absolute top-0 right-0 w-32 h-32 ${accent}/10 blur-[60px] group-hover:opacity-100 opacity-60 transition-opacity`} />

      <div className="flex items-center gap-6 mb-8 relative">
        <div className="w-24 h-24 rounded-2xl border-2 border-white/15 shrink-0 transform group-hover:scale-105 transition-transform bg-slate-900/70 flex items-center justify-center shadow-lg shadow-black/25">
          <User className={`w-11 h-11 ${color === 'blue' ? 'text-blue-300' : 'text-indigo-300'}`} />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white tracking-tight">{name}</h3>
          <p className={`text-sm font-bold uppercase tracking-wider ${color === 'blue' ? 'text-blue-400' : 'text-purple-400'} mt-1`}>{role}</p>
        </div>
      </div>

      <ul className="space-y-4 relative">
        {points.map((p, i) => (
          <li key={i} className="flex gap-4 text-sm text-gray-400 leading-relaxed items-start">
            <div className={`mt-1.5 w-1.5 h-1.5 rounded-full ${accent} shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.5)]`} />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function FooterIcon({ icon, text }: { icon: React.ReactNode, text: string }) {
  return (
    <div className="flex items-center space-x-2 text-gray-500 text-xs font-bold uppercase tracking-wider hover:text-gray-300 transition-colors cursor-default">
      {icon}
      <span>{text}</span>
    </div>
  );
}
