

import React from 'react';
import type { NavLink, Product, Testimonial } from './types';
import { ThesisIcon, ArthaIcon, RDPortalIcon } from './components/icons';

// --- Shared Submenus ---
export const PRODUCTS_SUBMENU: NavLink[] = [
  { 
    label: 'Thesis Support System', 
    href: '/#/products/thesis-support-system',
    description: 'Improve research quality with AI-assisted supervision and academic integrity tools.'
  },
  { 
    label: 'Artha — AI Grant Writer', 
    href: '/#/products/artha-ai-grant-writer',
    description: 'Boost grant success with optimized, data-driven proposal generation.'
  },
  { 
    label: 'R&D Portal', 
    href: '/#/products/rd-portal',
    description: 'Centralize experiments, knowledge, and collaboration for research teams.'
  },
];

export const SOLUTIONS_SUBMENU: NavLink[] = [
  { 
    label: 'For Students & Researchers', 
    href: '/#/solutions/for-students',
    description: 'Tools to plan, write, and complete theses with structured guidance.'
  },
  { 
    label: 'For Supervisors & Faculty', 
    href: '/#/solutions/for-supervisors',
    description: 'Manage multiple students, streamline feedback, and ensure quality.'
  },
  { 
    label: 'For Universities', 
    href: '/#/solutions/for-universities',
    description: 'Full research lifecycle oversight with security, compliance & reporting.'
  },
  { 
    label: 'For Corporate R&D', 
    href: '/#/solutions/for-corporations',
    description: 'Modernize innovation workflows and accelerate R&D output.'
  },
];

// --- Navigation Variants ---

// Variant A: Persona-first (Fastest way for each persona to navigate)
export const NAV_VARIANT_A: NavLink[] = [
  { label: 'Products', href: '/#products', subMenu: PRODUCTS_SUBMENU },
  { label: 'Students', href: '/#/solutions/for-students' },
  { label: 'Supervisors', href: '/#/solutions/for-supervisors' },
  { label: 'Universities', href: '/#/solutions/for-universities' },
  { label: 'Corporates', href: '/#/solutions/for-corporations' },
  { label: 'Resources', href: '/#/resources' },
  { label: 'Pricing', href: '/#/solutions/for-students#plans' },
];

// Variant B: Hybrid Simplicity (Short, clean, standard)
export const NAV_VARIANT_B: NavLink[] = [
  {
    label: 'Products',
    href: '/#products',
    subMenu: PRODUCTS_SUBMENU,
  },
  {
    label: 'Solutions',
    href: '/#demo',
    subMenu: SOLUTIONS_SUBMENU,
  },
  { label: 'Resources', href: '/#/resources' },
  { label: 'Pricing', href: '/#/solutions/for-students#plans' },
];

// Variant C: Value-first (Task-based navigation)
export const NAV_VARIANT_C: NavLink[] = [
  { label: 'Thesis', href: '/#/products/thesis-support-system' },
  { label: 'Grants', href: '/#/products/artha-ai-grant-writer' },
  { label: 'R&D', href: '/#/products/rd-portal' },
  { label: 'Solutions', href: '/#demo', subMenu: SOLUTIONS_SUBMENU },
  { label: 'Resources', href: '/#/resources' },
  { label: 'Pricing', href: '/#/solutions/for-students#plans' },
];

export const NAV_VARIANTS = {
  A: NAV_VARIANT_A,
  B: NAV_VARIANT_B,
  C: NAV_VARIANT_C,
};

// Default export for backward compatibility
export const NAV_LINKS = NAV_VARIANT_B;

export const PRODUCTS: Product[] = [
  {
    id: 'thesis-support-system',
    icon: <ThesisIcon />,
    title: 'Thesis Support System',
    description: 'Support students with guided writing, real-time feedback, supervision dashboards, and academic integrity automation.',
    keyFeatures: ['AI-Powered Feedback & Review', 'Advanced Plagiarism Detection', 'Real-time Progress Tracking Dashboards', 'Secure Document Management'],
  },
  {
    id: 'artha-ai-grant-writer',
    icon: <ArthaIcon />,
    title: 'Artha — AI Grant Writer',
    description: 'Produce compelling, funder-aligned proposals with intelligent drafting, optimization, and collaboration tools.',
    keyFeatures: ['Data-Driven Proposal Generation', 'Funding Opportunity Matching', 'Collaborative Writing Environment', 'Budgeting & Compliance Tools'],
  },
  {
    id: 'rd-portal',
    icon: <RDPortalIcon />,
    title: 'R&D Portal',
    description: 'Streamline collaboration, experiment tracking, and knowledge management for research and innovation teams.',
    keyFeatures: ['Centralized Experiment Logging', 'Intellectual Property Management', 'Team Collaboration & Tasking', 'Data Visualization & Analytics'],
  },
];

