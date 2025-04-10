import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-health-blue to-health-purple bg-clip-text text-transparent mb-4">
              JivanMitra
            </div>
            <p className="text-gray-600 max-w-md">
              Your AI companion for better health and wellness. JivanMitra combines cutting-edge AI with healthcare expertise to provide personalized guidance.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-health-blue transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#features" className="text-gray-600 hover:text-health-blue transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-gray-600 hover:text-health-blue transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#faq" className="text-gray-600 hover:text-health-blue transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="text-gray-600">
                hello@jivanmitra.app
              </li>
              <li className="text-gray-600">
                Privacy Policy
              </li>
              <li className="text-gray-600">
                Terms of Service
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 flex justify-center items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} JivanMitra. All rights reserved.</p>
          <Heart className="w-4 h-4 mx-2 text-red-500" />
          <p>Made with care for your health</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
