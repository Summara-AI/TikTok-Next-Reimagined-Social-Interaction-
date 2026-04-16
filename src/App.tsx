import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Compass, MessageSquare, User, Search, Plus, Bell, MessageCircle, Send, X } from 'lucide-react';
import VideoCard from './components/VideoCard';
import AnalyticsModal from './components/AnalyticsModal';
import LiveStream from './components/LiveStream';
import ExploreSection from './components/ExploreSection';
import MessagesSection from './components/MessagesSection';
import ProfileSection from './components/ProfileSection';
import { cn } from './utils/cn';

const MOCK_VIDEOS = [
  {
    id: 1,
    username: 'creative_vibes',
    description: 'Reimagining the way we interact with creators. What do you think of this new Q&A mode? #UX #Design #TikTokReimagined',
    song: 'Lofi Beats - Study Sessions',
    likes: '1.2M',
    comments: '45.2K',
    shares: '12.4K',
    videoUrl: 'https://videos.pexels.com/video-files/4069480/4069480-sd_640_360_25fps.mp4',
    avatar: 'https://i.pravatar.cc/150?u=creative_vibes',
  },
  {
    id: 2,
    username: 'tech_guru',
    description: 'AI-driven sentiment analysis is the future of content moderation and audience engagement. 🚀 #AI #FutureTech',
    song: 'Cyberpunk 2077 - Main Theme',
    likes: '892K',
    comments: '12.8K',
    shares: '5.2K',
    videoUrl: 'https://videos.pexels.com/video-files/4311145/4311145-sd_640_360_24fps.mp4',
    avatar: 'https://i.pravatar.cc/150?u=tech_guru',
  },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [hasEntered, setHasEntered] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [sidebarComment, setSidebarComment] = useState("");
  const [pinnedCommentId, setPinnedCommentId] = useState<number | null>(null);
  const sidebarInputRef = React.useRef<HTMLInputElement>(null);
  const [liveComments, setLiveComments] = useState([
    { id: 1, user: 'user_1', text: 'This is incredible! 🔥' },
    { id: 2, user: 'design_pro', text: 'The UX here is next level.' },
  ]);

  const addComment = (text: string) => {
    const id = Date.now();
    setLiveComments(prev => [{ id, user: 'creator_you', text }, ...prev].slice(0, 15));
  };

  const handleSendSidebarComment = () => {
    if (!sidebarComment.trim()) return;
    addComment(sidebarComment);
    setSidebarComment("");
  };

  const handleSidebarReply = (username: string) => {
    setSidebarComment(`@${username} `);
    setTimeout(() => {
      sidebarInputRef.current?.focus();
    }, 0);
  };

  const handlePinComment = (id: number) => {
    setPinnedCommentId(pinnedCommentId === id ? null : id);
  };

  useEffect(() => {
    if (!hasEntered) return;
    
    const interval = setInterval(() => {
      const id = Date.now();
      const newUser = `user_${Math.floor(Math.random() * 1000)}`;
      const texts = [
        'Wow! 😮', 'Love this vibe', 'How did you do that?', 
        'TikTok 2.0 is here', 'Amazing transitions', 'Need a tutorial!'
      ];
      const newText = texts[Math.floor(Math.random() * texts.length)];
      
      setLiveComments(prev => [{ id, user: newUser, text: newText }, ...prev].slice(0, 10));
    }, 3000);
    
    return () => clearInterval(interval);
  }, [hasEntered]);

  return (
    <div className="h-screen w-full bg-black text-white overflow-hidden flex flex-col md:flex-row">
      
      {/* Entry Overlay */}
      <AnimatePresence>
        {!hasEntered && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-6 text-center"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="max-w-md"
            >
              <div className="w-20 h-20 bg-gradient-to-tr from-tiktok-cyan to-tiktok-pink rounded-3xl mx-auto mb-8 shadow-[0_0_50px_rgba(105,201,208,0.3)]" />
              <h1 className="text-4xl font-black mb-4 tracking-tighter uppercase italic">TikTok Next</h1>
              <p className="text-white/60 mb-12 text-lg">Reimagining the creator economy through interactive sentiment and Q&A.</p>
              
              <button 
                onClick={() => setHasEntered(true)}
                className="group relative px-12 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-tiktok-cyan via-tiktok-pink to-tiktok-cyan opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                <span className="relative z-10 uppercase tracking-widest">Enter Experience</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex w-24 lg:w-64 flex-col border-r border-white/10 p-4 space-y-8 bg-black z-50">
        <div className="flex items-center space-x-3 px-2 mb-8">
          <div className="w-8 h-8 bg-gradient-to-tr from-tiktok-cyan to-tiktok-pink rounded-lg" />
          <span className="hidden lg:block font-black text-xl tracking-tighter italic uppercase">TikTok Next</span>
        </div>

        <nav className="flex-1 space-y-2">
          <NavItem icon={<Home />} label="For You" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
          <NavItem icon={<Compass />} label="Explore" active={activeTab === 'explore'} onClick={() => setActiveTab('explore')} />
          <NavItem icon={<MessageSquare />} label="Messages" active={activeTab === 'messages'} onClick={() => setActiveTab('messages')} />
          <NavItem icon={<User />} label="Profile" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
        </nav>

        <div className="px-2 space-y-4">
          <div className="hidden lg:block p-4 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-xs text-white/60 mb-2 uppercase font-bold tracking-widest">Creator Center</p>
            <p className="text-sm font-semibold mb-2 text-tiktok-cyan">Daily Mood Index</p>
            <div className="h-2 w-full bg-white/10 rounded-full mb-4 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "78%" }}
                className="h-full bg-gradient-to-r from-tiktok-cyan to-tiktok-pink"
              />
            </div>
            <button 
              onClick={() => setShowAnalytics(true)}
              className="w-full py-2 bg-tiktok-cyan/10 hover:bg-tiktok-cyan/20 text-tiktok-cyan rounded-xl text-xs font-bold transition-all border border-tiktok-cyan/20 active:scale-95"
            >
              View Analytics
            </button>
          </div>
          
          <button 
            onClick={() => setIsLiveMode(!isLiveMode)}
            className={cn(
              "w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center space-x-2 border",
              isLiveMode 
                ? "bg-tiktok-pink border-tiktok-pink text-white animate-pulse" 
                : "bg-white/5 border-white/10 text-white hover:bg-white/10"
            )}
          >
            <div className={cn("w-2 h-2 rounded-full", isLiveMode ? "bg-white animate-ping" : "bg-tiktok-pink")} />
            <span>{isLiveMode ? "End Live" : "Go Live"}</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative h-screen md:h-full overflow-y-auto snap-y snap-mandatory no-scrollbar bg-black">
        
        {/* Top Navigation for Mobile */}
        <header className="md:hidden absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50 bg-gradient-to-b from-black/80 to-transparent">
          <button className="p-2 bg-white/10 backdrop-blur-md rounded-full">
            <Search size={20} />
          </button>
          <div className="flex space-x-4">
            <span className="text-white/60 font-bold uppercase tracking-widest text-sm">Following</span>
            <span className="text-white font-bold uppercase tracking-widest text-sm border-b-2 border-white">For You</span>
          </div>
          <button className="p-2 bg-white/10 backdrop-blur-md rounded-full">
            <Bell size={20} />
          </button>
        </header>

        {/* Video Feed & Sections */}
        <div className="h-full w-full">
          {hasEntered && activeTab === 'home' && !isLiveMode && !showAnalytics && (
            <div className="h-full w-full">
              {MOCK_VIDEOS.map((video) => (
                <VideoCard 
                  key={video.id} 
                  {...video} 
                  onReply={addComment}
                />
              ))}
            </div>
          )}
          
          {hasEntered && activeTab === 'explore' && <ExploreSection />}
          {hasEntered && activeTab === 'messages' && <MessagesSection />}
          {hasEntered && activeTab === 'profile' && <ProfileSection />}
        </div>

        {/* Mobile Bottom Navigation */}
        <footer className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-black border-t border-white/10 flex items-center justify-around z-50 px-4">
          <button 
            onClick={() => setActiveTab('home')}
            className={cn(activeTab === 'home' ? "text-white" : "text-white/40")}
          >
            <Home size={24} />
          </button>
          <button 
            onClick={() => setActiveTab('explore')}
            className={cn(activeTab === 'explore' ? "text-white" : "text-white/40")}
          >
            <Compass size={24} />
          </button>
          <div className="relative -top-2">
            <div className="absolute inset-0 bg-gradient-to-r from-tiktok-cyan to-tiktok-pink rounded-xl translate-x-1 translate-y-1 blur-sm opacity-50" />
            <button className="relative bg-white text-black p-2 rounded-xl">
              <Plus size={24} />
            </button>
          </div>
          <button 
            onClick={() => setActiveTab('messages')}
            className={cn(activeTab === 'messages' ? "text-white" : "text-white/40")}
          >
            <MessageSquare size={24} />
          </button>
          <button 
            onClick={() => setActiveTab('profile')}
            className={cn(activeTab === 'profile' ? "text-white" : "text-white/40")}
          >
            <User size={24} />
          </button>
        </footer>
      </main>

      {/* Right Side Overlay for Desktop - Info/Engagement */}
      <aside className="hidden xl:flex w-80 flex-col border-l border-white/10 p-6 bg-black z-40 overflow-y-auto">
        <h3 className="text-xl font-bold mb-6 flex items-center space-x-2">
          <MessageCircle size={20} className="text-tiktok-cyan" />
          <span>Live Interactions</span>
        </h3>
        
        {/* Pinned Comment Section */}
        {pinnedCommentId && (
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <Plus size={12} className="text-tiktok-pink" />
              <span className="text-[10px] font-bold text-tiktok-pink uppercase tracking-widest">Pinned by Creator</span>
            </div>
            {liveComments.filter(c => c.id === pinnedCommentId).map(comment => (
              <motion.div 
                key={`pinned-${comment.id}`}
                layoutId={`comment-${comment.id}`}
                className="p-4 bg-tiktok-pink/10 rounded-2xl border border-tiktok-pink/30 relative"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <img src={`https://i.pravatar.cc/150?u=${comment.user}`} className="w-8 h-8 rounded-full border border-tiktok-pink/20" alt={comment.user} />
                  <span className="font-bold text-xs text-tiktok-pink">@{comment.user}</span>
                </div>
                <p className="text-xs text-white/90 font-medium">{comment.text}</p>
                <button 
                  onClick={() => setPinnedCommentId(null)}
                  className="absolute top-2 right-2 p-1 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={14} className="text-white/40" />
                </button>
              </motion.div>
            ))}
          </div>
        )}
        
        <div className="flex-1 space-y-4 mb-4 overflow-y-auto pr-2 no-scrollbar">
          <AnimatePresence initial={false}>
            {liveComments.filter(c => c.id !== pinnedCommentId).map((comment) => (
              <motion.div 
                key={comment.id}
                layoutId={`comment-${comment.id}`}
                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-tiktok-cyan/40 transition-colors group cursor-pointer"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <img 
                    src={`https://i.pravatar.cc/150?u=${comment.user}`} 
                    className="w-8 h-8 rounded-full border border-white/10" 
                    alt={comment.user}
                  />
                  <span className="font-bold text-xs">@{comment.user}</span>
                </div>
                <p className="text-xs text-white/70 line-clamp-2">{comment.text}</p>
                <div className="mt-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleSidebarReply(comment.user)}
                    className="text-[10px] font-bold text-tiktok-cyan uppercase hover:underline"
                  >
                    Reply
                  </button>
                  <button 
                    onClick={() => handlePinComment(comment.id)}
                    className="text-[10px] font-bold text-tiktok-pink uppercase hover:underline"
                  >
                    Pin
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Sidebar Input Area */}
        <div className="mt-auto pt-4 border-t border-white/10">
          <div className="relative">
            <input 
              ref={sidebarInputRef}
              type="text"
              value={sidebarComment}
              onChange={(e) => setSidebarComment(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendSidebarComment()}
              placeholder="Post a reply..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 pr-12 text-sm text-white focus:outline-none focus:border-tiktok-cyan transition-colors"
            />
            <button 
              onClick={handleSendSidebarComment}
              className={cn(
                "absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all",
                sidebarComment.trim() ? "bg-tiktok-cyan text-black" : "text-white/20"
              )}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Overlays */}
      <AnimatePresence>
        {showAnalytics && (
          <AnalyticsModal onClose={() => setShowAnalytics(false)} />
        )}
        {isLiveMode && (
          <LiveStream onClose={() => setIsLiveMode(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full flex items-center space-x-4 p-3 rounded-2xl transition-all",
      active ? "bg-white/10 text-white" : "text-white/40 hover:bg-white/5 hover:text-white"
    )}
  >
    <div className={cn(active ? "text-tiktok-cyan" : "")}>{icon}</div>
    <span className="hidden lg:block font-bold text-sm uppercase tracking-widest">{label}</span>
  </button>
);

export default App;
