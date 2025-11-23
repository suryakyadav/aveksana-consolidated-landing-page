
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChartBarIcon, UsersIcon, TrendingUpIcon, CurrencyDollarIcon, LightbulbIcon, CheckCircleIcon, InformationCircleIcon, CalendarIcon, DocumentIcon, StarIcon, ExclamationCircleIcon } from '../icons';

// Mock Data for Analytics
const TEAM_MEMBERS = [
    { name: 'Dr. Alex Riley', role: 'Senior Researcher', activeProjects: 4, grantsWon: '$150k', lastActive: '2 hours ago' },
    { name: 'Sarah Chen', role: 'Researcher', activeProjects: 2, grantsWon: '$50k', lastActive: '5 hours ago' },
    { name: 'Marcus Johnson', role: 'Postdoc', activeProjects: 3, grantsWon: '$0', lastActive: '1 day ago' },
    { name: 'Emily Davis', role: 'PhD Candidate', activeProjects: 1, grantsWon: '$10k', lastActive: '3 days ago' },
    { name: 'Dr. James Wilson', role: 'Senior Researcher', activeProjects: 5, grantsWon: '$220k', lastActive: 'Just now' },
];

const PIPELINE_STATS = [
    { label: 'Ideation', count: 12, color: 'bg-blue-500' },
    { label: 'Proposal Dev', count: 8, color: 'bg-purple-500' },
    { label: 'Under Review', count: 5, color: 'bg-yellow-500' },
    { label: 'Approved', count: 3, color: 'bg-green-500' },
];

const MONTHLY_ACTIVITY = [
    { month: 'Jan', ideas: 15, proposals: 2 },
    { month: 'Feb', ideas: 22, proposals: 5 },
    { month: 'Mar', ideas: 18, proposals: 8 },
    { month: 'Apr', ideas: 25, proposals: 12 },
    { month: 'May', ideas: 30, proposals: 15 },
    { month: 'Jun', ideas: 28, proposals: 10 },
];

const InfoTooltip: React.FC<{ text: React.ReactNode }> = ({ text }) => (
    <div className="group relative inline-flex items-center ml-2">
        <InformationCircleIcon className="h-5 w-5 text-brand-grey cursor-help hover:text-brand-medium-teal transition-colors" />
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-brand-dark-teal text-white text-xs rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none shadow-lg">
            {text}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-brand-dark-teal"></div>
        </div>
    </div>
);


