import React from 'react';
import { DollarSign } from 'lucide-react';

interface PriceRangeProps {
  priceRange: number | null;
}

const PriceRange: React.FC<PriceRangeProps> = ({ priceRange }) => {
  if (!priceRange) {
    return (
      <div className="flex text-gray-300">
        <DollarSign size={16} />
        <span className="text-sm ml-1">Not set</span>
      </div>
    );
  }

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((value) => (
        <DollarSign 
          key={value}
          size={16} 
          className={value <= priceRange ? 'text-green-600' : 'text-gray-300'}
        />
      ))}
      <span className="sr-only">Price level {priceRange} out of 5</span>
    </div>
  );
};

export default PriceRange;