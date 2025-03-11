
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  popular: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

// Mock categories
export const categories: Category[] = [
  {
    id: 'fresh-flowers',
    name: 'Fleurs Fraîches',
    description: 'Des fleurs fraîchement coupées pour illuminer votre intérieur.'
  },
  {
    id: 'bouquets',
    name: 'Bouquets',
    description: 'Compositions florales magnifiquement arrangées pour toutes les occasions.'
  },
  {
    id: 'potted-plants',
    name: 'Plantes en Pot',
    description: 'Des plantes en pot pour apporter de la verdure à votre espace de vie.'
  },
  {
    id: 'floral-decor',
    name: 'Décoration Florale',
    description: 'Éléments décoratifs floraux pour embellir votre maison ou événement.'
  }
];

// Mock products
export const products: Product[] = [
  {
    id: 'elegance-rose-bouquet',
    name: 'Bouquet Élégance Rose',
    description: 'Un bouquet raffiné de roses roses et blanches, parfait pour exprimer votre amour ou votre admiration.',
    price: 59.99,
    images: [
      'https://images.unsplash.com/photo-1537530360953-3b8b369e01fe?q=80&w=2070',
      'https://images.unsplash.com/photo-1594654281947-7114da78db59?q=80&w=1974'
    ],
    category: 'bouquets',
    popular: true
  },
  {
    id: 'spring-harmony',
    name: 'Harmonie Printanière',
    description: 'Une explosion de couleurs printanières avec un mélange de tulipes, jonquilles et renoncules.',
    price: 49.99,
    images: [
      'https://images.unsplash.com/photo-1613539246066-78db6f03a16f?q=80&w=1974',
      'https://images.unsplash.com/photo-1546842931-886c185b4c8c?q=80&w=2085'
    ],
    category: 'bouquets',
    popular: true
  },
  {
    id: 'zen-orchid',
    name: 'Orchidée Zen',
    description: 'Une magnifique orchidée blanche en pot, symbole d\'élégance et de pureté.',
    price: 69.99,
    images: [
      'https://images.unsplash.com/photo-1524598171347-abf62dfd6694?q=80&w=1974',
      'https://images.unsplash.com/photo-1594663358079-4a39ff4f4ef4?q=80&w=1974'
    ],
    category: 'potted-plants',
    popular: true
  },
  {
    id: 'rustic-wildflowers',
    name: 'Fleurs Sauvages Rustiques',
    description: 'Un arrangement bohème de fleurs sauvages dans un vase en terre cuite.',
    price: 44.99,
    images: [
      'https://images.unsplash.com/photo-1470509037663-253afd7f0f51?q=80&w=1974',
      'https://images.unsplash.com/photo-1457089328109-e5d9bd499191?q=80&w=1963'
    ],
    category: 'fresh-flowers',
    popular: false
  },
  {
    id: 'succulent-garden',
    name: 'Jardin de Succulentes',
    description: 'Un ensemble harmonieux de succulentes dans un pot design, facile d\'entretien et durable.',
    price: 39.99,
    images: [
      'https://images.unsplash.com/photo-1446071103084-c257b5f70672?q=80&w=2076',
      'https://images.unsplash.com/photo-1520302630591-fd2dfd937acd?q=80&w=1974'
    ],
    category: 'potted-plants',
    popular: false
  },
  {
    id: 'vintage-roses',
    name: 'Roses Vintage',
    description: 'Des roses aux teintes pastel dans un vase vintage, évoquant une élégance intemporelle.',
    price: 54.99,
    images: [
      'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?q=80&w=2104',
      'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=1980'
    ],
    category: 'fresh-flowers',
    popular: true
  },
  {
    id: 'summer-sunflowers',
    name: 'Tournesols d\'Été',
    description: 'Un bouquet éclatant de tournesols pour apporter la chaleur et la joie du soleil dans votre maison.',
    price: 45.99,
    images: [
      'https://images.unsplash.com/photo-1470509037663-253afd7f0f51?q=80&w=1974',
      'https://images.unsplash.com/photo-1533657493351-4e9f6b92a823?q=80&w=1970'
    ],
    category: 'bouquets',
    popular: false
  },
  {
    id: 'exotic-arrangement',
    name: 'Arrangement Exotique',
    description: 'Un arrangement audacieux de fleurs exotiques aux couleurs vives et formes uniques.',
    price: 64.99,
    images: [
      'https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=1974',
      'https://images.unsplash.com/photo-1487700160041-babef9c3cb55?q=80&w=1952'
    ],
    category: 'floral-decor',
    popular: true
  }
];

// Function to get a product by ID
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

// Function to get popular products
export const getPopularProducts = (): Product[] => {
  return products.filter(product => product.popular);
};

// Function to get products by category
export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.category === categoryId);
};

// Function to get all products
export const getAllProducts = (): Product[] => {
  return products;
};

// Function to get all categories
export const getAllCategories = (): Category[] => {
  return categories;
};
