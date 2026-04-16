import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share2, Plus, Music2, CheckCircle2, MoreVertical, Volume2, VolumeX, Loader2, Play } from 'lucide-react';
import { cn } from '../utils/cn';
import QAOverlay from './QAOverlay';
import CommentHighlights from './CommentHighlights';
import SentimentTimeline from './SentimentTimeline';
import CreatorTools from './CreatorTools';
import ShareModal from './ShareModal';
import MoreOptionsModal from './MoreOptionsModal';

interface VideoCardProps {
  id: number;
  username: string;
  description: string;
  song: string;
  likes: string;
  comments: string;
  shares: string;
  videoUrl: string;
  avatar: string;
  onReply?: (text: string) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({
  username,
  description,
  song,
  likes,
  comments,
  shares,
  videoUrl,
  avatar,
  onReply,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isQAActive, setIsQAActive] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isFollowed, setIsFollowed] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showMoreModal, setShowMoreModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [replyTo, setReplyTo] = useState<string | undefined>(undefined);
  const [showToast, setShowToast] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 2000);
  };

  const handleShareAction = (platform: string) => {
    if (platform === 'copy') {
      navigator.clipboard.writeText(window.location.href);
      triggerToast("Link copied to clipboard! 🔗");
    } else {
      // Simulation for external apps
      triggerToast(`Opening ${platform}... 🚀`);
      setTimeout(() => {
        const urls: Record<string, string> = {
          x: 'https://twitter.com/intent/tweet?text=Check out this reimagined TikTok experience!',
          facebook: 'https://www.facebook.com/sharer/sharer.php?u=' + window.location.href,
          whatsapp: 'https://api.whatsapp.com/send?text=Check out this reimagined TikTok experience!',
        };
        if (urls[platform]) window.open(urls[platform], '_blank');
      }, 800);
    }
    setShowShareModal(false);
  };

  const handleMoreAction = (action: string) => {
    switch (action) {
      case 'save':
        setIsSaved(!isSaved);
        triggerToast(!isSaved ? "Added to Favorites! ⭐" : "Removed from Favorites 🗑️");
        break;
      case 'not_interested':
        triggerToast("We'll show fewer videos like this 📉");
        break;
      case 'duet':
        triggerToast("Opening Duet Studio... 🎭");
        break;
      case 'stitch':
        triggerToast("Opening Stitch Studio... ✂️");
        break;
      case 'report':
        triggerToast("Report submitted for review 🚩");
        break;
      case 'download':
        triggerToast("Saving video to device... 📥");
        break;
      default:
        break;
    }
    setShowMoreModal(false);
  };

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleDoubleClick = (e: React.MouseEvent) => {
    setShowHeart(true);
    setIsLiked(true);
    
    // Add floating heart
    const newHeart = { id: Date.now(), x: e.clientX, y: e.clientY };
    setFloatingHearts(prev => [...prev, newHeart]);
    
    setTimeout(() => setShowHeart(false), 800);
    setTimeout(() => {
      setFloatingHearts(prev => prev.filter(h => h.id !== newHeart.id));
    }, 2000);
  };

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(err => console.error("Play failed:", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative h-screen md:h-full w-full bg-black flex items-center justify-center snap-start overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={videoUrl}
        loop
        playsInline
        autoPlay
        muted
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => setIsLoading(false)}
        onError={(e) => {
          console.error("Video error:", e);
          setIsLoading(false);
        }}
        onDoubleClick={handleDoubleClick}
        onClick={(e) => togglePlay(e)}
      />

      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px] z-10">
          <Loader2 className="text-white animate-spin" size={48} />
        </div>
      )}

      {/* Play/Pause Large Overlay */}
      <AnimatePresence>
        {!isPlaying && !isLoading && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            onClick={(e) => togglePlay(e)}
            className="absolute inset-0 flex items-center justify-center bg-black/10 z-10 cursor-pointer"
          >
            <Play className="text-white/50 fill-white/20" size={80} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mute Toggle */}
      <button 
        onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
        className="absolute top-4 right-4 p-2 bg-black/20 backdrop-blur-md rounded-full text-white z-30 hover:bg-black/40 transition-colors"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      {/* Double Tap Heart */}
      <AnimatePresence>
        {showHeart && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1.5 }}
            exit={{ opacity: 0, scale: 2, transition: { duration: 0.2 } }}
            className="absolute z-30 pointer-events-none"
          >
            <Heart size={100} className="text-tiktok-pink fill-tiktok-pink drop-shadow-2xl" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side Actions */}
      <div className="absolute right-4 bottom-32 flex flex-col items-center space-y-6 z-20">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden shadow-lg">
            <img src={avatar} alt={username} className="w-full h-full object-cover" />
          </div>
          <AnimatePresence>
            {!isFollowed && (
              <motion.button 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0, rotate: 90 }}
                onClick={() => setIsFollowed(true)}
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-tiktok-pink rounded-full p-1 shadow-lg hover:scale-110 active:scale-90 transition-transform"
              >
                <Plus size={14} className="text-white" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <button 
          onClick={() => setIsLiked(!isLiked)}
          className="flex flex-col items-center group"
        >
          <div className="bg-white/10 p-3 rounded-full backdrop-blur-md group-hover:scale-110 active:scale-90 transition-all">
            <Heart 
              size={28} 
              className={cn(
                "transition-colors",
                isLiked ? "text-tiktok-pink fill-tiktok-pink" : "text-white"
              )} 
            />
          </div>
          <span className="text-xs font-semibold text-white mt-1">{likes}</span>
        </button>

        <button 
          onClick={() => setShowTools(true)}
          className="flex flex-col items-center group active:scale-95 transition-all"
        >
          <div className="bg-white/10 p-3 rounded-full backdrop-blur-md group-hover:scale-110 transition-all">
            <MessageCircle size={28} className="text-white" />
          </div>
          <span className="text-xs font-semibold text-white mt-1">{comments}</span>
        </button>

        <button 
          onClick={() => setShowShareModal(true)}
          className="flex flex-col items-center group active:scale-95 transition-all"
        >
          <div className="bg-white/10 p-3 rounded-full backdrop-blur-md group-hover:scale-110 transition-all">
            <Share2 size={28} className="text-white" />
          </div>
          <span className="text-xs font-semibold text-white mt-1">{shares}</span>
        </button>

        <button 
          onClick={() => setShowMoreModal(true)}
          className="bg-white/10 p-3 rounded-full backdrop-blur-md hover:scale-110 active:scale-90 transition-all"
        >
          <MoreVertical size={28} className={cn("transition-colors", isSaved ? "text-yellow-500" : "text-white")} />
        </button>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent z-10">
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <span className="font-bold text-white text-lg">@{username}</span>
            <CheckCircle2 size={16} className="text-tiktok-cyan fill-tiktok-cyan/20" />
          </div>
          <p className="text-white text-sm mb-3 max-w-[80%]">{description}</p>
          <div className="flex items-center space-x-2">
            <Music2 size={14} className="text-white animate-spin-slow" />
            <span className="text-white text-xs whitespace-nowrap overflow-hidden">
              <span className="inline-block animate-marquee">{song}</span>
            </span>
          </div>
        </div>

        {/* Sentiment Timeline */}
        <SentimentTimeline />
      </div>

      {/* Floating Hearts Animation */}
      <AnimatePresence>
        {floatingHearts.map(heart => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 1, scale: 0.5, y: heart.y - 50, x: heart.x - 20 }}
            animate={{ 
              opacity: 0, 
              y: heart.y - 250, 
              x: heart.x + (Math.random() * 100 - 50),
              scale: 1.5,
              rotate: Math.random() * 40 - 20
            }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="fixed pointer-events-none z-50"
          >
            <Heart size={40} className="text-tiktok-pink fill-tiktok-pink" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Feature Overlays */}
      <QAOverlay active={isQAActive} />
      <CommentHighlights 
        onReply={(username) => {
          setReplyTo(username);
          setShowTools(true);
        }} 
      />
      
      <AnimatePresence>
        {showTools && (
          <CreatorTools 
            onClose={() => {
              setShowTools(false);
              setReplyTo(undefined);
            }} 
            initialReplyTo={replyTo}
            onReply={(text) => {
              onReply?.(text);
              setShowTools(false);
              setReplyTo(undefined);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showShareModal && (
          <ShareModal 
            onClose={() => setShowShareModal(false)} 
            onShare={handleShareAction} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showMoreModal && (
          <MoreOptionsModal 
            onClose={() => setShowMoreModal(false)} 
            onAction={handleMoreAction}
            isSaved={isSaved}
          />
        )}
      </AnimatePresence>

      {/* Floating Q&A Toggle */}
      <button 
        onClick={() => setIsQAActive(!isQAActive)}
        className={cn(
          "absolute top-4 left-4 px-4 py-2 rounded-full backdrop-blur-md border transition-all z-30 active:scale-95",
          isQAActive ? "bg-tiktok-cyan border-tiktok-cyan text-black" : "bg-white/10 border-white/20 text-white"
        )}
      >
        <span className="text-xs font-bold uppercase tracking-wider">Q&A Mode</span>
      </button>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-32 left-1/2 -translate-x-1/2 z-[100] bg-tiktok-cyan text-black px-6 py-3 rounded-full font-bold shadow-2xl flex items-center space-x-2"
          >
            <span>{showToast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoCard;
