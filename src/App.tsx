import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ProjectProvider } from './contexts/ProjectContext';
import { MainLayout } from './components/Layout/MainLayout';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ProjectProvider>
          <MainLayout />
        </ProjectProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;