const AnalyticsCard: React.FC<{ title: string; value: string; icon: React.ReactNode; trend: string; trendUp: boolean; tooltipText: string }> = ({ title, value, icon, trend, trendUp, tooltipText }) => (
    <div className="bg-brand-off-white p-6 rounded-xl shadow-sm border border-brand-light-grey">
        <div className="flex justify-between items-start">
            <div>
                <div className="flex items-center">
                    <p className="text-brand-dark-grey font-medium text-sm">{title}</p>
                    <InfoTooltip text={tooltipText} />
                </div>
                <h3 className="text-3xl font-bold text-brand-dark-teal mt-1">{value}</h3>
            </div>
            <div className="bg-brand-light-gray-blue p-3 rounded-lg text-brand-medium-teal">
                {icon}
            </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
            <span className={`font-semibold mr-2 ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
                {trendUp ? '↑' : '↓'} {trend}
            </span>
            <span className="text-brand-grey">vs last month</span>
        </div>
    </div>
);

const PipelineChart = () => (
    <div className="flex flex-col h-64 justify-end space-y-2">
        <div className="flex justify-between items-end h-full px-4 gap-4">
            {PIPELINE_STATS.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center w-full group">
                    <div className="relative w-full flex justify-center">
                         <div 
                             className={`w-full max-w-[60px] rounded-t-lg transition-all duration-500 hover:opacity-80 ${stat.color}`} 
                             style={{ height: `${(stat.count / 15) * 200}px` }}
                         ></div>
                         <div className="absolute -top-8 bg-brand-dark-teal text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                             {stat.count} Projects
                         </div>
                    </div>
                    <p className="text-xs text-brand-dark-grey font-medium mt-3 text-center">{stat.label}</p>
                </div>
            ))}
        </div>
    </div>
);

const InnovationVelocityChart = () => {
    // Simple SVG Line Chart
    const width = 100;
    const height = 50;
    const maxVal = 35; 
    
    // Normalize data to fit viewBox 0 0 100 50
    const pointsIdeas = MONTHLY_ACTIVITY.map((d, i) => {
        const x = (i / (MONTHLY_ACTIVITY.length - 1)) * width;
        const y = height - (d.ideas / maxVal) * height;
        return `${x},${y}`;
    }).join(' ');

    const pointsProposals = MONTHLY_ACTIVITY.map((d, i) => {
        const x = (i / (MONTHLY_ACTIVITY.length - 1)) * width;
        const y = height - (d.proposals / maxVal) * height;
        return `${x},${y}`;
    }).join(' ');

    return (
        <div className="relative h-64 w-full">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible" preserveAspectRatio="none">
                 {/* Grid lines */}
                {[0, 1, 2, 3, 4].map(i => (
                    <line key={i} x1="0" y1={i * 10} x2="100" y2={i * 10} stroke="#e5e7eb" strokeWidth="0.5" />
                ))}
                
                {/* Lines */}
                <polyline fill="none" stroke="#01949A" strokeWidth="1.5" points={pointsIdeas} />
                <polyline fill="none" stroke="#49C3A3" strokeWidth="1.5" points={pointsProposals} />

                {/* Points */}
                {MONTHLY_ACTIVITY.map((d, i) => (
                     <g key={i}>
                        <circle cx={(i / (MONTHLY_ACTIVITY.length - 1)) * width} cy={height - (d.ideas / maxVal) * height} r="1.5" fill="#01949A" />
                        <circle cx={(i / (MONTHLY_ACTIVITY.length - 1)) * width} cy={height - (d.proposals / maxVal) * height} r="1.5" fill="#49C3A3" />
                     </g>
                ))}
            </svg>
            
            {/* Legend/Labels */}
             <div className="flex justify-between text-xs text-brand-grey mt-2">
                {MONTHLY_ACTIVITY.map(d => <span key={d.month}>{d.month}</span>)}
            </div>
             <div className="absolute top-0 right-0 flex gap-4 text-xs">
                <div className="flex items-center gap-1">
                    <span className="w-3 h-3 bg-brand-medium-teal rounded-full"></span>
                    <span>Ideas Generated</span>
                </div>
                 <div className="flex items-center gap-1">
                    <span className="w-3 h-3 bg-brand-seafoam rounded-full"></span>
                    <span>Proposals Submitted</span>
                </div>
            </div>
        </div>
    );
};

interface ActionItem {
    title: string;
    priority: 'High' | 'Medium' | 'Low';
    description: string;
    buttonText: string;
    actionType: 'meeting' | 'report';
}

const ActionItemCard: React.FC<{ action: ActionItem; onAction: (text: string) => void }> = ({ action, onAction }) => {
    const priorityColors = {
        High: 'bg-red-100 text-red-800',
        Medium: 'bg-yellow-100 text-yellow-800',
        Low: 'bg-blue-100 text-blue-800'
    };

    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-white rounded-lg border border-brand-light-grey shadow-sm hover:shadow-md transition-shadow">
            <div className="flex-grow">
                <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${priorityColors[action.priority]}`}>
                        {action.priority}
                    </span>
                    <h4 className="font-bold text-brand-dark-teal text-sm">{action.title}</h4>
                </div>
                <p className="text-xs text-brand-dark-grey">{action.description}</p>
            </div>
            <button 
                onClick={() => onAction(`${action.buttonText} initiated.`)}
                className="flex-shrink-0 flex items-center gap-2 bg-brand-light-gray-blue text-brand-medium-teal hover:bg-brand-medium-teal hover:text-white px-3 py-2 rounded-md text-xs font-bold transition-colors"
            >
                {action.actionType === 'meeting' ? <CalendarIcon /> : <DocumentIcon />}
                {action.buttonText}
            </button>
        </div>
    );
};


