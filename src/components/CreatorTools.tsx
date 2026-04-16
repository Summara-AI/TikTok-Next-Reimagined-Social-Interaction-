import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Mic, Video, Send, X, Star, Zap, Sparkles, Loader2 } from 'lucide-react';

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
  const [isGenerating, setIsGenerating] = useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleAiGenerate = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    
    if (!apiKey) {
      // Fallback if API key is missing
      setTimeout(() => {
        const aiReplies = [
          "That's a great point! I'll definitely cover that in the next video. 🎬",
          "Glad you enjoyed the transitions! More BTS coming soon. ✨",
          "Exactly! The goal was to make it feel as native as possible. 🚀",
        ];
        const randomReply = aiReplies[Math.floor(Math.random() * aiReplies.length)];
        setSelectedTemplate((initialReplyTo ? `@${initialReplyTo} ` : "") + randomReply);
        setIsGenerating(false);
      }, 1000);
      return;
    }

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: "You are a helpful and creative TikTok content creator. Write a short, engaging, and friendly reply to a fan comment. Use emojis. Keep it under 15 words."
            },
            {
              role: "user",
              content: `Write a reply to a fan ${initialReplyTo ? `named @${initialReplyTo}` : ""} who just commented on my video.`
            }
          ],
          temperature: 0.7,
          max_tokens: 50
        })
      });

      const data = await response.json();
      const aiReply = data.choices[0]?.message?.content || "Thanks for the support! 💖";
      setSelectedTemplate(aiReply);
    } catch (error) {
      console.error("Groq AI Error:", error);
      setSelectedTemplate("Thanks for watching! Stay tuned for more. 🚀");
    } finally {
      setIsGenerating(false);
    }
  };

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
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <MessageSquare size={16} className="text-tiktok-cyan" />
              <span className="text-sm font-bold text-white/70 uppercase tracking-widest">Smart Templates</span>
            </div>
            <button 
              onClick={handleAiGenerate}
              disabled={isGenerating}
              className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-tiktok-cyan to-tiktok-pink rounded-full hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
            >
              {isGenerating ? (
                <Loader2 size={12} className="text-black animate-spin" />
              ) : (
                <Sparkles size={12} className="text-black" />
              )}
              <span className="text-[10px] font-black text-black uppercase">AI Magic</span>
            </button>
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
