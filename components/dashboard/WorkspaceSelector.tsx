
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UsersIcon, RDPortalIcon, ChevronDownIcon } from '../icons';

const WorkspaceSelector = () => {
    const { activeWorkspace, availableWorkspaces, switchWorkspace } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (!activeWorkspace || availableWorkspaces.length <= 1) return null;

    return (
        <div className="relative" ref={ref}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-brand-dark-grey hover:text-brand-medium-teal font-semibold transition-colors px-3 py-2 rounded-lg hover:bg-brand-light-gray-blue/50"
            >
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-light-gray-blue text-brand-dark-teal text-xs">
                    {activeWorkspace.type === 'Personal' ? 'P' : activeWorkspace.name.charAt(0)}
                </span>
                <span className="max-w-[150px] truncate text-sm">{activeWorkspace.name}</span>
                <ChevronDownIcon />
            </button>

            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-brand-light-grey overflow-hidden z-50">
                    <div className="bg-brand-light-gray-blue/30 px-4 py-2 border-b border-brand-light-grey">
                        <span className="text-xs font-bold text-brand-grey uppercase tracking-wider">Switch Workspace</span>
                    </div>
                    <div className="py-1">
                        {availableWorkspaces.map(ws => (
                            <button
                                key={ws.id}
                                onClick={() => { switchWorkspace(ws.id); setIsOpen(false); }}
                                className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-brand-light-gray-blue/50 transition-colors ${ws.id === activeWorkspace.id ? 'bg-brand-light-gray-blue/30' : ''}`}
                            >
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${ws.type === 'Personal' ? 'bg-blue-100 text-blue-600' : 'bg-brand-medium-teal/10 text-brand-medium-teal'}`}>
                                    {ws.type === 'Personal' ? <UsersIcon className="h-4 w-4" /> : <RDPortalIcon className="h-4 w-4" />}
                                </div>
                                <div className="min-w-0">
                                    <p className={`text-sm font-semibold truncate ${ws.id === activeWorkspace.id ? 'text-brand-dark-teal' : 'text-brand-dark-grey'}`}>
                                        {ws.name}
                                    </p>
                                    <p className="text-xs text-brand-grey truncate">
                                        {ws.roles.join(', ').replace('_', ' ')}
                                    </p>
                                </div>
                                {ws.id === activeWorkspace.id && (
                                    <div className="ml-auto text-brand-medium-teal">✓</div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default WorkspaceSelector;
