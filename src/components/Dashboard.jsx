import React from 'react';
import RunningTasks from './dashboard/RunningTasks';
import ActivityChart from './dashboard/ActivityChart';
import MonthlyMentors from './dashboard/MonthlyMentors';
import UpcomingTasks from './dashboard/UpcomingTasks';
import Calendar from './dashboard/Calendar';
import TaskToday from './dashboard/TaskToday';

function Dashboard({ user }) {
  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
          Hi, {user.name.split(' ')[0]}
        </h1>
        <p className="text-slate-600">Let's finish your task today!</p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8">
        {/* Left Column */}
        <div className="xl:col-span-3 space-y-6 lg:space-y-8">
          {/* Top Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <RunningTasks />
            <ActivityChart />
            <Calendar />
          </div>
          
          {/* Monthly Mentors */}
          <MonthlyMentors />
          
          {/* Upcoming Tasks */}
          <UpcomingTasks />
        </div>

        {/* Right Column */}
        <div>
          <TaskToday />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;