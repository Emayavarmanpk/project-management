import React, { useState } from 'react';
import { useProject } from '../../contexts/ProjectContext';
import { Plus, FolderOpen, Calendar, Users, Settings, ChevronDown, ChevronRight } from 'lucide-react';
import { CreateProjectModal } from '../Modals/CreateProjectModal';

export const Sidebar: React.FC = () => {
  const { projects, currentProject, setCurrentProject } = useProject();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    projects: true,
    team: false
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <>
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-[calc(100vh-73px)]">
        <div className="p-4">
          <nav className="space-y-6">
            <div>
              <button
                onClick={() => toggleSection('projects')}
                className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-900 dark:text-white mb-3"
              >
                <span>Projects</span>
                {expandedSections.projects ? 
                  <ChevronDown className="w-4 h-4" /> : 
                  <ChevronRight className="w-4 h-4" />
                }
              </button>
              
              {expandedSections.projects && (
                <div className="space-y-1">
                  {projects.map(project => (
                    <button
                      key={project.id}
                      onClick={() => setCurrentProject(project)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        currentProject?.id === project.id
                          ? 'bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: project.color }}
                      />
                      <span className="text-sm font-medium truncate">{project.name}</span>
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="text-sm">Add project</span>
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Calendar className="w-5 h-5" />
                <span className="text-sm">Calendar</span>
              </button>
              
              <button
                onClick={() => toggleSection('team')}
                className="w-full flex items-center justify-between px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5" />
                  <span className="text-sm">Team</span>
                </div>
                {expandedSections.team ? 
                  <ChevronDown className="w-4 h-4" /> : 
                  <ChevronRight className="w-4 h-4" />
                }
              </button>
              
              <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
                <span className="text-sm">Settings</span>
              </button>
            </div>
          </nav>
        </div>
      </aside>

      {showCreateModal && (
        <CreateProjectModal onClose={() => setShowCreateModal(false)} />
      )}
    </>
  );
};