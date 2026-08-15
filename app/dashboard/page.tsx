"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity as ActivityIcon, Bell, BriefcaseBusiness, CheckCircle2, ChevronDown, CircleDollarSign,
  LayoutDashboard, Menu, MoreHorizontal, Plus, Search, Settings, TrendingUp, Users, X, Zap
} from "lucide-react";
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis
} from "recharts";
import { activities, revenueData, stats } from "@/lib/mock-data";
import { projectService } from "@/lib/services/project-service";
import { Project, ProjectStatus } from "@/lib/types";

const nav = [
  ["Overview", LayoutDashboard],
  ["Projects", BriefcaseBusiness],
  ["Team", Users],
  ["Activity", ActivityIcon],
  ["Settings", Settings],
] as const;

function money(value: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
}

export default function DashboardPage() {
  const [active, setActive] = useState("Overview");
  const [range, setRange] = useState("30 Days");
  const [search, setSearch] = useState("");
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [modal, setModal] = useState(false);
  const [toast, setToast] = useState("");
  const [mobileNav, setMobileNav] = useState(false);
  const [newProject, setNewProject] = useState({ name: "", client: "", budget: "250000" });

  useEffect(() => {
    projectService.list().then(setProjectList);
  }, []);

  const filteredProjects = useMemo(
    () => projectList.filter((p) => `${p.name} ${p.client}`.toLowerCase().includes(search.toLowerCase())),
    [projectList, search]
  );

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2500);
  }

  async function addProject() {
    if (!newProject.name.trim() || !newProject.client.trim()) return;
    const item = await projectService.create({
      name: newProject.name,
      client: newProject.client,
      status: "On Track",
      progress: 0,
      budget: Number(newProject.budget),
      deadline: "Oct 30, 2026",
    });
    setProjectList((current) => [item, ...current]);
    setNewProject({ name: "", client: "", budget: "250000" });
    setModal(false);
    notify("Project created successfully");
  }

  async function changeStatus(id: number, status: ProjectStatus) {
    const updated = await projectService.update(id, { status });
    if (updated) {
      setProjectList((current) => current.map((p) => p.id === id ? updated : p));
      notify(`Project marked ${status}`);
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f8fa] text-[#101114]">
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-neutral-200 bg-white p-5 transition md:block ${mobileNav ? "block" : "hidden"}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-lg">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-black text-white">N</div>
            Nexora Pulse
          </div>
          <button className="md:hidden" onClick={() => setMobileNav(false)}><X size={20}/></button>
        </div>

        <div className="mt-8 space-y-1">
          {nav.map(([label, Icon]) => (
            <button key={label} onClick={() => { setActive(label); setMobileNav(false); }}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium ${active === label ? "bg-black text-white" : "text-neutral-600 hover:bg-neutral-100"}`}>
              <Icon size={18}/>{label}
            </button>
          ))}
        </div>

        <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-neutral-100 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold"><Zap size={15}/> Demo Mode</div>
          <p className="mt-1 text-xs leading-5 text-neutral-500">All data is simulated. Connect your API later through the service layer.</p>
        </div>
      </aside>

      <div className="md:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-neutral-200 bg-white/90 px-5 backdrop-blur">
          <button className="md:hidden" onClick={() => setMobileNav(true)}><Menu/></button>
          <div className="hidden items-center gap-2 rounded-xl bg-neutral-100 px-3 py-2 md:flex">
            <Search size={16} className="text-neutral-400"/>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search projects..." className="w-56 bg-transparent text-sm outline-none"/>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => notify("You have 4 new notifications")} className="relative rounded-xl p-2.5 hover:bg-neutral-100">
              <Bell size={19}/>
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-black"/>
            </button>
            <div className="ml-2 flex items-center gap-2 border-l pl-4">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-neutral-200 text-xs font-bold">HA</div>
              <div className="hidden sm:block"><p className="text-xs font-bold">Harsh Admin</p><p className="text-[11px] text-neutral-500">Administrator</p></div>
              <ChevronDown size={15}/>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl p-5 md:p-8">
          <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm text-neutral-500">Friday, August 14, 2026</p>
              <h1 className="mt-1 text-3xl font-black tracking-tight">{active}</h1>
            </div>
            <button onClick={() => setModal(true)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-4 py-2.5 text-sm font-semibold text-white">
              <Plus size={17}/> New Project
            </button>
          </div>

          {active === "Overview" && (
            <div className="fade-in">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <Stat label="Revenue" value={money(stats.revenue)} change={`+${stats.revenueChange}%`} icon={CircleDollarSign}/>
                <Stat label="Active Projects" value={String(stats.projects)} change={`+${stats.projectChange}%`} icon={BriefcaseBusiness}/>
                <Stat label="Customers" value={stats.customers.toLocaleString("en-IN")} change={`+${stats.customerChange}%`} icon={Users}/>
                <Stat label="Completion Rate" value={`${stats.completion}%`} change="+4.2%" icon={CheckCircle2}/>
              </div>

              <div className="mt-5 grid gap-5 lg:grid-cols-[1.6fr_1fr]">
                <div className="card p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <div><h2 className="font-bold">Revenue overview</h2><p className="text-xs text-neutral-500">Monthly revenue performance</p></div>
                    <select value={range} onChange={(e) => setRange(e.target.value)} className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs outline-none">
                      <option>7 Days</option><option>30 Days</option><option>90 Days</option><option>1 Year</option>
                    </select>
                  </div>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={revenueData}>
                        <defs><linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopOpacity={0.18}/><stop offset="100%" stopOpacity={0}/></linearGradient></defs>
                        <CartesianGrid vertical={false} stroke="#eceef0"/>
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 11}}/>
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 11}} tickFormatter={(v) => `₹${Math.round(v/100000)}L`}/>
                        <Tooltip formatter={(v) => money(Number(v))}/>
                        <Area type="monotone" dataKey="revenue" stroke="#111" fill="url(#revenueFill)" strokeWidth={2.5}/>
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="card p-5">
                  <div className="mb-5"><h2 className="font-bold">Recent activity</h2><p className="text-xs text-neutral-500">Latest workspace events</p></div>
                  <div className="space-y-5">
                    {activities.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-neutral-100"><ActivityIcon size={15}/></div>
                        <div><p className="text-sm leading-5">{item.text}</p><p className="mt-1 text-xs text-neutral-400">{item.time}</p></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card mt-5 overflow-hidden">
                <div className="flex items-center justify-between border-b border-neutral-200 p-5">
                  <div><h2 className="font-bold">Projects</h2><p className="text-xs text-neutral-500">Current delivery status</p></div>
                  <button onClick={() => setActive("Projects")} className="text-sm font-semibold underline">View all</button>
                </div>
                <ProjectTable projects={filteredProjects.slice(0, 4)} onStatus={changeStatus} />
              </div>
            </div>
          )}

          {active === "Projects" && (
            <div className="fade-in">
              <div className="card overflow-hidden">
                <div className="border-b border-neutral-200 p-5">
                  <div className="flex items-center gap-2 rounded-xl bg-neutral-100 px-3 py-2 md:hidden">
                    <Search size={16} className="text-neutral-400"/>
                    <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search projects..." className="w-full bg-transparent text-sm outline-none"/>
                  </div>
                  <p className="mt-3 text-sm text-neutral-500">{filteredProjects.length} projects found</p>
                </div>
                <ProjectTable projects={filteredProjects} onStatus={changeStatus}/>
              </div>
            </div>
          )}

          {active !== "Overview" && active !== "Projects" && (
            <div className="fade-in card grid min-h-[420px] place-items-center p-10 text-center">
              <div>
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-neutral-100"><Settings size={24}/></div>
                <h2 className="mt-5 text-xl font-bold">{active} module</h2>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-neutral-500">
                  This module is intentionally structured as a frontend prototype. Connect the corresponding service/API later without changing the dashboard shell.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="card w-full max-w-md p-6">
            <div className="flex items-center justify-between">
              <div><h2 className="text-xl font-bold">Create project</h2><p className="text-sm text-neutral-500">Add a demo project to your workspace.</p></div>
              <button onClick={() => setModal(false)}><X size={20}/></button>
            </div>
            <div className="mt-6 space-y-4">
              <Field label="Project name"><input value={newProject.name} onChange={(e) => setNewProject({...newProject, name: e.target.value})} placeholder="e.g. Customer Portal" /></Field>
              <Field label="Client"><input value={newProject.client} onChange={(e) => setNewProject({...newProject, client: e.target.value})} placeholder="e.g. Acme Labs" /></Field>
              <Field label="Budget"><input type="number" value={newProject.budget} onChange={(e) => setNewProject({...newProject, budget: e.target.value})} /></Field>
            </div>
            <div className="mt-6 flex gap-2">
              <button onClick={() => setModal(false)} className="flex-1 rounded-xl border border-neutral-200 px-4 py-2.5 text-sm font-semibold">Cancel</button>
              <button onClick={addProject} className="flex-1 rounded-xl bg-black px-4 py-2.5 text-sm font-semibold text-white">Create project</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="fixed bottom-5 right-5 z-[60] rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white shadow-xl">{toast}</div>}
    </div>
  );
}

function Stat({ label, value, change, icon: Icon }: { label: string; value: string; change: string; icon: React.ElementType }) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between"><div className="grid h-9 w-9 place-items-center rounded-xl bg-neutral-100"><Icon size={17}/></div><span className="flex items-center gap-1 text-xs font-bold"><TrendingUp size={13}/>{change}</span></div>
      <p className="mt-5 text-sm text-neutral-500">{label}</p>
      <p className="mt-1 text-2xl font-black">{value}</p>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block text-sm font-semibold">{label}<div className="mt-2 [&_input]:w-full [&_input]:rounded-xl [&_input]:border [&_input]:border-neutral-200 [&_input]:px-3 [&_input]:py-2.5 [&_input]:outline-none [&_input]:focus:border-black">{children}</div></label>;
}

function ProjectTable({ projects, onStatus }: { projects: Project[]; onStatus: (id: number, status: ProjectStatus) => void }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
          <tr><th className="px-5 py-3">Project</th><th className="px-5 py-3">Status</th><th className="px-5 py-3">Progress</th><th className="px-5 py-3">Budget</th><th className="px-5 py-3">Deadline</th><th className="px-5 py-3"></th></tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {projects.map((p) => (
            <tr key={p.id} className="hover:bg-neutral-50">
              <td className="px-5 py-4"><p className="font-semibold">{p.name}</p><p className="text-xs text-neutral-500">{p.client}</p></td>
              <td className="px-5 py-4">
                <select value={p.status} onChange={(e) => onStatus(p.id, e.target.value as ProjectStatus)} className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold outline-none">
                  <option>On Track</option><option>At Risk</option><option>Completed</option>
                </select>
              </td>
              <td className="px-5 py-4"><div className="flex items-center gap-3"><div className="h-2 w-28 overflow-hidden rounded-full bg-neutral-100"><div className="h-full rounded-full bg-black" style={{width: `${p.progress}%`}}/></div><span className="text-xs">{p.progress}%</span></div></td>
              <td className="px-5 py-4 font-medium">{money(p.budget)}</td>
              <td className="px-5 py-4 text-neutral-500">{p.deadline}</td>
              <td className="px-5 py-4"><button className="rounded-lg p-2 hover:bg-neutral-100"><MoreHorizontal size={18}/></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}