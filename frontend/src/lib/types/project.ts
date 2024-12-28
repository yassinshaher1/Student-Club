export interface ProjectLink {
  platform: string;
  url: string;
}

export interface Project {
  id: number;
  title: string;
  links: ProjectLink[];
} 