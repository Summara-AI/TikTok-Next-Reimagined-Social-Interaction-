import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, TrendingUp, Music2, Camera, Zap, Flame, X, Play, Heart } from 'lucide-react';
import { cn } from '../utils/cn';

const CATEGORIES = [
  { id: 1, title: 'Photography', count: '1.2M videos', icon: <Camera size={20} />, color: 'bg-blue-500', tag: 'photography' },
  { id: 2, title: 'UX Design', count: '850K videos', icon: <Zap size={20} />, color: 'bg-tiktok-cyan', tag: 'design' },
  { id: 3, title: 'Gaming', count: '4.5M videos', icon: <Flame size={20} />, color: 'bg-tiktok-pink', tag: 'gaming' },
  { id: 4, title: 'Music', count: '2.1M videos', icon: <Music2 size={20} />, color: 'bg-purple-500', tag: 'music' },
];

const TRENDING_VIDEOS = [
  { id: 1, url: 'https://cdn.pixabay.com/video/2021/04/12/70876-537443152_large.mp4', views: '2.4M', tag: 'photography' },
  { id: 2, url: 'https://cdn.pixabay.com/video/2022/08/21/128695-742215886_large.mp4', views: '890K', tag: 'design' },
  { id: 3, url: 'https://cdn.pixabay.com/video/2023/10/20/185782-876378415_large.mp4', views: '1.2M', tag: 'gaming' },
  { id: 4, url: 'https://cdn.pixabay.com/video/2022/01/21/104996-667468132_large.mp4', views: '4.1M', tag: 'music' },
  { id: 5, url: 'https://cdn.pixabay.com/video/2021/04/12/70876-537443152_large.mp4', views: '500K', tag: 'photography' },
  { id: 6, url: 'https://cdn.pixabay.com/video/2022/08/21/128695-742215886_large.mp4', views: '1.1M', tag: 'design' },
];

const ExploreSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [previewVideo, setPreviewVideo] = useState<string | null>(null);

  const filteredVideos = TRENDING_VIDEOS.filter(v => 
    (!selectedTag || v.tag === selectedTag) &&
    (!searchQuery || v.tag.includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="h-full w-full bg-black overflow-y-auto p-6 pb-24 no-scrollbar">
      {/* Search Header */}
      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search size={20} className="text-white/40" />
        </div>
        <input 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text" 
          placeholder="Search trending topics..." 
          className="w-full bg-white/10 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-tiktok-cyan transition-all"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-4 flex items-center text-white/40 hover:text-white"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {CATEGORIES.map((cat) => (
          <motion.div 
            key={cat.id}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedTag(selectedTag === cat.tag ? null : cat.tag)}
            className={cn(
              "p-4 rounded-3xl border transition-all flex flex-col justify-between h-32 cursor-pointer group",
              selectedTag === cat.tag ? "bg-white/20 border-white/40 shadow-xl" : "bg-white/5 border-white/10"
            )}
          >
            <div className={cn(cat.color, "w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:rotate-12")}>
              {cat.icon}
            </div>
            <div>
              <h3 className="font-bold text-sm">{cat.title}</h3>
              <p className="text-[10px] text-white/40 uppercase tracking-widest">{cat.count}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trending Section */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-6 px-2">
          <div className="flex items-center space-x-2">
            <TrendingUp size={20} className="text-tiktok-cyan" />
            <h2 className="text-xl font-bold italic tracking-tighter uppercase">
              {selectedTag ? `${selectedTag} Feed` : 'Trending Feed'}
            </h2>
          </div>
          {selectedTag && (
            <button 
              onClick={() => setSelectedTag(null)}
              className="text-xs font-bold text-tiktok-pink uppercase tracking-widest"
            >
              Clear Filter
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          <AnimatePresence mode="popLayout">
            {filteredVideos.map((v) => (
              <motion.div 
                key={v.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="aspect-[9/16] rounded-2xl overflow-hidden bg-white/5 border border-white/5 relative group cursor-pointer"
                onClick={() => setPreviewVideo(v.url)}
              >
                <video 
                  src={v.url} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" 
                  muted 
                  loop 
                  playsInline 
                  onMouseEnter={(e) => e.currentTarget.play()} 
                  onMouseLeave={(e) => e.currentTarget.pause()} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center space-x-1">
                      <Play size={10} fill="white" />
                      <span className="text-[10px] font-black tracking-tighter">{v.views}</span>
                    </div>
                    <Heart size={12} />
                  </div>
                </div>
                <div className="absolute top-3 left-3 flex items-center space-x-1">
                  <Flame size={12} className="text-tiktok-pink" />
                  <span className="text-[10px] font-bold text-white uppercase drop-shadow-md">Hot</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {filteredVideos.length === 0 && (
          <div className="py-20 text-center">
            <Search size={40} className="mx-auto text-white/10 mb-4" />
            <p className="text-white/40 font-bold uppercase tracking-widest">No results found</p>
          </div>
        )}
      </div>

      {/* Video Preview Modal */}
      <AnimatePresence>
        {previewVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black flex items-center justify-center p-4 md:p-12"
          >
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="relative aspect-[9/16] h-full max-h-[80vh] bg-zinc-900 rounded-[32px] overflow-hidden border border-white/10 shadow-2xl"
            >
              <video src={previewVideo} className="w-full h-full object-cover" autoPlay loop controls />
              <button 
                onClick={() => setPreviewVideo(null)}
                className="absolute top-6 right-6 p-3 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-tiktok-pink transition-colors"
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

export default ExploreSection;
