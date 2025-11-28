
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { 
  UserRole, Workspace, GeneratedIdea, PipelineProject, 
  PipelineStatus, StrategicPlan, ImplementationItem, Activity 
} from '../types';

interface DataState {
  activeWorkspace: Workspace | null;
  availableWorkspaces: Workspace[];
  savedIdeas: GeneratedIdea[];
  pipelineProjects: PipelineProject[];
  strategies: StrategicPlan[];
  recentActivity: Activity[];
}

const initialState: DataState = {
  activeWorkspace: null,
  availableWorkspaces: [],
  savedIdeas: [],
  pipelineProjects: [],
  strategies: [],
  recentActivity: []
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    // Initialization from User Load
    initializeData: (state, action: PayloadAction<{ user: any }>) => {
      const { user } = action.payload;
      if (!user) return;

      // Calculate Workspaces
      const workspaces: Workspace[] = [];
      workspaces.push({
          id: 'personal',
          type: 'Personal',
          name: 'Personal Workspace',
          roles: [UserRole.STUDENT] 
      });

      if (user.memberships && user.memberships.length > 0) {
          user.memberships.forEach((membership: any) => {
              workspaces.push({
                  id: membership.organization.id,
                  type: 'Organization',
                  name: membership.organization.name,
                  organizationId: membership.organization.id,
                  roles: membership.roles
              });
          });
      }
      state.availableWorkspaces = workspaces;
      
      // Set default active workspace if not set
      if (!state.activeWorkspace || !workspaces.find(w => w.id === state.activeWorkspace?.id)) {
          state.activeWorkspace = workspaces.length > 1 ? workspaces[1] : workspaces[0];
      }

      // Load Data
      state.savedIdeas = user.savedIdeas || [];
      state.pipelineProjects = user.pipelineProjects || [];
      state.strategies = user.strategies || [];
      state.recentActivity = user.recentActivity || [];
    },

    setActiveWorkspace: (state, action: PayloadAction<string>) => {
      const found = state.availableWorkspaces.find(w => w.id === action.payload);
      if (found) {
        state.activeWorkspace = found;
      }
    },

    updateSavedIdeas: (state, action: PayloadAction<GeneratedIdea[]>) => {
      state.savedIdeas = action.payload;
    },

    updatePipelineProjects: (state, action: PayloadAction<PipelineProject[]>) => {
      state.pipelineProjects = action.payload;
    },

    promoteIdeaToPipeline: (state, action: PayloadAction<GeneratedIdea>) => {
      const idea = action.payload;
      state.savedIdeas = state.savedIdeas.filter(i => i.title !== idea.title);
      const newProject: PipelineProject = { ...idea, status: 'Ideation' };
      state.pipelineProjects.push(newProject);
    },

    promoteTaskToProject: (state, action: PayloadAction<{ strategyId: string, task: ImplementationItem }>) => {
      const { strategyId, task } = action.payload;
      
      // Create Project
      const newProject: PipelineProject = {
          title: task.title,
          overview: task.description,
          gapScore: 0,
          literature: [],
          priority: 'Medium',
          status: 'Ideation',
          relatedStrategyId: strategyId,
          relatedPriorityId: task.relatedPriorityId
      };
      state.pipelineProjects.push(newProject);

      // Update Strategy Task Link
      const stratIndex = state.strategies.findIndex(s => s.id === strategyId);
      if (stratIndex >= 0 && state.strategies[stratIndex].implementation) {
          state.strategies[stratIndex].implementation = state.strategies[stratIndex].implementation!.map(t => 
              t.id === task.id ? { ...t, relatedProjectId: task.title } : t
          );
      }

      // Add Activity
      const newActivity: Activity = {
          type: 'project_access',
          title: task.title,
          link: `/dashboard/project/${encodeURIComponent(task.title)}`,
          timestamp: new Date().toISOString()
      };
      state.recentActivity = [newActivity, ...state.recentActivity].slice(0, 5);
    },

    updateProjectStatus: (state, action: PayloadAction<{ title: string, status: PipelineStatus }>) => {
      const project = state.pipelineProjects.find(p => p.title === action.payload.title);
      if (project) {
        project.status = action.payload.status;
      }
    },

    updateProjectDetails: (state, action: PayloadAction<{ title: string, details: Partial<PipelineProject> }>) => {
      const index = state.pipelineProjects.findIndex(p => p.title === action.payload.title);
      if (index >= 0) {
        state.pipelineProjects[index] = { ...state.pipelineProjects[index], ...action.payload.details };
      }
    },

    addActivity: (state, action: PayloadAction<Omit<Activity, 'timestamp'>>) => {
      const newActivity: Activity = { ...action.payload, timestamp: new Date().toISOString() };
      state.recentActivity = [newActivity, ...state.recentActivity].slice(0, 5);
    },

    saveStrategy: (state, action: PayloadAction<StrategicPlan>) => {
      const existingIndex = state.strategies.findIndex(s => s.id === action.payload.id);
      if (existingIndex >= 0) {
        state.strategies[existingIndex] = action.payload;
      } else {
        state.strategies.unshift(action.payload);
      }
    },

    updateStrategy: (state, action: PayloadAction<{ id: string, updates: Partial<StrategicPlan> }>) => {
      const index = state.strategies.findIndex(s => s.id === action.payload.id);
      if (index >= 0) {
        state.strategies[index] = { 
          ...state.strategies[index], 
          ...action.payload.updates, 
          updatedAt: new Date().toISOString() 
        };
      }
    },

    deleteStrategy: (state, action: PayloadAction<string>) => {
      state.strategies = state.strategies.filter(s => s.id !== action.payload);
    },
    
    clearData: (state) => {
        return initialState;
    }
  }
});

export const { 
  initializeData, setActiveWorkspace, updateSavedIdeas, updatePipelineProjects,
  promoteIdeaToPipeline, promoteTaskToProject, updateProjectStatus, updateProjectDetails,
  addActivity, saveStrategy, updateStrategy, deleteStrategy, clearData
} = dataSlice.actions;

export default dataSlice.reducer;
