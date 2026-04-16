import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, TrendingUp, Users, Heart, MessageCircle, BarChart3 } from 'lucide-react';
import * as d3 from 'd3';

interface AnalyticsModalProps {
  onClose: () => void;
}

const AnalyticsModal: React.FC<AnalyticsModalProps> = ({ onClose }) => {
  const chartRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const data = [
      { day: 'Mon', value: 45 },
      { day: 'Tue', value: 52 },
      { day: 'Wed', value: 48 },
      { day: 'Thu', value: 70 },
      { day: 'Fri', value: 65 },
      { day: 'Sat', value: 85 },
      { day: 'Sun', value: 78 },
    ];

    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 400 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
    const y = d3.scaleLinear().rangeRound([height, 0]);

    x.domain(data.map(d => d.day));
    y.domain([0, d3.max(data, d => d.value) || 100]);

    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .attr("color", "rgba(255,255,255,0.3)");

    g.append("g")
      .call(d3.axisLeft(y).ticks(5))
      .attr("color", "rgba(255,255,255,0.3)");

    g.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.day) || 0)
      .attr("y", height)
      .attr("width", x.bandwidth())
      .attr("height", 0)
      .attr("fill", "url(#bar-gradient)")
      .attr("rx", 4)
      .transition()
      .duration(1000)
      .attr("y", d => y(d.value))
      .attr("height", d => height - y(d.value));

    const gradient = svg.append("defs")
      .append("linearGradient")
      .attr("id", "bar-gradient")
      .attr("x1", "0%").attr("y1", "0%")
      .attr("x2", "0%").attr("y2", "100%");

    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#69C9D0");
    gradient.append("stop").attr("offset", "100%").attr("stop-color", "#EE1D52");

  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-zinc-900 border border-white/10 rounded-[32px] w-full max-w-2xl overflow-hidden shadow-2xl"
      >
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="bg-tiktok-cyan p-3 rounded-2xl">
                <BarChart3 className="text-black" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Creator Analytics</h2>
                <p className="text-white/40 text-sm">Last 7 days performance</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X className="text-white/60" size={24} />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard icon={<Users size={16} />} label="Followers" value="1.2M" change="+12%" />
            <StatCard icon={<Heart size={16} />} label="Likes" value="45.8M" change="+5.4%" />
            <StatCard icon={<MessageCircle size={16} />} label="Comments" value="2.4M" change="+8.1%" />
            <StatCard icon={<TrendingUp size={16} />} label="Engagement" value="9.2%" change="+2.3%" />
          </div>

          <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
            <h3 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-6">Growth Trajectory</h3>
            <div className="w-full h-[200px] flex items-center justify-center">
              <svg ref={chartRef} width="400" height="200" className="overflow-visible" />
            </div>
          </div>
        </div>

        <div className="bg-white/5 p-6 border-t border-white/10 flex justify-end">
          <button 
            onClick={onClose}
            className="px-8 py-3 bg-white text-black font-bold rounded-full hover:scale-105 active:scale-95 transition-all uppercase tracking-widest text-xs"
          >
            Close Report
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode, label: string, value: string, change: string }> = ({ icon, label, value, change }) => (
  <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
    <div className="flex items-center space-x-2 text-white/40 mb-2">
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
    </div>
    <div className="text-xl font-bold text-white mb-1">{value}</div>
    <div className="text-[10px] font-bold text-green-400">{change}</div>
  </div>
);

export default AnalyticsModal;
