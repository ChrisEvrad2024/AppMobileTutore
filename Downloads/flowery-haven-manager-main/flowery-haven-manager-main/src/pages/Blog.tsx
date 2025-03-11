import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Calendar, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Separator } from '@/components/ui/separator';

// Mock blog post data
const blogPosts = [
  {
    id: '1',
    title: 'Comment prendre soin de vos orchidées en hiver',
    excerpt: 'Découvrez les astuces pour maintenir vos orchidées en pleine santé pendant les mois les plus froids de l\'année.',
    image: 'https://images.unsplash.com/photo-1596437974152-4d54cac7be0a?q=80&w=1887',
    date: '2023-12-15',
    author: 'Marie Dupont',
    category: 'conseils',
    tags: ['orchidées', 'plantes d\'intérieur', 'hiver', 'entretien']
  },
  {
    id: '2',
    title: 'Les tendances florales pour votre mariage en 2024',
    excerpt: 'Les couleurs, les arrangements et les fleurs qui seront tendance pour les mariages de la saison prochaine.',
    image: 'https://images.unsplash.com/photo-1563208010-9749801e8457?q=80&w=1887',
    date: '2023-11-28',
    author: 'Sophie Martin',
    category: 'tendances',
    tags: ['mariage', 'décorations', 'tendances', 'événements']
  },
  {
    id: '3',
    title: 'Comment créer un jardin durable et écologique',
    excerpt: 'Conseils pratiques pour aménager un espace vert qui respecte l\'environnement tout en étant esthétique.',
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=1964',
    date: '2023-11-10',
    author: 'Pierre Leroy',
    category: 'jardinage',
    tags: ['écologie', 'jardinage', 'plantes', 'développement durable']
  },
  {
    id: '4',
    title: 'La signification des roses selon leur couleur',
    excerpt: 'Un guide complet sur ce que représente chaque couleur de rose, pour bien choisir selon le message à transmettre.',
    image: 'https://images.unsplash.com/photo-1455582916367-25f75bfc6710?q=80&w=1927',
    date: '2023-10-24',
    author: 'Julie Moreau',
    category: 'culture',
    tags: ['roses', 'symbolisme', 'couleurs', 'cadeaux']
  },
  {
    id: '5',
    title: 'Les plantes d\'intérieur faciles pour débutants',
    excerpt: 'Sélection de plantes qui demandent peu d\'entretien pour débuter dans le jardinage d\'intérieur.',
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1973',
    date: '2023-10-12',
    author: 'Thomas Petit',
    category: 'conseils',
    tags: ['plantes d\'intérieur', 'débutants', 'entretien facile', 'décoration']
  },
  {
    id: '6',
    title: 'Comment réaliser un terrarium tropical',
    excerpt: 'Guide étape par étape pour créer votre propre écosystème miniature dans un terrarium.',
    image: 'https://images.unsplash.com/photo-1629143240347-192bb600ce77?q=80&w=1974',
    date: '2023-09-30',
    author: 'Emma Blanc',
    category: 'diy',
    tags: ['terrarium', 'plantes tropicales', 'diy', 'décoration']
  }
];

// Mock categories
const categories = [
  { name: 'Conseils', count: 12 },
  { name: 'Tendances', count: 8 },
  { name: 'DIY', count: 6 },
  { name: 'Événements', count: 5 },
  { name: 'Jardinage', count: 11 },
  { name: 'Culture', count: 7 }
];

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
};

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = activeCategory === null || 
      post.category.toLowerCase() === activeCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });
  
  const handleCategoryClick = (category: string) => {
    setActiveCategory(activeCategory === category.toLowerCase() ? null : category.toLowerCase());
  };
  
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-16">
        <div className="section-container">
          <div className="text-center mb-16 animate-fade-up">
            <h1 className="section-title">Le Journal Végétal</h1>
            <p className="section-subtitle max-w-2xl mx-auto">
              Découvrez nos articles sur l'univers des fleurs, des plantes et de la décoration florale.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Search Bar */}
              <div className="relative mb-8">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Rechercher un article..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* Blog Posts */}
              {filteredPosts.length > 0 ? (
                <div className="space-y-8">
                  {filteredPosts.map((post) => (
                    <article key={post.id} className="group bg-white rounded-lg border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="grid md:grid-cols-2 gap-6">
                        <Link to={`/blog/${post.id}`} className="aspect-[4/3] md:aspect-auto overflow-hidden bg-muted">
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          />
                        </Link>
                        <div className="p-6 md:pr-8 md:pl-0 flex flex-col">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                            <span className="capitalize">{post.category}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" /> 
                              {formatDate(post.date)}
                            </span>
                          </div>
                          
                          <Link to={`/blog/${post.id}`}>
                            <h2 className="text-xl font-serif font-medium mb-2 group-hover:text-primary transition-colors">
                              {post.title}
                            </h2>
                          </Link>
                          
                          <p className="text-muted-foreground mb-4 line-clamp-3">
                            {post.excerpt}
                          </p>
                          
                          <div className="mt-auto flex justify-between items-center">
                            <span className="text-sm">Par {post.author}</span>
                            <Link 
                              to={`/blog/${post.id}`} 
                              className="text-primary hover:underline flex items-center gap-1 text-sm font-medium"
                            >
                              Lire la suite <ArrowRight className="h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg border border-border">
                  <p className="text-xl font-serif mb-2">Aucun article trouvé</p>
                  <p className="text-muted-foreground mb-4">
                    Aucun article ne correspond à votre recherche. Essayez avec d'autres termes ou catégories.
                  </p>
                  <Button variant="outline" onClick={() => {
                    setSearchQuery('');
                    setActiveCategory(null);
                  }}>
                    Réinitialiser les filtres
                  </Button>
                </div>
              )}
              
              {/* Pagination */}
              {filteredPosts.length > 0 && (
                <Pagination className="mt-8">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="space-y-8">
              {/* Categories */}
              <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
                <h3 className="font-serif text-xl mb-4">Catégories</h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.name}>
                      <button 
                        className={`w-full flex justify-between items-center py-2 px-3 rounded-md transition-colors ${
                          activeCategory === category.name.toLowerCase() 
                            ? 'bg-primary/10 text-primary' 
                            : 'hover:bg-muted'
                        }`}
                        onClick={() => handleCategoryClick(category.name)}
                      >
                        <span>{category.name}</span>
                        <span className="bg-muted px-2 py-1 rounded-full text-xs">
                          {category.count}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Recent Posts */}
              <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
                <h3 className="font-serif text-xl mb-4">Articles récents</h3>
                <div className="space-y-4">
                  {blogPosts.slice(0, 3).map((post) => (
                    <div key={post.id} className="flex gap-3">
                      <Link to={`/blog/${post.id}`} className="w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link to={`/blog/${post.id}`} className="font-medium line-clamp-2 hover:text-primary transition-colors">
                          {post.title}
                        </Link>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatDate(post.date)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Tags Cloud */}
              <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
                <h3 className="font-serif text-xl mb-4">Tags populaires</h3>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(blogPosts.flatMap(post => post.tags))).map((tag) => (
                    <button 
                      key={tag} 
                      className="bg-muted hover:bg-muted/80 px-3 py-1.5 rounded-full text-sm transition-colors"
                      onClick={() => setSearchQuery(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Newsletter */}
              <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
                <h3 className="font-serif text-xl mb-2">Newsletter</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Abonnez-vous pour recevoir nos derniers articles et conseils.
                </p>
                <div className="space-y-3">
                  <Input placeholder="Votre adresse email" />
                  <Button className="w-full">S'abonner</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Blog;