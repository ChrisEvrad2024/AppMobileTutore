import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Calendar, Clock, MessageSquare, Heart, Share2, Facebook, Twitter, Linkedin, Link2 } from 'lucide-react';
import { toast } from "sonner";

// Mock blog post data - in real app, fetch from API
const blogPost = {
  id: '1',
  title: 'Comment prendre soin de vos orchidées en hiver',
  excerpt: 'Découvrez les astuces pour maintenir vos orchidées en pleine santé pendant les mois les plus froids de l\'année.',
  image: 'https://images.unsplash.com/photo-1596437974152-4d54cac7be0a?q=80&w=1887',
  date: '2023-12-15',
  author: {
    name: 'Marie Dupont',
    avatar: 'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?q=80&w=1780',
    role: 'Fleuriste en chef'
  },
  readTime: '7 min',
  category: 'conseils',
  tags: ['orchidées', 'plantes d\'intérieur', 'hiver', 'entretien'],
  content: `
    <p>Les orchidées sont des plantes magnifiques mais parfois délicates qui nécessitent une attention particulière, surtout pendant la saison hivernale. Avec les bonnes pratiques, vous pouvez non seulement les maintenir en vie, mais les faire prospérer même quand les jours sont courts et froids.</p>
    
    <h2>Comprendre les besoins spécifiques des orchidées en hiver</h2>
    
    <p>La plupart des orchidées sont des plantes tropicales habituées à un environnement humide et relativement chaud. L'hiver, avec son air sec et ses températures plus basses, représente donc un défi pour ces plantes. Voici les principaux aspects à surveiller :</p>
    
    <ul>
      <li><strong>Température</strong> : La majorité des orchidées d'intérieur prospèrent à des températures entre 16°C et 24°C. Évitez les écarts brusques de température et tenez-les éloignées des courants d'air froid.</li>
      <li><strong>Lumière</strong> : En hiver, la luminosité diminue considérablement. Placez vos orchidées près d'une fenêtre orientée à l'est ou au sud pour qu'elles bénéficient d'un maximum de lumière naturelle.</li>
      <li><strong>Humidité</strong> : Le chauffage central assèche l'air, ce qui est problématique pour les orchidées qui apprécient un taux d'humidité relativement élevé (environ 50-70%).</li>
    </ul>
    
    <h2>L'arrosage, une question de précision</h2>
    
    <p>L'erreur la plus commune avec les orchidées est l'arrosage excessif, particulièrement en hiver lorsque la croissance ralentit. Voici quelques conseils :</p>
    
    <ul>
      <li>Réduisez la fréquence d'arrosage en hiver. Pour la plupart des orchidées, un arrosage tous les 10-14 jours est suffisant.</li>
      <li>Arrosez toujours le matin pour permettre à l'excès d'eau de s'évaporer pendant la journée.</li>
      <li>Utilisez de l'eau à température ambiante pour éviter le choc thermique aux racines.</li>
      <li>Le substrat doit être complètement sec avant le prochain arrosage.</li>
    </ul>
    
    <p>La méthode d'immersion peut être efficace : placez le pot dans un récipient d'eau pendant 15 minutes, puis laissez-le s'égoutter complètement.</p>
    
    <h2>Maintenir un bon niveau d'humidité</h2>
    
    <p>Pour contrer l'air sec de l'hiver, vous pouvez :</p>
    
    <ul>
      <li>Placer les pots sur un plateau rempli de billes d'argile et d'eau (sans que les racines ne touchent directement l'eau).</li>
      <li>Utiliser un humidificateur près de vos plantes.</li>
      <li>Regrouper vos plantes pour créer un micro-climat plus humide.</li>
      <li>Vaporiser occasionnellement de l'eau autour des plantes (mais pas directement sur les fleurs).</li>
    </ul>
    
    <h2>Fertilisation adaptée</h2>
    
    <p>En hiver, les orchidées entrent généralement dans une phase de repos relatif. Adaptez votre régime de fertilisation :</p>
    
    <ul>
      <li>Réduisez la fréquence de fertilisation de moitié par rapport à la période de croissance.</li>
      <li>Utilisez un engrais spécifique pour orchidées à une concentration plus faible que celle recommandée sur l'emballage.</li>
      <li>Si votre orchidée est en pleine floraison hivernale, maintenez une fertilisation légère pour soutenir la floraison.</li>
    </ul>
    
    <h2>Attention aux parasites</h2>
    
    <p>L'air sec des intérieurs chauffés peut favoriser l'apparition de certains parasites, notamment les cochenilles et les araignées rouges. Inspectez régulièrement vos plantes, en particulier sous les feuilles et à la jonction des tiges. Un nettoyage doux des feuilles avec un chiffon humide peut aider à prévenir les infestations.</p>
    
    <h2>Conclusion</h2>
    
    <p>Avec ces soins adaptés, vos orchidées peuvent non seulement survivre à l'hiver mais même fleurir durant cette saison, apportant couleur et vie à votre intérieur pendant les mois les plus sombres. N'oubliez pas que chaque espèce d'orchidée a ses propres particularités, alors n'hésitez pas à vous renseigner sur les besoins spécifiques de vos variétés.</p>
  `,
  comments: [
    {
      id: 'c1',
      author: 'Jean Pelletier',
      avatar: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      date: '2023-12-18',
      content: 'Article très instructif ! J\'ai toujours du mal avec mes orchidées en hiver, je vais essayer ces conseils cette année.'
    },
    {
      id: 'c2',
      author: 'Lucie Martin',
      avatar: '',
      date: '2023-12-17',
      content: 'Est-ce que ces conseils s\'appliquent à toutes les variétés d\'orchidées ? J\'ai principalement des Phalaenopsis et des Dendrobiums.'
    }
  ],
  relatedPosts: [
    {
      id: '2',
      title: 'Les plantes d\'intérieur faciles pour débutants',
      image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1973',
      date: '2023-10-12',
    },
    {
      id: '3',
      title: 'Comment réaliser un terrarium tropical',
      image: 'https://images.unsplash.com/photo-1629143240347-192bb600ce77?q=80&w=1974',
      date: '2023-09-30',
    }
  ]
};

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
};

