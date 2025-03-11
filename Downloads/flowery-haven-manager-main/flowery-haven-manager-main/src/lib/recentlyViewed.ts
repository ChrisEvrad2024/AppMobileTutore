
import { Product } from './data';

const RECENTLY_VIEWED_KEY = 'recentlyViewed';
const MAX_RECENTLY_VIEWED = 4;

// Add product to recently viewed
export const addToRecentlyViewed = (product: Product): void => {
  // Get current list
  const recentlyViewed = getRecentlyViewed();
  
  // Remove current product if it exists
  const filtered = recentlyViewed.filter(item => item.id !== product.id);
  
  // Add current product to the beginning
  const updated = [product, ...filtered].slice(0, MAX_RECENTLY_VIEWED);
  
  // Save to localStorage
  localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updated));
};

// Get recently viewed products
export const getRecentlyViewed = (): Product[] => {
  const recentlyViewed = localStorage.getItem(RECENTLY_VIEWED_KEY);
  return recentlyViewed ? JSON.parse(recentlyViewed) : [];
};
