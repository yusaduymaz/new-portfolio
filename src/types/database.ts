export interface Project {
  id: string;
  title: string;
  description: string | null;
  content: string | null;
  image_url: string | null;
  live_url: string | null;
  github_url: string | null;
  category: string | null;
  technologies: string[] | null;
  created_at: string;
}

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  username: string | null;
  title: string | null;
  description: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  twitter_url: string | null;
  cv_url: string | null;
}

export interface Expertise {
  id: string;
  title: string;
  description: string;
  icon: string | null;
  category: string | null;
  created_at: string;
}

export interface Education {
  id: string;
  title: string;
  institution: string;
  start_date: string | null;
  end_date: string | null;
  description: string | null;
  created_at: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  start_date: string | null;
  end_date: string | null;
  description: string | null;
  created_at: string;
}

export interface Certificate {
  id: string;
  title: string;
  organization: string;
  issue_date: string | null;
  url: string | null;
  image_url: string | null;
  details: string | null;
  created_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  title: string | null;
  company: string | null;
  content: string;
  image_url: string | null;
  created_at: string;
}

export interface About {
  id: string;
  full_name: string;
  title: string;
  description: string;
  experience: number;
  completed_projects: number;
  customer_satisfaction: number;
  created_at: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

