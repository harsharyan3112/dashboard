import Link from "next/link";
import { ArrowRight, BarChart3, BriefcaseBusiness, Database, Layers3, Sparkles, Workflow } from "lucide-react";

const demos = [
  ["Nexora Pulse", "SaaS Operations Dashboard", "/dashboard", BarChart3],
  ["Nexora CRM", "Sales & Lead Management", "#", Database],
  ["Nexora Estate", "Real Estate Intelligence", "#", BriefcaseBusiness],
  ["Nexora Voice", "AI Calling & Lead Qualification", "#", Sparkles],
  ["Nexora Flow", "Business Automation Platform", "#", Workflow],
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f8fa]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2 font-bold text-xl">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-black text-white">N</div>
          Nexora Studio
        </div>
        <Link href="/dashboard" className="rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800">
          Explore Demo
        </Link>
      </nav>

      <section className="grid-bg mx-4 overflow-hidden rounded-[32px] border border-neutral-200">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center md:py-32">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm">
            <Sparkles size={15} />
            Interactive product portfolio
          </div>
          <h1 className="text-5xl font-black tracking-tight md:text-7xl">
            I build digital products that actually work.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
            Explore functional prototypes for SaaS platforms, CRM systems, real estate products,
            AI applications and business automation.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3 font-semibold text-white">
              Try Nexora Pulse <ArrowRight size={17} />
            </Link>
            <a href="#work" className="rounded-xl border border-neutral-300 bg-white px-6 py-3 font-semibold">
              View Work
            </a>
          </div>
        </div>
      </section>

      <section id="work" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10">
          <p className="text-sm font-bold uppercase tracking-[.2em] text-neutral-500">Selected work</p>
          <h2 className="mt-2 text-4xl font-black">Interactive product demos</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {demos.map(([name, description, href, Icon], i) => (
            <Link key={String(name)} href={String(href)} className={`card group p-6 transition hover:-translate-y-1 hover:shadow-xl ${i === 0 ? "lg:col-span-2" : ""}`}>
              <div className="mb-14 flex items-center justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-neutral-100">
                  <Icon size={20} />
                </div>
                <ArrowRight className="text-neutral-400 transition group-hover:translate-x-1 group-hover:text-black" size={20} />
              </div>
              <p className="text-sm text-neutral-500">{String(description)}</p>
              <h3 className="mt-1 text-2xl font-bold">{String(name)}</h3>
              <p className="mt-4 text-sm text-neutral-500">
                Frontend prototype with realistic demo data and working interactions.
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}