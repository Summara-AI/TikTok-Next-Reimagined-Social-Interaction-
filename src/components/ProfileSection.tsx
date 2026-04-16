import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Grid, Heart, Bookmark, Edit2, Share2, X, Check, Camera, User } from 'lucide-react';
import { cn } from '../utils/cn';

const USER_DATA = {
  name: 'TikTok Reimagined',
  handle: '@tiktok_next',
  avatar: 'https://i.pravatar.cc/150?u=tiktok_next',
  following: '1.2K',
  followers: '8.5M',
  likes: '142M',
  bio: 'Product Designer & Developer. Reimagining the future of social interactions. ✨',
};

const POSTS = [
  { id: 1, url: 'https://cdn.pixabay.com/video/2021/04/12/70876-537443152_large.mp4', views: '1.2M' },
  { id: 2, url: 'https://cdn.pixabay.com/video/2022/08/21/128695-742215886_large.mp4', views: '850K' },
  { id: 3, url: 'https://cdn.pixabay.com/video/2023/10/20/185782-876378415_large.mp4', views: '2.1M' },
  { id: 4, url: 'https://cdn.pixabay.com/video/2022/01/21/104996-667468132_large.mp4', views: '500K' },
  { id: 5, url: 'https://cdn.pixabay.com/video/2021/04/12/70876-537443152_large.mp4', views: '3.4M' },
  { id: 6, url: 'https://cdn.pixabay.com/video/2022/08/21/128695-742215886_large.mp4', views: '1.1M' },
];

const ProfileSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(USER_DATA);
  const [previewVideo, setPreviewVideo] = useState<string | null>(null);

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, you'd call an API here
  };

  return (
    <div className="h-full w-full bg-black overflow-y-auto pb-24 no-scrollbar">
      {/* Profile Header */}
      <div className="p-8 pb-4 flex flex-col items-center text-center">
        <div className="relative mb-6 group">
          <div className="w-28 h-28 rounded-full border-4 border-tiktok-cyan/20 p-1 relative overflow-hidden">
            <img src={profileData.avatar} className="w-full h-full rounded-full object-cover border-2 border-white transition-transform group-hover:scale-110" alt="Avatar" />
            {isEditing && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer">
                <Camera size={24} className="text-white" />
              </div>
            )}
          </div>
          <button 
            onClick={() => setIsEditing(true)}
            className="absolute bottom-1 right-1 bg-tiktok-cyan p-2 rounded-full border-4 border-black text-black hover:scale-110 active:scale-90 transition-transform z-10"
          >
            <Edit2 size={14} />
          </button>
        </div>

        {isEditing ? (
          <div className="w-full max-w-xs space-y-4 mb-6">
            <input 
              value={profileData.name}
              onChange={(e) => setProfileData({...profileData, name: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-center text-lg font-bold focus:border-tiktok-cyan outline-none"
            />
            <textarea 
              value={profileData.bio}
              onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-center text-sm focus:border-tiktok-cyan outline-none resize-none h-20"
            />
            <div className="flex space-x-2">
              <button onClick={() => setIsEditing(false)} className="flex-1 py-2 bg-white/10 rounded-xl font-bold text-xs uppercase tracking-widest">Cancel</button>
              <button onClick={handleSave} className="flex-1 py-2 bg-tiktok-cyan text-black rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center space-x-1">
                <Check size={14} />
                <span>Save</span>
              </button>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-black italic uppercase tracking-tighter mb-1">{profileData.name}</h1>
            <p className="text-white/60 font-bold text-sm mb-6">{profileData.handle}</p>

            <div className="flex items-center space-x-8 mb-8">
              <StatItem label="Following" value={profileData.following} />
              <StatItem label="Followers" value={profileData.followers} />
              <StatItem label="Likes" value={profileData.likes} />
            </div>

            <div className="flex items-center space-x-2 mb-8 w-full max-w-sm px-4">
              <button 
                onClick={() => setIsEditing(true)}
                className="flex-1 py-3 bg-white text-black font-bold rounded-2xl hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest text-[10px]"
              >
                Edit Profile
              </button>
              <button className="p-3 bg-white/10 rounded-2xl hover:bg-white/20 transition-all border border-white/10 active:scale-90"><Settings size={20} /></button>
              <button className="p-3 bg-white/10 rounded-2xl hover:bg-white/20 transition-all border border-white/10 active:scale-90"><Share2 size={20} /></button>
            </div>

            <p className="text-sm text-white/70 max-w-xs leading-relaxed mb-8 px-4">{profileData.bio}</p>
          </>
        )}
      </div>

      {/* Tabs */}
      <div className="border-t border-white/10 flex items-center sticky top-0 bg-black/80 backdrop-blur-md z-20">
        <TabButton active={activeTab === 'posts'} onClick={() => setActiveTab('posts')} icon={<Grid size={20} />} />
        <TabButton active={activeTab === 'liked'} onClick={() => setActiveTab('liked')} icon={<Heart size={20} />} />
        <TabButton active={activeTab === 'saved'} onClick={() => setActiveTab('saved')} icon={<Bookmark size={20} />} />
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-3 gap-0.5 mt-0.5">
        {activeTab === 'posts' ? POSTS.map((post) => (
          <motion.div 
            key={post.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-[3/4] bg-white/5 relative group cursor-pointer overflow-hidden"
            onClick={() => setPreviewVideo(post.url)}
          >
            <video src={post.url} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" muted loop playsInline onMouseEnter={(e) => e.currentTarget.play()} onMouseLeave={(e) => e.currentTarget.pause()} />
            <div className="absolute bottom-2 left-2 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Grid size={12} className="text-white" />
              <span className="text-[10px] font-bold text-white uppercase tracking-tighter">{post.views}</span>
            </div>
          </motion.div>
        )) : (
          <div className="col-span-3 py-20 text-center flex flex-col items-center opacity-20">
            <Bookmark size={40} className="mb-4" />
            <p className="text-xs font-bold uppercase tracking-widest">No content yet</p>
          </div>
        )}
      </div>

      {/* Video Preview Modal (Shared with Explore) */}
      <AnimatePresence>
        {previewVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
          >
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="relative aspect-[9/16] h-full max-h-[85vh] bg-zinc-900 rounded-[32px] overflow-hidden border border-white/10 shadow-2xl"
            >
              <video src={previewVideo} className="w-full h-full object-cover" autoPlay loop controls />
              <button 
                onClick={() => setPreviewVideo(null)}
                className="absolute top-6 right-6 p-3 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-tiktok-pink transition-all active:scale-90"
              >
                <X size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const StatItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex flex-col items-center">
    <span className="text-lg font-black tracking-tighter italic">{value}</span>
    <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">{label}</span>
  </div>
);

const TabButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode }> = ({ active, onClick, icon }) => (
  <button 
    onClick={onClick}
    className={cn(
      "flex-1 py-4 flex items-center justify-center transition-all border-t-2",
      active ? "border-white text-white" : "border-transparent text-white/20"
    )}
  >
    {icon}
  </button>
);

export default ProfileSection;
