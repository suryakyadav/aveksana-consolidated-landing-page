import React, { useState, useEffect } from 'react';

interface TextAssistantModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    isLoading: boolean;
    error: string | null;
    content: string | null;
    onAccept: (text: string) => void;
}

const TextAssistantModal: React.FC<TextAssistantModalProps> = ({
    isOpen,
    onClose,
    title,
    isLoading,
    error,
    content,
    onAccept
}) => {
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
    
    const handleAccept = () => {
        if (content) {
            onAccept(content);
        }
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose} aria-modal="true" role="dialog">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl transform transition-all" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-brand-light-grey">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-brand-dark-teal">{title}</h3>
                        <button onClick={onClose} aria-label="Close modal" className="text-brand-grey text-3xl leading-none hover:text-brand-dark-grey">&times;</button>
                    </div>
                </div>
                <div className="p-6 max-h-[60vh] overflow-y-auto">
                    {isLoading && (
                        <div className="flex justify-center items-center py-10">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-medium-teal"></div>
                        </div>
                    )}
                    {error && <p className="text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}
                    {!isLoading && !error && content && (
                        <div className="bg-brand-light-gray-blue/50 p-4 rounded-lg">
                            <p className="text-brand-dark-grey whitespace-pre-wrap">{content}</p>
                        </div>
                    )}
                </div>
                <div className="p-6 border-t border-brand-light-grey flex flex-col sm:flex-row justify-end items-center gap-4">
                     <button 
                        onClick={handleCopy} 
                        disabled={isCopied || !content}
                        className="font-semibold text-brand-dark-grey hover:text-brand-medium-teal transition-colors disabled:text-brand-seafoam"
                    >
                        {isCopied ? 'Copied!' : 'Copy Text'}
                    </button>
                    <button 
                        onClick={handleAccept} 
                        disabled={!content}
                        className="bg-brand-medium-teal text-white font-semibold px-6 py-2.5 rounded-lg shadow-md hover:bg-brand-teal transition-colors disabled:bg-gray-400"
                    >
                        Accept and Use This Text
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TextAssistantModal;