export const TESTIMONIALS: Testimonial[] = [
    {
      avatar: `https://picsum.photos/id/1005/100/100`,
      quote: 'Aveksana transformed my dissertation journey. The structured feedback saved weeks of revisions.',
      name: 'Dr. Elena Vance',
      role: 'PhD Graduate',
    },
    {
      avatar: `https://picsum.photos/id/1011/100/100`,
      quote: 'Managing multiple students is finally manageable. I can track everything from one place.',
      name: 'Prof. Ben Carter',
      role: 'University Supervisor',
    },
    {
      avatar: `https://picsum.photos/id/1027/100/100`,
      quote: 'Our R&D pipeline became dramatically more organized. The portal is now core to our workflow.',
      name: 'Aisha Khan',
      role: 'Innovation Lead, TechCorp',
    },
];

export const SOCIAL_PROOF_LOGOS = [
    { name: 'University of Cambridge', src: 'https://via.placeholder.com/150x50/cccccc/888888?text=Cambridge' },
    { name: 'Stanford University', src: 'https://via.placeholder.com/150x50/cccccc/888888?text=Stanford' },
    { name: 'MIT', src: 'https://via.placeholder.com/150x50/cccccc/888888?text=MIT' },
    { name: 'Innovate Corp', src: 'https://via.placeholder.com/150x50/cccccc/888888?text=InnovateCorp' },
    { name: 'BioGen Labs', src: 'https://via.placeholder.com/150x50/cccccc/888888?text=BioGen' },
    { name: 'QuantumLeap', src: 'https://via.placeholder.com/150x50/cccccc/888888?text=QuantumLeap' },
];

// -- Students & Researchers Content --
export const WHY_AVEKSANA_INDIVIDUALS = [
  {
    icon: '💡',
    title: 'Smart Topic Generation',
    description: 'Find novel, high-impact research gaps instantly based on your interests.'
  },
  {
    icon: '📚',
    title: 'Chapter-Level Guidance',
    description: 'Get structured templates and writing aids for every section of your thesis.'
  },
  {
    icon: '🔄',
    title: 'Feedback Loops',
    description: 'Receive instant AI critiques on logic, flow, and argumentation before submitting.'
  }
];

export const INDIVIDUAL_SUCCESS_STORIES: Testimonial[] = [
  {
    avatar: `https://picsum.photos/id/1025/100/100`,
    quote: 'Aveksana helped me refine my thesis and secure my PhD funding.',
    name: 'Sarah J.',
    role: 'PhD candidate, University of Sydney',
  },
  {
    avatar: `https://picsum.photos/id/1028/100/100`,
    quote: 'Within a week, I turned my research idea into a fundable proposal.',
    name: 'Anil P.',
    role: 'Independent Researcher',
  },
  {
    avatar: `https://picsum.photos/id/1035/100/100`,
    quote: 'The topic generator is a lifesaver. It helped me find a unique angle for my masters thesis.',
    name: 'Samuel Jones',
    role: 'M.Sc. Candidate, Environmental Science',
  },
];

export const INDIVIDUAL_PLANS = [
    {
        name: 'Free Plan',
        description: 'Test Aveksana’s AI tools',
        features: ['5 ideas', '1 proposal draft', 'Basic storage'],
        cta: 'Start Free',
        highlight: true,
    },
    {
        name: 'Weekly Plan',
        description: 'For short research bursts',
        features: ['Unlimited ideas', 'Proposal builder', 'Export to PDF'],
        cta: 'Try for a Week',
        highlight: false,
    },
    {
        name: 'Monthly Plan',
        description: 'For ongoing projects',
        features: ['Full Thesis + Artha access', 'Cloud save', 'Citation support'],
        cta: 'Upgrade Now',
        highlight: true,
    },
] as const;


