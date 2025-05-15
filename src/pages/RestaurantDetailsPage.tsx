import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import RestaurantDetail from '../components/restaurant/RestaurantDetail';
import { useRestaurants } from '../contexts/RestaurantContext';

const RestaurantDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getRestaurant, deleteRestaurant } = useRestaurants();
  
  const restaurant = id ? getRestaurant(id) : undefined;
  
  const handleDelete = () => {
    if (id) {
      deleteRestaurant(id);
      navigate('/');
    }
  };

  if (!restaurant) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Restaurant Not Found</h2>
        <p className="text-gray-600 mb-4">The restaurant you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center text-orange-600 hover:text-orange-700"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to List
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center text-orange-600 hover:text-orange-700"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to List
        </button>
      </div>
      
      <RestaurantDetail restaurant={restaurant} onDelete={handleDelete} />
    </div>
  );
};

export default RestaurantDetailsPage;