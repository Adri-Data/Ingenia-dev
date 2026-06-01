import ContactForm from '@/new_formulary/ContactForm';
import Image from 'next/image';
import Link from 'next/link';
import PromptExamples from '../../new_formulary/PromptExamples';

const pageShell = 'relative min-h-screen overflow-x-hidden bg-[#020617] selection:bg-blue-500/30 text-white font-sans';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const logoSrc = `${basePath}/logo.jpeg`;

export default function ContactPage() {
  return (
    <div className={pageShell}>
      <div className="fixed inset-0 z-0 opacity-25 pointer-events-none page-grid-bg" />
      <div className="fixed top-0 -left-40 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-0 -right-40 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <nav className="relative z-50 flex w-full items-center justify-between py-7 px-7">
        <div className="flex items-center space-x-3">
          <Image src={logoSrc} alt="Ingenia Logo" width={44} height={44} className="rounded-full object-cover" />
          <span className="text-2xl font-bold tracking-tight">Ingenia</span>
        </div>
        <Link href="/en/contact" className="px-5 py-2.5 bg-white/10 border border-white/10 text-white rounded-lg font-semibold hover:bg-white/15 transition-all">
          English
        </Link>
      </nav>

      <main className="relative z-10 px-6 pb-14 pt-2">
        <section className="mx-auto w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-10 items-start">
          <div className="pt-8 lg:pt-16">
            <p className="text-blue-300 font-semibold uppercase tracking-[0.3em] text-xs mb-4">Solicitud de feedback</p>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05] mb-5">
              Ayúdame a mejorar mi TFM. Comparte el casos de uso que debería considerar y tratare de resolverlo en 24 horas.
            </h1>
            <p className="max-w-xl text-base md:text-lg text-gray-300 leading-relaxed">
              Si tienes experiencia en simulación, ingeniería industrial o IA, tu feedback es valioso. Cuéntame aspectos de la metodología, la implementación o casos de uso que no haya considerado.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-gray-200">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                <p className="font-semibold text-white">¿Tienes una línea de producción?</p>
                <p className="text-gray-300 text-xs mt-1">Te ayudamos a observar su comportamiento y variabilidad.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                <p className="font-semibold text-white">¿Gestionas una fábrica o planta?</p>
                <p className="text-gray-300 text-xs mt-1">Analizamos capacidad, flujo y posibles puntos de mejora.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                <p className="font-semibold text-white">¿Quieres validar tu capacidad?</p>
                <p className="text-gray-300 text-xs mt-1">Contrasta escenarios antes de tomar decisiones de inversión.</p>
              </div>
            </div>

            <div className="mt-8 lg:mt-10">
              <PromptExamples />
            </div>
          </div>

          <div className="pt-2 lg:pt-6">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] shadow-2xl shadow-black/40 backdrop-blur-md p-4 md:p-6">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
