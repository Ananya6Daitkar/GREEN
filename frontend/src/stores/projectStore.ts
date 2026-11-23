import { create } from 'zustand'
import { DesignProject, Material, ProductTemplate, OptimizationResult } from '@/types'

interface ProjectState {
  currentProject: DesignProject | null
  projects: DesignProject[]
  
  createProject: (name: string, template: ProductTemplate) => void
  setCurrentProject: (project: DesignProject) => void
  updateProjectName: (projectId: string, name: string) => void
  addMaterial: (projectId: string, material: Material) => void
  removeMaterial: (projectId: string, materialId: string) => void
  updateMaterial: (projectId: string, material: Material) => void
  setOptimization: (projectId: string, result: OptimizationResult) => void
  updateConstraints: (projectId: string, constraints: any) => void
  deleteProject: (projectId: string) => void
  loadProject: (projectId: string) => void
  saveProjects: () => void
  loadProjects: () => void
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  currentProject: null,
  projects: [],

  createProject: (name: string, template: ProductTemplate) => {
    const newProject: DesignProject = {
      id: `project_${Date.now()}`,
      name,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      materials: [],
      selectedTemplate: template,
      constraints: {
        kerf: 3,
        edgeMargin: 10,
        allowRotation: true,
      },
    }
    
    set((state) => ({
      projects: [...state.projects, newProject],
      currentProject: newProject,
    }))
    
    get().saveProjects()
  },

  setCurrentProject: (project: DesignProject) => {
    set({ currentProject: project })
  },

  updateProjectName: (projectId: string, name: string) => {
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === projectId ? { ...p, name, updatedAt: Date.now() } : p
      ),
      currentProject:
        state.currentProject?.id === projectId
          ? { ...state.currentProject, name, updatedAt: Date.now() }
          : state.currentProject,
    }))
    get().saveProjects()
  },

  addMaterial: (projectId: string, material: Material) => {
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === projectId
          ? { ...p, materials: [...p.materials, material], updatedAt: Date.now() }
          : p
      ),
      currentProject:
        state.currentProject?.id === projectId
          ? {
              ...state.currentProject,
              materials: [...state.currentProject.materials, material],
              updatedAt: Date.now(),
            }
          : state.currentProject,
    }))
    get().saveProjects()
  },

  removeMaterial: (projectId: string, materialId: string) => {
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              materials: p.materials.filter((m) => m.id !== materialId),
              updatedAt: Date.now(),
            }
          : p
      ),
      currentProject:
        state.currentProject?.id === projectId
          ? {
              ...state.currentProject,
              materials: state.currentProject.materials.filter((m) => m.id !== materialId),
              updatedAt: Date.now(),
            }
          : state.currentProject,
    }))
    get().saveProjects()
  },

  updateMaterial: (projectId: string, material: Material) => {
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              materials: p.materials.map((m) => (m.id === material.id ? material : m)),
              updatedAt: Date.now(),
            }
          : p
      ),
      currentProject:
        state.currentProject?.id === projectId
          ? {
              ...state.currentProject,
              materials: state.currentProject.materials.map((m) =>
                m.id === material.id ? material : m
              ),
              updatedAt: Date.now(),
            }
          : state.currentProject,
    }))
    get().saveProjects()
  },

  setOptimization: (projectId: string, result: OptimizationResult) => {
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === projectId ? { ...p, optimization: result, updatedAt: Date.now() } : p
      ),
      currentProject:
        state.currentProject?.id === projectId
          ? { ...state.currentProject, optimization: result, updatedAt: Date.now() }
          : state.currentProject,
    }))
    get().saveProjects()
  },

  updateConstraints: (projectId: string, constraints: any) => {
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === projectId
          ? { ...p, constraints: { ...p.constraints, ...constraints }, updatedAt: Date.now() }
          : p
      ),
      currentProject:
        state.currentProject?.id === projectId
          ? {
              ...state.currentProject,
              constraints: { ...state.currentProject.constraints, ...constraints },
              updatedAt: Date.now(),
            }
          : state.currentProject,
    }))
    get().saveProjects()
  },

  deleteProject: (projectId: string) => {
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== projectId),
      currentProject: state.currentProject?.id === projectId ? null : state.currentProject,
    }))
    get().saveProjects()
  },

  loadProject: (projectId: string) => {
    set((state) => ({
      currentProject: state.projects.find((p) => p.id === projectId) || null,
    }))
  },

  saveProjects: () => {
    const { projects } = get()
    localStorage.setItem('materra_projects', JSON.stringify(projects))
  },

  loadProjects: () => {
    const stored = localStorage.getItem('materra_projects')
    if (stored) {
      try {
        set({ projects: JSON.parse(stored) })
      } catch (e) {
        console.error('Failed to load projects:', e)
      }
    }
  },
}))
