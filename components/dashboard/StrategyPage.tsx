

import React, { useState, useEffect, useRef } from 'react';
import { generateProblemStatement, generateTeamCritique, generateImplementationPlan, generateStrategicPriorities } from '../../services/geminiService';
import { Link, useNavigate } from 'react-router-dom';
import { type ProblemStatement, type StrategicPlan, type ChatMessage, type ImplementationItem, type PriorityItem, UserRole } from '../../types';
import { ChatBubbleLeftRightIcon, PaperAirplaneIcon, UsersIcon, PlusIcon, TrashIcon, LockClosedIcon, DocumentIcon, TargetIcon, UserGroupIcon, ClockIcon, ArrowLeftIcon, ClipboardDocumentCheckIcon, UserPlusIcon, FlagIcon, PresentationChartLineIcon, MegaphoneIcon, AdjustmentsIcon, CalendarIcon, RDPortalIcon } from '../icons';
import { useAuth } from '../../contexts/AuthContext';

// Mock Researchers for Assignment
const RESEARCHERS = [
    { id: 'r1', name: 'Dr. Emily Wong', role: 'Senior Materials Scientist' },
    { id: 'r2', name: 'James Miller', role: 'AI Specialist' },
    { id: 'r3', name: 'Sarah Jenkins', role: 'Bio-informatics Researcher' },
    { id: 'r4', name: 'David Chen', role: 'Data Engineer' },
    { id: 'r5', name: 'Dr. Olivia Green', role: 'Quantum Physicist' },
];

