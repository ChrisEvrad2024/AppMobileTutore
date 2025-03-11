import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById, getPopularProducts } from '@/lib/data';
import { addToRecentlyViewed, getRecentlyViewed } from '@/lib/recentlyViewed';
import { addToWishlist, removeFromWishlist, isInWishlist } from '@/lib/wishlist';
import { addToCart } from '@/lib/cart';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/shared/ProductCard';
import { Minus, Plus, ShoppingBag, Heart, Share2, ArrowLeft, CheckCircle } from 'lucide-react';
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = id ? getProductById(id) : undefined;
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [inWishlist, setInWishlist] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState<any[]>([]);
  
  useEffect(() => {
    // Reset scroll position when navigating to a new product
    window.scrollTo(0, 0);
    
    if (product) {
      // Reset state when product changes
      setQuantity(1);
      setSelectedImage(0);
      setInWishlist(isInWishlist(product.id));
      
      // Add to recently viewed
      addToRecentlyViewed(product);
      
      // Get recently viewed products (exclude current product)
      const viewed = getRecentlyViewed().filter(item => item.id !== product.id);
      setRecentlyViewed(viewed);
    }
  }, [id, product]);
  
  if (!product) {
    return (
      <>
        <Navbar />
        <main className="pt-32 pb-16 min-h-screen">
          <div className="section-container text-center">
            <h1 className="text-2xl font-serif mb-4">Produit non trouvé</h1>
            <p className="mb-8">Le produit que vous recherchez n'existe pas ou a été retiré.</p>
            <Link to="/catalog" className="btn-primary inline-flex">
              Retour à la boutique
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  const addProductToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast.success("Ajouté au panier", {
        description: `${product.name} (${quantity}) a été ajouté à votre panier.`,
        duration: 3000,
      });
    }
  };
  
  const toggleWishlist = () => {
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
  
  const shareProduct = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsLinkCopied(true);
    toast.success("Lien copié !", {
      description: "Le lien du produit a été copié dans le presse-papier.",
      duration: 3000,
    });
    
    setTimeout(() => {
      setIsLinkCopied(false);
    }, 3000);
  };
  
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-16">
        <div className="section-container">
          {/* Back button */}
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft size={16} /> Retour
          </button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-lg bg-muted">
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.name}
                  className="w-full h-full object-cover animate-fade-in"
                />
              </div>
              
              {product.images.length > 1 && (
                <div className="flex gap-4 flex-wrap">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      className={`aspect-square rounded-md overflow-hidden w-20 border-2 transition-all ${
                        selectedImage === index ? 'border-primary' : 'border-transparent'
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img 
                        src={image} 
                        alt={`${product.name} - view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-start">
                  <h1 className="text-3xl lg:text-4xl font-serif font-medium mb-2">{product.name}</h1>
                </div>
                <p className="text-2xl text-primary font-medium">{product.price.toFixed(2)} €</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-muted-foreground">{product.description}</p>
              </div>
              
              <div className="pt-4">
                <h3 className="font-medium mb-4">Quantité</h3>
                <div className="flex items-center">
                  <button 
                    className="border border-border rounded-l-md p-3 hover:bg-muted transition-colors"
                    onClick={decreaseQuantity}
                  >
                    <Minus size={16} />
                  </button>
                  <div className="border-t border-b border-border px-6 py-2 flex items-center justify-center min-w-[60px]">
                    {quantity}
                  </div>
                  <button 
                    className="border border-border rounded-r-md p-3 hover:bg-muted transition-colors"
                    onClick={increaseQuantity}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  className="btn-primary flex-1 flex items-center justify-center gap-2"
                  onClick={addProductToCart}
                >
                  <ShoppingBag size={18} /> Ajouter au panier
                </button>
                <button 
                  className={`btn-ghost flex items-center justify-center gap-2 ${inWishlist ? 'border-primary text-primary' : ''}`}
                  onClick={toggleWishlist}
                >
                  <Heart size={18} fill={inWishlist ? 'currentColor' : 'none'} /> Favoris
                </button>
              </div>
              
              <div className="border-t border-border pt-6 flex items-center gap-4">
                <button 
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  onClick={shareProduct}
                >
                  {isLinkCopied ? (
                    <>
                      <CheckCircle size={16} className="text-primary" /> Copié !
                    </>
                  ) : (
                    <>
                      <Share2 size={16} /> Partager
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          
          {/* Recently Viewed Products */}
          {recentlyViewed.length > 0 && (
            <div className="mt-24">
              <h2 className="text-2xl font-serif mb-8">Récemment consultés</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recentlyViewed.slice(0, 4).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
          
          {/* Related Products */}
          <div className="mt-24">
            <h2 className="text-2xl font-serif mb-8">Vous pourriez aussi aimer</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {getPopularProducts().slice(0, 4).filter(p => p.id !== product.id).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetail;
