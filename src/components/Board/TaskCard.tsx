import React from 'react';
import { Calendar, MessageCircle, Paperclip, User } from 'lucide-react';
import type { Task } from '../../contexts/ProjectContext';

interface TaskCardProps {
  task: Task;
  onClick: () => void;
  onDragStart: () => void;
}

const PRIORITY_COLORS = {
  low: 'border-l-green-500',
  medium: 'border-l-yellow-500',
  high: 'border-l-orange-500',
  urgent: 'border-l-red-500'
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, onClick, onDragStart }) => {
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onClick={onClick}
      className={`bg-white dark:bg-gray-800 border-l-4 ${PRIORITY_COLORS[task.priority]} rounded-lg p-4 cursor-pointer hover:shadow-md dark:hover:shadow-lg transition-all duration-200 group`}
    >
      <div className="space-y-3">
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {task.title}
          </h4>
          {task.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
              {task.description}
            </p>
          )}
        </div>

        {task.labels.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {task.labels.map(label => (
              <span
                key={label}
                className="inline-block bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs px-2 py-1 rounded-full"
              >
                {label}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-3">
            {task.dueDate && (
              <div className={`flex items-center space-x-1 ${isOverdue ? 'text-red-600 dark:text-red-400' : ''}`}>
                <Calendar className="w-3 h-3" />
                <span>{new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
            )}
            
            {task.comments.length > 0 && (
              <div className="flex items-center space-x-1">
                <MessageCircle className="w-3 h-3" />
                <span>{task.comments.length}</span>
              </div>
            )}
            
            {task.attachments.length > 0 && (
              <div className="flex items-center space-x-1">
                <Paperclip className="w-3 h-3" />
                <span>{task.attachments.length}</span>
              </div>
            )}
          </div>

          {task.assigneeId && (
            <div className="flex items-center space-x-1">
              <User className="w-3 h-3" />
              <span>Assigned</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};