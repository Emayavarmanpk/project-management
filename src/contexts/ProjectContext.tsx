import React, { createContext, useContext, useState } from 'react';

export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId?: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
  attachments: Attachment[];
  labels: string[];
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  color: string;
  createdAt: string;
  tasks: Task[];
  members: string[];
}

interface ProjectContextType {
  projects: Project[];
  currentProject: Project | null;
  setCurrentProject: (project: Project | null) => void;
  createProject: (data: Omit<Project, 'id' | 'createdAt' | 'tasks' | 'members'>) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  createTask: (projectId: string, task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'comments' | 'attachments'>) => void;
  deleteTask: (taskId: string) => void;
  addComment: (taskId: string, content: string) => void;
  moveTask: (taskId: string, newStatus: TaskStatus) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};

// Mock data for demo
const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Complete redesign of company website',
    color: '#6366F1',
    createdAt: '2024-01-15T08:00:00Z',
    members: ['1', '2', '3'],
    tasks: [
      {
        id: '1',
        title: 'Design wireframes',
        description: 'Create initial wireframes for the new homepage layout',
        status: 'done',
        priority: 'high',
        assigneeId: '1',
        dueDate: '2024-01-20',
        createdAt: '2024-01-15T08:00:00Z',
        updatedAt: '2024-01-15T08:00:00Z',
        comments: [],
        attachments: [],
        labels: ['design', 'ui']
      },
      {
        id: '2',
        title: 'Implement responsive navigation',
        description: 'Build mobile-first navigation component with smooth animations',
        status: 'in-progress',
        priority: 'medium',
        assigneeId: '2',
        dueDate: '2024-01-25',
        createdAt: '2024-01-15T09:00:00Z',
        updatedAt: '2024-01-15T09:00:00Z',
        comments: [
          {
            id: '1',
            content: 'Started working on the mobile menu component',
            authorId: '2',
            authorName: 'Sarah Chen',
            createdAt: '2024-01-16T10:00:00Z'
          }
        ],
        attachments: [],
        labels: ['frontend', 'mobile']
      },
      {
        id: '3',
        title: 'Set up analytics tracking',
        description: 'Integrate Google Analytics and set up conversion tracking',
        status: 'todo',
        priority: 'low',
        dueDate: '2024-02-01',
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z',
        comments: [],
        attachments: [],
        labels: ['analytics']
      },
      {
        id: '4',
        title: 'User testing session',
        description: 'Conduct usability testing with 5 target users',
        status: 'review',
        priority: 'high',
        assigneeId: '3',
        dueDate: '2024-01-28',
        createdAt: '2024-01-15T11:00:00Z',
        updatedAt: '2024-01-15T11:00:00Z',
        comments: [],
        attachments: [],
        labels: ['testing', 'ux']
      }
    ]
  }
];

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [currentProject, setCurrentProject] = useState<Project | null>(mockProjects[0]);

  const createProject = (data: Omit<Project, 'id' | 'createdAt' | 'tasks' | 'members'>) => {
    const newProject: Project = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      tasks: [],
      members: ['1']
    };
    setProjects(prev => [...prev, newProject]);
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setProjects(prev => prev.map(project => ({
      ...project,
      tasks: project.tasks.map(task => 
        task.id === taskId 
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      )
    })));
  };

  const createTask = (projectId: string, taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'comments' | 'attachments'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comments: [],
      attachments: []
    };

    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { ...project, tasks: [...project.tasks, newTask] }
        : project
    ));
  };

  const deleteTask = (taskId: string) => {
    setProjects(prev => prev.map(project => ({
      ...project,
      tasks: project.tasks.filter(task => task.id !== taskId)
    })));
  };

  const addComment = (taskId: string, content: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      content,
      authorId: '1',
      authorName: 'Emaya',
      createdAt: new Date().toISOString()
    };

    updateTask(taskId, {
      comments: [...(currentProject?.tasks.find(t => t.id === taskId)?.comments || []), newComment]
    });
  };

  const moveTask = (taskId: string, newStatus: TaskStatus) => {
    updateTask(taskId, { status: newStatus });
  };

  return (
    <ProjectContext.Provider value={{
      projects,
      currentProject,
      setCurrentProject,
      createProject,
      updateTask,
      createTask,
      deleteTask,
      addComment,
      moveTask
    }}>
      {children}
    </ProjectContext.Provider>
  );
};