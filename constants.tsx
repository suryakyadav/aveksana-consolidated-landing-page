import React from 'react';
import type { NavLink, Product, Testimonial } from './types';
import { ThesisIcon, ArthaIcon, RDPortalIcon } from './components/icons';

export const NAV_LINKS: NavLink[] = [
  {
    label: 'Products',
    href: '/#products',
    subMenu: [
      { label: 'Thesis Support System', href: '/#/products/thesis-support-system' },
      { label: 'Artha - AI Grant Writer', href: '/#/products/artha-ai-grant-writer' },
      { label: 'R&D Portal', href: '/#/products/rd-portal' },
    ],
  },
  {
    label: 'Solutions',
    href: '/#demo',
    subMenu: [
      { label: 'For Universities', href: '/#/solutions/for-universities' },
      { label: 'For Corporations', href: '/#/solutions/for-corporations' },
      { label: 'For Individuals', href: '/#/solutions/for-individuals' },
    ],
  },
  { label: 'Resources', href: '/#resources' },
  { label: 'Pricing', href: '/#/solutions/for-individuals#plans' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'thesis-support-system',
    icon: <ThesisIcon />,
    title: 'Thesis Support System',
    description: 'Ensure academic integrity and research quality with AI-powered supervision and plagiarism detection.',
    keyFeatures: ['AI-Powered Feedback & Review', 'Advanced Plagiarism Detection', 'Real-time Progress Tracking Dashboards', 'Secure Document Management'],
  },
  {
    id: 'artha-ai-grant-writer',
    icon: <ArthaIcon />,
    title: 'Artha — AI Grant Writer',
    description: 'Accelerate funding success with data-driven grant proposal creation and optimization.',
    keyFeatures: ['Data-Driven Proposal Generation', 'Funding Opportunity Matching', 'Collaborative Writing Environment', 'Budgeting & Compliance Tools'],
  },
  {
    id: 'rd-portal',
    icon: <RDPortalIcon />,
    title: 'R&D Portal',
    description: 'Foster innovation and collaboration with a centralized platform for experimentation and discovery.',
    keyFeatures: ['Centralized Experiment Logging', 'Intellectual Property Management', 'Team Collaboration & Tasking', 'Data Visualization & Analytics'],
  },
];

export const TESTIMONIALS: Testimonial[] = [
    {
      avatar: `https://picsum.photos/id/1005/100/100`,
      quote: 'Aveksana streamlined my entire dissertation process. The feedback tools were invaluable.',
      name: 'Dr. Elena Vance',
      role: 'PhD Graduate',
    },
    {
      avatar: `https://picsum.photos/id/1011/100/100`,
      quote: 'Supervising multiple students is now manageable and more effective. I can track progress effortlessly.',
      name: 'Prof. Ben Carter',
      role: 'University Supervisor',
    },
    {
      avatar: `https://picsum.photos/id/1027/100/100`,
      quote: 'The R&D portal has become the backbone of our innovation pipeline. A game-changer for corporate research.',
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

export const WHY_AVEKSANA_INDIVIDUALS = [
  {
    icon: '💡',
    title: 'Discover Ideas',
    description: 'Find novel, high-impact research gaps instantly.'
  },
  {
    icon: '✍️',
    title: 'Structure Proposals',
    description: 'Draft outlines and align with real funding calls.'
  },
  {
    icon: '🤝',
    title: 'Collaborate & Share',
    description: 'Get AI feedback or invite supervisors later.'
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
    quote: 'The topic generator is a lifesaver. It helped me find a unique angle for my masters thesis that got my supervisor really excited.',
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

export const UNIVERSITY_CHALLENGES = [
  {
    icon: '🧑‍🎓',
    title: 'Supervision bottlenecks',
    description: 'Centralized Thesis Support System ensures consistent feedback and quality.',
  },
  {
    icon: '🧾',
    title: 'Low grant success rates',
    description: 'Artha helps faculty and students craft data-aligned, fundable proposals.',
  },
  {
    icon: '🧠',
    title: 'Fragmented research processes',
    description: 'Unified R&D Portal enables cross-department collaboration and tracking.',
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

export const CORPORATE_CHALLENGES = [
  {
    icon: '⚙️',
    title: 'Scattered innovation efforts',
    description: 'Centralize R&D ideas, proposals, and data in one platform.',
  },
  {
    icon: '💸',
    title: 'Inefficient funding & proposal processes',
    description: 'Use Artha to auto-generate compelling, evidence-backed proposals for grants and internal funding.',
  },
  {
    icon: '🧭',
    title: 'Slow idea-to-impact cycles',
    description: 'Predict trends and prioritize opportunities with AI-driven insights.',
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