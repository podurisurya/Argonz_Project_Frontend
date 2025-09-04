import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Send, Paperclip, Smile } from 'lucide-react';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE}/api/public-messages?channel=general`);
        setMessages(res.data?.data || []);
      } catch (e) {
        setError('Failed to load messages');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      const payload = {
        sender: 'user',
        content: newMessage,
        avatar: '',
        channel: 'general'
      };
      const res = await axios.post(`${API_BASE}/api/public-messages`, payload);
      setMessages([...messages, res.data?.data]);
      setNewMessage('');
    } catch (e) {
      setError('Failed to send message');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="p-4 lg:p-8 h-screen flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">Messages</h1>
        <p className="text-slate-600">Chat with your mentor</p>
      </div>

      {/* Chat Container */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col">
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <img
              src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop"
              alt="Curious George"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-slate-900">Curious George</h3>
              <p className="text-sm text-green-500">● Online</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {loading && <div className="text-slate-600">Loading...</div>}
          {!loading && messages.map((message) => (
            <div
              key={message._id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${
                message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'
              }`}>
                {message.sender === 'mentor' && message.avatar && (
                  <img
                    src={message.avatar}
                    alt="Mentor"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                
                <div className={`px-4 py-3 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-100 text-slate-900'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  {/* Server stores timestamp in createdAt */}
                  <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-slate-500'}`}>
                    {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="px-6 py-4 border-t border-slate-100">
          <div className="flex items-center space-x-3">
            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Paperclip size={20} />
            </button>
            
            <div className="flex-1 relative">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            
            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Smile size={20} />
            </button>
            
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white p-3 rounded-xl hover:bg-blue-600 transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
        {error && (
          <div className="px-6 py-2 text-sm text-red-600 border-t border-slate-100">{error}</div>
        )}
      </div>
    </div>
  );
}

export default MessagesPage;