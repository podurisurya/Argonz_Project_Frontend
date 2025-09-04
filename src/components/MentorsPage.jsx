import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Star, MessageSquare, Search } from 'lucide-react';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function MentorsPage() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE}/api/public-mentors`);
        setMentors(res.data?.data || []);
      } catch (e) {
        setError('Failed to load mentors');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const toggleFollow = (mentorId) => {
    setMentors(mentors.map(mentor =>
      mentor.id === mentorId
        ? { ...mentor, isFollowed: !mentor.isFollowed }
        : mentor
    ));
  };

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-6">Mentors</h1>
        
        {/* Search */}
        <div className="relative max-w-md">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search mentors..."
            className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Mentors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading && <div className="text-slate-600">Loading...</div>}
        {!loading && mentors.map((mentor) => (
          <div key={mentor._id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 group">
            {/* Avatar */}
            <div className="text-center mb-4">
              <img
                src={mentor.avatar}
                alt={mentor.name}
                className="w-20 h-20 rounded-full mx-auto object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Info */}
            <div className="text-center mb-4">
              <h3 className="font-semibold text-slate-900 mb-1">{mentor.name}</h3>
              <p className="text-sm text-slate-500">{mentor.role}</p>
            </div>

            {/* Stats */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Tasks</span>
                <span className="font-medium text-slate-900">{mentor.tasksCount}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Rating</span>
                <div className="flex items-center space-x-1">
                  <Star size={14} className="text-yellow-500 fill-current" />
                  <span className="font-medium">{mentor.rating}</span>
                  <span className="text-slate-400">({mentor.reviews})</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              <button
                onClick={() => toggleFollow(mentor._id)}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                  mentor.isFollowed
                    ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {mentor.isFollowed ? 'Following' : 'Follow'}
              </button>
              
              <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                <MessageSquare size={16} className="text-slate-600" />
              </button>
            </div>
          </div>
        ))}
      </div>
      {error && <div className="mt-4 text-sm text-red-600">{error}</div>}
    </div>
  );
}

export default MentorsPage;