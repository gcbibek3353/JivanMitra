import React from 'react';
import { cn } from '@/lib/utils';

const WaveformAnimation = ({ className }: { className?: string }) => {
  // Create an array of bars with different delays
  const bars = Array.from({ length: 30 }, (_, i) => i);
  
  return (
    <div className={cn("flex items-end justify-center h-36 space-x-1", className)}>
      {bars.map((bar) => {
        // Calculate a delay based on the bar's position
        const delay = `${(bar % 8) * 0.1}s`;
        const height = 50 + Math.sin(bar * 0.3) * 30;
        
        return (
          <div
            key={bar}
            className="w-1 bg-gradient-to-t from-health-purple to-health-blue rounded-full animate-wave"
            style={{ 
              height: `${height}%`,
              animationDelay: delay,
              opacity: 0.7 + Math.sin(bar * 0.4) * 0.3
            }}
          />
        );
      })}
    </div>
  );
};

export default WaveformAnimation;