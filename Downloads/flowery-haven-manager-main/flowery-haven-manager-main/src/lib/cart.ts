
import { Product } from './data';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

// Get cart from localStorage
export const getCart = (): CartItem[] => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

// Add product to cart
export const addToCart = (product: Product, quantity: number): void => {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.id === product.id);

  if (existingItemIndex >= 0) {
    // If product already exists in cart, update quantity
    cart[existingItemIndex].quantity += quantity;
  } else {
    // Add new item to cart
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: quantity
    });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Dispatch event to notify components that cart has been updated
  window.dispatchEvent(new Event('cartUpdated'));
};

// Update product quantity in cart
export const updateCartItemQuantity = (id: string, quantity: number): void => {
  const cart = getCart();
  const itemIndex = cart.findIndex(item => item.id === id);
  
  if (itemIndex >= 0) {
    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      removeFromCart(id);
    } else {
      // Update quantity
      cart[itemIndex].quantity = quantity;
      localStorage.setItem('cart', JSON.stringify(cart));
      
      // Dispatch event to notify components that cart has been updated
      window.dispatchEvent(new Event('cartUpdated'));
    }
  }
};

// Remove product from cart
export const removeFromCart = (id: string): void => {
  const cart = getCart();
  localStorage.setItem('cart', JSON.stringify(cart.filter(item => item.id !== id)));
  
  // Dispatch event to notify components that cart has been updated
  window.dispatchEvent(new Event('cartUpdated'));
};

// Calculate cart total
export const getCartTotal = (): number => {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// Get cart item count
export const getCartItemCount = (): number => {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
};

// Clear cart
export const clearCart = (): void => {
  localStorage.setItem('cart', JSON.stringify([]));
  
  // Dispatch event to notify components that cart has been updated
  window.dispatchEvent(new Event('cartUpdated'));
};
