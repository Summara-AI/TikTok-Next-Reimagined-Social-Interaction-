import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Smile, TrendingUp } from 'lucide-react';

const SentimentTimeline: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  // Sample sentiment data: [time, sentiment_value]
  const data = [
    [0, 0.5], [5, 0.7], [10, 0.4], [15, 0.9], [20, 0.6], [25, 0.8], [30, 0.5]
  ];

  useEffect(() => {
    const render = () => {
      if (!svgRef.current) return;

      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      const container = svgRef.current?.parentElement;
      if (!container) return;

      const width = container.clientWidth;
      const height = 40;

      const x = d3.scaleLinear().domain([0, 30]).range([0, width]);
      const y = d3.scaleLinear().domain([0, 1]).range([height, 0]);

      const line = d3.line<number[]>()
        .x(d => x(d[0]))
        .y(d => y(d[1]))
        .curve(d3.curveBasis);

      const area = d3.area<number[]>()
        .x(d => x(d[0]))
        .y0(height)
        .y1(d => y(d[1]))
        .curve(d3.curveBasis);

      // Add Area Gradient
      const gradient = svg.append("defs")
        .append("linearGradient")
        .attr("id", "sentiment-gradient")
        .attr("x1", "0%").attr("y1", "0%")
        .attr("x2", "0%").attr("y2", "100%");

      gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#69C9D0")
        .attr("stop-opacity", 0.4);

      gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#69C9D0")
        .attr("stop-opacity", 0);

      // Draw Area
      svg.append("path")
        .datum(data)
        .attr("fill", "url(#sentiment-gradient)")
        .attr("d", area as any);

      // Draw Line
      svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#69C9D0")
        .attr("stroke-width", 2)
        .attr("d", line as any);

      // Add dynamic dot
      const dot = svg.append("circle")
        .attr("r", 4)
        .attr("fill", "#69C9D0")
        .attr("stroke", "white")
        .attr("stroke-width", 1.5);

      let animationId: any;
      function animateDot() {
        dot.transition()
          .duration(10000)
          .ease(d3.easeLinear)
          .attrTween("transform", () => {
            return (t: number) => {
              const time = t * 30;
              const xPos = x(time);
              
              // Better interpolation for Y position
              const i = Math.min(Math.floor(t * (data.length - 1)), data.length - 2);
              const tLocal = (t * (data.length - 1)) % 1;
              const yVal = data[i][1] * (1 - tLocal) + data[i+1][1] * tLocal;
              const yPos = y(yVal);
              
              return `translate(${xPos}, ${yPos})`;
            };
          })
          .on("end", animateDot);
      }
      animateDot();
    };

    render();
    window.addEventListener('resize', render);
    return () => window.removeEventListener('resize', render);
  }, []);

  return (
    <div className="w-full bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 mt-4 overflow-hidden group hover:bg-white/10 transition-all cursor-crosshair">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Smile size={16} className="text-tiktok-cyan animate-pulse" />
          <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Audience Mood</span>
        </div>
        <div className="flex items-center space-x-2">
          <TrendingUp size={14} className="text-green-400" />
          <span className="text-[10px] font-bold text-green-400 tracking-wider">LIVE 98.2%</span>
        </div>
      </div>
      <div className="relative h-12 w-full">
        <svg ref={svgRef} className="w-full h-full overflow-visible" />
      </div>
      
      {/* Tooltip on hover */}
      <div className="mt-2 text-[9px] text-white/40 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
        <span>0:00 Intro</span>
        <span>0:15 Highlight</span>
        <span>0:30 Outro</span>
      </div>
    </div>
  );
};

export default SentimentTimeline;
