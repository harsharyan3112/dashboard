import { Project } from "../types";
import { projects as initialProjects } from "../mock-data";

let store = [...initialProjects];

export const projectService = {
  async list(): Promise<Project[]> {
    return structuredClone(store);
  },
  async create(project: Omit<Project, "id">): Promise<Project> {
    const item = { ...project, id: Date.now() };
    store = [item, ...store];
    return structuredClone(item);
  },
  async update(id: number, patch: Partial<Project>): Promise<Project | null> {
    const index = store.findIndex((p) => p.id === id);
    if (index === -1) return null;
    store[index] = { ...store[index], ...patch };
    return structuredClone(store[index]);
  },
  async remove(id: number) {
    store = store.filter((p) => p.id !== id);
  },
  async reset() {
    store = [...initialProjects];
  },
};