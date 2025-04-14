import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}

const FeatureCard = ({ title, description, icon: Icon, className }: FeatureCardProps) => {
  return (
    <div className={cn(
      "glass-card p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group",
      className
    )}>
      <div className="rounded-full bg-health-blue/10 p-3 w-fit mb-4 group-hover:bg-health-blue/20 transition-colors">
        <Icon className="w-6 h-6 text-health-blue" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;