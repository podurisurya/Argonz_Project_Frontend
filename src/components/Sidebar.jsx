import React, { useState } from 'react';
import { 
  Home, 
  CheckSquare, 
  Users, 
  MessageSquare, 
  Settings, 
  HelpCircle,
  Menu,
  X
} from 'lucide-react';

const menuItems = [
  { id: 'dashboard', icon: Home, label: 'Overview' },
  { id: 'task', icon: CheckSquare, label: 'Task' },
  { id: 'mentors', icon: Users, label: 'Mentors' },
  { id: 'messages', icon: MessageSquare, label: 'Message' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

function Sidebar({ currentPage, setCurrentPage, user }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const SidebarContent = () => (
    <div className="h-full bg-slate-900 text-white flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">DNX</h1>
          <button 
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setCurrentPage(item.id);
              setIsMobileOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 mb-2 ${
              currentPage === item.id
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Help Center */}
      <div className="p-4 mx-4 mb-6 bg-slate-800 rounded-lg">
        <div className="flex items-center space-x-3 mb-3">
          <HelpCircle size={20} className="text-blue-400" />
          <span className="font-medium">Help Center</span>
        </div>
        <p className="text-sm text-slate-400 mb-3">
          Having trouble in learning. Please contact us for more questions.
        </p>
        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          Go To Help Center
        </button>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center space-x-3">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-medium text-sm">{user.name}</p>
            <p className="text-slate-400 text-xs">{user.role}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-slate-900 text-white p-2 rounded-lg shadow-lg"
      >
        <Menu size={24} />
      </button>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 w-64 h-full z-40">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="lg:hidden fixed left-0 top-0 w-64 h-full z-50">
            <SidebarContent />
          </div>
        </>
      )}
    </>
  );
}

export default Sidebar;