const PriorityEditorModal = ({ isOpen, onClose, priority, onSave }: { isOpen: boolean, onClose: () => void, priority: PriorityItem | null, onSave: (p: PriorityItem) => void }) => {
    const [formData, setFormData] = useState<PriorityItem>({
        id: '',
        title: '',
        description: '',
        horizon: '',
        strategicPillar: '',
        status: 'draft'
    });

    useEffect(() => {
        if (priority) {
            setFormData(priority);
        } else {
            setFormData({
                id: '',
                title: '',
                description: '',
                horizon: '',
                strategicPillar: '',
                status: 'draft'
            });
        }
    }, [priority, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-brand-light-grey flex justify-between items-center">
                    <h3 className="font-bold text-xl text-brand-dark-teal">{priority ? 'Edit Priority' : 'Add New Priority'}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-brand-dark-grey mb-1">Title</label>
                        <input 
                            type="text" 
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-medium-teal outline-none"
                            value={formData.title}
                            onChange={e => setFormData({...formData, title: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-brand-dark-grey mb-1">Description</label>
                        <textarea 
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-medium-teal outline-none min-h-[80px]"
                            value={formData.description}
                            onChange={e => setFormData({...formData, description: e.target.value})}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-brand-dark-grey mb-1">Horizon</label>
                            <input 
                                type="text" 
                                required
                                placeholder="e.g. 12 months"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-medium-teal outline-none"
                                value={formData.horizon}
                                onChange={e => setFormData({...formData, horizon: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-brand-dark-grey mb-1">Strategic Pillar</label>
                            <input 
                                type="text" 
                                required
                                placeholder="e.g. Innovation"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-medium-teal outline-none"
                                value={formData.strategicPillar}
                                onChange={e => setFormData({...formData, strategicPillar: e.target.value})}
                            />
                        </div>
                    </div>
                    <div>
                         <label className="block text-sm font-medium text-brand-dark-grey mb-1">Status</label>
                         <select 
                            value={formData.status}
                            onChange={e => setFormData({...formData, status: e.target.value as 'draft' | 'published'})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-medium-teal outline-none"
                         >
                             <option value="draft">Draft</option>
                             <option value="published">Published</option>
                         </select>
                    </div>
                    <div className="pt-4 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-brand-dark-grey hover:bg-gray-100 rounded-md">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-brand-medium-teal text-white rounded-md hover:bg-brand-teal font-semibold">Save Priority</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const StrategyPage = () => {
  const { user, saveStrategy, updateStrategy, deleteStrategy, promoteTaskToProject } = useAuth();
  const strategies = user?.strategies || [];
  const navigate = useNavigate();
  
  // State for the active view
  const [viewMode, setViewMode] = useState<'list' | 'editor'>('list');
  const [activeTab, setActiveTab] = useState<'definition' | 'priorities' | 'implementation'>('definition');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [statement, setStatement] = useState<ProblemStatement>({
    context: '',
    coreProblem: '',
    constraints: '',
    desiredOutcomes: '',
    evaluationCriteria: '',
    stakeholders: '',
  });
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  
  // Priorities State
  const [priorities, setPriorities] = useState<PriorityItem[]>([]);
  const [isPrioritiesLoading, setIsPrioritiesLoading] = useState(false);
  const [editingPriority, setEditingPriority] = useState<PriorityItem | null>(null);
  const [isPriorityModalOpen, setIsPriorityModalOpen] = useState(false);

  // Implementation Plan State
  const [implementationPlan, setImplementationPlan] = useState<ImplementationItem[]>([]);
  const [isPlanLoading, setIsPlanLoading] = useState(false);

  // UI State
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sharing & Sparring State
  const [isShared, setIsShared] = useState(false);
  const [sharedWith, setSharedWith] = useState<{name: string, role: string}[]>([]);
  const [comments, setComments] = useState<ChatMessage[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSparringLoading, setIsSparringLoading] = useState(false);

  // Load selected strategy data when ID changes or mode switches to editor
  useEffect(() => {
    window.scrollTo(0, 0);
    if (viewMode === 'editor') {
        if (selectedId === 'new') {
            resetForm();
        } else if (selectedId) {
            const strat = strategies.find(s => s.id === selectedId);
            if (strat) {
                setTitle(strat.title);
                setStatement(strat.statement);
                setIsShared(strat.isShared);
                setSharedWith(strat.sharedWith);
                setComments(strat.discussion);
                setPriorities(strat.priorities || []);
                setImplementationPlan(strat.implementation || []);
                setStatus(strat.status || 'draft');
                setDescription(''); // Clear description on load
                setError(null);
                setIsSaved(true);
            }
        }
    }
  }, [selectedId, viewMode, strategies]);

  const resetForm = () => {
      setTitle('New Strategic Plan');
      setStatement({
        context: '',
        coreProblem: '',
        constraints: '',
        desiredOutcomes: '',
        evaluationCriteria: '',
        stakeholders: '',
      });
      setPriorities([]);
      setImplementationPlan([]);
      setDescription('');
      setIsShared(false);
      setSharedWith([]);
      setComments([]);
      setIsSaved(false);
      setError(null);
      setStatus('draft');
      setActiveTab('definition');
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
        setError("Please enter a brief description of your situation.");
        return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const generated = await generateProblemStatement(description);
      setStatement(generated);
      setIsSaved(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStatement(prev => ({ ...prev, [name]: value }));
    setIsSaved(false);
  };

  const handleSave = () => {
      const now = new Date().toISOString();
      if (selectedId === 'new' || !selectedId) {
          const newId = `strat-${Date.now()}`;
          const newStrategy: StrategicPlan = {
              id: newId,
              title: title || 'Untitled Strategy',
              createdAt: now,
              updatedAt: now,
              statement,
              isShared,
              sharedWith,
              discussion: comments,
              priorities,
              implementation: implementationPlan,
              status
          };
          saveStrategy(newStrategy);
          setSelectedId(newId);
      } else {
          updateStrategy(selectedId, {
              title,
              statement,
              isShared,
              sharedWith,
              discussion: comments,
              priorities,
              implementation: implementationPlan,
              status
          });
      }
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
  };

  const isDefinitionComplete = () => {
      return !!(statement?.coreProblem && statement?.desiredOutcomes && statement.coreProblem.length > 5);
  };

  const handlePublish = () => {
    if (!isDefinitionComplete()) {
        setError("You cannot publish an incomplete strategy. Please fill out the 'The Core Problem' and 'Desired Outcomes' fields in the Strategy Definition tab.");
        window.scrollTo(0, 0);
        return;
    }
    
    if (window.confirm("Are you sure you want to publish this strategy? This will make it the official direction for the team and share it with relevant stakeholders.")) {
        setStatus('published');
        // Update immediately if it exists
        if (selectedId && selectedId !== 'new') {
            updateStrategy(selectedId, { status: 'published', isShared: true });
            setIsShared(true);
        } else {
             // Save new as published
             const now = new Date().toISOString();
             const newId = `strat-${Date.now()}`;
             const newStrategy: StrategicPlan = {
                  id: newId,
                  title: title || 'Untitled Strategy',
                  createdAt: now,
                  updatedAt: now,
                  statement,
                  isShared: true,
                  sharedWith,
                  discussion: comments,
                  priorities,
                  implementation: implementationPlan,
                  status: 'published'
              };
              saveStrategy(newStrategy);
              setSelectedId(newId);
              setIsShared(true);
        }
        alert("Strategy Published Successfully!");
    }
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
      e.stopPropagation();
      if (window.confirm("Are you sure you want to delete this strategy?")) {
          deleteStrategy(id);
          if (selectedId === id) {
             setViewMode('list');
             setSelectedId(null);
          }
      }
  };

  const handleShare = async () => {
    setIsShared(true);
    // Mock sharing with some leads
    const newShares = [
        { name: 'Sarah Chen', role: 'VP Engineering' },
        { name: 'Michael Ross', role: 'Product Lead' }
    ];
    setSharedWith(newShares);

    // If no comments yet, generate initial critiques
    if (comments.length === 0) {
        setIsSparringLoading(true);
        try {
            const critiques = await generateTeamCritique(statement);
            const newComments = critiques.map((c, i) => ({
                id: `ai-${Date.now()}-${i}`,
                name: c.name,
                role: c.role,
                message: c.message,
                isUser: false,
                timestamp: 'Just now'
            }));
            
            // Update local state
            setComments(newComments);
            
            // Persist immediately if not new
            if (selectedId !== 'new' && selectedId) {
                 updateStrategy(selectedId, { isShared: true, sharedWith: newShares, discussion: newComments });
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsSparringLoading(false);
        }
    } else {
         if (selectedId !== 'new' && selectedId) {
             updateStrategy(selectedId, { isShared: true, sharedWith: newShares });
        }
    }
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    const commentObj: ChatMessage = {
        id: `user-${Date.now()}`,
        name: user?.name || 'You',
        role: 'Head of R&D',
        message: newComment,
        isUser: true,
        timestamp: 'Just now'
    };

    const updatedComments = [...comments, commentObj];
    setComments(updatedComments);
    setNewComment('');

    if (selectedId !== 'new' && selectedId) {
        updateStrategy(selectedId, { discussion: updatedComments });
    }
  };

  const handleGeneratePriorities = async () => {
    if (!isDefinitionComplete()) {
        setError("Please complete the Problem Statement in the 'Strategy Definition' tab first. The AI needs this context to generate priorities.");
        window.scrollTo(0, 0);
        return;
    }
    
    setIsPrioritiesLoading(true);
    setError(null);
    try {
        const generatedPriorities = await generateStrategicPriorities(statement);
        setPriorities(generatedPriorities);
        setIsSaved(false);
        if (selectedId !== 'new' && selectedId) {
             updateStrategy(selectedId, { priorities: generatedPriorities });
             setIsSaved(true);
        }
    } catch (err) {
        console.error(err);
        setError("Failed to generate strategic priorities.");
    } finally {
        setIsPrioritiesLoading(false);
    }
  };

  const handleSavePriority = (priority: PriorityItem) => {
      let updatedList;
      if (priority.id) {
          updatedList = priorities.map(p => p.id === priority.id ? priority : p);
      } else {
          updatedList = [...priorities, { ...priority, id: `p-${Date.now()}` }];
      }
      setPriorities(updatedList);
      setIsSaved(false);
      if (selectedId !== 'new' && selectedId) {
          updateStrategy(selectedId, { priorities: updatedList });
          setIsSaved(true);
      }
  };

  const handleAddPriority = () => {
      setEditingPriority(null);
      setIsPriorityModalOpen(true);
  };

  const handleEditPriority = (priority: PriorityItem) => {
      setEditingPriority(priority);
      setIsPriorityModalOpen(true);
  };

  const handlePublishPriorities = () => {
      if (window.confirm("Publish all pending priorities?")) {
          const updatedList = priorities.map(p => ({ ...p, status: 'published' as const }));
          setPriorities(updatedList);
          setIsSaved(false);
          if (selectedId !== 'new' && selectedId) {
            updateStrategy(selectedId, { priorities: updatedList });
            setIsSaved(true);
          }
      }
  };

  const handleGeneratePlan = async () => {
      if (!isDefinitionComplete()) {
        setError("Please complete the Problem Statement first.");
        window.scrollTo(0, 0);
        return;
      }

      setIsPlanLoading(true);
      setError(null);
      try {
          const plan = await generateImplementationPlan(statement, priorities);
          setImplementationPlan(plan);
          setIsSaved(false);
          // Auto-save the plan
           if (selectedId !== 'new' && selectedId) {
                updateStrategy(selectedId, { implementation: plan });
                setIsSaved(true);
           }
      } catch (err) {
          console.error(err);
          setError("Failed to generate implementation plan.");
      } finally {
          setIsPlanLoading(false);
      }
  };
  
  const handleAssign = (taskId: string, researcherName: string) => {
      const updatedPlan = implementationPlan.map(item => 
          item.id === taskId ? { ...item, assignee: researcherName, status: 'in_progress' as const } : item
      );
      setImplementationPlan(updatedPlan);
      setIsSaved(false);
      if (selectedId !== 'new' && selectedId) {
          updateStrategy(selectedId, { implementation: updatedPlan });
      }
  };

  const handleDueDateChange = (taskId: string, date: string) => {
    const updatedPlan = implementationPlan.map(item =>
        item.id === taskId ? { ...item, dueDate: date } : item
    );
    setImplementationPlan(updatedPlan);
    setIsSaved(false);
    if (selectedId !== 'new' && selectedId) {
        updateStrategy(selectedId, { implementation: updatedPlan });
    }
  };

  const handlePromoteToPipeline = (task: ImplementationItem) => {
    if (!selectedId || selectedId === 'new') {
        alert("Please save the strategy first.");
        return;
    }
    if (task.relatedProjectId) {
        navigate(`/dashboard/project/${encodeURIComponent(task.relatedProjectId)}`);
    } else {
        if (window.confirm(`Are you sure you want to promote "${task.title}" to a pipeline project?`)) {
            promoteTaskToProject(selectedId, task);
        }
    }
  };

  const handleCreateNew = () => {
      setSelectedId('new');
      setViewMode('editor');
  };

  const handleSelectStrategy = (id: string) => {
      setSelectedId(id);
      setViewMode('editor');
  };
  
  const handleBack = () => {
      setViewMode('list');
      setSelectedId(null);
  };

  // Group Priorities by Theme
  const groupedPriorities = priorities.reduce((acc, priority) => {
      const theme = priority.strategicPillar || 'Other';
      if (!acc[theme]) acc[theme] = [];
      acc[theme].push(priority);
      return acc;
  }, {} as Record<string, PriorityItem[]>);

  // Group Tasks by Priority
  const groupedTasks = implementationPlan.reduce((acc, task) => {
      let key = 'General / Uncategorized';
      if (task.relatedPriorityId) {
          const priority = priorities.find(p => p.id === task.relatedPriorityId);
          if (priority) {
              key = priority.title;
          }
      }
      if (!acc[key]) acc[key] = [];
      acc[key].push(task);
      return acc;
  }, {} as Record<string, ImplementationItem[]>);

  const hasDraftPriorities = priorities.some(p => p.status === 'draft');

  const inputClasses = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-medium-teal focus:border-transparent outline-none transition bg-white min-h-[120px]";

  // LIST VIEW
  if (viewMode === 'list') {
      return (
        <main className="py-12 bg-brand-light-gray-blue min-h-[calc(100vh-200px)]">
            <div className="container mx-auto px-6 max-w-7xl">
                <header className="mb-8">
                    <Link to="/dashboard" className="text-brand-grey hover:text-brand-medium-teal transition-colors mb-4 block">
                        &larr; Back to Dashboard
                    </Link>
                    <div className="flex justify-between items-end">
                        <div>
                            <h1 className="text-4xl font-bold text-brand-dark-teal">R&D Strategy Hub</h1>
                            <p className="mt-2 text-lg text-brand-dark-grey">Create, manage, and refine your department's strategic direction.</p>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                     {/* Create New Card */}
                     <div 
                        onClick={handleCreateNew}
                        className="bg-brand-medium-teal rounded-xl shadow-lg cursor-pointer transform hover:scale-[1.02] transition-all p-8 flex flex-col items-center justify-center text-center group h-full min-h-[250px]"
                     >
                         <div className="bg-white/20 p-4 rounded-full mb-6 group-hover:bg-white/30 transition-colors">
                            <PlusIcon />
                         </div>
                         <h3 className="text-2xl font-bold text-white">Create New Strategy</h3>
                         <p className="text-brand-light-gray-blue mt-2">Use AI to draft a structured problem statement.</p>
                     </div>

                     {/* Info / Promo Card (Placeholder for stats or tips) */}
                     <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-brand-light-grey p-8 flex flex-col justify-center">
                        <div className="flex items-start gap-4">
                            <div className="bg-brand-light-gray-blue p-3 rounded-lg text-brand-dark-teal hidden sm:block">
                                <TargetIcon />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-brand-dark-teal">Why define a Problem Statement?</h3>
                                <p className="text-brand-dark-grey mt-2">
                                    A clear, neutral problem statement aligns your team on the "why" before jumping to the "how". 
                                    Use the AI assistant to draft a rigorous statement based on your brief description, then spar with virtual stakeholders to refine it.
                                </p>
                            </div>
                        </div>
                     </div>
                </div>

                <div className="border-t border-brand-light-grey pt-8">
                    <h2 className="text-2xl font-bold text-brand-dark-teal mb-6 flex items-center gap-2">
                        <DocumentIcon /> Saved Strategies
                    </h2>
                    
                    {strategies.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-sm border border-brand-light-grey p-12 text-center text-brand-grey">
                            <p className="text-lg">No saved strategies found.</p>
                            <button onClick={handleCreateNew} className="text-brand-medium-teal font-semibold hover:underline mt-2">Create your first one &rarr;</button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {strategies.map(strat => (
                                <div 
                                    key={strat.id}
                                    onClick={() => handleSelectStrategy(strat.id)}
                                    className="bg-white rounded-xl shadow-sm border border-brand-light-grey p-6 cursor-pointer hover:shadow-md hover:border-brand-medium-teal transition-all relative group"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-2">
                                            <div className="bg-brand-light-gray-blue text-brand-dark-teal p-2 rounded-lg">
                                                <TargetIcon />
                                            </div>
                                            {strat.status === 'published' ? (
                                                <span className="flex items-center gap-1 text-xs font-bold text-white bg-green-600 px-2 py-1 rounded-full">
                                                    Published
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1 text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                                    Draft
                                                </span>
                                            )}
                                        </div>
                                        {strat.isShared ? (
                                            <span className="flex items-center gap-1 text-xs font-bold text-brand-medium-teal bg-brand-light-gray-blue px-2 py-1 rounded-full">
                                                <UserGroupIcon /> Shared
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1 text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                                                <LockClosedIcon /> Private
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-bold text-brand-dark-teal mb-2 line-clamp-2">{strat.title}</h3>
                                    <div className="flex items-center text-xs text-brand-grey mt-4 gap-4">
                                        <span className="flex items-center gap-1">
                                            <ClockIcon /> {new Date(strat.updatedAt).toLocaleDateString()}
                                        </span>
                                        {strat.discussion.length > 0 && (
                                            <span className="flex items-center gap-1">
                                                <ChatBubbleLeftRightIcon /> {strat.discussion.length} comments
                                            </span>
                                        )}
                                    </div>
                                    <button 
                                        onClick={(e) => handleDelete(e, strat.id)}
                                        className="absolute top-4 right-4 p-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                        title="Delete Strategy"
                                    >
                                        <TrashIcon />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
      );
  }

  // EDITOR VIEW
  return (
    <main className="py-12 bg-brand-light-gray-blue min-h-[calc(100vh-200px)]">
      <PriorityEditorModal 
        isOpen={isPriorityModalOpen} 
        onClose={() => setIsPriorityModalOpen(false)} 
        priority={editingPriority} 
        onSave={handleSavePriority} 
      />
      <div className="container mx-auto px-6 max-w-7xl">
        <header className="mb-6">
            <button onClick={handleBack} className="flex items-center gap-2 text-brand-grey hover:text-brand-medium-teal transition-colors font-semibold mb-4">
                <ArrowLeftIcon /> Back to Strategies
            </button>
        </header>

        {/* Header / Title Editor */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-brand-light-grey flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-8">
            <div className="flex-grow w-full md:w-auto">
                <label className="block text-xs font-bold text-brand-grey uppercase tracking-wider mb-1">Strategy Title</label>
                <div className="flex items-center gap-3">
                    <input 
                        type="text" 
                        value={title}
                        onChange={(e) => { setTitle(e.target.value); setIsSaved(false); }}
                        className="w-full text-3xl font-bold text-brand-dark-teal border-b border-transparent focus:border-brand-medium-teal focus:outline-none hover:border-gray-200 transition-colors bg-transparent placeholder-gray-300"
                        placeholder="Untitled Strategy"
                    />
                     {status === 'published' && (
                        <span className="flex-shrink-0 flex items-center gap-1 text-xs font-bold text-white bg-green-600 px-3 py-1 rounded-full uppercase tracking-wide">
                            Published
                        </span>
                    )}
                </div>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                {isShared ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-brand-medium-teal bg-brand-light-gray-blue px-3 py-1 rounded-full">
                        <UsersIcon /> Shared
                    </span>
                ) : (
                    <span className="flex items-center gap-1 text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        <LockClosedIcon /> Private
                    </span>
                )}
                 {(user?.role === UserRole.ADMIN || user?.role === UserRole.TEAM_LEAD) && status !== 'published' && (
                    <button
                        onClick={handlePublish}
                        className="px-4 py-2 rounded-lg font-semibold shadow-sm transition-all bg-brand-seafoam text-brand-dark-teal hover:opacity-90 flex items-center gap-2"
                    >
                        <MegaphoneIcon /> Publish
                    </button>
                )}
                <button 
                    onClick={handleSave}
                    className={`px-6 py-2 rounded-lg font-semibold shadow-sm transition-all ${isSaved ? 'bg-green-100 text-green-700' : 'bg-brand-medium-teal text-white hover:bg-brand-teal'}`}
                >
                    {isSaved ? 'Saved' : 'Save Changes'}
                </button>
            </div>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-300 mb-8 overflow-x-auto">
            <button
                onClick={() => setActiveTab('definition')}
                className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm transition-colors border-b-2 whitespace-nowrap ${
                    activeTab === 'definition'
                        ? 'border-brand-medium-teal text-brand-medium-teal'
                        : 'border-transparent text-gray-500 hover:text-brand-dark-teal'
                }`}
            >
                <TargetIcon /> Strategy Definition
            </button>
            <button
                onClick={() => setActiveTab('priorities')}
                className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm transition-colors border-b-2 whitespace-nowrap ${
                    activeTab === 'priorities'
                        ? 'border-brand-medium-teal text-brand-medium-teal'
                        : 'border-transparent text-gray-500 hover:text-brand-dark-teal'
                }`}
            >
                <FlagIcon /> Long-Term Priorities
            </button>
            <button
                onClick={() => setActiveTab('implementation')}
                className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm transition-colors border-b-2 whitespace-nowrap ${
                    activeTab === 'implementation'
                        ? 'border-brand-medium-teal text-brand-medium-teal'
                        : 'border-transparent text-gray-500 hover:text-brand-dark-teal'
                }`}
            >
                <ClipboardDocumentCheckIcon /> Implementation Plan
            </button>
        </div>


        {/* AI Helper for New Strategies (Only in Definition Tab) */}
        {activeTab === 'definition' && selectedId === 'new' && !statement.context && (
            <div className="bg-brand-off-white p-8 rounded-xl shadow-lg border border-brand-light-grey mb-8">
                <h2 className="text-xl font-bold text-brand-dark-teal mb-4">Start with AI Draft</h2>
                <p className="text-brand-dark-grey mb-4">Describe your current situation, challenges, or goals briefly. The AI will structure it into a formal problem statement for you.</p>
                <form onSubmit={handleGenerate}>
                    <textarea 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="e.g. We are facing delays in product delivery because our testing phase is too manual, and we need to speed it up without increasing headcount."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-medium-teal focus:border-transparent outline-none transition bg-white min-h-[80px] mb-4"
                    ></textarea>
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="bg-brand-medium-teal text-white font-semibold px-6 py-2.5 rounded-lg shadow-md hover:bg-brand-teal disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                        {isLoading ? 'Generating Draft...' : 'Generate Draft'}
                    </button>
                    {error && <p className="mt-4 text-red-600">{error}</p>}
                </form>
            </div>
        )}
        
        {/* Global Error Message */}
        {error && (
             <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg border border-red-200">
                {error}
             </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            
            {/* Left Content Area (Changes based on Tab) */}
            <div className="xl:col-span-2 space-y-6">
                
                {activeTab === 'definition' && (
                    <div className="bg-white p-8 rounded-xl shadow-lg border border-brand-light-grey">
                        <div className="flex items-center gap-2 mb-6 border-b border-brand-light-grey pb-4">
                            <DocumentIcon />
                            <h2 className="text-xl font-bold text-brand-dark-teal">Problem Statement</h2>
                        </div>
                        
                        <div className="space-y-8">
                            {[
                                { key: 'context', label: '1. Context (Why this matters)' },
                                { key: 'coreProblem', label: '2. The Core Problem' },
                                { key: 'constraints', label: '3. Constraints' },
                                { key: 'desiredOutcomes', label: '4. Desired Outcomes' },
                                { key: 'evaluationCriteria', label: '5. Evaluation Criteria' },
                                { key: 'stakeholders', label: '6. Stakeholders' },
                            ].map((field) => (
                                <div key={field.key}>
                                    <h3 className="font-bold text-brand-dark-teal text-sm mb-2">{field.label}</h3>
                                    <textarea 
                                        name={field.key} 
                                        value={(statement as any)[field.key]} 
                                        onChange={handleChange} 
                                        className={`${inputClasses} text-sm`} 
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'priorities' && (
                    <div className="bg-white p-8 rounded-xl shadow-lg border border-brand-light-grey">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-brand-light-grey pb-4">
                             <div className="flex items-center gap-2">
                                <FlagIcon />
                                <h2 className="text-xl font-bold text-brand-dark-teal">Strategic Horizon (12-24 Months)</h2>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap">
                                 {hasDraftPriorities && (
                                     <button
                                        onClick={handlePublishPriorities}
                                        className="bg-brand-seafoam text-brand-dark-teal font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-colors text-sm flex items-center gap-2"
                                    >
                                        <MegaphoneIcon /> Publish Priorities
                                    </button>
                                 )}
                                <button
                                    onClick={handleAddPriority}
                                    className="bg-white border border-brand-light-grey text-brand-dark-teal font-semibold px-4 py-2 rounded-lg hover:border-brand-medium-teal transition-colors text-sm flex items-center gap-2"
                                >
                                    <PlusIcon /> Add Priority
                                </button>
                                {(user?.role === UserRole.ADMIN || user?.role === UserRole.TEAM_LEAD) && isDefinitionComplete() && (
                                    <button
                                        onClick={handleGeneratePriorities}
                                        disabled={isPrioritiesLoading}
                                        className="bg-brand-light-gray-blue text-brand-medium-teal font-semibold px-4 py-2 rounded-lg hover:bg-brand-medium-teal hover:text-white transition-colors disabled:opacity-50 text-sm"
                                    >
                                        {isPrioritiesLoading ? 'Generating...' : priorities.length > 0 ? 'Regenerate AI' : 'Generate with AI'}
                                    </button>
                                )}
                            </div>
                        </div>
                        
                        {!isDefinitionComplete() ? (
                             <div className="text-center py-16 text-brand-dark-grey bg-brand-light-gray-blue/20 rounded-lg border-2 border-dashed border-brand-light-grey">
                                <h3 className="font-bold text-lg mb-2 text-red-600">Strategy Definition Required</h3>
                                <p className="mb-6 max-w-md mx-auto">
                                    You must complete the Problem Statement in the 'Strategy Definition' tab before you can generate long-term priorities.
                                </p>
                                <button
                                    onClick={() => setActiveTab('definition')}
                                    className="bg-brand-medium-teal text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-brand-teal transition-colors"
                                >
                                    Go to Definition
                                </button>
                            </div>
                        ) : priorities.length === 0 ? (
                            <div className="text-center py-16 text-brand-dark-grey bg-brand-light-gray-blue/20 rounded-lg border-2 border-dashed border-brand-light-grey">
                                <h3 className="font-bold text-lg mb-2">No Strategic Priorities Defined</h3>
                                <p className="mb-6 max-w-md mx-auto">
                                    Define the long-term focus areas for your team to ensure alignment on 12-24 month goals.
                                </p>
                                <div className="flex justify-center gap-4">
                                     <button
                                        onClick={handleAddPriority}
                                        className="bg-white border border-brand-grey text-brand-dark-grey font-semibold px-6 py-3 rounded-lg hover:border-brand-dark-teal transition-colors"
                                    >
                                        Add Manually
                                    </button>
                                    <button
                                        onClick={handleGeneratePriorities}
                                        disabled={isPrioritiesLoading}
                                        className="bg-brand-medium-teal text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-brand-teal transition-colors disabled:bg-gray-400"
                                    >
                                        {isPrioritiesLoading ? 'Thinking...' : 'Generate with AI'}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                {(Object.entries(groupedPriorities) as [string, PriorityItem[]][]).map(([pillar, items]) => (
                                    <div key={pillar}>
                                        <h3 className="text-md font-bold text-brand-grey uppercase tracking-wider mb-4 border-b border-brand-light-grey pb-2">{pillar}</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {items.map((priority) => (
                                                <div key={priority.id} className="bg-brand-off-white border border-brand-light-grey rounded-lg p-5 hover:border-brand-medium-teal transition-all flex flex-col relative group">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${priority.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                                                            {priority.status === 'published' ? 'Published' : 'Draft'}
                                                        </span>
                                                        <span className="text-xs bg-brand-light-gray-blue text-brand-dark-teal px-2 py-1 rounded-full font-semibold">{priority.horizon}</span>
                                                    </div>
                                                    <h3 className="text-lg font-bold text-brand-dark-teal mb-2">{priority.title}</h3>
                                                    <p className="text-sm text-brand-dark-grey flex-grow">{priority.description}</p>
                                                    
                                                    <div className="mt-4 pt-4 border-t border-brand-light-grey flex justify-end">
                                                         <button 
                                                            onClick={() => handleEditPriority(priority)}
                                                            className="text-xs font-bold text-brand-medium-teal hover:underline flex items-center gap-1"
                                                         >
                                                             <AdjustmentsIcon /> Edit
                                                         </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'implementation' && (
                    <div className="bg-white p-8 rounded-xl shadow-lg border border-brand-light-grey">
                        <div className="flex items-center justify-between gap-2 mb-6 border-b border-brand-light-grey pb-4">
                            <div className="flex items-center gap-2">
                                <ClipboardDocumentCheckIcon />
                                <h2 className="text-xl font-bold text-brand-dark-teal">Implementation Plan</h2>
                            </div>
                            {(user?.role === UserRole.ADMIN || user?.role === UserRole.TEAM_LEAD) && isDefinitionComplete() && (
                                <button
                                    onClick={handleGeneratePlan}
                                    disabled={isPlanLoading}
                                    className="text-sm bg-brand-light-gray-blue text-brand-medium-teal font-semibold px-4 py-2 rounded-lg hover:bg-brand-medium-teal hover:text-white transition-colors disabled:opacity-50"
                                >
                                    {isPlanLoading ? 'Generating...' : implementationPlan.length > 0 ? 'Regenerate Plan' : 'Generate Plan with AI'}
                                </button>
                            )}
                        </div>

                         {!isDefinitionComplete() ? (
                             <div className="text-center py-16 text-brand-dark-grey bg-brand-light-gray-blue/20 rounded-lg border-2 border-dashed border-brand-light-grey">
                                <h3 className="font-bold text-lg mb-2 text-red-600">Strategy Definition Required</h3>
                                <p className="mb-6 max-w-md mx-auto">
                                    You must complete the Problem Statement in the 'Strategy Definition' tab before you can generate the implementation plan.
                                </p>
                                <button
                                    onClick={() => setActiveTab('definition')}
                                    className="bg-brand-medium-teal text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-brand-teal transition-colors"
                                >
                                    Go to Definition
                                </button>
                            </div>
                        ) : implementationPlan.length === 0 ? (
                            <div className="text-center py-16 text-brand-dark-grey bg-brand-light-gray-blue/20 rounded-lg border-2 border-dashed border-brand-light-grey">
                                <h3 className="font-bold text-lg mb-2">No Plan Created Yet</h3>
                                <p className="mb-6 max-w-md mx-auto">
                                    Use AI to break down your problem statement into actionable tasks, linked to your strategic priorities.
                                </p>
                                <button
                                    onClick={handleGeneratePlan}
                                    disabled={isPlanLoading}
                                    className="bg-brand-medium-teal text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-brand-teal transition-colors disabled:bg-gray-400"
                                >
                                    {isPlanLoading ? 'Analyzing...' : 'Generate Implementation Plan'}
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-12">
                                {(Object.entries(groupedTasks) as [string, ImplementationItem[]][]).map(([priorityGroup, tasks]) => (
                                    <div key={priorityGroup}>
                                        <div className="flex items-center gap-3 mb-4">
                                            <FlagIcon />
                                            <h3 className="text-lg font-bold text-brand-dark-teal">{priorityGroup}</h3>
                                        </div>
                                        <div className="grid grid-cols-1 gap-6">
                                            {tasks.map((item) => (
                                                <div key={item.id} className="bg-brand-off-white border border-brand-light-grey rounded-lg p-5 hover:border-brand-medium-teal transition-all shadow-sm">
                                                    <div className="flex justify-between items-start mb-3">
                                                        <h3 className="text-lg font-bold text-brand-dark-teal">{item.title}</h3>
                                                        <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${item.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' : item.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'}`}>
                                                            {item.status === 'in_progress' ? 'In Progress' : item.status === 'completed' ? 'Completed' : 'Pending'}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-brand-dark-grey mb-4 leading-relaxed">{item.description}</p>
                                                    
                                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-4 border-t border-brand-light-grey gap-6">
                                                        {/* Role & Assignee */}
                                                        <div className="flex flex-col gap-2">
                                                            <div className="text-xs text-brand-grey flex items-center gap-2">
                                                                <span className="font-semibold text-brand-dark-teal">Suggested Role:</span> {item.suggestedRole}
                                                            </div>
                                                            {(user?.role === UserRole.ADMIN || user?.role === UserRole.TEAM_LEAD) ? (
                                                                <div className="relative group">
                                                                    {item.assignee ? (
                                                                        <div className="flex items-center gap-2 bg-white border border-brand-light-grey rounded-full pl-1 pr-3 py-1 shadow-sm">
                                                                            <div className="h-6 w-6 rounded-full bg-brand-medium-teal text-white flex items-center justify-center text-xs font-bold">
                                                                                {item.assignee.charAt(0)}
                                                                            </div>
                                                                            <span className="text-sm font-semibold text-brand-dark-grey">{item.assignee}</span>
                                                                            <button onClick={() => handleAssign(item.id, '')} className="text-gray-400 hover:text-red-500 ml-1">&times;</button>
                                                                        </div>
                                                                    ) : (
                                                                        <div className="relative">
                                                                             <select 
                                                                                onChange={(e) => {
                                                                                    if (e.target.value) handleAssign(item.id, e.target.value);
                                                                                }}
                                                                                value=""
                                                                                className="appearance-none bg-white border border-brand-light-grey text-brand-medium-teal text-sm font-semibold py-1.5 pl-3 pr-8 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-medium-teal hover:border-brand-medium-teal"
                                                                             >
                                                                                <option value="" disabled>Assign to...</option>
                                                                                {RESEARCHERS.map(r => (
                                                                                    <option key={r.id} value={r.name}>{r.name} ({r.role})</option>
                                                                                ))}
                                                                             </select>
                                                                             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-brand-medium-teal">
                                                                                <UserPlusIcon />
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            ) : (
                                                                 item.assignee ? (
                                                                     <div className="flex items-center gap-2">
                                                                        <span className="text-xs text-brand-grey">Assigned to:</span>
                                                                        <span className="text-sm font-semibold text-brand-dark-teal">{item.assignee}</span>
                                                                     </div>
                                                                 ) : (
                                                                     <span className="text-xs text-brand-grey italic">Unassigned</span>
                                                                 )
                                                            )}
                                                        </div>

                                                        {/* Due Date & Promote Actions */}
                                                        <div className="flex items-center gap-6">
                                                            <div className="flex items-center gap-2">
                                                                <CalendarIcon />
                                                                <div className="flex flex-col">
                                                                    <span className="text-[10px] font-bold text-brand-grey uppercase">Due Date</span>
                                                                    {(user?.role === UserRole.ADMIN || user?.role === UserRole.TEAM_LEAD) ? (
                                                                        <input 
                                                                            type="date" 
                                                                            value={item.dueDate || ''}
                                                                            onChange={(e) => handleDueDateChange(item.id, e.target.value)}
                                                                            className="text-sm font-semibold text-brand-dark-teal bg-transparent border-b border-transparent hover:border-brand-light-grey focus:border-brand-medium-teal outline-none transition-colors"
                                                                        />
                                                                    ) : (
                                                                        <span className="text-sm font-semibold text-brand-dark-teal">{item.dueDate || 'Not Set'}</span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            
                                                            {(user?.role === UserRole.ADMIN || user?.role === UserRole.TEAM_LEAD) && (
                                                                item.relatedProjectId ? (
                                                                    <button
                                                                        onClick={() => handlePromoteToPipeline(item)}
                                                                        className="flex items-center gap-2 text-sm font-bold text-brand-medium-teal hover:text-brand-dark-teal transition-colors bg-brand-light-gray-blue px-3 py-1.5 rounded-full"
                                                                    >
                                                                        <RDPortalIcon /> View Project
                                                                    </button>
                                                                ) : (
                                                                    <button
                                                                        onClick={() => handlePromoteToPipeline(item)}
                                                                        className="flex items-center gap-2 text-sm font-bold text-brand-dark-grey hover:text-brand-medium-teal transition-colors border border-brand-light-grey hover:border-brand-medium-teal px-3 py-1.5 rounded-full"
                                                                    >
                                                                        <PlusIcon /> Promote to Pipeline
                                                                    </button>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Right: Sidebar for Sharing & Chat */}
            <div className="xl:col-span-1 space-y-6">
                
                {/* Access Control Panel */}
                <div className="bg-white rounded-xl shadow-md border border-brand-light-grey overflow-hidden">
                        <div className="bg-brand-light-gray-blue px-4 py-3 border-b border-brand-light-grey flex justify-between items-center">
                        <h3 className="font-bold text-brand-dark-teal text-sm">Shared Access</h3>
                        {!isShared && (
                            <button 
                                onClick={handleShare}
                                className="text-xs font-bold text-brand-medium-teal hover:underline"
                            >
                                Share Now
                            </button>
                        )}
                    </div>
                    <div className="p-4">
                        {isShared ? (
                            <ul className="space-y-3">
                                {sharedWith.map((person, idx) => (
                                    <li key={idx} className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-brand-seafoam text-white flex items-center justify-center font-bold text-xs">
                                            {person.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-brand-dark-teal">{person.name}</p>
                                            <p className="text-xs text-brand-grey">{person.role}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="text-center py-4 text-brand-grey text-sm">
                                <LockClosedIcon />
                                <p className="mt-2">This strategy is currently private.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sparring Panel */}
                <div className="bg-white rounded-xl shadow-md border border-brand-light-grey overflow-hidden flex flex-col h-[600px] sticky top-24">
                    <div className="bg-brand-dark-teal p-4 flex justify-between items-center flex-shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/10 rounded-full text-white">
                                <ChatBubbleLeftRightIcon />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-sm">Strategic Sparring</h3>
                                <p className="text-brand-light-gray-blue text-xs opacity-80">Team Discussion</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50">
                        {isSparringLoading && (
                            <div className="flex justify-center py-4">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brand-medium-teal"></div>
                            </div>
                        )}
                        {!isShared && comments.length === 0 && (
                            <p className="text-center text-gray-400 text-sm italic py-10 px-4">
                                Share this strategy to invite team leads for feedback and sparring.
                            </p>
                        )}
                        {isShared && comments.length === 0 && !isSparringLoading && (
                                <p className="text-center text-gray-400 text-sm italic py-10 px-4">
                                No comments yet. Start the discussion!
                            </p>
                        )}
                        {comments.map((comment) => (
                            <div key={comment.id} className={`flex gap-2 ${comment.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                                <div className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold ${comment.isUser ? 'bg-brand-medium-teal text-white' : 'bg-gray-300 text-gray-700'}`}>
                                    {comment.name.charAt(0)}
                                </div>
                                <div className={`max-w-[85%] rounded-lg p-2 shadow-sm ${comment.isUser ? 'bg-brand-light-gray-blue text-brand-dark-grey' : 'bg-white text-brand-dark-grey border border-brand-light-grey'}`}>
                                    <div className="flex justify-between items-baseline mb-1 gap-2">
                                        <span className="font-bold text-[10px] text-brand-dark-teal">{comment.name}</span>
                                        <span className="text-xs text-gray-500 uppercase">{comment.role}</span>
                                    </div>
                                    <p className="text-xs">{comment.message}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-3 bg-white border-t border-brand-light-grey flex-shrink-0">
                        <form onSubmit={handlePostComment} className="flex gap-2">
                            <input 
                                type="text" 
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder={isShared ? "Reply..." : "Share to reply..."}
                                disabled={!isShared}
                                className="flex-grow px-3 py-2 text-sm border border-brand-light-grey rounded-full focus:ring-2 focus:ring-brand-medium-teal outline-none transition disabled:bg-gray-100"
                            />
                            <button 
                                type="submit"
                                disabled={!newComment.trim() || !isShared}
                                className="bg-brand-medium-teal text-white p-2 rounded-full hover:bg-brand-teal transition-colors disabled:opacity-50"
                            >
                                <PaperAirplaneIcon />
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
      </div>
    </main>
  );
};

export default StrategyPage;