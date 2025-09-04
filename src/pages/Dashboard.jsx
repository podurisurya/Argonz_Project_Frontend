import React, { useState } from 'react';

// Mock image placeholders (replace with actual paths in your project)
const mobileAppImage = '/assets/mobile-app-design.jpg';
const webDevImage = '/assets/web-development.jpg';
const colorPalettesImage = '/assets/color-palettes.jpg';

const tasks = [
  {
    id: '1',
    title: 'Creating Awesome Mobile Apps',
    category: 'UI UX Design',
    progress: 90,
    timeLeft: '1 Hour',
    team: [
      { id: '1', name: 'Alice Johnson', avatar: '/placeholder.svg' },
      { id: '2', name: 'Bob Smith', avatar: '/placeholder.svg' },
      { id: '3', name: 'Carol White', avatar: '/placeholder.svg' },
      { id: '4', name: 'David Brown', avatar: '/placeholder.svg' },
    ],
    image: mobileAppImage,
  },
];

const upcomingTasks = [
  {
    id: '2',
    title: 'Creating Mobile App Design',
    category: 'UI UX Design',
    progress: 75,
    timeLeft: '3 Days Left',
    team: [
      { id: '1', name: 'Alice Johnson', avatar: '/assets/p1.png' },
      { id: '2', name: 'Bob Smith', avatar: '/assets/p2.png' },
    ],
    image: mobileAppImage,
  },
  {
    id: '3',
    title: 'Creating Perfect Website',
    category: 'Web Developer',
    progress: 85,
    timeLeft: '4 Days Left',
    team: [
      { id: '1', name: 'Alice Johnson', avatar: '/assets/p3.png' },
      { id: '2', name: 'Bob Smith', avatar: '/assets/p4.png' },
    ],
    image: webDevImage,
  },
];

const mentors = [
  {
    id: '1',
    name: 'Curious George',
    role: 'UI UX Design',
    avatar: '/placeholder.svg',
    taskCount: 40,
    rating: 4.7,
    reviewCount: 750,
    isFollowing: false,
  },
  {
    id: '2',
    name: 'Abraham Lincoln',
    role: '3D Design',
    avatar: '/placeholder.svg',
    taskCount: 32,
    rating: 4.9,
    reviewCount: 510,
    isFollowing: true,
  },
];

