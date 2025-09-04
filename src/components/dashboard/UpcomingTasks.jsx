import React from 'react';
import { Clock, Users } from 'lucide-react';

function UpcomingTasks() {
  const tasks = [
    {
      id: 1,
      title: 'Creating Mobile App Design',
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      progress: 75,
      timeLeft: '3 Days Left',
      teamMembers: [
        'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop',
        'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop',
        'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop'
      ]
    },
    {
      id: 2,
      title: 'Creating Perfect Website',
      image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      progress: 85,
      timeLeft: '4 Days Left',
      teamMembers: [
        'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop',
        'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop'
      ]
    }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900">Upcoming Task</h3>
        <button className="text-blue-500 hover:text-blue-600 font-medium text-sm transition-colors">
          See All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {tasks.map((task) => (
          <div key={task.id} className="group">
            {/* Task Image */}
            <div className="relative rounded-xl overflow-hidden mb-4">
              <img
                src={task.image}
                alt={task.title}
                className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300" />
            </div>

            {/* Task Info */}
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                {task.title}
              </h4>

              {/* Progress */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Progress</span>
                  <span className="text-sm font-medium text-slate-900">{task.progress}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${task.progress}%` }}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 text-slate-500">
                  <Clock size={14} />
                  <span className="text-sm">{task.timeLeft}</span>
                </div>

                <div className="flex items-center -space-x-2">
                  {task.teamMembers.map((member, index) => (
                    <img
                      key={index}
                      src={member}
                      alt={`Team member ${index + 1}`}
                      className="w-6 h-6 rounded-full border-2 border-white object-cover hover:scale-110 transition-transform cursor-pointer"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpcomingTasks;