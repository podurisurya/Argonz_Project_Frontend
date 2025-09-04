import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Mock image placeholders (replace with actual image paths in your project)
const mobileAppImage = '/assets/mobile-app-design.jpg';
const webDevImage = '/assets/web-development.jpg';
const colorPalettesImage = '/assets/color-palettes.jpg';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Tasks() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showHelp, setShowHelp] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/api/public-tasks`);
      setTasks(res.data?.data || []);
      setError('');
    } catch (e) {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const categories = ['All', 'UI UX Design', 'Web Developer', 'Android Dev'];

  const filteredTasks = tasks.filter(task => {
    const title = (task.title || '').toLowerCase();
    const category = (task.category || '').toLowerCase();
    const q = searchQuery.toLowerCase();
    const matchesSearch = title.includes(q) || category.includes(q);
    const matchesCategory = selectedCategory === 'All' || task.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const TaskCard = ({ title, category, progress, timeLeft, image }) => (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <img src={image} alt={title} className="w-full h-32 object-cover rounded-lg mb-4" />
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-500">{category}</p>
      <div className="mt-2">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <p className="text-sm text-gray-500 mt-2">{timeLeft}</p>
    </div>
  );

  return (
    <>
      <main className="p-4 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Explore Task</h1>
        {error && (
          <div className="mb-4 text-sm text-red-600">{error}</div>
        )}
        
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mb-6">
          <div className="relative w-full max-w-md">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search Task"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 pl-10 border rounded-lg bg-white text-sm text-gray-800"
            />
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 3h18M3 12h18M3 21h18" />
            </svg>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white border rounded-lg px-3 py-2 text-sm text-gray-800"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <section className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Time Limit</h2>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-200 rounded-lg">
                <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-200 rounded-lg">
                <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {loading ? (
              <div className="text-gray-600">Loading...</div>
            ) : (
              filteredTasks.slice(0, 3).map(task => (
                <TaskCard key={task._id} {...task} />
              ))
            )}
          </div>
        </section>

        <section className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">New Task</h2>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-200 rounded-lg">
                <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-200 rounded-lg">
                <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {!loading && filteredTasks.slice(3).map(task => (
              <TaskCard key={task._id} {...task} />
            ))}
          </div>
        </section>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={fetchTasks}
            className="px-8 py-2 border rounded-lg text-gray-800 hover:bg-gray-200 transition-colors"
          >
            Refresh
          </button>
          <button
            onClick={async () => {
              const title = window.prompt('Enter task title');
              if (!title) return;
              const category = window.prompt('Enter category (optional)', 'General') || '';
              try {
                await axios.post(`${API_BASE}/api/public-tasks`, { title, category, progress: 0, timeLeft: '', image: mobileAppImage });
                fetchTasks();
              } catch (e) {
                setError('Failed to create task');
              }
            }}
            className="px-8 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Create New Task
          </button>
        </div>
      </main>

      {/* Help Center Modal */}
      {showHelp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl p-6 shadow-lg max-w-sm mx-4">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl mb-4">
              <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v.01M12 13a2 2 0 0 0 .914-3.782A2 2 0 0 0 10 11v1h2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Help Center</h3>
            <p className="text-gray-500 text-sm mb-4">
              Having trouble in Learning. Please contact us for more questions.
            </p>
            <button 
              onClick={() => setShowHelp(false)}
              className="w-full bg-blue-500 text-white rounded-lg py-2 px-4 font-medium text-sm hover:bg-blue-600 transition-colors"
            >
              Go To Help Center
            </button>
          </div>
        </div>
      )}

      {/* Help Button */}
      <button
        onClick={() => setShowHelp(true)}
        className="fixed bottom-6 left-6 flex items-center justify-center w-12 h-12 bg-blue-600 rounded-xl shadow-md text-white hover:scale-105 transition-transform"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v.01M12 13a2 2 0 0 0 .914-3.782A2 2 0 0 0 10 11v1h2z" />
        </svg>
      </button>
    </>
  );
}

export default Tasks;