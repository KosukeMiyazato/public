import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number | null;
  size?: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating, size = 16 }) => {
  if (!rating) {
    return (
      <div className="flex items-center text-gray-300">
        <Star size={size} />
        <span className="text-sm ml-1">Not rated</span>
      </div>
    );
  }

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((value) => (
        <Star 
          key={value}
          size={size} 
          fill={value <= rating ? 'rgb(234 179 8)' : 'none'}
          className={value <= rating ? 'text-yellow-500' : 'text-gray-300'}
        />
      ))}
      <span className="sr-only">Rating {rating} out of 5</span>
    </div>
  );
};

export default RatingStars;