import React, { useState, useEffect, useMemo } from 'react';
import { generateIdeasWithLiterature, extractTextFromDocument } from '../../services/geminiService';
import type { GeneratedIdea } from '../../types';
import RetaserMatrix from './RetaserMatrix';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const IdeaGeneratorPage = () => {
  const [baseTopic, setBaseTopic] = useState('');
  const [userContext, setUserContext] = useState('');
  const [prioritizeIndustrial, setPrioritizeIndustrial] = useState(false);
  const [generatedIdeas, setGeneratedIdeas] = useState<GeneratedIdea[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analyzingIdea, setAnalyzingIdea] = useState<GeneratedIdea | null>(null);
  const [copiedIdea, setCopiedIdea] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [modalForIdea, setModalForIdea] = useState<GeneratedIdea | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const { user, updateSavedIdeas, promoteIdeaToPipeline, addActivity } = useAuth();
  const navigate = useNavigate();
  const savedIdeas = user?.savedIdeas || [];
  const pipelineProjects = user?.pipelineProjects || [];


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]);
      };
      reader.onerror = error => reject(error);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setIsExtracting(true);
      setError(null);
      setUserContext('');

      try {
        const base64Data = await fileToBase64(file);
        const extractedText = await extractTextFromDocument(base64Data, file.type);
        setUserContext(extractedText);
      } catch (err) {
        console.error("Failed to process file:", err);
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred during file processing.";
        setError(errorMessage);
        setFileName(null);
      } finally {
        setIsExtracting(false);
        if (e.target) {
            e.target.value = '';
        }
      }
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!baseTopic.trim()) {
      setError('Please enter a topic to generate ideas.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedIdeas([]);
    setAnalyzingIdea(null);

    try {
      const ideas = await generateIdeasWithLiterature(baseTopic, userContext, prioritizeIndustrial);
      setGeneratedIdeas(ideas);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = (idea: GeneratedIdea) => {
    const ideaText = `${idea.title}\n\n${idea.overview}`;
    navigator.clipboard.writeText(ideaText).then(() => {
      setCopiedIdea(idea.title);
      setTimeout(() => setCopiedIdea(null), 2500); // Reset after 2.5 seconds
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      alert('Failed to copy text.');
    });
  };

  const openModalForIdea = (idea: GeneratedIdea) => {
    setModalForIdea(idea);
  };

  const handleRemoveSavedIdea = (ideaToRemove: GeneratedIdea) => {
    const newSavedIdeas = savedIdeas.filter(idea => idea.title !== ideaToRemove.title);
    updateSavedIdeas(newSavedIdeas);
  };

  const handleAddToPipeline = (idea: GeneratedIdea) => {
    promoteIdeaToPipeline(idea);
  };

    const handleSaveAndBrowse = () => {
        if (modalForIdea) {
            const isAlreadySaved = savedIdeas.some(idea => idea.title === modalForIdea.title);
            if (!isAlreadySaved) {
                updateSavedIdeas([...savedIdeas, modalForIdea]);
                addActivity({
                    type: 'idea_saved',
                    title: modalForIdea.title,
                    link: '/dashboard/idea-generator'
                });
            }
            setModalForIdea(null);
            setToastMessage("Idea saved! Manage it in 'Your Saved Ideas' below.");
            setTimeout(() => setToastMessage(''), 3000); // Toast disappears after 3s
        }
    };
    
    const handleAddToPipelineAndGo = () => {
        if (modalForIdea) {
            promoteIdeaToPipeline(modalForIdea);
            addActivity({
                type: 'idea_saved',
                title: modalForIdea.title,
                link: '/dashboard/pipeline'
            });
            setModalForIdea(null);
            navigate('/dashboard/pipeline');
        }
    };

  const handlePriorityChange = (ideaTitle: string, priority: 'High' | 'Medium' | 'Low') => {
    const updateWithPriority = (ideas: GeneratedIdea[]) =>
      ideas.map(idea =>
        idea.title === ideaTitle ? { ...idea, priority } : idea
      );

    setGeneratedIdeas(prev => updateWithPriority(prev));
    updateSavedIdeas(updateWithPriority(savedIdeas));
  };

  const priorityOrder = { High: 1, Medium: 2, Low: 3 };

  const sortedGeneratedIdeas = useMemo(() => {
    return [...generatedIdeas].sort((a, b) => {
        const priorityA = a.priority ? priorityOrder[a.priority] : 4;
        const priorityB = b.priority ? priorityOrder[b.priority] : 4;
        return priorityA - priorityB;
    });
  }, [generatedIdeas]);

  const sortedSavedIdeas = useMemo(() => {
    return [...savedIdeas].sort((a, b) => {
        const priorityA = a.priority ? priorityOrder[a.priority] : 4;
        const priorityB = b.priority ? priorityOrder[b.priority] : 4;
        return priorityA - priorityB;
    });
  }, [savedIdeas]);
  
  const isIdeaHandled = useMemo(() => {
    return (idea: GeneratedIdea) => 
      savedIdeas.some(s => s.title === idea.title) || 
      pipelineProjects.some(p => p.title === idea.title);
  }, [savedIdeas, pipelineProjects]);


  const GapScoreBadge = ({ score }: { score: number }) => {
    const getColor = () => {
        if (score >= 8) return 'bg-green-100 text-green-800';
        if (score >= 5) return 'bg-yellow-100 text-yellow-800';
        return 'bg-red-100 text-red-800';
    }
    return (
        <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${getColor()}`}>
            Gap Score: {score}/10
        </span>
    )
  }

  const PriorityBadge = ({ priority }: { priority: 'High' | 'Medium' | 'Low' }) => {
    const styles = {
        High: 'bg-red-100 text-red-800',
        Medium: 'bg-yellow-100 text-yellow-800',
        Low: 'bg-gray-200 text-gray-800',
    };
    return (
        <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${styles[priority]}`}>
            {priority}
        </span>
    );
  };
  
  const PrioritySelector = ({ idea }: { idea: GeneratedIdea }) => (
    <div className="relative">
        <select
            value={idea.priority || ''}
            onChange={(e) => {
                if (e.target.value) {
                    handlePriorityChange(idea.title, e.target.value as 'High' | 'Medium' | 'Low')
                }
            }}
            className="font-semibold text-brand-dark-grey bg-white border border-brand-light-grey rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-brand-medium-teal focus:border-transparent outline-none appearance-none"
            aria-label={`Set priority for ${idea.title}`}
        >
            <option value="" disabled>Set Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
    </div>
  );

  const NextStepModal = () => {
    if (!modalForIdea) return null;
    return (
        <div 
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 transition-opacity duration-300" 
          aria-modal="true" 
          role="dialog"
          onClick={() => setModalForIdea(null)}
        >
          <div 
            className="bg-brand-off-white rounded-xl shadow-2xl w-full max-w-lg transform transition-all duration-300"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-8 text-center">
                <h2 className="text-2xl font-bold text-brand-dark-teal">
                    Idea Saved!
                </h2>
                <p className="mt-2 text-brand-dark-grey">
                    You've saved "<span className="font-semibold">{modalForIdea.title}</span>". What's next?
                </p>

                <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
                     <button
                        onClick={handleAddToPipelineAndGo}
                        className="bg-brand-medium-teal text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-brand-teal transition-colors w-full sm:w-auto"
                    >
                        Add and Go to R&D Pipeline
                    </button>
                    <button
                        onClick={handleSaveAndBrowse}
                        className="bg-brand-light-grey text-brand-dark-grey font-semibold px-6 py-3 rounded-lg hover:bg-brand-grey transition-colors w-full sm:w-auto"
                    >
                        Save and Keep Browsing
                    </button>
                </div>
            </div>
          </div>
        </div>
    );
  };


  return (
    <main className="py-12 bg-brand-light-gray-blue min-h-[calc(100vh-200px)]">
      <NextStepModal />
      <div className={`fixed bottom-5 right-5 bg-brand-dark-teal text-white px-6 py-3 rounded-lg shadow-lg transition-transform duration-500 z-50 ${toastMessage ? 'translate-x-0' : 'translate-x-[calc(100%+2.5rem)]'}`}>
          {toastMessage}
      </div>
      <div className="container mx-auto px-6 max-w-4xl">
        <header className="mb-10 text-center">
            <h1 className="text-4xl font-bold text-brand-dark-teal">Unique Idea Formulator</h1>
            <p className="mt-2 text-lg text-brand-dark-grey">Generate novel research ideas with high research gap potential.</p>
        </header>

        <div className="bg-brand-off-white p-8 rounded-xl shadow-lg border border-brand-light-grey">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="baseTopic" className="block text-sm font-medium text-brand-dark-grey mb-1">Research Area</label>
              <input
                id="baseTopic"
                type="text"
                value={baseTopic}
                onChange={(e) => setBaseTopic(e.target.value)}
                placeholder="Enter a broad research area, e.g., 'Graphene applications'"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-medium-teal focus:border-transparent outline-none transition"
                disabled={isLoading}
              />
            </div>
             <div className="flex items-center gap-2 pt-2">
                <input
                    id="industrial-relevance"
                    type="checkbox"
                    checked={prioritizeIndustrial}
                    onChange={(e) => setPrioritizeIndustrial(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-brand-medium-teal focus:ring-brand-medium-teal focus:ring-offset-0"
                    disabled={isLoading}
                />
                <label htmlFor="industrial-relevance" className="block text-sm font-medium text-brand-dark-grey">
                    Prioritize Industrial Applicability
                </label>
                <div className="group relative flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-brand-grey" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <div className="absolute bottom-full mb-2 w-64 bg-brand-dark-grey text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                        Filters for research with clear pathways to commercialization, focusing on scalability and practical lab/pilot-scale feasibility.
                        <svg className="absolute text-brand-dark-grey h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255"><polygon className="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
                    </div>
                </div>
            </div>
            <div>
              <label htmlFor="userContext" className="block text-sm font-medium text-brand-dark-grey mb-1">Contextualize with your own research (optional)</label>
               <div className="flex items-center gap-4 mb-2">
                <label htmlFor="file-upload" className={`cursor-pointer bg-white text-brand-dark-grey font-semibold px-4 py-2 rounded-lg border border-gray-300 hover:bg-brand-light-grey transition-colors ${isExtracting || isLoading ? 'cursor-not-allowed opacity-50' : ''}`}>
                    Upload Document
                </label>
                <input 
                    id="file-upload" 
                    name="file-upload" 
                    type="file" 
                    className="sr-only" 
                    onChange={handleFileChange}
                    accept=".txt,.md,.pdf,.doc,.docx"
                    disabled={isExtracting || isLoading}
                />
                {isExtracting && (
                  <div className="flex items-center text-sm text-brand-dark-grey">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-brand-medium-teal mr-2"></div>
                    <span>Extracting text from {fileName}...</span>
                  </div>
                )}
                {!isExtracting && fileName && <span className="text-sm text-brand-dark-grey truncate" title={fileName}>{fileName}</span>}
              </div>
              <textarea
                id="userContext"
                value={userContext}
                onChange={(e) => setUserContext(e.target.value)}
                rows={4}
                placeholder={isExtracting ? "Extracting text..." : "...or paste text from your papers, internal documents, etc."}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-medium-teal focus:border-transparent outline-none transition"
                disabled={isLoading || isExtracting}
              />
            </div>
            <div className="pt-2">
              <button
                type="submit"
                className="bg-brand-medium-teal text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-brand-teal disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                disabled={isLoading}
              >
                {isLoading ? 'Generating...' : 'Generate Ideas'}
              </button>
            </div>
          </form>
        </div>

        {error && <p className="mt-6 text-center text-red-600 bg-red-100 p-3 rounded-lg">{error}</p>}
        
        <div className="mt-10 space-y-6">
            {isLoading && (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-medium-teal"></div>
              </div>
            )}
            {sortedGeneratedIdeas.map((idea, index) => {
              const ideaIsSaved = savedIdeas.some(s => s.title === idea.title);
              const ideaInPipeline = pipelineProjects.some(p => p.title === idea.title);
              const ideaHandled = ideaIsSaved || ideaInPipeline;
              const buttonText = ideaInPipeline ? '✓ In Pipeline' : ideaIsSaved ? '✓ Saved' : 'Save Idea';

              return (
                <div key={index} className="bg-brand-off-white p-6 rounded-xl shadow-md border border-brand-light-grey">
                    <div className="flex justify-between items-start gap-4">
                        <div className="flex-grow">
                           <h3 className="text-xl font-bold text-brand-dark-teal">{idea.title}</h3>
                           <p className="mt-2 text-brand-dark-grey">{idea.overview}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                            <GapScoreBadge score={idea.gapScore} />
                            {idea.priority && <PriorityBadge priority={idea.priority} />}
                        </div>
                    </div>
                    <div className="mt-4">
                        <h4 className="font-semibold text-brand-dark-grey">Supporting Literature:</h4>
                        <ul className="mt-2 list-disc list-outside pl-5 text-brand-dark-grey space-y-1">
                            {idea.literature.map((lit, i) => <li key={i}>{lit}</li>)}
                        </ul>
                    </div>
                    <div className="mt-6 flex flex-wrap items-center gap-4">
                        <button 
                            onClick={() => setAnalyzingIdea(analyzingIdea?.title === idea.title ? null : idea)}
                            className="font-semibold text-brand-medium-teal hover:text-brand-teal transition-colors"
                        >
                           {analyzingIdea?.title === idea.title ? 'Hide Analysis' : 'Analyze Literature'} &rarr;
                        </button>
                        <button
                            onClick={() => handleShare(idea)}
                             className={`font-semibold transition-colors ${
                                copiedIdea === idea.title
                                    ? 'text-brand-seafoam cursor-default'
                                    : 'text-brand-dark-grey hover:text-brand-medium-teal'
                            }`}
                            disabled={copiedIdea === idea.title}
                        >
                            {copiedIdea === idea.title ? 'Copied!' : 'Share'}
                        </button>
                        <button
                          onClick={() => openModalForIdea(idea)}
                          disabled={ideaHandled}
                          className={`font-semibold transition-colors ${
                            ideaHandled
                              ? 'text-brand-seafoam cursor-default'
                              : 'text-brand-dark-grey hover:text-brand-medium-teal'
                          }`}
                        >
                          {buttonText}
                        </button>
                        <PrioritySelector idea={idea} />
                    </div>
                    {analyzingIdea?.title === idea.title && (
                       <div className="mt-4 pt-4 border-t border-brand-light-grey">
                         <RetaserMatrix literature={idea.literature} baseTopic={baseTopic} userContext={userContext} isIndustrial={idea.isIndustrial} />
                       </div>
                    )}
                </div>
            )})}
        </div>

        {savedIdeas.length > 0 && (
          <div className="mt-16 pt-10 border-t-2 border-brand-light-gray-blue">
            <header className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-brand-dark-teal">Your Saved Ideas</h2>
              <p className="mt-1 text-lg text-brand-dark-grey">Review and manage your bookmarked ideas.</p>
            </header>
            <div className="space-y-6">
              {sortedSavedIdeas.map((idea, index) => {
                const isInPipeline = pipelineProjects.some(p => p.title === idea.title);
                return (
                    <div key={index} className="bg-brand-off-white p-6 rounded-xl shadow-md border border-brand-light-grey">
                    <div className="flex justify-between items-start gap-4">
                        <div className="flex-grow">
                        <h3 className="text-xl font-bold text-brand-dark-teal">{idea.title}</h3>
                        <p className="mt-2 text-brand-dark-grey">{idea.overview}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                            <GapScoreBadge score={idea.gapScore} />
                            {idea.priority && <PriorityBadge priority={idea.priority} />}
                        </div>
                    </div>
                    <div className="mt-4">
                        <h4 className="font-semibold text-brand-dark-grey">Supporting Literature:</h4>
                        <ul className="mt-2 list-disc list-outside pl-5 text-brand-dark-grey space-y-1">
                        {idea.literature.map((lit, i) => <li key={i}>{lit}</li>)}
                        </ul>
                    </div>
                    <div className="mt-6 flex flex-wrap items-center gap-4">
                        <button
                            onClick={() => handleAddToPipeline(idea)}
                            disabled={isInPipeline}
                            className="bg-brand-medium-teal/10 text-brand-medium-teal font-bold px-4 py-2 rounded-lg hover:bg-brand-medium-teal/20 transition-colors disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                        >
                            {isInPipeline ? '✓ In Pipeline' : 'Add to Pipeline'}
                        </button>
                        <button
                        onClick={() => handleShare(idea)}
                        className="font-semibold text-brand-dark-grey hover:text-brand-medium-teal"
                        >
                        Share
                        </button>
                        <button
                        onClick={() => handleRemoveSavedIdea(idea)}
                        className="font-semibold text-red-600 hover:text-red-700 transition-colors"
                        >
                        Remove
                        </button>
                        <PrioritySelector idea={idea} />
                    </div>
                    </div>
                )
            })}
            </div>
          </div>
        )}

      </div>
    </main>
  );
};

export default IdeaGeneratorPage;