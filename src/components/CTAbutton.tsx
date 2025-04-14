import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface CTAButtonProps {
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'lg';
  withArrow?: boolean;
  onClick?: () => void;
}

const CTAButton = ({ 
  children, 
  className, 
  size = 'default', 
  withArrow = false,
  onClick 
}: CTAButtonProps) => {
  return (
    <Button 
      className={cn(
        "btn-gradient font-medium shadow-lg hover:shadow-xl hover:opacity-90 transition-all",
        size === 'lg' && "text-lg py-6 px-8 h-auto",
        className
      )}
      onClick={onClick}
    >
      <span>{children}</span>
      {withArrow && <ArrowRight className="ml-2 h-5 w-5" />}
    </Button>
  );
};

export default CTAButton;