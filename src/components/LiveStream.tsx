import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Heart, Share2, X, Zap, Crown, Radio, Send } from 'lucide-react';
import Hls from 'hls.js';
import { cn } from '../utils/cn';

interface LiveStreamProps {
  onClose: () => void;
}

// Stable Public HLS Live Streams
const LIVE_STREAMS = [
  "https://demo.unified-streaming.com/k8s/live/stable/sintel.isml/.m3u8",
  "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
];

const LiveStream: React.FC<LiveStreamProps> = ({ onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [viewerCount, setViewerCount] = useState(1240);
  const [likes, setLikes] = useState(45200);
  const [isLive, setIsLive] = useState(false);
  const [userComment, setUserComment] = useState("");
  const [pinnedComment, setPinnedComment] = useState<{id: number, user: string, text: string} | null>(null);
  const [comments, setComments] = useState([
    { id: 1, user: 'charli_fan', text: 'OMGGGG HI!!! 😍' },
    { id: 2, user: 'tech_lover', text: 'Is this the new AI feature?' },
    { id: 3, user: 'creative_bee', text: 'Love the setup! ✨' },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSendComment = () => {
    if (!userComment.trim()) return;
    
    const id = Date.now();
    setComments(prev => [...prev, { id, user: 'you', text: userComment }].slice(-10));
    setUserComment("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendComment();
    }
  };

  const togglePin = (comment: {id: number, user: string, text: string}) => {
    setPinnedComment(pinnedComment?.id === comment.id ? null : comment);
  };

  const handleReplyTo = (username: string) => {
    setUserComment(`@${username} `);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const streamUrl = LIVE_STREAMS[0];

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(streamUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(e => console.error("Auto-play blocked:", e));
        setIsLive(true);
      });

      return () => hls.destroy();
    } 
    else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native support (Safari)
      video.src = streamUrl;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(e => console.error("Auto-play blocked:", e));
        setIsLive(true);
      });
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(prev => prev + Math.floor(Math.random() * 20) - 5);
      
      const id = Date.now();
      const users = ['sam', 'alex', 'mia', 'leo', 'zara'];
      const texts = ['SO COOL', 'LETS GOOO', 'WOW', '❤️❤️❤️', 'Question!!', 'Real HLS Tech!'];
      const newUser = users[Math.floor(Math.random() * users.length)];
      const newText = texts[Math.floor(Math.random() * texts.length)];
      
      setComments(prev => [...prev, { id, user: newUser, text: newText }].slice(-10));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 bg-black z-[60] flex items-center justify-center overflow-hidden">
      {/* Real HLS Video Stream */}
      <video 
        ref={videoRef}
        className="h-full w-full object-cover"
        playsInline
        muted
      />

      {!isLive && (
        <div className="absolute inset-0 bg-black flex flex-col items-center justify-center space-y-4">
          <Radio className="text-tiktok-pink animate-pulse" size={48} />
          <span className="text-white font-bold uppercase tracking-widest text-sm">Connecting to Stream...</span>
        </div>
      )}

      {/* Live Overlays */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
        {/* Top Bar */}
        <div className="flex items-center justify-between pointer-events-auto">
          <div className="flex items-center space-x-3">
            <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center space-x-2 border border-white/10">
              <div className="w-2 h-2 bg-tiktok-pink rounded-full animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-white">Live</span>
              <div className="w-px h-3 bg-white/20" />
              <div className="flex items-center space-x-1 text-white/80">
                <Users size={12} />
                <span className="text-xs font-bold">{viewerCount.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 flex items-center justify-center">
                <Crown size={12} className="text-black" />
              </div>
              <span className="text-xs font-bold text-white">Influencer Mode</span>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-tiktok-pink transition-colors border border-white/10"
          >
            <X size={24} />
          </button>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col space-y-4">
          {/* Pinned Comment Overlay */}
          <AnimatePresence>
            {pinnedComment && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-tiktok-pink/20 backdrop-blur-xl p-3 rounded-2xl border border-tiktok-pink/40 self-start mb-2 max-w-[80%] relative"
              >
                <div className="flex items-center space-x-2 mb-1">
                  <Zap size={10} className="text-tiktok-pink fill-tiktok-pink" />
                  <span className="text-[10px] font-black text-tiktok-pink uppercase tracking-tighter">Pinned</span>
                </div>
                <span className="text-xs font-bold text-white mr-2">@{pinnedComment.user}</span>
                <span className="text-xs text-white/90">{pinnedComment.text}</span>
                <button 
                  onClick={() => setPinnedComment(null)}
                  className="absolute -top-2 -right-2 bg-zinc-800 rounded-full p-1 border border-white/10"
                >
                  <X size={10} className="text-white/60" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Comments Feed */}
          <div className="max-h-[300px] overflow-hidden flex flex-col justify-end space-y-2 pointer-events-auto">
            <AnimatePresence initial={false}>
              {comments.filter(c => c.id !== pinnedComment?.id).map((c) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-black/40 backdrop-blur-md p-2 px-3 rounded-2xl border border-white/5 self-start cursor-pointer hover:bg-black/60 transition-colors group relative"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-black text-tiktok-cyan mr-2 uppercase tracking-tighter">@{c.user}</span>
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleReplyTo(c.user); }}
                        className="text-[8px] font-bold text-tiktok-cyan uppercase hover:underline"
                      >
                        Reply
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); togglePin(c); }}
                        className="text-[8px] font-bold text-tiktok-pink uppercase hover:underline"
                      >
                        Pin
                      </button>
                    </div>
                  </div>
                  <span className="text-xs text-white/90">{c.text}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Interaction Bar */}
          <div className="flex items-center justify-between pointer-events-auto">
            <div 
              className="flex-1 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/10 mr-4 flex items-center cursor-text"
              onClick={() => inputRef.current?.focus()}
            >
              <input 
                ref={inputRef}
                type="text"
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add a comment..."
                className="flex-1 bg-transparent text-white text-sm focus:outline-none placeholder:text-white/40"
              />
              <button 
                onClick={handleSendComment}
                className={cn(
                  "ml-2 p-1.5 rounded-full transition-all",
                  userComment.trim() ? "bg-tiktok-cyan text-black" : "text-white/20"
                )}
              >
                <Send size={16} />
              </button>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:scale-110 active:scale-90 transition-all border border-white/10">
                <Share2 size={20} />
              </button>
              <button 
                onClick={() => setLikes(prev => prev + 1)}
                className="relative p-3 bg-tiktok-pink rounded-full text-white hover:scale-110 active:scale-90 transition-all shadow-[0_0_20px_rgba(238,29,82,0.4)] group"
              >
                <Heart size={20} className="fill-white group-active:scale-125 transition-transform" />
                <span className="absolute -top-1 -right-1 bg-white text-tiktok-pink text-[8px] font-black px-1.5 py-0.5 rounded-full border border-tiktok-pink">
                  {(likes/1000).toFixed(1)}K
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Center Tap Feedback Overlay */}
      <div 
        className="absolute inset-0" 
        onClick={() => setLikes(prev => prev + 1)}
      />
    </div>
  );
};

export default LiveStream;