const AnalyticsPage = () => {
    const [toastMessage, setToastMessage] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleAction = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(''), 3000);
    };

    const getPerformanceStatus = (member: typeof TEAM_MEMBERS[0]) => {
        const grantValue = parseInt(member.grantsWon.replace(/[^0-9]/g, '')) * (member.grantsWon.includes('k') ? 1000 : 1);
        
        if (member.activeProjects >= 4 || grantValue >= 100000) {
             return {
                label: 'Top Performer',
                style: 'bg-green-100 text-green-800 border-green-200',
                icon: <StarIcon />,
                reason: grantValue >= 100000 
                    ? `Grant funding ($${member.grantsWon}) exceeds the $100k target.`
                    : `Active project count (${member.activeProjects}) is in the top 10%.`
            };
        }
    
        if (member.activeProjects <= 1 && grantValue < 20000) {
            return {
                label: 'Needs Attention',
                style: 'bg-red-100 text-red-800 border-red-200',
                icon: <ExclamationCircleIcon className="h-4 w-4" />,
                reason: "Performance below threshold: < 2 projects and < $20k funding."
            };
        }
    
        return {
            label: 'On Track',
            style: 'bg-blue-50 text-blue-700 border-blue-100',
            icon: null,
            reason: "Consistent activity meeting role expectations."
        };
    };

    const pipelineActions: ActionItem[] = [
        {
            title: 'Pipeline Bottleneck Review',
            priority: 'High',
            description: "5 projects are currently in 'Under Review'. Schedule a team sync to unblock delays.",
            buttonText: 'Arrange Meeting',
            actionType: 'meeting'
        },
        {
            title: 'Grant Success Analysis',
            priority: 'Medium',
            description: "Approved projects are steady. Generate a report on successful proposal keywords.",
            buttonText: 'Prepare Report',
            actionType: 'report'
        }
    ];

    const velocityActions: ActionItem[] = [
        {
            title: 'Resource Allocation Check',
            priority: 'High',
            description: "Idea generation (30) is outpacing proposal writing (15). Review researcher bandwidth.",
            buttonText: 'Check Availability',
            actionType: 'meeting'
        },
        {
            title: 'Innovation Workshop',
            priority: 'Low',
            description: "Maintain idea velocity with a quarterly brainstorming session.",
            buttonText: 'Plan Workshop',
            actionType: 'meeting'
        }
    ];

    return (
        <main className="py-12 bg-brand-light-gray-blue min-h-[calc(100vh-200px)]">
             <div className={`fixed bottom-5 right-5 bg-brand-dark-teal text-white px-6 py-3 rounded-lg shadow-lg transition-transform duration-500 z-50 ${toastMessage ? 'translate-x-0' : 'translate-x-[calc(100%+2.5rem)]'}`}>
                {toastMessage}
            </div>
            <div className="container mx-auto px-6">
                <header className="mb-8">
                    <Link to="/dashboard" className="text-brand-grey hover:text-brand-medium-teal transition-colors mb-4 block">
                        &larr; Back to Dashboard
                    </Link>
                    <div className="flex justify-between items-end">
                        <div>
                            <h1 className="text-4xl font-bold text-brand-dark-teal">Team Analytics</h1>
                            <p className="mt-2 text-lg text-brand-dark-grey">Insights into your team's research output and pipeline health.</p>
                        </div>
                        <div className="bg-white border border-brand-light-grey rounded-lg px-4 py-2 text-sm text-brand-dark-grey shadow-sm">
                            Last updated: <span className="font-semibold text-brand-dark-teal">Today, 9:00 AM</span>
                        </div>
                    </div>
                </header>

                {/* KPI Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <AnalyticsCard 
                        title="Active Projects" 
                        value="28" 
                        icon={<ChartBarIcon />} 
                        trend="12%" 
                        trendUp={true}
                        tooltipText="The total number of projects currently in the pipeline across all stages, from Ideation to Approved." 
                    />
                    <AnalyticsCard 
                        title="Total Grants Secured" 
                        value="$430k" 
                        icon={<CurrencyDollarIcon />} 
                        trend="8%" 
                        trendUp={true}
                        tooltipText="The cumulative value of all grant proposals marked as 'Approved' in the current fiscal year."
                    />
                    <AnalyticsCard 
                        title="Ideas Generated" 
                        value="145" 
                        icon={<LightbulbIcon />} 
                        trend="5%" 
                        trendUp={true}
                        tooltipText="The total count of unique research ideas generated by your team using the Idea Formulator tool this month."
                    />
                     <AnalyticsCard 
                        title="Pipeline Conversion" 
                        value="24%" 
                        icon={<TrendingUpIcon />} 
                        trend="2%" 
                        trendUp={false}
                        tooltipText="The percentage of ideas that successfully move from the 'Ideation' phase to 'Proposal Development' or beyond."
                    />
                </div>

                {/* Charts Section */}
                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                    <div className="bg-brand-off-white p-6 rounded-xl shadow-md border border-brand-light-grey flex flex-col">
                        <div className="flex items-center mb-6">
                            <h3 className="text-xl font-bold text-brand-dark-teal">Pipeline Health Distribution</h3>
                            <InfoTooltip text={
                                <span>
                                    <strong>What it means:</strong> Visualizes the volume of projects at each stage.<br/><br/>
                                    <strong>How to improve:</strong> A healthy pipeline looks like a funnel. If 'Ideation' is low, encourage brainstorming. If 'Under Review' is high but 'Approved' is low, focus on proposal quality.
                                </span>
                            } />
                        </div>
                        <PipelineChart />
                        <div className="mt-8 pt-6 border-t border-brand-light-grey">
                            <h4 className="text-sm font-bold text-brand-grey uppercase tracking-wider mb-4">Recommended Actions</h4>
                            <div className="space-y-3">
                                {pipelineActions.map((action, idx) => (
                                    <ActionItemCard key={idx} action={action} onAction={handleAction} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="bg-brand-off-white p-6 rounded-xl shadow-md border border-brand-light-grey flex flex-col">
                        <div className="flex items-center mb-6">
                             <h3 className="text-xl font-bold text-brand-dark-teal">Innovation Velocity</h3>
                             <InfoTooltip text={
                                <span>
                                    <strong>What it means:</strong> Tracks the speed of innovation by comparing new ideas vs. submitted proposals.<br/><br/>
                                    <strong>How to improve:</strong> Ideally, these lines grow in parallel. If ideas exceed proposals significantly, you may have an execution bottleneck. If proposals exceed ideas, you risk running out of novel concepts.
                                </span>
                            } />
                        </div>
                        <InnovationVelocityChart />
                        <div className="mt-8 pt-6 border-t border-brand-light-grey">
                            <h4 className="text-sm font-bold text-brand-grey uppercase tracking-wider mb-4">Recommended Actions</h4>
                             <div className="space-y-3">
                                {velocityActions.map((action, idx) => (
                                    <ActionItemCard key={idx} action={action} onAction={handleAction} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Team Performance Table */}
                <div className="bg-brand-off-white rounded-xl shadow-md border border-brand-light-grey overflow-hidden">
                    <div className="p-6 border-b border-brand-light-grey flex justify-between items-center">
                        <h3 className="text-xl font-bold text-brand-dark-teal">Researcher Performance</h3>
                        <button className="text-sm font-semibold text-brand-medium-teal hover:underline">Download Report</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-brand-light-gray-blue/50">
                                <tr>
                                    <th className="py-4 px-6 font-semibold text-brand-dark-teal text-sm uppercase tracking-wide">Name</th>
                                    <th className="py-4 px-6 font-semibold text-brand-dark-teal text-sm uppercase tracking-wide">Role</th>
                                    <th className="py-4 px-6 font-semibold text-brand-dark-teal text-sm uppercase tracking-wide">Status</th>
                                    <th className="py-4 px-6 font-semibold text-brand-dark-teal text-sm uppercase tracking-wide text-center">Active Projects</th>
                                    <th className="py-4 px-6 font-semibold text-brand-dark-teal text-sm uppercase tracking-wide text-right">Grants Won</th>
                                    <th className="py-4 px-6 font-semibold text-brand-dark-teal text-sm uppercase tracking-wide text-right">Last Active</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-brand-light-grey">
                                {TEAM_MEMBERS.map((member, index) => {
                                    const status = getPerformanceStatus(member);
                                    return (
                                        <tr key={index} className="hover:bg-brand-light-gray-blue/20 transition-colors">
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-brand-medium-teal text-white flex items-center justify-center font-bold text-xs">
                                                        {member.name.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <span className="font-semibold text-brand-dark-grey">{member.name}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-brand-dark-grey text-sm">{member.role}</td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center group relative cursor-help w-fit">
                                                    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${status.style}`}>
                                                        {status.icon}
                                                        {status.label}
                                                    </span>
                                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-brand-dark-teal text-white text-xs rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none shadow-lg text-center">
                                                        {status.reason}
                                                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-brand-dark-teal"></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                <span className="inline-block bg-brand-light-gray-blue text-brand-dark-teal font-bold px-3 py-1 rounded-full text-xs">
                                                    {member.activeProjects}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right font-medium text-brand-dark-grey">{member.grantsWon}</td>
                                            <td className="py-4 px-6 text-right text-sm text-brand-grey">{member.lastActive}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AnalyticsPage;
