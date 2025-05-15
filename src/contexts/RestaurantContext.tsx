import React, { createContext, useState, useContext, useEffect } from 'react';
import { Restaurant, RestaurantFormData } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface RestaurantContextType {
  restaurants: Restaurant[];
  getRestaurant: (id: string) => Restaurant | undefined;
  addRestaurant: (restaurantData: RestaurantFormData) => void;
  updateRestaurant: (id: string, restaurantData: RestaurantFormData) => void;
  deleteRestaurant: (id: string) => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const useRestaurants = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurants must be used within a RestaurantProvider');
  }
  return context;
};

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(() => {
    const savedRestaurants = localStorage.getItem('restaurants');
    if (savedRestaurants) {
      try {
        // Parse dates correctly
        const parsed = JSON.parse(savedRestaurants);
        return parsed.map((restaurant: any) => ({
          ...restaurant,
          createdAt: new Date(restaurant.createdAt),
          updatedAt: new Date(restaurant.updatedAt)
        }));
      } catch (error) {
        console.error('Error parsing saved restaurants:', error);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('restaurants', JSON.stringify(restaurants));
  }, [restaurants]);

  const getRestaurant = (id: string) => {
    return restaurants.find(restaurant => restaurant.id === id);
  };

  const addRestaurant = (restaurantData: RestaurantFormData) => {
    const newRestaurant: Restaurant = {
      id: uuidv4(),
      name: restaurantData.name,
      location: {
        address: restaurantData.address,
        coordinates: {
          lat: restaurantData.lat,
          lng: restaurantData.lng
        }
      },
      priceRange: restaurantData.priceRange,
      priceRangeText: restaurantData.priceRangeText,
      rating: restaurantData.rating,
      foodGenre: restaurantData.foodGenre,
      notes: restaurantData.notes,
      links: restaurantData.links,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setRestaurants(prev => [...prev, newRestaurant]);
  };

  const updateRestaurant = (id: string, restaurantData: RestaurantFormData) => {
    setRestaurants(prev => 
      prev.map(restaurant => {
        if (restaurant.id === id) {
          return {
            ...restaurant,
            name: restaurantData.name,
            location: {
              address: restaurantData.address,
              coordinates: {
                lat: restaurantData.lat,
                lng: restaurantData.lng
              }
            },
            priceRange: restaurantData.priceRange,
            priceRangeText: restaurantData.priceRangeText,
            rating: restaurantData.rating,
            foodGenre: restaurantData.foodGenre,
            notes: restaurantData.notes,
            links: restaurantData.links,
            updatedAt: new Date()
          };
        }
        return restaurant;
      })
    );
  };

  const deleteRestaurant = (id: string) => {
    setRestaurants(prev => prev.filter(restaurant => restaurant.id !== id));
  };

  const value = {
    restaurants,
    getRestaurant,
    addRestaurant,
    updateRestaurant,
    deleteRestaurant
  };

  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  );
};