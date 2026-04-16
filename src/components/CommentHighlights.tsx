import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, Flame } from 'lucide-react';

interface Comment {
  id: number;
  user: string;
  text: string;
  reaction: 'star' | 'heart' | 'flame';
}

interface CommentHighlightsProps {
  onReply?: (username: string) => void;
}

const HIGHLIGHTS: Comment[] = [
  { id: 1, user: 'CreativeMind', text: 'This lighting is insane! 🔥', reaction: 'flame' },
  { id: 2, user: 'ArtLover', text: 'The transition at 0:12 is seamless.', reaction: 'star' },
];

const CommentHighlights: React.FC<CommentHighlightsProps> = ({ onReply }) => {
  const [activeHighlight, setActiveHighlight] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHighlight((prev) => (prev + 1) % HIGHLIGHTS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'star': return <Star size={16} className="text-yellow-400 fill-yellow-400" />;
      case 'heart': return <Heart size={16} className="text-red-500 fill-red-500" />;
      case 'flame': return <Flame size={16} className="text-orange-500 fill-orange-500" />;
      default: return null;
    }
  };

  return (
    <div className="absolute top-20 right-4 w-64 z-20 pointer-events-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={HIGHLIGHTS[activeHighlight].id}
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -20, scale: 0.8 }}
          transition={{ duration: 0.5, type: 'spring' }}
          onClick={() => onReply?.(HIGHLIGHTS[activeHighlight].user)}
          className="bg-black/40 backdrop-blur-lg border border-white/10 p-3 rounded-2xl flex items-start space-x-3 cursor-pointer hover:bg-black/60 hover:border-tiktok-cyan/50 transition-all group"
        >
          <div className="bg-white/10 p-2 rounded-xl group-hover:bg-tiktok-cyan/20 transition-colors">
            {getIcon(HIGHLIGHTS[activeHighlight].reaction)}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-tiktok-cyan uppercase tracking-tighter">Pinned Highlight</span>
              <span className="text-[8px] font-bold text-white/20 uppercase opacity-0 group-hover:opacity-100 transition-opacity">Click to Reply</span>
            </div>
            <p className="text-xs text-white/90 leading-tight">
              <span className="font-bold mr-1">@{HIGHLIGHTS[activeHighlight].user}</span>
              {HIGHLIGHTS[activeHighlight].text}
            </p>
          </div>
          
          {/* Animated Glow */}
          <motion.div 
            animate={{ 
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -inset-1 bg-gradient-to-r from-tiktok-cyan/20 to-tiktok-pink/20 rounded-2xl blur-md -z-10"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CommentHighlights;
