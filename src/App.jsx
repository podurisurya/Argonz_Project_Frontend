import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TaskPage from './components/TaskPage';
import MentorsPage from './components/MentorsPage';
import MessagesPage from './components/MessagesPage';
import SettingsPage from './components/SettingsPage';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [user, setUser] = useState({
    name: 'Dennis Nzioki',
    role: 'UX Designer',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  });

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard user={user} />;
      case 'task':
        return <TaskPage />;
      case 'mentors':
        return <MentorsPage />;
      case 'messages':
        return <MessagesPage />;
      case 'settings':
        return <SettingsPage user={user} setUser={setUser} />;
      default:
        return <Dashboard user={user} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} user={user} />
      <div className="flex-1 lg:ml-64">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;