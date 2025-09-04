import React, { useState } from 'react';
import { Star, Plus } from 'lucide-react';

function MonthlyMentors() {
  const [mentors, setMentors] = useState([
    {
      id: 1,
      name: 'Curious George',
      role: 'UI Designer',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 4.7,
      reviews: 750,
      isFollowed: false
    },
    {
      id: 2,
      name: 'Abraham Lincoln',
      role: '3D Designer',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 4.9,
      reviews: 510,
      isFollowed: true
    }
  ]);

  const toggleFollow = (mentorId) => {
    setMentors(mentors.map(mentor =>
      mentor.id === mentorId
        ? { ...mentor, isFollowed: !mentor.isFollowed }
        : mentor
    ));
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900">Monthly Mentors</h3>
        <button className="text-blue-500 hover:text-blue-600 font-medium text-sm transition-colors">
          See All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mentors.map((mentor) => (
          <div key={mentor.id} className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <img
                  src={mentor.avatar}
                  alt={mentor.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-slate-900">{mentor.name}</h4>
                  <p className="text-sm text-slate-500">{mentor.role}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <Star size={16} className="text-yellow-500 fill-current" />
                <span className="font-medium text-sm">{mentor.rating}</span>
                <span className="text-slate-400 text-sm">({mentor.reviews} Reviews)</span>
              </div>
              
              <button
                onClick={() => toggleFollow(mentor.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  mentor.isFollowed
                    ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {mentor.isFollowed ? 'Following' : '+ Follow'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MonthlyMentors;