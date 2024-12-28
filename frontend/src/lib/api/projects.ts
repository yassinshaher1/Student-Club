import { Project } from '../types/project';

// This will be used when you have a backend
export const projectsApi = {
  async getProjects(): Promise<Project[]> {
    const response = await fetch('/api/projects');
    return response.json();
  },

  async getProjectById(id: number): Promise<Project> {
    const response = await fetch(`/api/projects/${id}`);
    return response.json();
  }
}; 