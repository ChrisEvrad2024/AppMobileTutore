
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/lib/data';
import { ShoppingBag, Heart } from 'lucide-react';
import { addToCart } from '@/lib/cart';
import { addToWishlist, removeFromWishlist, isInWishlist } from '@/lib/wishlist';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [inWishlist, setInWishlist] = useState(isInWishlist(product.id));

  const quickAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart(product, 1);
    
    // Dispatch custom event to update cart icon
    window.dispatchEvent(new Event('cartUpdated'));
    
    toast.success("Ajouté au panier", {
      description: `${product.name} a été ajouté à votre panier.`,
      duration: 3000,
    });
  };
  
  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inWishlist) {
      removeFromWishlist(product.id);
      setInWishlist(false);
      toast.info("Retiré des favoris", {
        description: `${product.name} a été retiré de vos favoris.`,
        duration: 3000,
      });
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0]
      });
      setInWishlist(true);
      toast.success("Ajouté aux favoris", {
        description: `${product.name} a été ajouté à vos favoris.`,
        duration: 3000,
      });
    }
  };

  return (
    <div 
      className="product-card group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="product-image-wrapper rounded-lg overflow-hidden relative aspect-[3/4]">
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="product-image w-full h-full object-cover"
          />
          
          {/* Quick action overlay */}
          <div 
            className={`absolute inset-0 bg-black/5 flex items-center justify-center gap-3 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <button 
              onClick={quickAddToCart}
              className="bg-white text-primary hover:bg-primary hover:text-white transition-colors duration-300 rounded-full p-3 shadow-md transform translate-y-2 group-hover:translate-y-0"
            >
              <ShoppingBag size={20} />
            </button>
            
            <button 
              onClick={toggleWishlist}
              className={`${inWishlist ? 'bg-primary text-white' : 'bg-white text-primary'} hover:bg-primary hover:text-white transition-colors duration-300 rounded-full p-3 shadow-md transform translate-y-2 group-hover:translate-y-0`}
            >
              <Heart size={20} fill={inWishlist ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <h3 className="font-serif text-lg font-medium">{product.name}</h3>
          <p className="mt-1 text-primary font-medium">{product.price.toFixed(2)} €</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
