import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import RestaurantList from '../components/restaurant/RestaurantList';
import { useRestaurants } from '../contexts/RestaurantContext';

const HomePage: React.FC = () => {
  const { restaurants } = useRestaurants();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Your Restaurant Collection</h1>
          <p className="text-gray-600 mt-1">Track and rate your dining experiences</p>
        </div>
        
        {restaurants.length > 0 && (
          <Link 
            to="/add" 
            className="hidden sm:flex items-center space-x-1 bg-orange-500 text-white px-4 py-2 rounded-md 
                      hover:bg-orange-600 transition-colors"
          >
            <Plus size={18} />
            <span>Add Restaurant</span>
          </Link>
        )}
      </div>

      <RestaurantList restaurants={restaurants} />
      
      {restaurants.length === 0 && (
        <div className="mt-8 text-center p-8 bg-white rounded-lg shadow-sm">
          <div className="mb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-orange-500 mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="32" 
                height="32" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6z"></path>
                <line x1="6" y1="17" x2="18" y2="17"></line>
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Start Your Food Journey</h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Save your favorite restaurants, rate your dining experiences, and keep track of all the amazing places you've visited.
            </p>
          </div>
          
          <Link 
            to="/add" 
            className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium 
                      transition-all transform hover:scale-105"
          >
            <Plus className="mr-2" size={20} />
            Add Your First Restaurant
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;