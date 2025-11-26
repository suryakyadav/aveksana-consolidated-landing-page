
import React, { createContext, useContext, ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import type { User, GeneratedIdea, PipelineProject, PipelineStatus, Activity, StrategicPlan, ImplementationItem } from '../types';
import { useUser } from '../hooks/useAuthQuery';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  isError: boolean;
  login: (userData: any) => void; // Kept for compatibility, but consumers should prefer useLogin hook directly
  logout: () => void;
  
  // Data mutations (client-side for now, or optimistic updates)
  updateSavedIdeas: (ideas: GeneratedIdea[]) => void;
  updatePipelineProjects: (projects: PipelineProject[]) => void;
  promoteIdeaToPipeline: (idea: GeneratedIdea) => void;
  promoteTaskToProject: (strategyId: string, task: ImplementationItem) => void;
  updateProjectStatus: (projectTitle: string, newStatus: PipelineStatus) => void;
  updateProjectDetails: (projectTitle: string, details: Partial<PipelineProject>) => void;
  addActivity: (activity: Omit<Activity, 'timestamp'>) => void;
  saveStrategy: (strategy: StrategicPlan) => void;
  updateStrategy: (id: string, updates: Partial<StrategicPlan>) => void;
  deleteStrategy: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data: user, isLoading, isError } = useUser();
  const queryClient = useQueryClient();

  const logout = () => {
    localStorage.removeItem('authToken');
    queryClient.setQueryData(['user'], null);
    // window.location.href = '/login'; // Let the router/ProtectedRoute handle the redirect
  };

  // Deprecated: purely for compatibility if any component calls login() directly without the hook
  const login = () => {
      console.warn("Use useLogin hook for authentication.");
  };

  // -- Helper functions to mutate the cached user object --
  // In a full implementation, these would trigger individual API mutations.
  // For now, we update the React Query cache locally to maintain dashboard interactivity.

  const updateUserCache = (updater: (currentUser: User) => User) => {
      queryClient.setQueryData<User>(['user'], (oldUser) => {
          if (!oldUser) return oldUser;
          return updater(oldUser);
      });
  };

  const updateSavedIdeas = (ideas: GeneratedIdea[]) => {
    updateUserCache(user => ({ ...user, savedIdeas: ideas }));
  };

  const updatePipelineProjects = (projects: PipelineProject[]) => {
    updateUserCache(user => ({ ...user, pipelineProjects: projects }));
  };

  const promoteIdeaToPipeline = (ideaToPromote: GeneratedIdea) => {
      updateUserCache(user => {
        const newSavedIdeas = (user.savedIdeas || []).filter(idea => idea.title !== ideaToPromote.title);
        const newProject: PipelineProject = { ...ideaToPromote, status: 'Ideation' };
        const newPipelineProjects = [...(user.pipelineProjects || []), newProject];
        return { ...user, savedIdeas: newSavedIdeas, pipelineProjects: newPipelineProjects };
      });
  };

  const promoteTaskToProject = (strategyId: string, task: ImplementationItem) => {
    updateUserCache(user => {
        if (!user.strategies) return user;
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
        const newPipelineProjects = [...(user.pipelineProjects || []), newProject];
        const newStrategies = user.strategies.map(s => {
            if (s.id === strategyId && s.implementation) {
                return { ...s, implementation: s.implementation.map(t => t.id === task.id ? { ...t, relatedProjectId: task.title } : t) };
            }
            return s;
        });
        const newActivity: Activity = {
            type: 'project_access',
            title: task.title,
            link: `/dashboard/project/${encodeURIComponent(task.title)}`,
            timestamp: new Date().toISOString()
        };
        const updatedActivity = [newActivity, ...(user.recentActivity || [])].slice(0, 5);
        return { ...user, pipelineProjects: newPipelineProjects, strategies: newStrategies, recentActivity: updatedActivity };
    });
  };

  const updateProjectStatus = (projectTitle: string, newStatus: PipelineStatus) => {
    updateUserCache(user => {
        if (!user.pipelineProjects) return user;
        const updatedProjects = user.pipelineProjects.map(project => 
            project.title === projectTitle ? { ...project, status: newStatus } : project
        );
        return { ...user, pipelineProjects: updatedProjects };
    });
  };
  
  const updateProjectDetails = (projectTitle: string, details: Partial<PipelineProject>) => {
    updateUserCache(user => {
        if (!user.pipelineProjects) return user;
        const updatedProjects = user.pipelineProjects.map(project => 
            project.title === projectTitle ? { ...project, ...details } : project
        );
        return { ...user, pipelineProjects: updatedProjects };
    });
  };

  const addActivity = (activity: Omit<Activity, 'timestamp'>) => {
    updateUserCache(user => {
        const newActivity: Activity = { ...activity, timestamp: new Date().toISOString() };
        const updatedActivity = [newActivity, ...(user.recentActivity || [])].slice(0, 5);
        return { ...user, recentActivity: updatedActivity };
    });
  };

  const saveStrategy = (strategy: StrategicPlan) => {
      updateUserCache(user => {
          const existing = user.strategies || [];
          const index = existing.findIndex(s => s.id === strategy.id);
          let newStrategies;
          if (index >= 0) {
              newStrategies = existing.map(s => s.id === strategy.id ? strategy : s);
          } else {
              newStrategies = [strategy, ...existing];
          }
          return { ...user, strategies: newStrategies };
      });
  };

  const updateStrategy = (id: string, updates: Partial<StrategicPlan>) => {
      updateUserCache(user => {
          if (!user.strategies) return user;
          const newStrategies = user.strategies.map(s => 
              s.id === id ? { ...s, ...updates, updatedAt: new Date().toISOString() } : s
          );
          return { ...user, strategies: newStrategies };
      });
  };

  const deleteStrategy = (id: string) => {
    updateUserCache(user => {
        if (!user.strategies) return user;
        const newStrategies = user.strategies.filter(s => s.id !== id);
        return { ...user, strategies: newStrategies };
    });
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ 
        isAuthenticated, 
        user: user || null, // react-query returns undefined, type expects null
        isLoading, 
        isError, 
        login, 
        logout, 
        updateSavedIdeas, 
        updatePipelineProjects, 
        promoteIdeaToPipeline, 
        promoteTaskToProject, 
        updateProjectStatus, 
        updateProjectDetails, 
        addActivity, 
        saveStrategy, 
        updateStrategy, 
        deleteStrategy 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
