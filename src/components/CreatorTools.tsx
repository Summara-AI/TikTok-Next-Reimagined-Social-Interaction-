import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Mic, Video, Send, X, Star, Zap } from 'lucide-react';

interface CreatorToolsProps {
  onClose: () => void;
  onReply: (text: string) => void;
  initialReplyTo?: string;
}

const TEMPLATES = [
  "Thanks for the support! 💖",
  "Working on the tutorial now! 🚀",
  "Good catch! Check the link in bio. 🔗",
  "Love your content too! 🙌",
];

const CreatorTools: React.FC<CreatorToolsProps> = ({ onClose, onReply, initialReplyTo }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(initialReplyTo ? `@${initialReplyTo} ` : null);
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      // Move cursor to end
      const len = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(len, len);
    }
  }, []);

  const handleSend = () => {
    if (selectedTemplate) {
      onReply(selectedTemplate);
      setSelectedTemplate(null);
    }
  };

  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-40 flex flex-col justify-end">
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="bg-zinc-900 rounded-t-[32px] p-6 pb-12 w-full max-w-lg mx-auto border-t border-white/10"
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="bg-tiktok-cyan p-2 rounded-xl">
              <Zap size={20} className="text-black" />
            </div>
            <h3 className="text-xl font-bold text-white">Creator Reply Suite</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={24} className="text-white/60" />
          </button>
        </div>

        {/* Quick Templates */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <MessageSquare size={16} className="text-tiktok-cyan" />
            <span className="text-sm font-bold text-white/70 uppercase tracking-widest">Smart Templates</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {TEMPLATES.map((t, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedTemplate(t)}
                className={`p-3 rounded-2xl text-xs font-semibold text-left transition-all border ${
                  selectedTemplate === t 
                    ? "bg-tiktok-cyan border-tiktok-cyan text-black" 
                    : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10"
                }`}
              >
                {t}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <button className="flex flex-col items-center space-y-2 group">
            <div className="w-full aspect-square bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-white/10 transition-colors border border-white/10">
              <Video size={24} className="text-tiktok-pink" />
            </div>
            <span className="text-[10px] font-bold text-white/60 uppercase">Duet Reply</span>
          </button>
          
          <button 
            onClick={() => setIsRecording(!isRecording)}
            className="flex flex-col items-center space-y-2 group"
          >
            <div className={`w-full aspect-square rounded-2xl flex items-center justify-center transition-all border ${
              isRecording ? "bg-tiktok-pink border-tiktok-pink animate-pulse" : "bg-white/5 border-white/10 group-hover:bg-white/10"
            }`}>
              <Mic size={24} className={isRecording ? "text-white" : "text-tiktok-cyan"} />
            </div>
            <span className="text-[10px] font-bold text-white/60 uppercase">
              {isRecording ? "Recording..." : "Voice Note"}
            </span>
          </button>

          <button className="flex flex-col items-center space-y-2 group">
            <div className="w-full aspect-square bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-white/10 transition-colors border border-white/10">
              <Star size={24} className="text-yellow-400" />
            </div>
            <span className="text-[10px] font-bold text-white/60 uppercase">Highlight</span>
          </button>
        </div>

        {/* Input Area */}
        <div className="relative group">
          <textarea
            ref={textareaRef}
            value={selectedTemplate || ""}
            onChange={(e) => setSelectedTemplate(e.target.value)}
            placeholder="Type your reply..."
            className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 pr-16 text-white text-sm focus:outline-none focus:border-tiktok-cyan transition-colors resize-none h-24"
          />
          <button 
            onClick={handleSend}
            className="absolute bottom-4 right-4 bg-tiktok-cyan p-2 rounded-xl text-black hover:scale-110 active:scale-95 transition-transform"
          >
            <Send size={20} />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default CreatorTools;
