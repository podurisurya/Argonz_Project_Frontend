import React from 'react';
import { Clock, Users } from 'lucide-react';

function TaskToday() {
  const taskDetails = {
    title: 'Creating Awesome Mobile Apps',
    category: 'UI/UX Design',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    progress: 90,
    timeLeft: '1 Hour',
    teamMembers: [
      'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop',
      'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop',
      'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop'
    ],
    tasks: [
      'Understanding the tools in Figma',
      'Understand the basics of making designs',
      'Design a mobile application with figma'
    ]
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900">Task Today</h3>
        <button className="text-slate-400 hover:text-slate-600">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="1"/>
            <circle cx="19" cy="12" r="1"/>
            <circle cx="5" cy="12" r="1"/>
          </svg>
        </button>
      </div>

      {/* Task Image */}
      <div className="relative rounded-xl overflow-hidden mb-4">
        <img
          src={taskDetails.image}
          alt={taskDetails.title}
          className="w-full h-32 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Task Info */}
      <div className="mb-4">
        <h4 className="font-semibold text-slate-900 mb-1">{taskDetails.title}</h4>
        <p className="text-sm text-slate-500">{taskDetails.category}</p>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-600">Progress</span>
          <span className="text-sm font-medium text-slate-900">{taskDetails.progress}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${taskDetails.progress}%` }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-1 text-slate-500">
          <Clock size={14} />
          <span className="text-sm">{taskDetails.timeLeft}</span>
        </div>

        <div className="flex items-center -space-x-2">
          {taskDetails.teamMembers.map((member, index) => (
            <img
              key={index}
              src={member}
              alt={`Team member ${index + 1}`}
              className="w-6 h-6 rounded-full border-2 border-white object-cover"
            />
          ))}
        </div>
      </div>

      {/* Detail Task Section */}
      <div className="border-t border-slate-100 pt-4">
        <h5 className="font-medium text-slate-900 mb-3">Detail Task</h5>
        <div className="space-y-3">
          {taskDetails.tasks.map((task, index) => (
            <div key={index} className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                {index + 1}
              </span>
              <p className="text-sm text-slate-600 leading-relaxed">{task}</p>
            </div>
          ))}
        </div>
        
        <button className="w-full mt-4 bg-blue-500 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-600 transition-colors">
          Go To Detail
        </button>
      </div>
    </div>
  );
}

export default TaskToday;