
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getWishlist, removeFromWishlist } from '@/lib/wishlist';
import { addToCart } from '@/lib/cart';
import { Heart, ShoppingBag, X } from 'lucide-react';
import { toast } from "sonner";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  
  useEffect(() => {
    const loadWishlist = () => {
      const items = getWishlist();
      setWishlistItems(items);
    };
    
    loadWishlist();
    
    // Listen for storage events to update wishlist when it changes in another tab
    window.addEventListener('storage', loadWishlist);
    
    return () => {
      window.removeEventListener('storage', loadWishlist);
    };
  }, []);
  
  const handleRemoveItem = (id: string) => {
    removeFromWishlist(id);
    setWishlistItems(getWishlist());
    toast.info("Produit retiré", {
      description: "Le produit a été retiré de votre wishlist",
      duration: 3000,
    });
  };
  
  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      images: [item.image],
      description: "Ajouté depuis la wishlist", // Added required field
      category: "unknown", // Added required field
      popular: false // Added required field
    }, 1);
    
    // Dispatch custom event to update cart count in navbar
    window.dispatchEvent(new Event('cartUpdated'));
    
    toast.success("Produit ajouté", {
      description: "Le produit a été ajouté à votre panier",
      duration: 3000,
    });
  };
  
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-16 min-h-screen">
        <div className="section-container">
          <h1 className="text-3xl font-serif mb-8">Votre Wishlist</h1>
          
          {wishlistItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex justify-center items-center p-6 bg-muted rounded-full mb-6">
                <Heart size={32} className="text-muted-foreground" />
              </div>
              <h2 className="text-xl font-serif mb-4">Votre wishlist est vide</h2>
              <p className="text-muted-foreground mb-8">Ajoutez des produits à votre wishlist pour les retrouver plus tard.</p>
              <Link to="/catalog" className="btn-primary inline-flex">
                Découvrir nos produits
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map((item) => (
                <div key={item.id} className="group relative bg-background border border-border rounded-lg overflow-hidden transition-all hover:shadow-md">
                  <div className="absolute top-3 right-3 z-10 flex space-x-2">
                    <button 
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-1.5 bg-white/80 backdrop-blur-sm rounded-full text-foreground hover:text-destructive transition-colors"
                      aria-label="Retirer de la wishlist"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  
                  <Link to={`/product/${item.id}`} className="block aspect-square bg-muted">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </Link>
                  
                  <div className="p-4">
                    <Link to={`/product/${item.id}`} className="block">
                      <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">{item.name}</h3>
                    </Link>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-medium">{item.price.toFixed(2)} €</span>
                      <button 
                        onClick={() => handleAddToCart(item)}
                        className="p-2 bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-white transition-colors"
                        aria-label="Ajouter au panier"
                      >
                        <ShoppingBag size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Wishlist;
