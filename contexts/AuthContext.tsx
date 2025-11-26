

import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import type { User, GeneratedIdea, PipelineProject, PipelineStatus, Activity, StrategicPlan, ImplementationItem, Workspace, UserRole } from '../types';
import { useUser } from '../hooks/useAuthQuery';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  isError: boolean;
  login: (userData: any) => void; 
  logout: () => void;
  
  // Workspace Management
  activeWorkspace: Workspace | null;
  availableWorkspaces: Workspace[];
  switchWorkspace: (workspaceId: string) => void;
  currentRole: UserRole; // Role in the active workspace

  // Data mutations
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
  const navigate = useNavigate();
  
  const [activeWorkspace, setActiveWorkspace] = useState<Workspace | null>(null);
  const [availableWorkspaces, setAvailableWorkspaces] = useState<Workspace[]>([]);

  // Calculate available workspaces when user loads
  useEffect(() => {
      if (user) {
          const workspaces: Workspace[] = [];
          
          // 1. Always add Personal Workspace
          workspaces.push({
              id: 'personal',
              type: 'Personal',
              name: 'Personal Workspace',
              roles: ['student'] // Default role for personal space
          });

          // 2. Add Organization Workspaces
          if (user.memberships && user.memberships.length > 0) {
              user.memberships.forEach(membership => {
                  workspaces.push({
                      id: membership.organization.id,
                      type: 'Organization',
                      name: membership.organization.name,
                      organizationId: membership.organization.id,
                      roles: membership.roles
                  });
              });
          }

          setAvailableWorkspaces(workspaces);

          // Set initial active workspace if not set
          if (!activeWorkspace) {
              // Prefer Organization if exists, else Personal
              // In a real app, we'd check localStorage for last used workspace
              const preferred = workspaces.length > 1 ? workspaces[1] : workspaces[0];
              setActiveWorkspace(preferred);
          }
      }
  }, [user]);

  const switchWorkspace = (workspaceId: string) => {
      const found = availableWorkspaces.find(w => w.id === workspaceId);
      if (found) {
          setActiveWorkspace(found);
          navigate('/dashboard'); // Reset to dashboard on switch
      }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('mock_user_role');
    localStorage.removeItem('mock_user_email');
    setActiveWorkspace(null);
    setAvailableWorkspaces([]);
    queryClient.removeQueries({ queryKey: ['user'] });
    navigate('/');
  };

  const login = () => {
      console.warn("Use useLogin hook for authentication.");
  };

  // -- Helper functions (unchanged logic, just context access) --
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
  
  // Determine effective role in current workspace
  const currentRole = activeWorkspace?.roles[0] || 'student';

  return (
    <AuthContext.Provider value={{ 
        isAuthenticated, 
        user: user || null, 
        isLoading, 
        isError, 
        login, 
        logout,
        activeWorkspace,
        availableWorkspaces,
        switchWorkspace,
        currentRole,
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
