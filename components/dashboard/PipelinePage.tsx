
import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import type { PipelineStatus, PipelineProject } from '../../types';
import { Link } from 'react-router-dom';

const GapScoreBadge = ({ score }: { score: number }) => {
    const getColor = () => {
        if (score >= 8) return 'bg-green-100 text-green-800';
        if (score >= 5) return 'bg-yellow-100 text-yellow-800';
        return 'bg-red-100 text-red-800';
    }
    return (
        <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getColor()}`}>
            Gap: {score}/10
        </span>
    )
};

const ProjectCard: React.FC<{ project: PipelineProject; onDragStart: (e: React.DragEvent<HTMLDivElement>, projectTitle: string) => void }> = ({ project, onDragStart }) => (
    <Link to={`/dashboard/project/${encodeURIComponent(project.title)}`} className="block">
        <div 
            draggable
            onDragStart={(e) => onDragStart(e, project.title)}
            className="bg-white p-4 rounded-lg shadow-sm border border-brand-light-grey mb-4 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow">
            <h4 className="font-bold text-brand-dark-teal text-md">{project.title}</h4>
            <p className="text-sm text-brand-dark-grey mt-1 line-clamp-2">{project.overview}</p>
            <div className="mt-3 flex justify-between items-center">
                <GapScoreBadge score={project.gapScore} />
                {project.priority && (
                    <span className={`text-xs font-bold ${project.priority === 'High' ? 'text-red-600' : project.priority === 'Medium' ? 'text-yellow-600' : 'text-gray-500'}`}>
                        {project.priority} Priority
                    </span>
                )}
            </div>
        </div>
    </Link>
);

const PipelineColumn: React.FC<{ 
    title: PipelineStatus, 
    projects: PipelineProject[], 
    color: string,
    onDragStart: (e: React.DragEvent<HTMLDivElement>, projectTitle: string) => void,
    onDrop: (e: React.DragEvent<HTMLDivElement>, status: PipelineStatus) => void,
}> = ({ title, projects, color, onDragStart, onDrop }) => {
    const [isDraggedOver, setIsDraggedOver] = useState(false);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDraggedOver(true);
    };

    const handleDragLeave = () => {
        setIsDraggedOver(false);
    };

    const handleDropInternal = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        onDrop(e, title);
        setIsDraggedOver(false);
    };
    
    return (
    <div 
        className={`bg-brand-light-gray-blue/70 rounded-lg p-4 w-full md:w-1/4 flex-shrink-0 transition-all duration-300 ease-in-out ${isDraggedOver ? 'bg-brand-light-gray-blue ring-2 ring-brand-medium-teal' : 'ring-0 ring-transparent'}`}
        onDragOver={handleDragOver}
        onDrop={handleDropInternal}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        >
        <div className={`flex justify-between items-center mb-4 pb-2 border-b-4 ${color}`}>
            <h3 className="font-bold text-brand-dark-teal uppercase tracking-wide">{title}</h3>
            <span className="bg-gray-300 text-gray-700 text-sm font-semibold rounded-full px-2 py-0.5">{projects.length}</span>
        </div>
        <div className="h-[60vh] overflow-y-auto pr-2">
            {projects.length > 0 ? (
                projects.map(project => <ProjectCard key={project.title} project={project} onDragStart={onDragStart} />)
            ) : (
                <div className="text-center text-sm text-brand-grey py-8">
                    <p>No projects in this stage.</p>
                </div>
            )}
        </div>
    </div>
);
}

const PipelinePage = () => {
    const { user, updateProjectStatus } = useAuth();
    const projects = user?.pipelineProjects || [];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, projectTitle: string) => {
        e.dataTransfer.setData("projectTitle", projectTitle);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, newStatus: PipelineStatus) => {
        const projectTitle = e.dataTransfer.getData("projectTitle");
        const currentProject = projects.find(p => p.title === projectTitle);
        
        if (projectTitle && currentProject && currentProject.status !== newStatus) {
            updateProjectStatus(projectTitle, newStatus);
        }
    };

    const columns: { title: PipelineStatus; color: string }[] = [
        { title: 'Ideation', color: 'border-blue-400' },
        { title: 'Proposal Development', color: 'border-purple-400' },
        { title: 'Under Review', color: 'border-yellow-400' },
        { title: 'Approved', color: 'border-green-400' },
    ];

    const projectsByStatus = useMemo(() => {
        const grouped: Record<PipelineStatus, PipelineProject[]> = {
            'Ideation': [],
            'Proposal Development': [],
            'Under Review': [],
            'Approved': [],
        };
        projects.forEach(project => {
            if (grouped[project.status]) {
                grouped[project.status].push(project);
            }
        });
        return grouped;
    }, [projects]);

    const getHeaderContent = () => {
        if (user?.role === 'admin') {
            return {
                title: "Global R&D Pipeline",
                desc: "Overview of all innovation projects across the organization."
            };
        } else if (user?.role === 'team_lead' || user?.role === 'supervisor') {
             return {
                title: "Team Innovation Pipeline",
                desc: "Monitor and manage your team's project lifecycle."
            };
        }
        return {
            title: "My R&D Project Pipeline",
            desc: "Visualize your personal innovation pipeline, from initial ideation to funded projects."
        };
    };

    const { title, desc } = getHeaderContent();
    
    return (
        <main className="py-12 bg-brand-light-gray-blue min-h-[calc(100vh-150px)]">
            <div className="container mx-auto px-6">
                <header className="mb-8 flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-bold text-brand-dark-teal">{title}</h1>
                        <p className="mt-2 text-lg text-brand-dark-grey">{desc}</p>
                    </div>
                     {(user?.role === 'admin' || user?.role === 'team_lead') && (
                        <div className="hidden md:flex items-center gap-2">
                            <span className="text-sm text-brand-dark-grey font-semibold">View:</span>
                            <select className="bg-white border border-brand-light-grey rounded-md px-3 py-1 text-sm text-brand-dark-grey focus:ring-2 focus:ring-brand-medium-teal outline-none">
                                <option>All Projects</option>
                                <option>My Projects</option>
                                <option>Team Alpha</option>
                                <option>Team Beta</option>
                            </select>
                        </div>
                     )}
                </header>
                
                {projects.length === 0 ? (
                    <div className="bg-brand-off-white text-center p-12 rounded-xl shadow-lg border border-brand-light-grey">
                        <h2 className="text-2xl font-bold text-brand-dark-teal">Your Pipeline is Empty</h2>
                        <p className="mt-2 text-brand-dark-grey">Start by generating and saving some ideas in the Idea Formulator.</p>
                        <Link to="/dashboard/idea-generator" className="mt-6 inline-block bg-brand-medium-teal text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-brand-teal transition-colors">
                            Go to Idea Formulator &rarr;
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row gap-6">
                        {columns.map(col => (
                            <PipelineColumn 
                                key={col.title}
                                title={col.title}
                                projects={projectsByStatus[col.title]}
                                color={col.color}
                                onDragStart={handleDragStart}
                                onDrop={handleDrop}
                            />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default PipelinePage;
