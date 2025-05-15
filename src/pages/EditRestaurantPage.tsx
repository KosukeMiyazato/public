import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import RestaurantForm from '../components/restaurant/RestaurantForm';
import { useRestaurants } from '../contexts/RestaurantContext';
import { RestaurantFormData } from '../types';

const EditRestaurantPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getRestaurant, updateRestaurant } = useRestaurants();
  
  const restaurant = id ? getRestaurant(id) : undefined;
  
  if (!restaurant || !id) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Restaurant Not Found</h2>
        <p className="text-gray-600 mb-4">The restaurant you're trying to edit doesn't exist or has been removed.</p>
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
  
  const initialFormData: RestaurantFormData = {
    name: restaurant.name,
    address: restaurant.location.address,
    lat: restaurant.location.coordinates.lat,
    lng: restaurant.location.coordinates.lng,
    priceRange: restaurant.priceRange,
    rating: restaurant.rating,
    foodGenre: restaurant.foodGenre,
    notes: restaurant.notes,
    links: [...restaurant.links]
  };
  
  const handleSubmit = (data: RestaurantFormData) => {
    updateRestaurant(id, data);
    navigate(`/restaurant/${id}`);
  };

  return (
    <div>
      <div className="mb-4">
        <button
          onClick={() => navigate(`/restaurant/${id}`)}
          className="inline-flex items-center text-orange-600 hover:text-orange-700"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Restaurant
        </button>
      </div>
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Edit Restaurant</h1>
        <p className="text-gray-600">Update your dining experience for {restaurant.name}</p>
      </div>
      
      <RestaurantForm 
        initialData={initialFormData} 
        onSubmit={handleSubmit} 
        submitLabel="Update Restaurant" 
      />
    </div>
  );
};

export default EditRestaurantPage;