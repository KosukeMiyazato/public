export interface Restaurant {
  id: string;
  name: string;
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  priceRange: number | null; // 1-5 or null
  priceRangeText: {
    min: number;
    max: number;
  } | null;
  rating: number | null; // 1-5 or null
  foodGenre: string;
  notes: string;
  links: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface RestaurantFormData {
  name: string;
  address: string;
  lat: number;
  lng: number;
  priceRange: number | null;
  priceRangeText: {
    min: number;
    max: number;
  } | null;
  rating: number | null;
  foodGenre: string;
  notes: string;
  links: string[];
}