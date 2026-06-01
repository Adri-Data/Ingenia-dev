import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, Cpu, Database, LineChart, Monitor, Settings, ShieldCheck, User, Zap } from 'lucide-react';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const logoSrc = `${basePath}/logo.jpeg`;

function SectionDivider() {
  return (
    <div className="relative w-full h-px py-12 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent blur-sm" />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute h-px w-24 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse" />
    </div>
  );
}

function FeatureCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="p-6 rounded-3xl border border-white/10 bg-white/[0.03] flex items-start gap-4 hover:bg-white/[0.05] transition-colors shadow-sm shadow-slate-950/10">
      <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400">{icon}</div>
      <div>
        <p className="text-base font-semibold text-white">{title}</p>
        <p className="text-sm text-gray-300 mt-1 leading-relaxed">{text}</p>
      </div>
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

function FounderCard({ name, role, points, accent = 'blue' }: { name: string; role: string; points: string[]; accent?: 'blue' | 'purple' }) {
  const accentClass = accent === 'blue' ? 'bg-blue-500' : 'bg-purple-500';
  const border = accent === 'blue' ? 'border-blue-500/20' : 'border-purple-500/20';
  const titleColor = accent === 'blue' ? 'text-blue-400' : 'text-purple-400';

  return (
    <div className={`glassmorphism p-8 rounded-[2rem] border ${border} relative group overflow-hidden`}>
      <div className={`absolute top-0 right-0 w-32 h-32 ${accentClass}/10 blur-[60px] group-hover:opacity-100 opacity-60 transition-opacity`} />
      <div className="flex items-center gap-6 mb-8 relative">
        <div className="w-24 h-24 rounded-2xl border-2 border-white/15 shrink-0 bg-slate-900/70 flex items-center justify-center shadow-lg shadow-black/25">
          <User className={`w-11 h-11 ${accent === 'blue' ? 'text-blue-300' : 'text-purple-300'}`} />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white tracking-tight">{name}</h3>
          <p className={`text-sm font-bold uppercase tracking-wider ${titleColor} mt-1`}>{role}</p>
        </div>
      </div>
      <ul className="space-y-4 relative">
        {points.map((point) => (
          <li key={point} className="flex gap-4 text-sm text-gray-300 leading-relaxed items-start">
            <div className={`mt-1.5 w-1.5 h-1.5 rounded-full ${accentClass} shrink-0`} />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterIcon({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center space-x-2 text-gray-400 text-xs font-bold uppercase tracking-wider hover:text-gray-200 transition-colors cursor-default">
      {icon}
      <span>{text}</span>
    </div>
  );
}

export default function EnglishHomePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#020617] selection:bg-blue-500/30 text-white font-sans">
      <div className="fixed inset-0 z-0 opacity-25 pointer-events-none page-grid-bg" />
      <div className="fixed top-0 -left-40 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-0 -right-40 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <nav className="relative z-50 flex w-full items-center justify-between py-7 px-7 gap-4">
        <div className="flex items-center space-x-3">
          <Image src={logoSrc} alt="Ingenia Logo" width={44} height={44} className="rounded-full object-cover" />
          <span className="text-2xl font-bold tracking-tight">Ingenia</span>
        </div>
        <div className="hidden lg:flex items-center space-x-10 text-lg font-medium text-gray-400">
          <a href="#uses" className="hover:text-white transition-colors">What it does</a>
          <a href="#about" className="hover:text-white transition-colors">About us</a>
          <a href="#privacy" className="hover:text-white transition-colors">Privacy</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" className="px-5 py-2.5 bg-white/10 border border-white/10 text-white rounded-lg font-semibold hover:bg-white/15 transition-all">
            Español
          </Link>
        </div>
      </nav>

      <main>
        <section className="relative z-10 w-full px-6 lg:pl-12 xl:pl-16 lg:pr-8 pt-2 pb-12 min-h-fit grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1] mb-4">
              <span className="text-glow-blue">Ingenia</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 text-3xl md:text-4xl [text-shadow:0_0_8px_rgba(37,99,235,0.18)]">
                Process modeling and industrial simulation <br />
                <span className="text-blue-200 [text-shadow:0_0_5px_rgba(96,165,250,0.12)]">in minutes</span>
                <span> from a plain-text description of your process</span>
              </span>
            </h1>
            <p className="text-xl text-blue-300 mb-4 font-semibold italic">Your pocket engineer.</p>
            <p className="max-w-2xl text-base md:text-lg text-gray-300 mb-8 leading-relaxed font-medium">
              Ingenia helps engineers, industrial consultants and operations leaders model processes, detect bottlenecks and compare scenarios with quantitative evidence in minutes.
            </p>
            <div className="mt-6 flex flex-col gap-3 w-full max-w-2xl">
              <Link href="/en/contact" className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold hover:from-blue-500 hover:to-blue-600 transition-all shadow-xl shadow-blue-500/25 flex items-center justify-center space-x-2 text-sm">
                <span>Request a demo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide text-gray-300">
              <span className="px-3 py-1 rounded-full border border-white/15 bg-white/5">Process Engineering</span>
              <span className="px-3 py-1 rounded-full border border-white/15 bg-white/5">Industrial Operations</span>
              <span className="px-3 py-1 rounded-full border border-white/15 bg-white/5">Industrial Consulting</span>
            </div>
          </div>

          <div className="relative h-[620px] flex items-center justify-center">
            <div className="absolute inset-0 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="relative w-full max-w-2xl aspect-square flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-white/10" />
              <div className="absolute inset-6 rounded-full border border-blue-500/20" />
              <div className="absolute inset-12 rounded-full border border-purple-500/20" />
              <div className="relative z-10 grid gap-4 place-items-center w-full max-w-sm">
                <Settings className="w-12 h-12 text-blue-400" />
                <div className="text-center">
                  <p className="text-sm uppercase tracking-[0.3em] text-blue-300 mb-2">1. Define your process</p>
                  <h3 className="text-xl font-bold text-white">Describe the line, resources and objective in natural language.</h3>
                </div>
                <div className="grid grid-cols-1 gap-4 w-full pt-4">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-gray-300">2. Simulate without learning simulation software.</div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-gray-300">3. Decide with data instead of intuition.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        <section id="uses" className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-6 max-w-[96rem]">
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4">What <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">It Does</span></h2>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">From an operational description to an actionable technical output: a factory prompt, scenario comparison and a professional report.</p>
            </div>

            <div className="mb-8 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
              <div className="flex items-center justify-between gap-4 mb-4">
                <h3 className="text-2xl font-bold">Example factory prompt</h3>
                <span className="text-xs uppercase tracking-widest text-cyan-300 border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 rounded-full">Input</span>
              </div>
              <p className="text-gray-300 text-sm mb-4">This is a real example of how an operations leader would describe a process to start the analysis.</p>
              <div className="rounded-xl border border-white/10 p-5 text-sm leading-relaxed text-gray-200">
                I have an assembly line with 4 stations in series, 2 shifts of 8 hours and variable daily demand. Station 3 has the longest cycle time and creates frequent queues. I want to compare the current scenario with an alternative that adds one operator at station 3 and adjusts lot size from 20 to 12 units. I need production per shift, average queue time, resource utilization and WIP to decide what change to apply without investing in new machinery.
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
                <h3 className="text-2xl font-bold mb-5">Scenario comparison: current state vs improvement</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start justify-between gap-6 p-4 rounded-xl bg-white/5">
                    <div><p className="text-gray-100 font-semibold">Production / shift</p><p className="text-gray-400 text-xs mt-1">Base scenario vs optimized</p></div>
                    <div className="text-right shrink-0"><p className="text-gray-200 font-medium">120 -&gt; 142</p><p className="text-xl font-extrabold text-emerald-400">+18%</p></div>
                  </div>
                  <div className="flex items-start justify-between gap-6 p-4 rounded-xl bg-white/5">
                    <div><p className="text-gray-100 font-semibold">Average queue time</p><p className="text-gray-400 text-xs mt-1">Base scenario vs optimized</p></div>
                    <div className="text-right shrink-0"><p className="text-gray-200 font-medium">8.2 min -&gt; 4.7 min</p><p className="text-xl font-extrabold text-emerald-400">-43%</p></div>
                  </div>
                  <div className="flex items-start justify-between gap-6 p-4 rounded-xl bg-white/5">
                    <div><p className="text-gray-100 font-semibold">Critical resource utilization</p><p className="text-gray-400 text-xs mt-1">Base scenario vs optimized</p></div>
                    <div className="text-right shrink-0"><p className="text-gray-200 font-medium">95% -&gt; 82%</p><p className="text-xl font-extrabold text-gray-300">Balanced</p></div>
                  </div>
                  <div className="flex items-start justify-between gap-6 p-4 rounded-xl bg-white/5">
                    <div><p className="text-gray-100 font-semibold">Average WIP</p><p className="text-gray-400 text-xs mt-1">Base scenario vs optimized</p></div>
                    <div className="text-right shrink-0"><p className="text-gray-200 font-medium">35 -&gt; 22</p><p className="text-xl font-extrabold text-emerald-400">-37%</p></div>
                  </div>
                  <div className="flex items-start justify-between gap-6 p-4 rounded-xl bg-white/5">
                    <div><p className="text-gray-100 font-semibold">Energy cost per shift</p><p className="text-gray-400 text-xs mt-1">Base scenario vs optimized</p></div>
                    <div className="text-right shrink-0"><p className="text-gray-200 font-medium">100 -&gt; 104</p><p className="text-xl font-extrabold text-rose-400">+4%</p></div>
                  </div>
                </div>
                <p className="mt-6 text-sm leading-relaxed text-gray-300 border-t border-white/10 pt-5"><span className="text-white font-semibold">Result:</span> more capacity without extra investment and elimination of the bottleneck at the critical station.</p>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 h-full flex flex-col">
                <div className="flex items-center justify-between mb-5 gap-4">
                  <h3 className="text-2xl font-bold">Technical PDF report</h3>
                  <span className="text-xs uppercase tracking-widest text-blue-300 border border-blue-400/30 bg-blue-400/10 px-3 py-1 rounded-full">Output</span>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 flex-1">
                  <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Report contents</p>
                  <ul className="space-y-3 text-gray-300 text-sm leading-relaxed">
                    <li className="flex gap-3"><Check className="w-4 h-4 text-blue-400 mt-0.5" />Executive summary of findings and operational risks.</li>
                    <li className="flex gap-3"><Check className="w-4 h-4 text-blue-400 mt-0.5" />KPIs compared between base and optimized scenario.</li>
                    <li className="flex gap-3"><Check className="w-4 h-4 text-blue-400 mt-0.5" />Prioritized improvement proposals by impact and effort.</li>
                    <li className="flex gap-3"><Check className="w-4 h-4 text-blue-400 mt-0.5" />Model assumptions and decision traceability.</li>
                    <li className="flex gap-3"><Check className="w-4 h-4 text-blue-400 mt-0.5" />Critical bottleneck identification and root cause analysis.</li>
                    <li className="flex gap-3"><Check className="w-4 h-4 text-blue-400 mt-0.5" />Sensitivity analysis with alternative scenarios and associated risks.</li>
                    <li className="flex gap-3"><Check className="w-4 h-4 text-blue-400 mt-0.5" />Recommended phased implementation plan without interrupting production.</li>
                    <li className="flex gap-3"><Check className="w-4 h-4 text-blue-400 mt-0.5" />Technical appendix with modeling parameters for engineering validation.</li>
                  </ul>
                </div>
                <p className="mt-4 text-sm text-gray-300 leading-relaxed border-t border-white/10 pt-4">An output designed for operations and engineering committees: clear for management and technically traceable for validation.</p>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        <section id="about" className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-600/[0.03] pointer-events-none" />
          <div className="container mx-auto px-6 max-w-[96rem]">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Who <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">We Are</span></h2>
              <p className="text-gray-400 max-w-3xl mx-auto mb-4 text-xl leading-relaxed">Ingenia started as a Master's thesis in Industrial Engineering and has evolved into an applied simulation solution focused on real operational decisions.</p>
              <p className="text-gray-500 max-w-3xl mx-auto italic mb-8">Our approach combines modeling rigor, business vision and technical execution to deliver reliable analysis in timeframes compatible with operations.</p>
              <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto" />
            </div>
       
        <SectionDivider />

        <section id="privacy" className="py-32">
          <div className="container mx-auto px-6 max-w-[96rem]">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Security <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">and Independence</span></h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="glassmorphism p-10 rounded-[2.5rem] border border-white/10 h-fit relative overflow-hidden group">
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-600/10 blur-[60px] group-hover:bg-blue-600/20 transition-colors" />
                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-lg font-bold uppercase tracking-widest italic text-blue-400">Privacy & Security</h3>
                  <ShieldCheck className="w-8 h-8 text-blue-500" />
                </div>
                <div className="text-gray-400 leading-relaxed text-lg">
                  <p className="mb-6"><strong className="text-white font-bold">Industrial-grade security</strong>: we apply encryption in transit and at rest, role-based access control, logical data isolation per organization and traceability of platform actions.</p>
                  <p>The design is oriented to industrial environments that require confidentiality, data governance and operational auditability.</p>
                </div>
              </div>

              <div className="glassmorphism p-10 rounded-[2.5rem] border border-blue-500/30 bg-blue-500/[0.03] group relative overflow-hidden">
                <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-600/10 blur-[60px] group-hover:bg-purple-600/20 transition-colors" />
                <h3 className="text-lg font-bold uppercase tracking-widest italic text-blue-300 mb-2">Request a demo</h3>
                <p className="text-gray-300 mb-8 text-sm leading-relaxed">Use the contact page to request a demo or start a collaboration conversation.</p>
                <Link href="/en/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition-colors font-semibold shadow-lg shadow-blue-500/20">Go to contact <ArrowRight className="w-4 h-4" /></Link>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        <footer className="container mx-auto px-6 py-12 max-w-[96rem] border-t border-white/5 flex flex-wrap justify-center gap-8 md:gap-16">
          <FooterIcon icon={<Database className="w-5 h-5" />} text="Powered by JaamSim" />
          <FooterIcon icon={<ShieldCheck className="w-5 h-5" />} text="Secure environment" />
          <FooterIcon icon={<ShieldCheck className="w-5 h-5" />} text="Industrial privacy" />
        </footer>
      </main>
    </div>
  );
}
