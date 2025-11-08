

import React, { useState, useEffect } from 'react';
import { analyzeLiterature } from '../../services/geminiService';
import type { LiteratureAnalysis } from '../../types';
import { ThumbUpIcon, ThumbDownIcon } from '../icons';

interface RetaserMatrixProps {
  literature: string[];
  baseTopic: string;
  userContext?: string;
  isIndustrial?: boolean;
}

const RetaserMatrix: React.FC<RetaserMatrixProps> = ({ literature, baseTopic, userContext, isIndustrial }) => {
  const [analysis, setAnalysis] = useState<LiteratureAnalysis[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Record<string, 'good' | 'bad'>>({});

  useEffect(() => {
    const fetchAnalysis = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await analyzeLiterature(literature, baseTopic, userContext, isIndustrial);
        setAnalysis(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred during analysis.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalysis();
  }, [literature, baseTopic, userContext, isIndustrial]);
  
  const handleFeedback = (title: string, rating: 'good' | 'bad') => {
    setFeedback(prev => ({
        ...prev,
        [title]: rating,
    }));
    console.log(`Feedback for industrial relevance of "${title}": ${rating}. This can be used to refine future results for the topic "${baseTopic}".`);
  };

  if (isLoading) {
    return (
        <div className="flex items-center space-x-2 text-brand-dark-grey">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-brand-medium-teal"></div>
            <span>Analyzing literature...</span>
        </div>
    );
  }

  if (error) {
    return <p className="text-red-600 bg-red-50 p-3 rounded-md">{error}</p>;
  }

  return (
    <div>
        <h4 className="text-lg font-bold text-brand-dark-teal mb-4">Literature Analysis Matrix</h4>
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-brand-light-grey rounded-lg">
                <thead className="bg-brand-light-gray-blue">
                    <tr>
                        <th className="text-left py-3 px-4 font-semibold text-sm text-brand-dark-teal uppercase tracking-wider">Title</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm text-brand-dark-teal uppercase tracking-wider">Summary</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm text-brand-dark-teal uppercase tracking-wider">Methodology</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm text-brand-dark-teal uppercase tracking-wider">Relevance</th>
                        {isIndustrial && <th className="text-left py-3 px-4 font-semibold text-sm text-brand-dark-teal uppercase tracking-wider">Relevance Feedback</th>}
                    </tr>
                </thead>
                <tbody className="text-brand-dark-grey">
                    {analysis.map((item, index) => (
                        <tr key={index} className="border-b border-brand-light-grey last:border-b-0 hover:bg-brand-light-gray-blue/50">
                            <td className="py-3 px-4 text-sm font-medium">
                                {item.link ? (
                                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-brand-medium-teal hover:underline hover:text-brand-teal">
                                        {item.title}
                                    </a>
                                ) : (
                                    item.title
                                )}
                            </td>
                            <td className="py-3 px-4 text-sm">{item.summary}</td>
                            <td className="py-3 px-4 text-sm">
                                <span className="px-2 py-1 bg-brand-light-grey text-brand-dark-grey rounded-full text-xs font-medium">{item.methodology}</span>
                            </td>
                            <td className="py-3 px-4 text-sm font-semibold text-brand-teal">{item.relevance}%</td>
                            {isIndustrial && (
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-2">
                                        <button 
                                            onClick={() => handleFeedback(item.title, 'good')} 
                                            aria-label="Relevant" 
                                            className={`p-1 rounded-full transition-colors ${feedback[item.title] === 'good' ? 'bg-green-100 text-green-600' : 'text-gray-400 hover:bg-gray-200'}`}
                                        >
                                            <ThumbUpIcon />
                                        </button>
                                        <button 
                                            onClick={() => handleFeedback(item.title, 'bad')} 
                                            aria-label="Not Relevant" 
                                            className={`p-1 rounded-full transition-colors ${feedback[item.title] === 'bad' ? 'bg-red-100 text-red-600' : 'text-gray-400 hover:bg-gray-200'}`}
                                        >
                                            <ThumbDownIcon />
                                        </button>
                                    </div>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default RetaserMatrix;
