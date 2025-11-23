import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import type { PipelineStatus, ExperimentDesign, RedTeamAnalysis, GeneratedProposalSection } from '../../types';
import { generateResearchQuestions, generateExperimentDesigns, critiqueProposal, generateCommercialAnalysis, generateMarketAnalysis, generateImpactStatement, generateTechnicalPlan, generateFullGrantProposal } from '../../services/geminiService';
import RetaserMatrix from './RetaserMatrix';
import { ChartBarIcon, ClipboardListIcon, DatabaseIcon, PaperAirplaneIcon, ClockIcon, CheckCircleIcon } from '../icons';
import TextAssistantModal from './TextAssistantModal';
import ProposalTypeSelectorModal from './ProposalTypeSelectorModal';
import ProposalViewerModal from './ProposalViewerModal';

const statusConfig: Record<PipelineStatus, { color: string; bgColor: string }> = {
    'Ideation': { color: 'text-blue-800', bgColor: 'bg-blue-100' },
    'Proposal Development': { color: 'text-purple-800', bgColor: 'bg-purple-100' },
    'Under Review': { color: 'text-yellow-800', bgColor: 'bg-yellow-100' },
    'Approved': { color: 'text-green-800', bgColor: 'bg-green-100' },
};

const AssistantModal: React.FC<{
    title: string;
    content: string[] | ExperimentDesign[] | RedTeamAnalysis | null;
    isLoading: boolean;
    error: string | null;
    onClose: () => void;
    mode: 'questions' | 'designs' | 'critique' | null;
    onSendToMethodology: (design: ExperimentDesign) => void;
}> = ({ title, content, isLoading, error, onClose, mode, onSendToMethodology }) => {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const handleCopy = (text: string, index: number) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedIndex(index);
            setTimeout(() => {
                setCopiedIndex(null);
            }, 2000);
        });
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-brand-light-grey">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-brand-dark-teal">{title}</h3>
                        <button onClick={onClose} className="text-brand-grey text-3xl leading-none hover:text-brand-dark-grey">&times;</button>
                    </div>
                </div>
                <div className="p-6 max-h-[70vh] overflow-y-auto">
                    {isLoading && <div className="flex justify-center items-center py-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-medium-teal"></div></div>}
                    {error && <p className="text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}
                    {!isLoading && !error && content && (
                        <>
                            {mode === 'questions' && (
                                <ul className="space-y-4">
                                    {(content as string[]).map((item, index) => (
                                        <li key={index} className="bg-brand-light-gray-blue/50 p-4 rounded-lg relative group">
                                            <p className="text-brand-dark-grey pr-8">{item}</p>
                                            <button 
                                                onClick={() => handleCopy(item, index)} 
                                                disabled={copiedIndex === index}
                                                className="absolute top-2 right-2 bg-white p-1.5 rounded-md shadow-sm opacity-0 group-hover:opacity-100 transition-opacity text-brand-dark-grey hover:bg-brand-light-grey disabled:opacity-100"
                                                aria-label={copiedIndex === index ? 'Copied' : 'Copy'}
                                            >
                                                {copiedIndex === index ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-brand-seafoam" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                                )}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {mode === 'designs' && (
                                <ul className="space-y-4">
                                    {(content as ExperimentDesign[]).map((design, index) => {
                                        const formattedText = `Title: ${design.title}\n\nApproach:\n${design.approach}\n\nData to be Collected:\n${design.dataToBeCollected}\n\nPotential Analysis Methods:\n${design.analysisMethods}`;
                                        return (
                                            <li key={index} className="bg-brand-light-gray-blue/50 p-4 rounded-lg">
                                                <h4 className="font-bold text-brand-dark-teal mb-4 text-lg">{design.title}</h4>
                                                <div className="space-y-4">
                                                    <div className="flex items-start gap-3">
                                                        <div className="flex-shrink-0 w-6 h-6 pt-1"><ClipboardListIcon /></div>
                                                        <div>
                                                            <h5 className="font-semibold text-brand-dark-grey">Approach</h5>
                                                            <p className="text-brand-dark-grey text-sm mt-1 whitespace-pre-wrap">{design.approach}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start gap-3">
                                                        <div className="flex-shrink-0 w-6 h-6 pt-1"><DatabaseIcon /></div>
                                                        <div>
                                                            <h5 className="font-semibold text-brand-dark-grey">Data to be Collected</h5>
                                                            <p className="text-brand-dark-grey text-sm mt-1 whitespace-pre-wrap">{design.dataToBeCollected}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start gap-3">
                                                        <div className="flex-shrink-0 w-6 h-6 pt-1"><ChartBarIcon /></div>
                                                        <div>
                                                            <h5 className="font-semibold text-brand-dark-grey">Potential Analysis Methods</h5>
                                                            <p className="text-brand-dark-grey text-sm mt-1 whitespace-pre-wrap">{design.analysisMethods}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-4 pt-4 border-t border-brand-grey/20 flex items-center gap-4">
                                                    <button onClick={() => onSendToMethodology(design)} className="text-sm font-semibold text-brand-medium-teal hover:text-brand-teal transition-colors flex items-center gap-1.5">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                                                        Send to Methodology
                                                    </button>
                                                    <button
                                                        onClick={() => handleCopy(formattedText, index)}
                                                        disabled={copiedIndex === index}
                                                        className="text-sm font-semibold text-brand-dark-grey hover:text-brand-medium-teal transition-colors disabled:text-brand-seafoam flex items-center gap-1.5"
                                                    >
                                                        {copiedIndex === index ? (
                                                            <>
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                                                Copied
                                                            </>
                                                        ) : (
                                                            <>
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                                                Copy Text
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                             {mode === 'critique' && (() => {
                                const analysis = content as RedTeamAnalysis;
                                const formattedText = `
Potential Weaknesses:
${analysis.weaknesses.map(item => `- ${item}`).join('\n')}

Unaddressed Assumptions:
${analysis.assumptions.map(item => `- ${item}`).join('\n')}

Critical Questions to Consider:
${analysis.questions.map(item => `- ${item}`).join('\n')}
                                `.trim();

                                return (
                                    <div className="space-y-6">
                                        <div className="flex justify-end">
                                            <button
                                                onClick={() => handleCopy(formattedText, 0)}
                                                disabled={copiedIndex === 0}
                                                className="text-sm font-semibold text-brand-dark-grey hover:text-brand-medium-teal transition-colors disabled:text-brand-seafoam flex items-center gap-1.5"
                                            >
                                                {copiedIndex === 0 ? (
                                                     <>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                                        Copied
                                                    </>
                                                ) : (
                                                     <>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                                        Copy Analysis
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-brand-dark-teal mb-2 text-lg">Potential Weaknesses</h4>
                                            <ul className="list-disc list-outside pl-5 space-y-2 text-brand-dark-grey text-sm">
                                                {analysis.weaknesses.map((item, i) => <li key={`w-${i}`}>{item}</li>)}
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-brand-dark-teal mb-2 text-lg">Unaddressed Assumptions</h4>
                                            <ul className="list-disc list-outside pl-5 space-y-2 text-brand-dark-grey text-sm">
                                                {analysis.assumptions.map((item, i) => <li key={`a-${i}`}>{item}</li>)}
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-brand-dark-teal mb-2 text-lg">Critical Questions to Consider</h4>
                                            <ul className="list-disc list-outside pl-5 space-y-2 text-brand-dark-grey text-sm">
                                                {analysis.questions.map((item, i) => <li key={`q-${i}`}>{item}</li>)}
                                            </ul>
                                        </div>
                                    </div>
                                )
                            })()}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

type FormState = {
    problemStatement: string;
    proposedSolution: string;
    methodology: string;
    expectedOutcomes: string;
    budgetEstimate: number | '';
    timeline: string;
    scratchpad: string;
    commercialViability: string;
    marketAnalysis: string;
    environmentalImpact: string;
    societalImpact: string;
};

const ProjectDetailPage = () => {
    const { projectTitle } = useParams<{ projectTitle: string }>();
    const { user, updateProjectDetails, updateProjectStatus, addActivity } = useAuth();
    const autoSaveTimeout = useRef<number | null>(null);
    
    const project = useMemo(() => 
        user?.pipelineProjects?.find(p => p.title === decodeURIComponent(projectTitle || ''))
    , [user?.pipelineProjects, projectTitle]);
    
    const [formState, setFormState] = useState<FormState>({
        problemStatement: '',
        proposedSolution: '',
        methodology: '',
        expectedOutcomes: '',
        budgetEstimate: '' as number | '',
        timeline: '',
        scratchpad: '',
        commercialViability: '',
        marketAnalysis: '',
        environmentalImpact: '',
        societalImpact: '',
    });

    const [isSaving, setIsSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isDirty, setIsDirty] = useState(false);
    
    const [assistantState, setAssistantState] = useState<{
        isOpen: boolean;
        mode: 'questions' | 'designs' | 'critique' | null;
        isLoading: boolean;
        content: string[] | ExperimentDesign[] | RedTeamAnalysis | null;
        error: string | null;
    }>({ isOpen: false, mode: null, isLoading: false, content: null, error: null });

    const [textAssistantState, setTextAssistantState] = useState<{
        isOpen: boolean;
        title: string;
        isLoading: boolean;
        content: string | null;
        error: string | null;
        targetField: keyof FormState | null;
    }>({ isOpen: false, title: '', isLoading: false, content: null, error: null, targetField: null });

    const [isSelectorOpen, setIsSelectorOpen] = useState(false);
    const [viewerState, setViewerState] = useState({
        isOpen: false,
        title: '',
        isLoading: false,
        content: null as string | null,
        error: null as string | null,
    });


    useEffect(() => {
        window.scrollTo(0, 0);
        if (project) {
            setFormState({
                problemStatement: project.problemStatement || '',
                proposedSolution: project.proposedSolution || '',
                methodology: project.methodology || '',
                expectedOutcomes: project.expectedOutcomes || '',
                budgetEstimate: project.budgetEstimate || '',
                timeline: project.timeline || '',
                scratchpad: project.scratchpad || '',
                commercialViability: project.commercialViability || '',
                marketAnalysis: project.marketAnalysis || '',
                environmentalImpact: project.environmentalImpact || '',
                societalImpact: project.societalImpact || '',
            });
            setIsDirty(false);
            setIsSaved(false);

            // Add activity log, ensuring not to add duplicates on re-renders
            if (!user?.recentActivity?.[0] || user.recentActivity[0].title !== project.title || user.recentActivity[0].type !== 'project_access') {
                addActivity({
                    type: 'project_access',
                    title: project.title,
                    link: `/dashboard/project/${encodeURIComponent(project.title)}`
                });
            }
        }
    }, [project]);

    useEffect(() => {
        if (isDirty) {
            if (autoSaveTimeout.current) {
                clearTimeout(autoSaveTimeout.current);
            }
            autoSaveTimeout.current = window.setTimeout(() => {
                handleSave();
            }, 2000); // Auto-save after 2 seconds of inactivity
        }
        return () => {
            if (autoSaveTimeout.current) {
                clearTimeout(autoSaveTimeout.current);
            }
        };
    }, [formState, isDirty]);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setIsDirty(true);
        setIsSaved(false);
        setFormState(prev => ({ ...prev, [id]: value }));
    };

    const handleSave = () => {
        if (!project || isSaving) return;
        
        if (autoSaveTimeout.current) {
            clearTimeout(autoSaveTimeout.current);
        }

        setIsSaving(true);
        const detailsToUpdate = {
            ...formState,
            budgetEstimate: typeof formState.budgetEstimate === 'number' ? formState.budgetEstimate : Number(formState.budgetEstimate) || undefined,
        };
        
        updateProjectDetails(project.title, detailsToUpdate);

        setTimeout(() => {
            setIsSaving(false);
            setIsSaved(true);
            setIsDirty(false);
        }, 1000);
    };
    
    const getProjectContextForAI = () => {
        if (!project) return '';
        return `
Title: ${project.title}
Overview: ${project.overview}
Problem Statement: ${formState.problemStatement}
Proposed Solution: ${formState.proposedSolution}
Methodology: ${formState.methodology}
Expected Outcomes: ${formState.expectedOutcomes}
Commercial Viability: ${formState.commercialViability}
Market Analysis: ${formState.marketAnalysis}
Environmental Impact: ${formState.environmentalImpact}
Societal Impact: ${formState.societalImpact}
        `.trim();
    };
    
    const handleAssistantClick = async (mode: 'questions' | 'designs' | 'critique') => {
        setAssistantState({ isOpen: true, mode, isLoading: true, content: null, error: null });
        try {
            const context = getProjectContextForAI();
            if (mode === 'questions') {
                const results = await generateResearchQuestions(context);
                setAssistantState(prev => ({ ...prev, isLoading: false, content: results }));
            } else if (mode === 'designs') {
                const results = await generateExperimentDesigns(context);
                setAssistantState(prev => ({ ...prev, isLoading: false, content: results }));
            } else if (mode === 'critique') {
                const results = await critiqueProposal(context);
                setAssistantState(prev => ({ ...prev, isLoading: false, content: results }));
            }
        } catch (err) {
            const error = err instanceof Error ? err.message : 'An unknown error occurred.';
            setAssistantState(prev => ({ ...prev, isLoading: false, error }));
        }
    };

    const handleTextAssistantClick = async (
        mode: 'commercial' | 'market' | 'environmental' | 'societal',
        title: string,
        targetField: keyof FormState
    ) => {
        setTextAssistantState({ isOpen: true, title, isLoading: true, content: null, error: null, targetField });
        try {
            const context = getProjectContextForAI();
            let result: GeneratedProposalSection;
            if (mode === 'commercial') {
                result = await generateCommercialAnalysis(context);
            } else if (mode === 'market') {
                result = await generateMarketAnalysis(context);
            } else {
                result = await generateImpactStatement(context, mode);
            }
            setTextAssistantState(prev => ({ ...prev, isLoading: false, content: result.text }));
        } catch (err) {
            const error = err instanceof Error ? err.message : 'An unknown error occurred.';
            setTextAssistantState(prev => ({ ...prev, isLoading: false, error }));
        }
    };

    const handleAcceptText = (text: string) => {
        if (textAssistantState.targetField) {
            setFormState(prev => ({
                ...prev,
                [textAssistantState.targetField!]: text,
            }));
            setIsDirty(true);
            setIsSaved(false);
        }
        setTextAssistantState(prev => ({ ...prev, isOpen: false }));
    };
    
    const handleSendExperimentToMethodology = (design: ExperimentDesign) => {
        const formattedText = `
### ${design.title}

**Approach**
${design.approach}

**Data to be Collected**
${design.dataToBeCollected}

**Potential Analysis Methods**
${design.analysisMethods}
        `.trim();

        setFormState(prev => ({
            ...prev,
            methodology: prev.methodology ? `${prev.methodology}\n\n${formattedText}` : formattedText
        }));
        setIsDirty(true);
        setIsSaved(false);
        setAssistantState(prev => ({ ...prev, isOpen: false }));
    };

    const handleGenerateProposalClick = () => {
        if (canGenerateProposal) {
            setIsSelectorOpen(true);
        } else {
            alert('Please fill in the "Problem Statement" and "Proposed Solution" sections (with at least 11 characters each) to provide enough context for the AI to generate a meaningful proposal.');
        }
    };

    const handleGenerateProposalSelect = async (type: 'technical' | 'grant') => {
        setIsSelectorOpen(false);
        const context = getProjectContextForAI();
        const title = type === 'technical' ? 'Generated Technical R&D Plan' : 'Generated Grant Application';
        setViewerState({ isOpen: true, title, isLoading: true, content: null, error: null });

        try {
            let result;
            if (type === 'technical') {
                result = await generateTechnicalPlan(context);
            } else {
                result = await generateFullGrantProposal(context);
            }
            setViewerState(prev => ({ ...prev, isLoading: false, content: result.text }));
        } catch (err) {
            const error = err instanceof Error ? err.message : 'An unknown error occurred.';
            setViewerState(prev => ({ ...prev, isLoading: false, error }));
        }
    };

    const handleAppendToScratchpad = (text: string) => {
        setFormState(prev => ({
            ...prev,
            scratchpad: prev.scratchpad ? `${prev.scratchpad}\n\n---\n\n${text}` : text
        }));
        setIsDirty(true);
        setIsSaved(false);
        setViewerState(prev => ({...prev, isOpen: false}));
    };

    const canGenerateProposal = formState.problemStatement.trim().length > 10 && formState.proposedSolution.trim().length > 10;


    if (!project) {
        return (
            <main className="py-12 bg-brand-light-gray-blue min-h-[calc(100vh-200px)]">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-2xl font-bold">Project not found</h1>
                    <Link to="/dashboard/pipeline" className="mt-4 inline-block text-brand-medium-teal hover:underline">
                        &larr; Back to Pipeline
                    </Link>
                </div>
            </main>
        );
    }

    const inputClasses = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-medium-teal focus:border-transparent outline-none transition bg-white";
    const textareaClasses = `${inputClasses} min-h-[120px]`;

    const getSaveButtonText = () => {
        if (isSaving) return 'Saving...';
        if (isSaved) return '✓ Saved';
        return 'Save Changes';
    };

    return (
        <main className="py-12 bg-brand-light-gray-blue min-h-[calc(100vh-200px)]">
            {assistantState.isOpen && (
                <AssistantModal 
                    title={assistantState.mode === 'questions' ? 'Suggested Research Questions' : assistantState.mode === 'designs' ? 'Suggested Experiment Designs' : 'Proposal Strength Analysis'}
                    content={assistantState.content}
                    isLoading={assistantState.isLoading}
                    error={assistantState.error}
                    onClose={() => setAssistantState(prev => ({ ...prev, isOpen: false }))}
                    mode={assistantState.mode}
                    onSendToMethodology={handleSendExperimentToMethodology}
                />
            )}
            <TextAssistantModal
                isOpen={textAssistantState.isOpen}
                onClose={() => setTextAssistantState(prev => ({ ...prev, isOpen: false }))}
                title={textAssistantState.title}
                isLoading={textAssistantState.isLoading}
                error={textAssistantState.error}
                content={textAssistantState.content}
                onAccept={handleAcceptText}
            />
             <ProposalTypeSelectorModal 
                isOpen={isSelectorOpen}
                onClose={() => setIsSelectorOpen(false)}
                onSelect={handleGenerateProposalSelect}
            />
            <ProposalViewerModal
                isOpen={viewerState.isOpen}
                onClose={() => setViewerState(prev => ({ ...prev, isOpen: false }))}
                title={viewerState.title}
                isLoading={viewerState.isLoading}
                error={viewerState.error}
                content={viewerState.content}
                onAppend={handleAppendToScratchpad}
            />
            <div className="container mx-auto px-6 max-w-6xl">
                <header className="mb-8">
                    <Link to="/dashboard/pipeline" className="text-brand-grey hover:text-brand-medium-teal transition-colors mb-4 block">
                        &larr; Back to Pipeline
                    </Link>
                    <div className="flex justify-between items-start">
                        <h1 className="text-4xl font-bold text-brand-dark-teal">{project.title}</h1>
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${statusConfig[project.status].bgColor} ${statusConfig[project.status].color}`}>
                            {project.status}
                        </span>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Proposal Form */}
                    <div className="lg:col-span-2 space-y-8">
                        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-8">
                            <div className="bg-brand-off-white p-8 rounded-xl shadow-lg border border-brand-light-grey">
                                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
                                    <h2 className="text-2xl font-bold text-brand-dark-teal">Proposal Development</h2>
                                    <button
                                        type="button"
                                        onClick={handleGenerateProposalClick}
                                        className="bg-brand-teal text-white font-semibold px-4 py-2 rounded-lg shadow-sm hover:bg-brand-dark-teal transition-colors"
                                    >
                                        Generate Proposal
                                    </button>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <label htmlFor="problemStatement" className="block text-sm font-medium text-brand-dark-grey mb-1">Problem Statement</label>
                                        <textarea id="problemStatement" value={formState.problemStatement} onChange={handleFormChange} className={textareaClasses} placeholder="What specific problem does this research address?"></textarea>
                                    </div>
                                    <div>
                                        <label htmlFor="proposedSolution" className="block text-sm font-medium text-brand-dark-grey mb-1">Proposed Solution</label>
                                        <textarea id="proposedSolution" value={formState.proposedSolution} onChange={handleFormChange} className={textareaClasses} placeholder="Describe your proposed method or solution in detail."></textarea>
                                    </div>
                                    <div>
                                        <label htmlFor="methodology" className="block text-sm font-medium text-brand-dark-grey mb-1">Methodology</label>
                                        <textarea id="methodology" value={formState.methodology} onChange={handleFormChange} className={textareaClasses} placeholder="What research methodologies will be employed? (e.g., quantitative analysis, user studies, etc.)"></textarea>
                                    </div>
                                    <div>
                                        <label htmlFor="expectedOutcomes" className="block text-sm font-medium text-brand-dark-grey mb-1">Expected Outcomes & Impact</label>
                                        <textarea id="expectedOutcomes" value={formState.expectedOutcomes} onChange={handleFormChange} className={textareaClasses} placeholder="What are the anticipated results, deliverables, and potential impact?"></textarea>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="budgetEstimate" className="block text-sm font-medium text-brand-dark-grey mb-1">Budget Estimate ($)</label>
                                            <input id="budgetEstimate" type="number" value={formState.budgetEstimate} onChange={handleFormChange} className={inputClasses} placeholder="e.g., 50000" />
                                        </div>
                                        <div>
                                            <label htmlFor="timeline" className="block text-sm font-medium text-brand-dark-grey mb-1">Estimated Timeline</label>
                                            <input id="timeline" type="text" value={formState.timeline} onChange={handleFormChange} className={inputClasses} placeholder="e.g., 6-9 Months" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                             <div className="bg-brand-off-white p-8 rounded-xl shadow-lg border border-brand-light-grey">
                                <h2 className="text-2xl font-bold text-brand-dark-teal mb-6">Business Case & Impact</h2>
                                <div className="space-y-6">
                                    <div>
                                        <label htmlFor="commercialViability" className="block text-sm font-medium text-brand-dark-grey mb-1">Commercial Viability / Business Case</label>
                                        <textarea id="commercialViability" value={formState.commercialViability} onChange={handleFormChange} className={textareaClasses} placeholder="Describe the commercial potential, target market, and business model."></textarea>
                                    </div>
                                    <div>
                                        <label htmlFor="marketAnalysis" className="block text-sm font-medium text-brand-dark-grey mb-1">Market Analysis</label>
                                        <textarea id="marketAnalysis" value={formState.marketAnalysis} onChange={handleFormChange} className={textareaClasses} placeholder="Analyze the market need, competitors, and opportunity."></textarea>
                                    </div>
                                    <div>
                                        <label htmlFor="environmentalImpact" className="block text-sm font-medium text-brand-dark-grey mb-1">Environmental Impact</label>
                                        <textarea id="environmentalImpact" value={formState.environmentalImpact} onChange={handleFormChange} className={textareaClasses} placeholder="Detail the potential environmental benefits (e.g., sustainability, efficiency)."></textarea>
                                    </div>
                                    <div>
                                        <label htmlFor="societalImpact" className="block text-sm font-medium text-brand-dark-grey mb-1">Societal Impact</label>
                                        <textarea id="societalImpact" value={formState.societalImpact} onChange={handleFormChange} className={textareaClasses} placeholder="Outline the benefits to society (e.g., public health, job creation)."></textarea>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-2 flex items-center gap-4">
                                <button
                                    type="submit"
                                    disabled={isSaving || !isDirty}
                                    className="w-40 text-center bg-brand-medium-teal text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-brand-teal disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                                >
                                    {getSaveButtonText()}
                                </button>
                                <div className="relative h-6 w-48">
                                    <span className={`absolute inset-0 flex items-center text-sm font-semibold text-brand-dark-grey transition-opacity duration-300 ${isSaving ? 'opacity-100' : 'opacity-0'}`}>
                                        Saving changes...
                                    </span>
                                    <span className={`absolute inset-0 flex items-center text-sm font-semibold text-brand-seafoam transition-opacity duration-300 ${isSaved ? 'opacity-100' : 'opacity-0'}`}>
                                        All changes saved.
                                    </span>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Right Column: Original Idea Details */}
                    <aside className="space-y-6">
                         {project.status === 'Ideation' && (
                            <div className="bg-brand-off-white p-6 rounded-xl shadow-md border border-brand-light-grey text-center">
                                <div className="flex justify-center mb-4"><PaperAirplaneIcon /></div>
                                <h3 className="text-xl font-bold text-brand-dark-teal">Ready to Draft Your Proposal?</h3>
                                <p className="mt-2 text-brand-dark-grey max-w-md mx-auto">
                                    Move this idea to the 'Proposal Development' stage to begin drafting the formal proposal sections.
                                </p>
                                <button
                                    onClick={() => updateProjectStatus(project.title, 'Proposal Development')}
                                    className="mt-6 bg-brand-teal text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-brand-dark-teal transition-colors"
                                >
                                    Begin Proposal Development
                                </button>
                            </div>
                        )}
                        
                        {project.status === 'Proposal Development' && (
                             <div className="bg-brand-off-white p-6 rounded-xl shadow-md border border-brand-light-grey text-center">
                                <div className="flex justify-center mb-4"><PaperAirplaneIcon /></div>
                                <h3 className="text-xl font-bold text-brand-dark-teal">Ready to Submit?</h3>
                                <p className="mt-2 text-brand-dark-grey max-w-md mx-auto">
                                    Once your proposal is complete, mark it as 'Under Review' to track its progress through the submission and evaluation phase.
                                </p>
                                <button
                                    onClick={() => updateProjectStatus(project.title, 'Under Review')}
                                    className="mt-6 bg-brand-teal text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-brand-dark-teal transition-colors"
                                >
                                    Mark as 'Under Review'
                                </button>
                            </div>
                        )}

                        {project.status === 'Under Review' && (
                            <div className="bg-brand-off-white p-6 rounded-xl shadow-md border border-brand-light-grey text-center">
                                <div className="flex justify-center mb-4"><ClockIcon /></div>
                                <h3 className="text-xl font-bold text-brand-dark-teal">Awaiting Decision</h3>
                                <p className="mt-2 text-brand-dark-grey max-w-md mx-auto">
                                    This proposal is under review. Once a decision has been made, update its status below.
                                </p>
                                <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
                                    <button
                                        onClick={() => updateProjectStatus(project.title, 'Approved')}
                                        className="bg-brand-seafoam text-brand-dark-teal font-semibold px-6 py-3 rounded-lg shadow-md hover:opacity-90 transition-colors"
                                    >
                                        Mark as Approved
                                    </button>
                                    <button
                                        onClick={() => updateProjectStatus(project.title, 'Proposal Development')}
                                        className="bg-brand-light-grey text-brand-dark-grey font-semibold px-6 py-3 rounded-lg hover:bg-brand-grey transition-colors"
                                    >
                                        Needs Revisions
                                    </button>
                                </div>
                            </div>
                        )}

                        {project.status === 'Approved' && (
                            <div className="bg-green-50 p-6 rounded-xl shadow-md border-green-200 text-center">
                                <div className="flex justify-center mb-4"><CheckCircleIcon /></div>
                                <h3 className="text-xl font-bold text-green-800">Project Approved!</h3>
                                <p className="mt-2 text-green-700 max-w-md mx-auto">
                                    Congratulations! This proposal has been approved. You can now move forward with your research.
                                </p>
                                <div className="mt-6 flex justify-center">
                                    <button
                                        onClick={() => updateProjectStatus(project.title, 'Under Review')}
                                        className="text-sm text-brand-dark-grey hover:underline"
                                    >
                                        Revert Status
                                    </button>
                                </div>
                            </div>
                        )}
                        <div className="bg-brand-off-white p-6 rounded-xl shadow-md border border-brand-light-grey">
                            <h3 className="text-xl font-bold text-brand-dark-teal mb-4">AI Drafting Assistant</h3>
                            <div className="space-y-3">
                                <button onClick={() => handleTextAssistantClick('commercial', 'Draft Commercial Viability', 'commercialViability')} className="w-full text-left font-semibold text-brand-medium-teal hover:text-brand-teal transition-colors p-3 bg-brand-light-gray-blue/60 hover:bg-brand-light-gray-blue rounded-md">
                                    Draft Commercial Viability &rarr;
                                </button>
                                <button onClick={() => handleTextAssistantClick('market', 'Draft Market Analysis', 'marketAnalysis')} className="w-full text-left font-semibold text-brand-medium-teal hover:text-brand-teal transition-colors p-3 bg-brand-light-gray-blue/60 hover:bg-brand-light-gray-blue rounded-md">
                                    Draft Market Analysis &rarr;
                                </button>
                                <button onClick={() => handleTextAssistantClick('societal', 'Draft Societal Impact', 'societalImpact')} className="w-full text-left font-semibold text-brand-medium-teal hover:text-brand-teal transition-colors p-3 bg-brand-light-gray-blue/60 hover:bg-brand-light-gray-blue rounded-md">
                                    Draft Societal Impact &rarr;
                                </button>
                                <button onClick={() => handleTextAssistantClick('environmental', 'Draft Environmental Impact', 'environmentalImpact')} className="w-full text-left font-semibold text-brand-medium-teal hover:text-brand-teal transition-colors p-3 bg-brand-light-gray-blue/60 hover:bg-brand-light-gray-blue rounded-md">
                                    Draft Environmental Impact &rarr;
                                </button>
                                <hr className="border-brand-light-grey my-2"/>
                                <button onClick={() => handleAssistantClick('questions')} className="w-full text-left font-semibold text-brand-medium-teal hover:text-brand-teal transition-colors p-3 bg-brand-light-gray-blue/60 hover:bg-brand-light-gray-blue rounded-md">
                                    Formulate Research Questions &rarr;
                                </button>
                                <button onClick={() => handleAssistantClick('designs')} className="w-full text-left font-semibold text-brand-medium-teal hover:text-brand-teal transition-colors p-3 bg-brand-light-gray-blue/60 hover:bg-brand-light-gray-blue rounded-md">
                                    Suggest Experiment Design &rarr;
                                </button>
                                <button onClick={() => handleAssistantClick('critique')} className="w-full text-left font-semibold text-brand-medium-teal hover:text-brand-teal transition-colors p-3 bg-brand-light-gray-blue/60 hover:bg-brand-light-gray-blue rounded-md">
                                    Strengthen Your Proposal &rarr;
                                </button>
                            </div>
                        </div>
                        <div className="bg-brand-off-white p-6 rounded-xl shadow-md border border-brand-light-grey">
                            <h3 className="text-xl font-bold text-brand-dark-teal">Scratchpad</h3>
                             <textarea id="scratchpad" value={formState.scratchpad} onChange={handleFormChange} className="w-full px-3 py-2 mt-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-medium-teal focus:border-transparent outline-none transition bg-white min-h-[150px]" placeholder="Jot down notes, ideas, or to-do items here..."></textarea>
                        </div>
                        <div className="bg-brand-off-white p-6 rounded-xl shadow-md border border-brand-light-grey">
                            <h3 className="text-xl font-bold text-brand-dark-teal">Original Idea</h3>
                            <div className="mt-4 text-sm space-y-4">
                                <div>
                                    <h4 className="font-semibold text-brand-grey">Overview</h4>
                                    <p className="text-brand-dark-grey">{project.overview}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-brand-grey">Research Gap Score</h4>
                                    <p className="text-brand-dark-grey font-bold">{project.gapScore}/10</p>
                                </div>
                                {project.priority && (
                                    <div>
                                        <h4 className="font-semibold text-brand-grey">Priority</h4>
                                        <p className="text-brand-dark-grey font-bold">{project.priority}</p>
                                    </div>
                                )}
                                <div>
                                    <h4 className="font-semibold text-brand-grey">Supporting Literature</h4>
                                    <ul className="list-disc list-outside pl-5 text-brand-dark-grey mt-1">
                                        {project.literature.map((lit, i) => <li key={i}>{lit}</li>)}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
                <div className="mt-12">
                     <div className="bg-brand-off-white p-8 rounded-xl shadow-lg border border-brand-light-grey">
                        <RetaserMatrix literature={project.literature} baseTopic={project.title} isIndustrial={project.isIndustrial} />
                     </div>
                </div>
            </div>
        </main>
    );
};

export default ProjectDetailPage;