

import type React from 'react';

export interface NavLink {
  label: string;
  href: string;
  description?: string;
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
  commercialViability?: string;
  marketAnalysis?: string;
  environmentalImpact?: string;
  societalImpact?: string;
  relatedStrategyId?: string; // Link to the parent Strategy
  relatedPriorityId?: string; // Link to the specific Strategic Priority
}

export interface Activity {
  type: 'project_access' | 'idea_saved';
  title: string;
  timestamp: string; // ISO string for serialization
  link: string;
}

export type UserRole = 'admin' | 'team_lead' | 'researcher' | 'supervisor' | 'student';

export type OrganizationType = 'University' | 'Corporate';

export interface Organization {
  id: string;
  name: string;
  type: OrganizationType;
  domain: string;
  logoUrl?: string;
  ssoEnabled?: boolean;
}

export interface Membership {
  organization: Organization;
  roles: UserRole[];
}

export type WorkspaceType = 'Personal' | 'Organization';

export interface Workspace {
  id: string;
  type: WorkspaceType;
  name: string;
  organizationId?: string;
  roles: UserRole[]; // Effective roles in this workspace
}

export interface ChatMessage {
  id: string;
  name: string;
  role: string;
  message: string;
  isUser: boolean;
  timestamp: string;
}

export interface ProblemStatement {
  context: string;
  coreProblem: string;
  constraints: string;
  desiredOutcomes: string;
  evaluationCriteria: string;
  stakeholders: string;
}

export interface PriorityItem {
  id: string;
  title: string;
  description: string;
  horizon: string; // e.g., "12 months", "Q4 2025"
  strategicPillar: string; // e.g., "Innovation", "Efficiency"
  status: 'draft' | 'published';
}

export interface ImplementationItem {
  id: string;
  title: string;
  description: string;
  suggestedRole: string;
  assignee?: string; // Name of the researcher assigned
  assigneeAvatar?: string;
  dueDate?: string;
  status: 'pending' | 'in_progress' | 'completed';
  relatedPriorityId?: string; // ID of the PriorityItem this task supports
  relatedProjectId?: string; // ID (title) of the created PipelineProject
}

export interface StrategicPlan {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  statement: ProblemStatement;
  isShared: boolean;
  sharedWith: { name: string; role: string; avatar?: string }[];
  discussion: ChatMessage[];
  priorities?: PriorityItem[];
  implementation?: ImplementationItem[];
  status: 'draft' | 'published';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole; // Primary/Default role
  organization: string; // Legacy string, keep for now
  memberships: Membership[]; // New Multi-tenant support
  
  expertise: string[];
  savedIdeas?: GeneratedIdea[];
  pipelineProjects?: PipelineProject[];
  recentActivity?: Activity[];
  strategies?: StrategicPlan[];
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

export interface GeneratedProposalSection {
    text: string;
}
