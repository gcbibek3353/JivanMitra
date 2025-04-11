import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const WaveformAnimation = ({ className }: { className?: string }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const bars = Array.from({ length: 30 }, (_, i) => i);

  if (!mounted) return null;

  return (
    <div className={cn("flex items-end justify-center h-36 space-x-1", className)}>
      {bars.map((bar) => {
        const delay = `${(bar % 8) * 0.1}s`;
        const height = 50 + Math.sin(bar * 0.3) * 30;
        const opacity = 0.7 + Math.sin(bar * 0.4) * 0.3;

        return (
          <div
            key={bar}
            className="w-1 bg-gradient-to-t from-health-purple to-health-blue rounded-full animate-wave"
            style={{ 
              height: `${height}%`,
              animationDelay: delay,
              opacity,
            }}
          />
        );
      })}
    </div>
  );
};

export default WaveformAnimation;