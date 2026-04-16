import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

interface QAOverlayProps {
  active: boolean;
}

const QUESTIONS = [
  { id: 1, user: 'SarahJ', text: 'How do you edit these shots?', color: 'bg-tiktok-cyan' },
  { id: 2, user: 'DevKing', text: 'What lens are you using?', color: 'bg-tiktok-pink' },
  { id: 3, user: 'AlexCodes', text: 'Can you show the BTS?', color: 'bg-white' },
];

const QAOverlay: React.FC<QAOverlayProps> = ({ active }) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      <AnimatePresence>
        {active && QUESTIONS.map((q, i) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, x: -50, y: 100 + i * 80 }}
            animate={{ 
              opacity: 1, 
              x: 20 + (i % 2) * 40, 
              y: 150 + i * 100,
              transition: { delay: i * 0.2, duration: 0.5, type: 'spring' }
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute pointer-events-auto"
          >
            <div className={`flex items-start space-x-3 p-3 rounded-2xl shadow-xl backdrop-blur-md ${q.color === 'bg-white' ? 'bg-white text-black' : `${q.color} text-white`}`}>
              <div className="bg-black/10 p-1.5 rounded-full">
                <MessageCircle size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase opacity-70">@{q.user}</span>
                <p className="text-xs font-semibold leading-tight">{q.text}</p>
              </div>
            </div>
            
            {/* Reaction Line */}
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 40 }}
              className="h-[2px] bg-white/30 mt-2 ml-4"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default QAOverlay;
