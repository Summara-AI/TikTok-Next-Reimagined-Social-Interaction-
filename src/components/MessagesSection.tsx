import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Edit3, Circle, Send, MoreHorizontal, Phone, Video, Smile, Image as ImageIcon } from 'lucide-react';
import { cn } from '../utils/cn';

const CHATS = [
  { 
    id: 1, 
    name: 'Creative Vibes', 
    lastMsg: 'The new Q&A mode is sick!', 
    time: '2m', 
    avatar: 'https://i.pravatar.cc/150?u=creative_vibes', 
    online: true,
    history: [
      { id: 1, text: "Hey! Just saw your latest video.", sender: 'them' },
      { id: 2, text: "The new Q&A mode is sick!", sender: 'them' },
      { id: 3, text: "Thanks so much! Glad you liked it.", sender: 'me' },
    ]
  },
  { 
    id: 2, 
    name: 'Tech Guru', 
    lastMsg: 'Sent you the analytics report.', 
    time: '1h', 
    avatar: 'https://i.pravatar.cc/150?u=tech_guru', 
    online: false,
    history: [
      { id: 1, text: "Check your email.", sender: 'them' },
      { id: 2, text: "Sent you the analytics report.", sender: 'them' },
    ]
  },
  { id: 3, name: 'Travel Junkie', lastMsg: 'Collab soon? 🌍', time: '3h', avatar: 'https://i.pravatar.cc/150?u=travel_junkie', online: true, history: [] },
  { id: 4, name: 'Foodie Delight', lastMsg: 'That pasta looked amazing!', time: '1d', avatar: 'https://i.pravatar.cc/150?u=foodie_delight', online: false, history: [] },
];

const MessagesSection: React.FC = () => {
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [chatHistories, setChatHistories] = useState<Record<number, Array<{id: number; text: string; sender: string}>>>(
    Object.fromEntries(CHATS.map(c => [c.id, c.history]))
  );

  const activeChat = CHATS.find(c => c.id === activeChatId);

  const handleSendMessage = () => {
    if (!message.trim() || !activeChatId) return;
    
    const newMsg = { id: Date.now(), text: message, sender: 'me' };
    setChatHistories(prev => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), newMsg]
    }));
    setMessage('');
  };

  return (
    <div className="h-full w-full bg-black flex flex-col md:flex-row overflow-hidden">
      {/* Chat List Sidebar */}
      <div className={cn(
        "w-full md:w-80 border-r border-white/10 flex flex-col h-full bg-black transition-all",
        activeChatId ? "hidden md:flex" : "flex"
      )}>
        <div className="p-6 flex items-center justify-between">
          <h2 className="text-2xl font-black italic tracking-tighter uppercase">Messages</h2>
          <button className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors active:scale-90">
            <Edit3 size={20} />
          </button>
        </div>

        <div className="px-6 mb-6">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input 
              type="text" 
              placeholder="Search chat" 
              className="w-full bg-white/5 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-tiktok-cyan transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar px-2">
          {CHATS.map((chat) => (
            <motion.div 
              key={chat.id}
              whileHover={{ x: 4 }}
              onClick={() => setActiveChatId(chat.id)}
              className={cn(
                "p-4 rounded-2xl flex items-center space-x-4 cursor-pointer transition-all group",
                activeChatId === chat.id ? "bg-white/10" : "hover:bg-white/5"
              )}
            >
              <div className="relative">
                <img src={chat.avatar} className="w-12 h-12 rounded-full border border-white/10" alt={chat.name} />
                {chat.online && <Circle size={10} className="absolute bottom-0 right-0 text-green-500 fill-green-500 border-2 border-black rounded-full" />}
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-center mb-0.5">
                  <span className="font-bold text-sm truncate">{chat.name}</span>
                  <span className="text-[10px] text-white/30">{chat.time}</span>
                </div>
                <p className="text-xs text-white/40 truncate group-hover:text-white/60 transition-colors">
                  {chatHistories[chat.id]?.slice(-1)[0]?.text || chat.lastMsg}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Conversation View */}
      <div className={cn(
        "flex-1 flex flex-col bg-zinc-950 transition-all",
        !activeChatId ? "hidden md:flex items-center justify-center text-center p-12" : "flex"
      )}>
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 md:p-6 border-b border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-md">
              <div className="flex items-center space-x-4">
                <button onClick={() => setActiveChatId(null)} className="md:hidden p-2 -ml-2 text-white/60 hover:text-white">
                  <ImageIcon size={20} className="rotate-180" /> {/* Back arrow placeholder */}
                </button>
                <div className="relative">
                  <img src={activeChat.avatar} className="w-10 h-10 rounded-full" alt={activeChat.name} />
                  {activeChat.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-zinc-950 rounded-full" />}
                </div>
                <div>
                  <h3 className="font-bold text-sm">{activeChat.name}</h3>
                  <p className="text-[10px] text-tiktok-cyan font-bold uppercase tracking-widest">
                    {activeChat.online ? 'Active Now' : 'Offline'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 md:space-x-4">
                <button className="p-2 text-white/60 hover:text-white transition-colors"><Phone size={20} /></button>
                <button className="p-2 text-white/60 hover:text-white transition-colors"><Video size={20} /></button>
                <button className="p-2 text-white/60 hover:text-white transition-colors"><MoreHorizontal size={20} /></button>
              </div>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
              {chatHistories[activeChat.id]?.map((msg) => (
                <motion.div 
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={cn(
                    "flex flex-col max-w-[80%] md:max-w-[70%]",
                    msg.sender === 'me' ? "ml-auto items-end" : "mr-auto items-start"
                  )}
                >
                  <div className={cn(
                    "p-4 rounded-2xl text-sm font-medium leading-relaxed",
                    msg.sender === 'me' 
                      ? "bg-tiktok-cyan text-black rounded-tr-none shadow-[0_4px_15px_rgba(105,201,208,0.2)]" 
                      : "bg-white/10 text-white rounded-tl-none"
                  )}>
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-white/20 mt-1 uppercase font-bold tracking-widest">
                    {msg.sender === 'me' ? 'Delivered' : 'Just now'}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 md:p-6 bg-black/40 backdrop-blur-md border-t border-white/10">
              <div className="flex items-center space-x-4">
                <button className="p-2 text-white/40 hover:text-tiktok-cyan transition-colors"><ImageIcon size={20} /></button>
                <button className="p-2 text-white/40 hover:text-tiktok-cyan transition-colors"><Smile size={20} /></button>
                <div className="flex-1 relative">
                  <input 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    type="text" 
                    placeholder="Send a message..." 
                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:border-tiktok-cyan transition-all"
                  />
                </div>
                <button 
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className={cn(
                    "p-3 rounded-xl transition-all active:scale-90 shadow-lg",
                    message.trim() ? "bg-tiktok-cyan text-black" : "bg-white/5 text-white/20"
                  )}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center p-12 text-center h-full">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
              <Send size={48} className="text-tiktok-cyan animate-pulse" />
            </div>
            <h3 className="text-xl font-bold mb-2 uppercase italic tracking-tighter">Your Conversations</h3>
            <p className="text-white/40 max-w-xs text-sm leading-relaxed">
              Select a creator or follower from your list to start a reimagined conversation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesSection;
