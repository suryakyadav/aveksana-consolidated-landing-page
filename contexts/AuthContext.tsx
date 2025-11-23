
import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { User, GeneratedIdea, PipelineProject, PipelineStatus, Activity, StrategicPlan } from '../types';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  updateSavedIdeas: (ideas: GeneratedIdea[]) => void;
  updatePipelineProjects: (projects: PipelineProject[]) => void;
  promoteIdeaToPipeline: (idea: GeneratedIdea) => void;
  updateProjectStatus: (projectTitle: string, newStatus: PipelineStatus) => void;
  updateProjectDetails: (projectTitle: string, details: Partial<PipelineProject>) => void;
  addActivity: (activity: Omit<Activity, 'timestamp'>) => void;
  saveStrategy: (strategy: StrategicPlan) => void;
  updateStrategy: (id: string, updates: Partial<StrategicPlan>) => void;
  deleteStrategy: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    const userWithData = {
        ...userData,
        savedIdeas: userData.savedIdeas || [],
        pipelineProjects: userData.pipelineProjects || [],
        recentActivity: userData.recentActivity || [],
        strategies: userData.strategies || [],
    };
    setIsAuthenticated(true);
    setUser(userWithData);
  };
  
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const updateSavedIdeas = (ideas: GeneratedIdea[]) => {
    setUser(currentUser => {
        if (!currentUser) return null;
        return { ...currentUser, savedIdeas: ideas };
    });
  };

  const updatePipelineProjects = (projects: PipelineProject[]) => {
    setUser(currentUser => {
        if (!currentUser) return null;
        return { ...currentUser, pipelineProjects: projects };
    });
  };

  const promoteIdeaToPipeline = (ideaToPromote: GeneratedIdea) => {
      setUser(currentUser => {
        if (!currentUser) return null;
        
        // Remove from saved ideas
        const newSavedIdeas = (currentUser.savedIdeas || []).filter(idea => idea.title !== ideaToPromote.title);
        
        // Add to pipeline projects with 'Ideation' status
        const newProject: PipelineProject = { ...ideaToPromote, status: 'Ideation' };
        const newPipelineProjects = [...(currentUser.pipelineProjects || []), newProject];

        return {
            ...currentUser,
            savedIdeas: newSavedIdeas,
            pipelineProjects: newPipelineProjects
        };
      });
  };

  const updateProjectStatus = (projectTitle: string, newStatus: PipelineStatus) => {
    setUser(currentUser => {
        if (!currentUser || !currentUser.pipelineProjects) return currentUser;

        const updatedProjects = currentUser.pipelineProjects.map(project => 
            project.title === projectTitle ? { ...project, status: newStatus } : project
        );

        return {
            ...currentUser,
            pipelineProjects: updatedProjects
        };
    });
  };
  
  const updateProjectDetails = (projectTitle: string, details: Partial<PipelineProject>) => {
    setUser(currentUser => {
        if (!currentUser || !currentUser.pipelineProjects) return currentUser;

        const updatedProjects = currentUser.pipelineProjects.map(project => 
            project.title === projectTitle ? { ...project, ...details } : project
        );
        
        return {
            ...currentUser,
            pipelineProjects: updatedProjects
        };
    });
  };

  const addActivity = (activity: Omit<Activity, 'timestamp'>) => {
    setUser(currentUser => {
        if (!currentUser) return null;
        const newActivity: Activity = {
            ...activity,
            timestamp: new Date().toISOString(),
        };
        // Add new activity and keep the list to a max of 5 items
        const updatedActivity = [newActivity, ...(currentUser.recentActivity || [])].slice(0, 5);
        return { ...currentUser, recentActivity: updatedActivity };
    });
  };

  const saveStrategy = (strategy: StrategicPlan) => {
      setUser(currentUser => {
          if (!currentUser) return null;
          const existing = currentUser.strategies || [];
          const index = existing.findIndex(s => s.id === strategy.id);
          let newStrategies;
          if (index >= 0) {
              newStrategies = existing.map(s => s.id === strategy.id ? strategy : s);
          } else {
              newStrategies = [strategy, ...existing]; // Add to top
          }
          return { ...currentUser, strategies: newStrategies };
      });
  };

  const updateStrategy = (id: string, updates: Partial<StrategicPlan>) => {
      setUser(currentUser => {
          if (!currentUser || !currentUser.strategies) return currentUser;
          const newStrategies = currentUser.strategies.map(s => 
              s.id === id ? { ...s, ...updates, updatedAt: new Date().toISOString() } : s
          );
          return { ...currentUser, strategies: newStrategies };
      });
  };

  const deleteStrategy = (id: string) => {
    setUser(currentUser => {
        if (!currentUser || !currentUser.strategies) return currentUser;
        const newStrategies = currentUser.strategies.filter(s => s.id !== id);
        return { ...currentUser, strategies: newStrategies };
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, updateSavedIdeas, updatePipelineProjects, promoteIdeaToPipeline, updateProjectStatus, updateProjectDetails, addActivity, saveStrategy, updateStrategy, deleteStrategy }}>
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
