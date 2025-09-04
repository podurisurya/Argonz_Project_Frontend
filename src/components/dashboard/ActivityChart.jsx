import React from 'react';

function ActivityChart() {
  const activityData = [
    { day: 'Mon', value: 30 },
    { day: 'Tue', value: 45 },
    { day: 'Wed', value: 35 },
    { day: 'Thu', value: 65 },
    { day: 'Fri', value: 55 },
    { day: 'Sat', value: 40 },
    { day: 'Sun', value: 50 },
  ];

  const maxValue = Math.max(...activityData.map(d => d.value));

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <h3 className="text-lg font-semibold text-slate-900 mb-6">Activity</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">This Week</span>
          <span className="text-sm text-slate-400">40</span>
        </div>
        
        {/* Simple line chart representation */}
        <div className="h-32 flex items-end space-x-2">
          {activityData.map((item, index) => (
            <div key={item.day} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-blue-500 rounded-t-sm transition-all duration-500 hover:bg-blue-600"
                style={{ 
                  height: `${(item.value / maxValue) * 100}%`,
                  minHeight: '4px'
                }}
              />
              <span className="text-xs text-slate-400 mt-2">{item.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ActivityChart;