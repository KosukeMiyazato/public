import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import RestaurantForm from '../components/restaurant/RestaurantForm';
import { useRestaurants } from '../contexts/RestaurantContext';
import { RestaurantFormData } from '../types';

const AddRestaurantPage: React.FC = () => {
  const navigate = useNavigate();
  const { addRestaurant } = useRestaurants();
  
  const handleSubmit = (data: RestaurantFormData) => {
    addRestaurant(data);
    navigate('/');
  };

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
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add New Restaurant</h1>
        <p className="text-gray-600">Record your dining experience</p>
      </div>
      
      <RestaurantForm onSubmit={handleSubmit} submitLabel="Add Restaurant" />
    </div>
  );
};

export default AddRestaurantPage;