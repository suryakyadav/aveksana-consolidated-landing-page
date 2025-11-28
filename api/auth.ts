

import { UserRole, type User, type PipelineProject, type GeneratedIdea, type StrategicPlan, type Organization } from '../types';

// --- MOCK DATA GENERATORS ---

const MOCK_PROJECTS: PipelineProject[] = [
    {
        title: "Graphene-Based Water Filtration",
        overview: "Developing a low-cost, high-efficiency water filter using graphene oxide membranes.",
        gapScore: 8,
        literature: ["Graphene oxide membranes for water purification (Nature, 2021)", "Scalable production of graphene (Science, 2020)"],
        status: "Proposal Development",
        priority: "High",
        relatedStrategyId: "strat-1",
        relatedPriorityId: "p-1"
    },
    {
        title: "AI-Driven Drug Discovery for Neglected Diseases",
        overview: "Utilizing deep learning models to identify potential drug candidates for tropical diseases.",
        gapScore: 9,
        literature: ["Deep learning in drug discovery (Lancet, 2022)", "AI for global health (WHO Report, 2023)"],
        status: "Ideation",
        priority: "Medium"
    },
    {
        title: "Biodegradable Plastics from Algae",
        overview: "Creating a commercially viable bioplastic using genetically modified algae strains.",
        gapScore: 7,
        literature: ["Algae-based biopolymers (Bioresource Tech, 2019)"],
        status: "Under Review",
        priority: "High"
    }
];

const MOCK_STRATEGIES: StrategicPlan[] = [
    {
        id: "strat-1",
        title: "FY25 Q2 Innovation Acceleration",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: "draft",
        isShared: true,
        sharedWith: [{ name: "Sarah Chen", role: "VP Engineering" }],
        statement: {
            context: "Our competitor release cycles have accelerated by 20%.",
            coreProblem: "Our current R&D pipeline is too slow due to manual material testing.",
            constraints: "Budget flat for Q3. No new hires.",
            desiredOutcomes: "Reduce testing time by 40%.",
            evaluationCriteria: "Speed, cost per test, accuracy.",
            stakeholders: "R&D Team, Product Management"
        },
        discussion: [],
        priorities: [
            { id: "p-1", title: "Automated Material Screening", description: "Implement AI-driven visual inspection.", horizon: "6 months", strategicPillar: "Efficiency", status: "draft" },
            { id: "p-2", title: "University Partnerships", description: "Collaborate with MIT for advanced testing.", horizon: "12 months", strategicPillar: "Innovation", status: "draft" }
        ],
        implementation: [
            { id: "t-1", title: "Vendor Selection for AI Tools", description: "Evaluate 3 vendors.", suggestedRole: "Tech Lead", status: "in_progress", assignee: "Dr. Alex Riley", relatedPriorityId: "p-1" }
        ]
    }
];

const MOCK_IDEAS: GeneratedIdea[] = [
    {
        title: "Urban Vertical Farming Optimization",
        overview: "Using IoT sensors to optimize nutrient delivery in vertical farms.",
        gapScore: 6,
        literature: ["Vertical farming efficiency (AgriTech, 2023)"],
        priority: "Low"
    }
];

// Mock Organizations
const ORGS: Record<string, Organization> = {
    'mit.edu': { id: 'org-mit', name: 'MIT', type: 'University', domain: 'mit.edu', ssoEnabled: true },
    'university.edu': { id: 'org-uni', name: 'State University', type: 'University', domain: 'university.edu', ssoEnabled: true },
    'techcorp.com': { id: 'org-corp', name: 'TechCorp', type: 'Corporate', domain: 'techcorp.com', ssoEnabled: true },
    'biogen.com': { id: 'org-bio', name: 'BioGen Labs', type: 'Corporate', domain: 'biogen.com', ssoEnabled: false },
};

// Helper to check domain availability
export const checkDomain = async (email: string): Promise<Organization | null> => {
    await delay(600); // Simulate network
    const domain = email.split('@')[1];
    return ORGS[domain] || null;
};

const generateMockUser = (email: string, roleOverride?: UserRole): User => {
    const domain = email.split('@')[1];
    const org = ORGS[domain];
    
    // Determine primary role based on domain or override
    let primaryRole: UserRole = roleOverride || UserRole.STUDENT;
    if (!roleOverride) {
        if (domain === 'mit.edu') primaryRole = UserRole.SUPERVISOR;
        else if (domain === 'techcorp.com') primaryRole = UserRole.RESEARCHER;
        else if (domain === 'university.edu') primaryRole = UserRole.ADMIN;
        else primaryRole = UserRole.STUDENT;
    }

    const baseUser: User = {
        id: `user-${Date.now()}`,
        email,
        name: email.split('@')[0].replace('.', ' ').replace(/^\w/, c => c.toUpperCase()),
        role: primaryRole,
        organization: org ? org.name : 'Independent',
        memberships: [],
        expertise: ['Innovation Management', 'Data Science'],
        recentActivity: [
            { type: 'project_access' as const, title: 'Graphene-Based Water Filtration', link: '/dashboard/pipeline', timestamp: new Date().toISOString() },
            { type: 'idea_saved' as const, title: 'Urban Vertical Farming Optimization', link: '/dashboard/idea-generator', timestamp: new Date(Date.now() - 86400000).toISOString() }
        ],
        savedIdeas: MOCK_IDEAS,
        pipelineProjects: MOCK_PROJECTS,
        strategies: MOCK_STRATEGIES
    };

    // Add memberships based on domain
    if (org) {
        baseUser.memberships.push({
            organization: org,
            roles: [primaryRole]
        });
        
        // Add multi-role scenario for testing
        if (primaryRole === UserRole.ADMIN) {
             baseUser.memberships[0].roles.push(UserRole.SUPERVISOR);
        }
    }

    // Customize data based on role
    if (primaryRole === UserRole.STUDENT) {
        baseUser.pipelineProjects = [MOCK_PROJECTS[1]];
        baseUser.strategies = [];
    } else if (primaryRole === UserRole.RESEARCHER) {
        baseUser.strategies = []; // Researchers might not see strategies by default unless invited
    }

    return baseUser;
};

// --- AUTH FUNCTIONS ---

interface AuthResponse {
  token: string;
  user: User;
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const loginUser = async (credentials: { email: string; password?: string; role?: string; sso?: boolean }): Promise<AuthResponse> => {
  await delay(800); // Simulate network latency

  // For the demo, we generate a user based on the email domain and role
  const role = credentials.role as UserRole | undefined;
  const mockUser = generateMockUser(credentials.email, role);
  
  // Store session info
  localStorage.setItem('mock_user_role', mockUser.role);
  localStorage.setItem('mock_user_email', credentials.email);

  return {
      token: 'mock-jwt-token-12345',
      user: mockUser
  };
};

export const registerUser = async (userData: any): Promise<AuthResponse> => {
  await delay(1000);
  
  const role = userData.role || UserRole.STUDENT;
  const mockUser = generateMockUser(userData.email, role);
  mockUser.name = userData.name;

  localStorage.setItem('mock_user_role', role);
  localStorage.setItem('mock_user_email', userData.email);

  return {
      token: 'mock-jwt-token-registered-67890',
      user: mockUser
  };
};

export const fetchUserProfile = async (): Promise<User> => {
  await delay(500);
  
  const role = (localStorage.getItem('mock_user_role') as UserRole) || UserRole.STUDENT;
  const email = localStorage.getItem('mock_user_email');
  
  if (!email) throw new Error("No session");
  
  return generateMockUser(email, role);
};