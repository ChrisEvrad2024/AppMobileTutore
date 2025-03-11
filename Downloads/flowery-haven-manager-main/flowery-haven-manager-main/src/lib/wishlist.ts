
// Wishlist management utility functions

// Define wishlist item type
export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

// Get wishlist from localStorage
export const getWishlist = (): WishlistItem[] => {
  const wishlist = localStorage.getItem('wishlist');
  return wishlist ? JSON.parse(wishlist) : [];
};

// Add product to wishlist
export const addToWishlist = (item: WishlistItem): void => {
  const wishlist = getWishlist();
  // Check if product already exists in wishlist
  if (!wishlist.some(product => product.id === item.id)) {
    localStorage.setItem('wishlist', JSON.stringify([...wishlist, item]));
  }
};

// Remove product from wishlist
export const removeFromWishlist = (id: string): void => {
  const wishlist = getWishlist();
  localStorage.setItem('wishlist', JSON.stringify(wishlist.filter(item => item.id !== id)));
};

// Check if product is in wishlist
export const isInWishlist = (id: string): boolean => {
  const wishlist = getWishlist();
  return wishlist.some(item => item.id === id);
};
