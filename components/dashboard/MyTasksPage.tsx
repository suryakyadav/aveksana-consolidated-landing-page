
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { CheckBadgeIcon, ClockIcon, CheckCircleIcon, TargetIcon, ClipboardListIcon } from '../icons';
import type { StrategicPlan, ImplementationItem } from '../../types';

const MyTasksPage = () => {
  const { user, updateStrategy } = useAuth();
  const [groupedTasks, setGroupedTasks] = useState<{ strategy: StrategicPlan; tasks: ImplementationItem[] }[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (user?.strategies) {
      const myTasks = user.strategies.reduce((acc, strategy) => {
        if (strategy.implementation) {
          const tasksForUser = strategy.implementation.filter(
            (task) => task.assignee === user.name
          );
          if (tasksForUser.length > 0) {
            acc.push({ strategy, tasks: tasksForUser });
          }
        }
        return acc;
      }, [] as { strategy: StrategicPlan; tasks: ImplementationItem[] }[]);
      setGroupedTasks(myTasks);
    }
  }, [user]);

  const handleStatusChange = (strategyId: string, taskId: string, newStatus: 'pending' | 'in_progress' | 'completed') => {
    const strategyIndex = user?.strategies?.findIndex((s) => s.id === strategyId);
    if (strategyIndex !== undefined && strategyIndex !== -1 && user?.strategies) {
      const strategy = user.strategies[strategyIndex];
      if (strategy.implementation) {
        const updatedImplementation = strategy.implementation.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        );
        updateStrategy(strategyId, { implementation: updatedImplementation });
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
      switch (status) {
          case 'completed': return 'Completed';
          case 'in_progress': return 'In Progress';
          default: return 'Pending';
      }
  }

  return (
    <main className="py-12 bg-brand-light-gray-blue min-h-[calc(100vh-200px)]">
      <div className="container mx-auto px-6 max-w-5xl">
        <header className="mb-8">
            <Link to="/dashboard" className="text-brand-grey hover:text-brand-medium-teal transition-colors mb-4 block">
                &larr; Back to Dashboard
            </Link>
            <div className="flex items-center gap-3">
                <div className="p-3 bg-brand-medium-teal rounded-lg text-white">
                    <CheckBadgeIcon />
                </div>
                <div>
                    <h1 className="text-4xl font-bold text-brand-dark-teal">My Assignments</h1>
                    <p className="mt-1 text-lg text-brand-dark-grey">Track and update your tasks from the strategic plan.</p>
                </div>
            </div>
        </header>

        {groupedTasks.length === 0 ? (
          <div className="bg-white p-12 rounded-xl shadow-md border border-brand-light-grey text-center">
            <div className="inline-block p-4 bg-brand-light-gray-blue rounded-full text-brand-medium-teal mb-4">
                <ClipboardListIcon />
            </div>
            <h2 className="text-xl font-bold text-brand-dark-teal">No Tasks Assigned</h2>
            <p className="mt-2 text-brand-dark-grey">You currently have no tasks assigned to you from any strategic plan.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {groupedTasks.map((group) => (
              <div key={group.strategy.id} className="bg-white rounded-xl shadow-md border border-brand-light-grey overflow-hidden">
                <div className="bg-brand-light-gray-blue/50 px-6 py-4 border-b border-brand-light-grey flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TargetIcon />
                    <h3 className="font-bold text-brand-dark-teal text-lg">{group.strategy.title}</h3>
                  </div>
                   <span className="text-xs font-semibold text-brand-grey uppercase tracking-wide">Strategy</span>
                </div>
                <div className="divide-y divide-brand-light-grey">
                  {group.tasks.map((task) => (
                    <div key={task.id} className="p-6 hover:bg-gray-50 transition-colors flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                             <h4 className="text-lg font-bold text-brand-dark-teal">{task.title}</h4>
                             <span className={`text-xs font-bold px-2 py-1 rounded-full border ${getStatusColor(task.status)}`}>
                                {getStatusLabel(task.status)}
                             </span>
                        </div>
                        <p className="text-brand-dark-grey text-sm">{task.description}</p>
                        <p className="text-xs text-brand-grey mt-2">Role: <span className="font-medium">{task.suggestedRole}</span></p>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        {task.status !== 'pending' && (
                             <button
                                onClick={() => handleStatusChange(group.strategy.id, task.id, 'pending')}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                title="Mark as Pending"
                            >
                                <ClockIcon />
                            </button>
                        )}
                        {task.status !== 'in_progress' && task.status !== 'completed' && (
                            <button
                                onClick={() => handleStatusChange(group.strategy.id, task.id, 'in_progress')}
                                className="px-4 py-2 bg-white border border-brand-light-grey text-brand-dark-grey font-semibold rounded-lg hover:border-brand-medium-teal hover:text-brand-medium-teal transition-colors text-sm"
                            >
                                Start Task
                            </button>
                        )}
                        {task.status === 'in_progress' && (
                             <button
                                onClick={() => handleStatusChange(group.strategy.id, task.id, 'completed')}
                                className="px-4 py-2 bg-brand-medium-teal text-white font-semibold rounded-lg hover:bg-brand-teal transition-colors text-sm flex items-center gap-2"
                            >
                                <CheckCircleIcon /> Mark Complete
                            </button>
                        )}
                         {task.status === 'completed' && (
                             <button
                                onClick={() => handleStatusChange(group.strategy.id, task.id, 'in_progress')}
                                className="px-4 py-2 bg-green-50 text-green-700 font-semibold rounded-lg border border-green-200 hover:bg-green-100 transition-colors text-sm"
                            >
                                Reopen
                            </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default MyTasksPage;
