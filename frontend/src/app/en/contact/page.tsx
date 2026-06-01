import ContactForm from '@/new_formulary/ContactForm';
import PromptExamples from '@/new_formulary/PromptExamples';
import Image from 'next/image';
import Link from 'next/link';

const pageShell = 'relative min-h-screen overflow-x-hidden bg-[#020617] selection:bg-blue-500/30 text-white font-sans';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const logoSrc = `${basePath}/logo.jpeg`;

export default function EnglishContactPage() {
  return (
    <div className={pageShell}>
      <div className="fixed inset-0 z-0 opacity-25 pointer-events-none page-grid-bg" />
      <div className="fixed top-0 -left-40 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-0 -right-40 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <nav className="relative z-50 flex w-full items-center justify-between py-7 px-7 gap-4">
        <div className="flex items-center space-x-3">
          <Image src={logoSrc} alt="Ingenia Logo" width={44} height={44} className="rounded-full object-cover" />
          <span className="text-2xl font-bold tracking-tight">Ingenia</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/contact" className="px-5 py-2.5 bg-white/10 border border-white/10 text-white rounded-lg font-semibold hover:bg-white/15 transition-all">
            Switch to Spanish
          </Link>
        </div>
      </nav>

      <main className="relative z-10 px-6 pb-14 pt-2">
        <section className="mx-auto w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-10 items-start">
          <div className="pt-8 lg:pt-16">
            <p className="text-blue-300 font-semibold uppercase tracking-[0.3em] text-xs mb-4">Project request</p>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05] mb-5">
              Share your flow and we will send you a professional report in about 24 hours.
            </h1>
            <p className="max-w-xl text-base md:text-lg text-gray-300 leading-relaxed">
              Tell us about your operation with as much detail as possible. If you need to assess capacity, detect bottlenecks or prepare a simulation, this is the right starting point.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-gray-200">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                <p className="font-semibold text-white">Do you have a production line?</p>
                <p className="text-gray-300 text-xs mt-1">We help you observe its behavior and variability.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                <p className="font-semibold text-white">Do you manage a factory or plant?</p>
                <p className="text-gray-300 text-xs mt-1">We analyze capacity, flow and potential improvement points.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                <p className="font-semibold text-white">Do you want to validate capacity?</p>
                <p className="text-gray-300 text-xs mt-1">Compare scenarios before making investment decisions.</p>
              </div>
            </div>

            <div className="mt-8 lg:mt-10">
              <PromptExamples locale="en" />
            </div>
          </div>

          <div className="pt-2 lg:pt-6">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] shadow-2xl shadow-black/40 backdrop-blur-md p-4 md:p-6">
              <ContactForm locale="en" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
