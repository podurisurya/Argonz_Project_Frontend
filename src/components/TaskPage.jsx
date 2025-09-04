import React, { useState, useEffect } from 'react';
import { Search, Clock } from 'lucide-react';
import axios from 'axios';

function TaskPage() {
  const [filter, setFilter] = useState('all');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/public-tasks');
        const dbTasks = res.data.data.map(task => ({
          ...task,
          // Add dummy team members for UI (since backend doesn't store them)
          teamMembers: [
            'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop',
            'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop'
          ]
        }));
        setTasks(dbTasks);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch tasks:', err);
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const filters = [
    { id: 'all', label: 'All Tasks' },
    { id: 'time', label: 'Time Limit' },
    { id: 'new', label: 'New Task' },
    { id: 'progress', label: 'In Progress' }
  ];

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-6">Explore Task</h1>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search Task"
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-600">Category</span>
            <select className="px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Deadline</option>
              <option>Priority</option>
              <option>Progress</option>
            </select>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mt-4">
          {filters.map((filterItem) => (
            <button
              key={filterItem.id}
              onClick={() => setFilter(filterItem.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === filterItem.id
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {filterItem.label}
            </button>
          ))}
        </div>
      </div>

      {/* Task Grid */}
      {loading ? (
        <p className="text-slate-500">Loading tasks...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {tasks.map((task, index) => (
            <div key={task._id || index} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 group cursor-pointer">
              {/* Task Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={task.image || 'https://via.placeholder.com/400x300'}
                  alt={task.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Task Content */}
              <div className="p-5">
                <h3 className="font-semibold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {task.title}
                </h3>
                <p className="text-sm text-slate-500 mb-4">{task.category}</p>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600">Progress</span>
                    <span className="text-sm font-medium text-slate-900">{task.progress || 0}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        task.progress === 100 ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${task.progress || 0}%` }}
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-slate-500">
                    <Clock size={14} />
                    <span className="text-sm">{task.timeLeft || 'N/A'}</span>
                  </div>

                  <div className="flex items-center -space-x-2">
                    {task.teamMembers.map((member, idx) => (
                      <img
                        key={idx}
                        src={member}
                        alt={`Team member ${idx + 1}`}
                        className="w-8 h-8 rounded-full border-2 border-white object-cover hover:scale-110 transition-transform"
                      />
                    ))}
                    {task.teamMembers.length > 3 && (
                      <div className="w-8 h-8 bg-slate-100 rounded-full border-2 border-white flex items-center justify-center text-slate-500 text-xs font-medium">
                        +{task.teamMembers.length - 3}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskPage;
