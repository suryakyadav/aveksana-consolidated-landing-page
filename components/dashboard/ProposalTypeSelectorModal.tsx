import React from 'react';

interface ProposalTypeSelectorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (type: 'technical' | 'grant') => void;
}

const ProposalTypeSelectorModal: React.FC<ProposalTypeSelectorModalProps> = ({ isOpen, onClose, onSelect }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose} aria-modal="true" role="dialog">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg transform transition-all" onClick={e => e.stopPropagation()}>
                <div className="p-8 text-center">
                    <h2 className="text-2xl font-bold text-brand-dark-teal">Generate a Proposal</h2>
                    <p className="mt-2 text-brand-dark-grey">Choose the type of proposal you want to generate. The AI will use the project details you've already filled out.</p>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                            onClick={() => onSelect('technical')}
                            className="w-full p-6 bg-brand-light-gray-blue/60 rounded-lg border-2 border-transparent hover:border-brand-medium-teal hover:bg-brand-light-gray-blue transition-all"
                        >
                            <h3 className="font-bold text-lg text-brand-dark-teal">Technical R&D Plan</h3>
                            <p className="text-sm text-brand-dark-grey mt-1">A concise plan for lab-level experiments and internal review.</p>
                        </button>
                        <button
                            onClick={() => onSelect('grant')}
                            className="w-full p-6 bg-brand-light-gray-blue/60 rounded-lg border-2 border-transparent hover:border-brand-medium-teal hover:bg-brand-light-gray-blue transition-all"
                        >
                            <h3 className="font-bold text-lg text-brand-dark-teal">Full Grant Application</h3>
                            <p className="text-sm text-brand-dark-grey mt-1">A comprehensive proposal for funding bodies, including commercial and impact sections.</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProposalTypeSelectorModal;
