import React from 'react';
import { motion } from 'framer-motion';
import { X, Bookmark, Ban, Flag, Scissors, Layers, Download, Music2 } from 'lucide-react';
import { cn } from '../utils/cn';

interface MoreOptionsModalProps {
  onClose: () => void;
  onAction: (action: string) => void;
  isSaved?: boolean;
}

const ACTIONS = [
  { id: 'save', name: 'Save', icon: <Bookmark size={24} />, color: 'bg-yellow-500' },
  { id: 'not_interested', name: 'Not Interested', icon: <Ban size={24} />, color: 'bg-zinc-700' },
  { id: 'duet', name: 'Duet', icon: <Layers size={24} />, color: 'bg-tiktok-cyan' },
  { id: 'stitch', name: 'Stitch', icon: <Scissors size={24} />, color: 'bg-tiktok-pink' },
  { id: 'download', name: 'Download', icon: <Download size={24} />, color: 'bg-zinc-700' },
  { id: 'report', name: 'Report', icon: <Flag size={24} />, color: 'bg-red-500' },
];

const MoreOptionsModal: React.FC<MoreOptionsModalProps> = ({ onClose, onAction, isSaved }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[130] bg-black/80 backdrop-blur-md flex items-end justify-center"
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
            <div className="bg-white/10 p-2 rounded-xl">
              <Music2 size={20} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-white uppercase tracking-tighter italic">Video Options</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={24} className="text-white/60" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {ACTIONS.map((action) => (
            <motion.button
              key={action.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onAction(action.id)}
              className="flex flex-col items-center space-y-3 group"
            >
              <div className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-xl transition-all group-hover:rotate-6",
                action.id === 'save' && isSaved ? "bg-yellow-600 shadow-[0_0_20px_rgba(234,179,8,0.4)]" : action.color
              )}>
                {React.cloneElement(action.icon as React.ReactElement, { 
                  className: action.id === 'save' && isSaved ? "fill-white" : "" 
                })}
              </div>
              <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">
                {action.id === 'save' && isSaved ? 'Saved' : action.name}
              </span>
            </motion.button>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-white/5">
          <button 
            onClick={onClose}
            className="w-full py-4 bg-white/5 text-white font-black uppercase text-xs tracking-[0.2em] rounded-2xl hover:bg-white/10 transition-colors"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MoreOptionsModal;
