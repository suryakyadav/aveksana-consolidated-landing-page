import type React from 'react';

export interface NavLink {
  label: string;
  href: string;
  subMenu?: NavLink[];
}

export interface Product {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  keyFeatures: string[];
}

export interface Testimonial {
  avatar: string;
  quote: string;
  name: string;
  role: string;
}

export type PipelineStatus = 'Ideation' | 'Proposal Development' | 'Under Review' | 'Approved';

export interface PipelineProject extends GeneratedIdea {
  status: PipelineStatus;
  problemStatement?: string;
  proposedSolution?: string;
  methodology?: string;
  expectedOutcomes?: string;
  budgetEstimate?: number;
  timeline?: string;
  scratchpad?: string;
}

export interface User {
  name: string;
  email: string;
  organization: string;
  expertise: string[];
  savedIdeas?: GeneratedIdea[];
  pipelineProjects?: PipelineProject[];
}

export interface GeneratedIdea {
    title: string;
    overview: string;
    gapScore: number;
    literature: string[];
    priority?: 'High' | 'Medium' | 'Low';
    isIndustrial?: boolean;
}

export interface LiteratureAnalysis {
    title: string;
    summary: string;
    methodology: string;
    relevance: number;
    link?: string;
}

export interface ExperimentDesign {
  title: string;
  approach: string;
  dataToBeCollected: string;
  analysisMethods: string;
}

export interface RedTeamAnalysis {
    weaknesses: string[];
    assumptions: string[];
    questions: string[];
}