const activityData = [
  { name: 'S', value: 2 },
  { name: 'M', value: 1 },
  { name: 'T', value: 3 },
  { name: 'W', value: 2 },
  { name: 'T', value: 1 },
  { name: 'F', value: 2 },
  { name: 'S', value: 3 },
];

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function Dashboard() {
  const [followingMentors, setFollowingMentors] = useState(new Set(['2']));
  const [showHelp, setShowHelp] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date(2022, 6, 14)); // July 14, 2022

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const toggleFollow = (mentorId) => {
    setFollowingMentors(prev => {
      const newSet = new Set(prev);
      if (newSet.has(mentorId)) {
        newSet.delete(mentorId);
      } else {
        newSet.add(mentorId);
      }
      return newSet;
    });
  };

  const StatsCard = ({ title, value, subtitle, variant = 'default', className }) => (
    <div className={`bg-white rounded-lg p-4 shadow-md ${className}`}>
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className={`text-2xl font-semibold ${variant === 'primary' ? 'text-blue-500' : 'text-gray-800'}`}>
        {value}
      </p>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </div>
  );

  const TaskCard = ({ title, category, progress, timeLeft, team, image }) => (
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
      <div className="flex -space-x-2 mt-2">
        {team.map((member, index) => (
          <img
            key={member.id}
            src={member.avatar}
            alt={member.name}
            className="w-6 h-6 rounded-full border-2 border-white"
            style={{ zIndex: team.length - index }}
          />
        ))}
      </div>
    </div>
  );

  const MentorCard = ({ name, role, avatar, taskCount, rating, reviewCount, isFollowing, onFollow }) => (
    <div className="bg-white rounded-lg p-4 shadow-md flex items-center gap-4">
      <img src={avatar} alt={name} className="w-12 h-12 rounded-full object-cover" />
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-500">{role}</p>
        <p className="text-sm text-gray-500">{taskCount} Tasks • {rating} ({reviewCount} Reviews)</p>
      </div>
      <button
        onClick={onFollow}
        className={`px-4 py-2 rounded-lg text-sm font-medium ${
          isFollowing ? 'bg-gray-200 text-gray-800' : 'bg-blue-500 text-white'
        } hover:opacity-90 transition-colors`}
      >
        {isFollowing ? 'Following' : 'Follow'}
      </button>
    </div>
  );

  const ActivityChart = ({ title = "Activity", taskCount = 2, timeFrame = "This Week" }) => (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">{timeFrame}</span>
          <div className="bg-gray-200 text-blue-600 text-xs px-2 py-1 rounded-full font-medium">
            {taskCount} Task{taskCount !== 1 ? 's' : ''}
          </div>
        </div>
      </div>
      <div className="h-32 mb-4">
        {/* Placeholder for chart (Recharts not included in standalone JSX) */}
        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-500 text-sm">
          Activity Chart Placeholder
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {activityData.map((day, index) => (
          <div key={index} className="text-xs text-gray-500 font-medium">{day.name}</div>
        ))}
      </div>
    </div>
  );

  const CalendarWidget = () => {
    const renderCalendarDays = () => {
      const days = [];
      for (let i = 0; i < firstDayOfWeek; i++) {
        days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
      }
      for (let day = 1; day <= daysInMonth; day++) {
        const isToday = day === 14;
        days.push(
          <span
            key={day}
            className={`w-8 h-8 text-sm font-medium rounded-full flex items-center justify-center ${
              isToday ? 'bg-blue-500 text-white' : 'text-gray-800'
            }`}
          >
            {day}
          </span>
        );
      }
      return days;
    };

    return (
      <div className="bg-white rounded-lg p-4 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={previousMonth}
            className="p-1 hover:bg-gray-200 rounded-lg"
          >
            <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <h3 className="font-semibold text-gray-800">
            {months[month]} {year}
          </h3>
          <button
            onClick={nextMonth}
            className="p-1 hover:bg-gray-200 rounded-lg"
          >
            <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {daysOfWeek.map((day, index) => (
            <span
              key={index}
              className="w-8 h-8 text-xs font-medium text-gray-500 flex items-center justify-center"
            >
              {day}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {renderCalendarDays()}
        </div>
      </div>
    );
  };

  return (
    <>
      <main className="p-4 bg-gray-100 min-h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatsCard
          title="Running Task"
          value="65"
          subtitle="45%"
          variant="primary"
          className="md:col-span-2 lg:col-span-1"
        />
        <ActivityChart />
        <CalendarWidget />
        
        <section className="col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Monthly Mentors</h2>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mentors.map((mentor) => (
              <MentorCard
                key={mentor.id}
                {...mentor}
                isFollowing={followingMentors.has(mentor.id)}
                onFollow={() => toggleFollow(mentor.id)}
              />
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Upcoming Task</h2>
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
          <div className="grid grid-cols-1 gap-4">
            {upcomingTasks.map((task) => (
              <TaskCard key={task.id} {...task} />
            ))}
          </div>
        </section>

        <section className="col-span-1">
          <div className="bg-white rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Task Today</h3>
            <TaskCard {...tasks[0]} />
            <div className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-800">Detail Task</h3>
                <span className="text-sm text-gray-500">UI / UX Designer</span>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded text-xs font-medium flex items-center justify-center">1</div>
                  <span className="text-gray-800">Understanding the tools in Figma</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gray-200 text-gray-500 rounded text-xs font-medium flex items-center justify-center">2</div>
                  <span className="text-gray-800">Understand the basics of making designs</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gray-200 text-gray-500 rounded text-xs font-medium flex items-center justify-center">3</div>
                  <span className="text-gray-800">Design a mobile application with figma</span>
                </div>
              </div>
              <button className="w-full bg-blue-500 text-white rounded-lg py-3 font-medium hover:bg-blue-600 transition-colors mt-4">
                Go To Detail
              </button>
            </div>
          </div>
        </section>
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

export default Dashboard;