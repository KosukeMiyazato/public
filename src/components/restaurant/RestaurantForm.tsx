import React, { useState, useEffect, useCallback } from 'react';
import { Star, DollarSign, Trash2, Plus, ExternalLink } from 'lucide-react';
import { RestaurantFormData } from '../../types';
import MapSelector from '../ui/MapSelector';

interface RestaurantFormProps {
  initialData?: RestaurantFormData;
  onSubmit: (data: RestaurantFormData) => void;
  submitLabel: string;
}

const DEFAULT_FORM_DATA: RestaurantFormData = {
  name: '',
  address: '',
  lat: 35.6812,
  lng: 139.7671, // Default to Tokyo coordinates
  priceRange: null,
  priceRangeText: null,
  rating: null,
  foodGenre: '',
  notes: '',
  links: []
};

const RestaurantForm: React.FC<RestaurantFormProps> = ({ 
  initialData = DEFAULT_FORM_DATA, 
  onSubmit,
  submitLabel
}) => {
  const [formData, setFormData] = useState<RestaurantFormData>(initialData);
  const [newLink, setNewLink] = useState('');
  const [linkError, setLinkError] = useState('');
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setTouchedFields(prev => new Set(prev).add(name));
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = value === '' ? 0 : parseInt(value, 10);
    
    setFormData(prev => ({
      ...prev,
      priceRangeText: {
        ...prev.priceRangeText || { min: 0, max: 0 },
        [name === 'priceMin' ? 'min' : 'max']: numValue
      }
    }));

    // Update price range indicator based on the average
    const currentMin = name === 'priceMin' ? numValue : (formData.priceRangeText?.min || 0);
    const currentMax = name === 'priceMax' ? numValue : (formData.priceRangeText?.max || 0);
    const average = (currentMin + currentMax) / 2;

    let priceRange: number | null = null;
    if (average <= 1000) priceRange = 1;
    else if (average <= 3000) priceRange = 2;
    else if (average <= 5000) priceRange = 3;
    else if (average <= 10000) priceRange = 4;
    else priceRange = 5;

    setFormData(prev => ({
      ...prev,
      priceRange
    }));
  };

  const handleLocationChange = useCallback((address: string, lat: number, lng: number) => {
    setFormData(prev => ({
      ...prev,
      address,
      lat,
      lng
    }));
    setTouchedFields(prev => new Set([...prev, 'address']));
  }, []);

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({
      ...prev,
      rating: prev.rating === rating ? null : rating
    }));
    setTouchedFields(prev => new Set(prev).add('rating'));
  };

  const addLink = () => {
    if (!newLink) return;
    
    try {
      new URL(newLink);
      setFormData(prev => ({
        ...prev,
        links: [...prev.links, newLink]
      }));
      setNewLink('');
      setLinkError('');
    } catch (error) {
      setLinkError('Please enter a valid URL (include http:// or https://)');
    }
  };

  const removeLink = (indexToRemove: number) => {
    setFormData(prev => ({
      ...prev,
      links: prev.links.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isValid = formData.name && formData.address && formData.foodGenre;
  const getFieldError = (field: keyof RestaurantFormData): string => {
    if (!touchedFields.has(field)) return '';
    
    switch (field) {
      case 'name':
        return !formData.name ? 'Restaurant name is required' : '';
      case 'address':
        return !formData.address ? 'Address is required' : '';
      case 'foodGenre':
        return !formData.foodGenre ? 'Food genre is required' : '';
      default:
        return '';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
      <div className="space-y-6">
        {/* Restaurant name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Restaurant Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 
                      ${getFieldError('name') ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter restaurant name"
          />
          {getFieldError('name') && (
            <p className="mt-1 text-sm text-red-600">{getFieldError('name')}</p>
          )}
        </div>

        {/* Location with map */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Location *
          </label>
          <MapSelector
            address={formData.address}
            lat={formData.lat}
            lng={formData.lng}
            onLocationChange={handleLocationChange}
          />
          {getFieldError('address') && (
            <p className="mt-1 text-sm text-red-600">{getFieldError('address')}</p>
          )}
        </div>

        {/* Food genre */}
        <div>
          <label htmlFor="foodGenre" className="block text-sm font-medium text-gray-700 mb-1">
            Food Genre/Cuisine *
          </label>
          <input
            type="text"
            id="foodGenre"
            name="foodGenre"
            value={formData.foodGenre}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 
                      ${getFieldError('foodGenre') ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="E.g., Italian, Japanese, Vegan"
          />
          {getFieldError('foodGenre') && (
            <p className="mt-1 text-sm text-red-600">{getFieldError('foodGenre')}</p>
          )}
        </div>

        {/* Price range text */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price Range (¥)
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              name="priceMin"
              value={formData.priceRangeText?.min || ''}
              onChange={handlePriceRangeChange}
              placeholder="Min"
              min="0"
              step="100"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 
                        focus:border-orange-500"
            />
            <span className="text-gray-500">~</span>
            <input
              type="number"
              name="priceMax"
              value={formData.priceRangeText?.max || ''}
              onChange={handlePriceRangeChange}
              placeholder="Max"
              min="0"
              step="100"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 
                        focus:border-orange-500"
            />
          </div>
          <div className="mt-2 flex items-center">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map(price => (
                <DollarSign 
                  key={price}
                  size={16}
                  className={formData.priceRange && formData.priceRange >= price 
                    ? 'text-green-600' 
                    : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-500">
              {formData.priceRange === 1 && '(Budget friendly)'}
              {formData.priceRange === 2 && '(Affordable)'}
              {formData.priceRange === 3 && '(Moderate)'}
              {formData.priceRange === 4 && '(Expensive)'}
              {formData.priceRange === 5 && '(Luxury)'}
            </span>
          </div>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Rating
          </label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingChange(star)}
                className="text-gray-300 hover:text-yellow-500 transition-colors"
              >
                <Star
                  size={24}
                  fill={formData.rating && formData.rating >= star ? 'rgb(234 179 8)' : 'none'}
                  className={formData.rating && formData.rating >= star ? 'text-yellow-500' : ''}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Review Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 
                      focus:border-orange-500"
            placeholder="Write your thoughts about this restaurant..."
          />
        </div>

        {/* Links */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            External Links
          </label>
          <div className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              placeholder="https://..."
              className={`flex-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 
                        ${linkError ? 'border-red-500' : 'border-gray-300'}`}
            />
            <button
              type="button"
              onClick={addLink}
              className="bg-teal-500 hover:bg-teal-600 text-white p-2 rounded-md transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>
          {linkError && <p className="mt-1 text-sm text-red-600 mb-2">{linkError}</p>}
          
          {formData.links.length > 0 && (
            <div className="space-y-2 mt-2">
              {formData.links.map((link, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                  <a 
                    href={link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center truncate max-w-xs"
                  >
                    <ExternalLink size={14} className="mr-1 flex-shrink-0" />
                    <span className="truncate">{link}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => removeLink(index)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-gray-200">
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full py-2 px-4 rounded-md ${
              isValid
                ? 'bg-orange-500 hover:bg-orange-600 text-white'
                : 'bg-gray-300 cursor-not-allowed text-gray-500'
            } transition-colors`}
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
};

export default RestaurantForm;