
"use client"
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-health-blue to-health-purple bg-clip-text text-transparent">
                JivanMitra
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-health-blue transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-health-blue transition-colors">
              How It Works
            </a>
            <a href="#faq" className="text-gray-600 hover:text-health-blue transition-colors">
              FAQ
            </a>
            <Link href={"/sign-in"}>
                 <Button className="btn-gradient hover:opacity-90 transition-opacity">Get Started</Button>
            </Link>
            
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-health-blue focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={cn(
        "md:hidden absolute top-16 inset-x-0 bg-white/95 backdrop-blur-md transition-all duration-300 ease-in-out shadow-lg",
        isMenuOpen ? "max-h-screen py-4" : "max-h-0 overflow-hidden py-0"
      )}>
        <div className="flex flex-col space-y-4 px-4">
          <a 
            href="#features" 
            className="text-gray-600 hover:text-health-blue py-2 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </a>
          <a 
            href="#how-it-works" 
            className="text-gray-600 hover:text-health-blue py-2 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            How It Works
          </a>
          <a 
            href="#faq" 
            className="text-gray-600 hover:text-health-blue py-2 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            FAQ
          </a>
          <Link href={"/sign-in"}>
                    <Button 
                        className="btn-gradient hover:opacity-90 transition-opacity w-full"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Get Started
                    </Button>
          
          </Link>
          
        </div>
      </div>
    </header>
  );
};

export default Header;