// -- Supervisors Content --
export const SUPERVISOR_FEATURES = [
    {
      icon: '📊',
      title: 'Progress Dashboard',
      description: 'Track milestones for all your students in one single view.'
    },
    {
      icon: '🛡️',
      title: 'Integrity Checks',
      description: 'Automated plagiarism and AI-content detection reports.'
    },
    {
      icon: '💬',
      title: 'Structured Feedback',
      description: 'Streamline commenting and review cycles to save hours of reading time.'
    }
  ];

// -- University Content --
export const UNIVERSITY_CHALLENGES = [
  {
    icon: '🧑‍🎓',
    title: 'Centralized Management',
    description: 'Unified oversight for all departmental research activities and outputs.',
  },
  {
    icon: '⚖️',
    title: 'Compliance Tools',
    description: 'Automated ethics approvals, integrity checks, and regulatory reporting.',
  },
  {
    icon: '💰',
    title: 'Grant Office Automation',
    description: 'Accelerate funding applications with institutional templates and data.',
  },
];

export const UNIVERSITY_OUTCOMES = [
    { metric: '40% faster', description: 'thesis review cycles using the Thesis Support System' },
    { metric: '3x increase', description: 'in successful grant applications with Artha' },
    { metric: '25% higher', description: 'student completion rate through AI-driven oversight' },
];

export const UNIVERSITY_SECURITY_FEATURES = [
    'SSO and domain-based user management',
    'GDPR & FERPA compliance',
    'Private cloud deployment options',
    'LMS / repository integrations (Canvas, Moodle, Google Scholar)',
];

export const UNIVERSITY_TESTIMONIALS: Testimonial[] = [
    {
        avatar: `https://picsum.photos/id/10/100/100`,
        quote: 'Aveksana standardized our supervision and cut feedback delays by half.',
        name: 'Dean of Research',
        role: 'University of Helsinki',
    },
    {
        avatar: `https://picsum.photos/id/22/100/100`,
        quote: 'Artha simplified complex funding applications — we secured 3 new grants last semester.',
        name: 'Research Grants Office',
        role: 'Nanyang Technological University',
    },
    {
        avatar: `https://picsum.photos/id/40/100/100`,
        quote: 'The R&D portal gave us visibility into cross-departmental projects we never had before.',
        name: 'Doctoral Program Director',
        role: 'University of Toronto',
    },
];

// -- Corporate Content --
export const CORPORATE_CHALLENGES = [
  {
    icon: '🧪',
    title: 'Experiment Tracking',
    description: 'Log and analyze experimental data in a secure, centralized portal.',
  },
  {
    icon: '🧠',
    title: 'Knowledge Repository',
    description: 'Retain institutional knowledge and avoid duplicating failed experiments.',
  },
  {
    icon: '🤝',
    title: 'Cross-Team Collaboration',
    description: 'Break silos between R&D, product, and engineering teams.',
  },
];

export const CORPORATE_OUTCOMES = [
    { metric: '30% reduction', description: 'in proposal drafting time using Artha' },
    { metric: '45% faster', description: 'R&D project validation using the R&D Portal' },
    { metric: '50% increase', description: 'in funded innovation projects using the Aveksana suite' },
];

export const CORPORATE_SECURITY_FEATURES = [
    'SSO + Azure AD / Google Workspace integration',
    'API for CRM and project management tools (Notion, Jira, Salesforce)',
    'SOC 2 Type II, GDPR, HIPAA-compliant deployment',
    'Private cloud / on-premise hosting available',
];

export const CORPORATE_TESTIMONIALS: Testimonial[] = [
    {
        avatar: `https://picsum.photos/id/1027/100/100`,
        quote: 'The R&D Portal became our central hub for idea management. We identified three new product lines in one quarter.',
        name: 'Maria Duplass, Director of Innovation',
        role: 'TechCorp',
    },
    {
        avatar: `https://picsum.photos/id/1062/100/100`,
        quote: 'Artha cut our grant-writing time by 60% — our success rate doubled.',
        name: 'Dr. L. Nguyen, Head of R&D Operations',
        role: 'BioInnovate Ltd.',
    },
    {
        avatar: `https://picsum.photos/id/1074/100/100`,
        quote: 'Aveksana helped bridge academic partnerships seamlessly.',
        name: 'S. Patel, VP Strategy',
        role: 'FutureLab',
    },
];