import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Utensils, Plus } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className="bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-2xl font-bold transition-transform hover:scale-105"
        >
          <Utensils size={28} className="text-white" />
          <span>Table Tales</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          {isHomePage ? (
            <Link 
              to="/add" 
              className="flex items-center space-x-1 bg-white text-orange-600 px-4 py-2 rounded-full font-medium 
                        transition-all hover:bg-orange-100 hover:shadow-md"
            >
              <Plus size={18} />
              <span>Add Restaurant</span>
            </Link>
          ) : (
            <Link 
              to="/" 
              className="text-white hover:text-orange-200 transition-colors"
            >
              Back to List
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;