export interface Profile {
  id: number;
  name: string;
  roles: string;
  bio: string;
  status: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  target: string;
}

export interface ImpactMetric {
  id: number;
  value: string;
  label: string;
  sort_order: number;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  tag: string;
  category: 'Data Science & ML' | 'Full-Stack Web';
  description: string;
  stack: string[];
  live_url: string | null;
  live_label: string | null;
  github_url: string | null;
  visual: 'radar' | 'energy' | 'grid' | 'sort';
  sort_order: number;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  location: string;
  period: string;
  achievements: string[];
  sort_order: number;
}

export interface SkillCategory {
  id: number;
  name: string;
  skills: string[];
  sort_order: number;
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  university: string;
  period: string;
  grade_label: string;
  grade_value: number;
  grade_max: number;
  sort_order: number;
}

export interface Credential {
  id: number;
  name: string;
  proficiency: string;
  sort_order: number;
}

export interface PortfolioData {
  profile: Profile;
  metrics: ImpactMetric[];
  projects: Project[];
  experiences: Experience[];
  skillCategories: SkillCategory[];
  education: Education[];
  credentials: Credential[];
}
