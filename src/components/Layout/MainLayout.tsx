import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { LoginForm } from '../Auth/LoginForm';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { ProjectBoard } from '../Board/ProjectBoard';

export const MainLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <ProjectBoard />
        </main>
      </div>
    </div>
  );
};