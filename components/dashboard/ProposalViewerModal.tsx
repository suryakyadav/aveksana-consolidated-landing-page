import React, { useState, useEffect } from 'react';

interface ProposalViewerModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    isLoading: boolean;
    error: string | null;
    content: string | null;
    onAppend: (text: string) => void;
}

const ProposalViewerModal: React.FC<ProposalViewerModalProps> = ({ isOpen, onClose, title, isLoading, error, content, onAppend }) => {
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            setIsCopied(false);
        }
    }, [isOpen]);

    const handleCopy = () => {
        if (content) {
            navigator.clipboard.writeText(content).then(() => {
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
            });
        }
    };

    const handleDownload = () => {
        if (content) {
            const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${title.replace(/\s+/g, '_')}.txt`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }
    };
    
    const handleAppend = () => {
        if (content) {
            onAppend(content);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose} aria-modal="true" role="dialog">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl flex flex-col h-[90vh]" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-brand-light-grey flex-shrink-0">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-brand-dark-teal">{title}</h3>
                        <button onClick={onClose} aria-label="Close modal" className="text-brand-grey text-3xl leading-none hover:text-brand-dark-grey">&times;</button>
                    </div>
                </div>
                <div className="p-6 flex-grow overflow-y-auto">
                    {isLoading && (
                        <div className="flex justify-center items-center h-full">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-medium-teal"></div>
                        </div>
                    )}
                    {error && <p className="text-red-600 bg-red-100 p-4 rounded-md whitespace-pre-wrap">{error}</p>}
                    {!isLoading && !error && content && (
                        <div className="bg-brand-light-gray-blue/50 p-6 rounded-lg">
                            <pre className="text-brand-dark-grey whitespace-pre-wrap font-sans text-sm">{content}</pre>
                        </div>
                    )}
                </div>
                <div className="p-6 border-t border-brand-light-grey flex flex-col sm:flex-row justify-end items-center gap-4 flex-shrink-0">
                     <button 
                        onClick={handleCopy} 
                        disabled={isCopied || !content}
                        className="font-semibold text-brand-dark-grey hover:text-brand-medium-teal transition-colors disabled:text-brand-seafoam"
                    >
                        {isCopied ? 'Copied!' : 'Copy to Clipboard'}
                    </button>
                    <button 
                        onClick={handleDownload} 
                        disabled={!content}
                        className="font-semibold text-brand-dark-grey hover:text-brand-medium-teal transition-colors disabled:opacity-50"
                    >
                        Download as .txt
                    </button>
                    <button 
                        onClick={handleAppend} 
                        disabled={!content}
                        className="bg-brand-medium-teal text-white font-semibold px-6 py-2.5 rounded-lg shadow-md hover:bg-brand-teal transition-colors disabled:bg-gray-400"
                    >
                        Append to Scratchpad
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProposalViewerModal;
