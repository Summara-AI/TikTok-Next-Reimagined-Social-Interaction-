import React from 'react';
import { motion } from 'framer-motion';
import { X, Instagram, Facebook, Twitter, Link, Send, Mail, MessageCircle } from 'lucide-react';

interface ShareModalProps {
  onClose: () => void;
  onShare: (platform: string) => void;
}

const PLATFORMS = [
  { id: 'instagram', name: 'Instagram', icon: <Instagram size={24} />, color: 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600' },
  { id: 'facebook', name: 'Facebook', icon: <Facebook size={24} />, color: 'bg-blue-600' },
  { id: 'x', name: 'X', icon: <Twitter size={24} />, color: 'bg-black border border-white/20' },
  { id: 'copy', name: 'Copy Link', icon: <Link size={24} />, color: 'bg-zinc-700' },
  { id: 'whatsapp', name: 'WhatsApp', icon: <MessageCircle size={24} />, color: 'bg-green-500' },
  { id: 'email', name: 'Email', icon: <Mail size={24} />, color: 'bg-zinc-500' },
];

const ShareModal: React.FC<ShareModalProps> = ({ onClose, onShare }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-md flex items-end justify-center"
      onClick={onClose}
    >
      <motion.div 
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-zinc-900 w-full max-w-lg rounded-t-[32px] p-8 pb-12 border-t border-white/10"
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="bg-tiktok-cyan p-2 rounded-xl">
              <Send size={20} className="text-black" />
            </div>
            <h3 className="text-xl font-bold text-white uppercase tracking-tighter italic">Share to social</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={24} className="text-white/60" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {PLATFORMS.map((platform) => (
            <motion.button
              key={platform.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onShare(platform.id)}
              className="flex flex-col items-center space-y-3 group"
            >
              <div className={`${platform.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-xl transition-transform group-hover:rotate-6`}>
                {platform.icon}
              </div>
              <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">{platform.name}</span>
            </motion.button>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-white/5 flex flex-col items-center">
          <p className="text-xs text-white/30 font-medium mb-4">Or share with your community</p>
          <div className="flex space-x-2 w-full">
            <div className="flex-1 bg-white/5 rounded-2xl px-4 py-3 border border-white/5 text-sm text-white/60 truncate">
              {window.location.href}
            </div>
            <button 
              onClick={() => onShare('copy')}
              className="px-6 bg-white text-black font-black uppercase text-[10px] tracking-widest rounded-2xl hover:bg-tiktok-cyan transition-colors"
            >
              Copy
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ShareModal;
