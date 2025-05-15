import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-300">
              © {year} Table Tales. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center text-sm text-gray-300">
            <p className="flex items-center">
              Made with <Heart size={14} className="mx-1 text-orange-500" /> for food lovers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;