const BlogArticle = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(24);
  
  // In real app, fetch post data based on id
  // const post = useQuery(['post', id], () => fetchPost(id))
  
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!commentText.trim()) {
      toast.error("Le commentaire ne peut pas être vide");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call to submit comment
    setTimeout(() => {
      toast.success("Commentaire ajouté avec succès");
      setCommentText('');
      setIsSubmitting(false);
    }, 1000);
  };
  
  const toggleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };
  
  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Lien copié dans le presse-papier");
  };
  
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-16">
        <div className="section-container max-w-4xl">
          {/* Back Navigation */}
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft size={16} /> Retour au blog
          </button>
          
          {/* Article Header */}
          <article className="bg-white rounded-lg border border-border overflow-hidden shadow-sm">
            <div className="aspect-video overflow-hidden bg-muted">
              <img 
                src={blogPost.image} 
                alt={blogPost.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-6 md:p-8">
              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                <Link to={`/blog/category/${blogPost.category}`} className="bg-primary/10 text-primary px-3 py-1 rounded-full capitalize">
                  {blogPost.category}
                </Link>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" /> 
                  {formatDate(blogPost.date)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" /> 
                  {blogPost.readTime} de lecture
                </span>
              </div>
              
              {/* Article Title */}
              <h1 className="text-3xl md:text-4xl font-serif font-medium mb-6">
                {blogPost.title}
              </h1>
              
              {/* Author Info */}
              <div className="flex items-center gap-3 mb-8">
                <Avatar>
                  <AvatarImage src={blogPost.author.avatar} alt={blogPost.author.name} />
                  <AvatarFallback>{blogPost.author.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{blogPost.author.name}</div>
                  <div className="text-sm text-muted-foreground">{blogPost.author.role}</div>
                </div>
              </div>
              
              {/* Article Content */}
              <div 
                className="prose prose-stone max-w-none mb-8"
                dangerouslySetInnerHTML={{ __html: blogPost.content }}
              />
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {blogPost.tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/blog/tag/${tag}`}
                    className="bg-muted hover:bg-muted/80 px-3 py-1.5 rounded-full text-sm transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center justify-between py-4 border-t border-border">
                <div className="flex items-center gap-4">
                  <button 
                    className={`flex items-center gap-1.5 ${liked ? 'text-red-500' : 'text-muted-foreground'}`}
                    onClick={toggleLike}
                  >
                    <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} /> 
                    <span>{likeCount}</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-muted-foreground">
                    <MessageSquare className="h-5 w-5" /> 
                    <span>{blogPost.comments.length}</span>
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    className="p-2 hover:bg-muted rounded-full transition-colors"
                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}
                    aria-label="Partager sur Facebook"
                  >
                    <Facebook className="h-4 w-4" />
                  </button>
                  <button 
                    className="p-2 hover:bg-muted rounded-full transition-colors"
                    onClick={() => window.open(`https://twitter.com/intent/tweet?url=${window.location.href}&text=${blogPost.title}`, '_blank')}
                    aria-label="Partager sur Twitter"
                  >
                    <Twitter className="h-4 w-4" />
                  </button>
                  <button 
                    className="p-2 hover:bg-muted rounded-full transition-colors"
                    onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`, '_blank')}
                    aria-label="Partager sur LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </button>
                  <button 
                    className="p-2 hover:bg-muted rounded-full transition-colors"
                    onClick={copyLinkToClipboard}
                    aria-label="Copier le lien"
                  >
                    <Link2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              {/* Author Bio */}
              <div className="bg-muted/30 p-6 rounded-lg mt-8">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={blogPost.author.avatar} alt={blogPost.author.name} />
                    <AvatarFallback>{blogPost.author.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-serif text-lg font-medium">{blogPost.author.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{blogPost.author.role}</p>
                    <p className="mt-3">
                      Passionnée par les plantes et fleurs depuis plus de 15 ans, Marie partage son expertise et ses conseils pour vous aider à créer et entretenir votre espace vert.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Comments Section */}
              <div className="mt-12">
                <h2 className="text-2xl font-serif mb-6">Commentaires ({blogPost.comments.length})</h2>
                
                {/* Add Comment Form */}
                <form onSubmit={handleCommentSubmit} className="mb-8">
                  <Textarea
                    placeholder="Partagez votre avis..."
                    className="min-h-[120px] mb-4"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <Button type="submit" disabled={isSubmitting || !commentText.trim()}>
                    {isSubmitting ? "Envoi en cours..." : "Publier le commentaire"}
                  </Button>
                </form>
                
                {/* Comments List */}
                <div className="space-y-6">
                  {blogPost.comments.map((comment) => (
                    <div key={comment.id} className="border-b border-border pb-6">
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarImage src={comment.avatar} alt={comment.author} />
                          <AvatarFallback>{comment.author.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex flex-wrap justify-between items-center gap-2 mb-1">
                            <span className="font-medium">{comment.author}</span>
                            <span className="text-xs text-muted-foreground">{formatDate(comment.date)}</span>
                          </div>
                          <p className="text-sm">{comment.content}</p>
                          <button className="text-primary text-sm mt-2">Répondre</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
          
          {/* Related Posts */}
          <div className="mt-12">
            <h2 className="text-2xl font-serif mb-6">Articles similaires</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogPost.relatedPosts.map((post) => (
                <Link 
                  key={post.id} 
                  to={`/blog/${post.id}`}
                  className="group bg-white rounded-lg border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="aspect-[16/9] overflow-hidden bg-muted">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-muted-foreground mb-2">{formatDate(post.date)}</div>
                    <h3 className="font-medium group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BlogArticle;