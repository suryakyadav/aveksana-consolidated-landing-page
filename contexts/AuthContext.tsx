
import React, { useEffect, createContext, useContext, ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../store';
import { login, register, logout, fetchUser } from '../store/authSlice';
import { 
  initializeData, setActiveWorkspace, updateSavedIdeas, updatePipelineProjects,
  promoteIdeaToPipeline, promoteTaskToProject, updateProjectStatus, updateProjectDetails,
  addActivity, saveStrategy, updateStrategy, deleteStrategy, clearData
} from '../store/dataSlice';
import { UserRole, User, Workspace, GeneratedIdea, PipelineProject, PipelineStatus, Activity, StrategicPlan, ImplementationItem } from '../types';

// We maintain the interface to avoid breaking all components using useAuth
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  isError: boolean;
  login: (userData: any) => void;
  logout: () => void;
  register: (userData: any) => void; // Added for convenience

  // Workspace Management
  activeWorkspace: Workspace | null;
  availableWorkspaces: Workspace[];
  switchWorkspace: (workspaceId: string) => void;
  currentRole: UserRole;

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

// Since we are using Redux, we don't strictly need a Context Provider anymore,
// but to minimize refactoring in App.tsx, we keep a dummy provider or just export the hook.
// However, the cleanest way to bridge Redux to the existing "useAuth" pattern is this hook.

export const useAuth = (): AuthContextType => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, error } = useSelector((state: RootState) => state.auth);
  const { activeWorkspace, availableWorkspaces } = useSelector((state: RootState) => state.data);

  // Sync Data on User Load
  useEffect(() => {
    if (user) {
      dispatch(initializeData({ user }));
    }
  }, [user, dispatch]);

  // Initial Fetch if token exists but no user
  useEffect(() => {
    if (localStorage.getItem('authToken') && !user && !isLoading) {
       dispatch(fetchUser());
    }
  }, [dispatch]); // Removed user/isLoading dep to prevent loops, relying on mount

  const handleLogin = async (userData: any) => {
    const result = await dispatch(login(userData));
    if (login.fulfilled.match(result)) {
        navigate('/dashboard');
    }
  };

  const handleRegister = async (userData: any) => {
      const result = await dispatch(register(userData));
      if (register.fulfilled.match(result)) {
          navigate('/dashboard');
      }
  }

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearData());
    navigate('/');
  };

  const currentRole = activeWorkspace?.roles[0] || UserRole.STUDENT;

  // Map Redux actions to the Context interface expected by components
  return {
    isAuthenticated,
    user,
    isLoading,
    isError: !!error,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    
    activeWorkspace,
    availableWorkspaces,
    switchWorkspace: (id) => dispatch(setActiveWorkspace(id)),
    currentRole,

    updateSavedIdeas: (ideas) => dispatch(updateSavedIdeas(ideas)),
    updatePipelineProjects: (projects) => dispatch(updatePipelineProjects(projects)),
    promoteIdeaToPipeline: (idea) => dispatch(promoteIdeaToPipeline(idea)),
    promoteTaskToProject: (strategyId, task) => dispatch(promoteTaskToProject({ strategyId, task })),
    updateProjectStatus: (title, status) => dispatch(updateProjectStatus({ title, status })),
    updateProjectDetails: (title, details) => dispatch(updateProjectDetails({ title, details })),
    addActivity: (activity) => dispatch(addActivity(activity)),
    saveStrategy: (strategy) => dispatch(saveStrategy(strategy)),
    updateStrategy: (id, updates) => dispatch(updateStrategy({ id, updates })),
    deleteStrategy: (id) => dispatch(deleteStrategy(id)),
  };
};

// Dummy Provider for App.tsx compatibility if needed, though mostly unused now
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <>{children}</>;
};
