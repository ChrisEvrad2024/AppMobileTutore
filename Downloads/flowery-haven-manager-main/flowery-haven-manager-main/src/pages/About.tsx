import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, Users, Award, Heart, Clock, ChevronRight } from 'lucide-react';

const About = () => {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-muted">
          <div className="section-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 animate-fade-up">
                <span className="inline-block text-xs uppercase tracking-widest mb-3 text-primary font-medium">
                  Notre Histoire
                </span>
                <h1 className="text-4xl md:text-5xl font-serif font-medium mb-6 tracking-tight">
                  Passionnés par l'art floral depuis 2016
                </h1>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
                  ChezFlora est née d'une passion pour les fleurs et d'un désir de partager cette beauté naturelle avec le monde. 
                  Depuis nos débuts, nous nous engageons à offrir des créations florales uniques et personnalisées pour tous vos moments spéciaux.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg">
                    <Link to="/contact">Nous contacter</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/catalog">Découvrir nos produits</Link>
                  </Button>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative">
                  <div className="aspect-[4/3] rounded-lg overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1558024160-4bcccd62f54c?q=80&w=2070" 
                      alt="L'équipe ChezFlora" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-white rounded-lg p-4 shadow-lg hidden lg:block">
                    <img 
                      src="https://images.unsplash.com/photo-1603137071781-c2bc84a95a69?q=80&w=1887" 
                      alt="Détail floral" 
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Story Section */}
        <section className="py-20">
          <div className="section-container">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="inline-block text-xs uppercase tracking-widest mb-3 text-primary font-medium">
                Notre Aventure
              </span>
              <h2 className="section-title">Notre histoire florissante</h2>
              <p className="section-subtitle">
                Découvrez comment une passion pour les fleurs s'est transformée en une entreprise dédiée à l'art floral.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg border border-border shadow-sm text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-serif text-xl mb-3">Nos débuts</h3>
                <p className="text-muted-foreground">
                  Fondée en 2016 par Caroline et Thomas, deux passionnés de botanique, ChezFlora a commencé comme une petite boutique dans le 9e arrondissement de Paris.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg border border-border shadow-sm text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-serif text-xl mb-3">Notre croissance</h3>
                <p className="text-muted-foreground">
                  Grâce à nos créations uniques et notre dévouement à la qualité, notre réputation s'est rapidement développée, nous permettant d'étendre nos services.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg border border-border shadow-sm text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-serif text-xl mb-3">Aujourd'hui</h3>
                <p className="text-muted-foreground">
                  ChezFlora compte désormais une équipe de 15 fleuristes passionnés, desservant Paris et sa région avec des créations florales pour tous types d'événements.
                </p>
              </div>
            </div>
            
            <div className="mt-16 bg-white p-8 rounded-lg border border-border shadow-sm">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/2">
                  <img 
                    src="https://images.unsplash.com/photo-1621507003166-76dfd16576db?q=80&w=1974" 
                    alt="Notre boutique" 
                    className="rounded-lg w-full h-auto"
                  />
                </div>
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-serif mb-4">Notre philosophie</h3>
                  <p className="text-muted-foreground mb-4">
                    Chez ChezFlora, nous croyons que chaque arrangement floral raconte une histoire unique. Notre approche est fondée sur trois principes fondamentaux :
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span><strong>Qualité exceptionnelle</strong> - Nous sélectionnons uniquement les meilleures fleurs, fraîches et de saison.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span><strong>Créativité sans limites</strong> - Chaque création est unique, conçue avec passion et originalité.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span><strong>Service personnalisé</strong> - Nous prenons le temps d'écouter vos besoins pour créer exactement ce que vous imaginez.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-20 bg-muted">
          <div className="section-container">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="inline-block text-xs uppercase tracking-widest mb-3 text-primary font-medium">
                Notre Équipe
              </span>
              <h2 className="section-title">Les artisans de la beauté</h2>
              <p className="section-subtitle">
                Rencontrez les personnes passionnées qui créent la magie florale chez ChezFlora.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="group">
                <div className="aspect-[3/4] rounded-lg overflow-hidden mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887" 
                    alt="Caroline Dubois" 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <h3 className="font-serif text-xl">Caroline Dubois</h3>
                <p className="text-primary">Co-fondatrice & Directrice</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Passionnée de botanique depuis son enfance, Caroline apporte sa vision artistique et son expertise en design floral.
                </p>
              </div>
              
              <div className="group">
                <div className="aspect-[3/4] rounded-lg overflow-hidden mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887" 
                    alt="Thomas Martin" 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <h3 className="font-serif text-xl">Thomas Martin</h3>
                <p className="text-primary">Co-fondateur & Responsable Événementiel</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Avec un background en architecture, Thomas excelle dans la conception d'installations florales impressionnantes pour les événements.
                </p>
              </div>
              
              <div className="group">
                <div className="aspect-[3/4] rounded-lg overflow-hidden mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1887" 
                    alt="Sophie Leclerc" 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <h3 className="font-serif text-xl">Sophie Leclerc</h3>
                <p className="text-primary">Fleuriste en Chef</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Formée dans les meilleures écoles d'art floral, Sophie apporte son expertise technique et sa créativité à chaque composition.
                </p>
              </div>
              
              <div className="group">
                <div className="aspect-[3/4] rounded-lg overflow-hidden mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1770" 
                    alt="Pierre Moreau" 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <h3 className="font-serif text-xl">Pierre Moreau</h3>
                <p className="text-primary">Expert en Plantes & Jardinage</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Avec plus de 20 ans d'expérience en horticulture, Pierre partage son savoir et conseille nos clients sur l'entretien des plantes.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Link 
                to="/contact" 
                className="inline-flex items-center text-primary hover:underline"
              >
                Envie de rejoindre notre équipe ? Contactez-nous
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="py-20">
          <div className="section-container">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="inline-block text-xs uppercase tracking-widest mb-3 text-primary font-medium">
                Nos Valeurs
              </span>
              <h2 className="section-title">Ce qui guide nos actions</h2>
              <p className="section-subtitle">
                Des principes forts qui sont au cœur de notre entreprise et de notre approche.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg border border-border shadow-sm">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl mb-2">Passion & Créativité</h3>
                    <p className="text-muted-foreground">
                      Notre amour pour les fleurs et la nature inspire chacune de nos créations. Nous recherchons constamment de nouvelles façons innovantes d'exprimer la beauté à travers nos arrangements.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg border border-border shadow-sm">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl mb-2">Service Exceptionnel</h3>
                    <p className="text-muted-foreground">
                      Nous nous engageons à offrir une expérience client exceptionnelle à chaque interaction. Votre satisfaction est notre priorité absolue.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg border border-border shadow-sm">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl mb-2">Qualité & Fraîcheur</h3>
                    <p className="text-muted-foreground">
                      Nous ne compromettrons jamais sur la qualité. Nos fleurs sont sélectionnées avec soin pour leur fraîcheur et leur longévité, et nos arrangements sont créés avec une attention méticuleuse aux détails.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg border border-border shadow-sm">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl mb-2">Respect de l'Environnement</h3>
                    <p className="text-muted-foreground">
                      Nous nous efforçons de minimiser notre impact écologique en travaillant avec des fournisseurs locaux, en privilégiant les fleurs de saison et en adoptant des pratiques durables dans notre boutique.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-20 bg-muted">
          <div className="section-container">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="inline-block text-xs uppercase tracking-widest mb-3 text-primary font-medium">
                Témoignages
              </span>
              <h2 className="section-title">Ce que nos clients disent</h2>
              <p className="section-subtitle">
                Les retours de ceux qui nous font confiance pour leurs moments spéciaux.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 1.25L10.0623 5.48979L14.75 6.14018L11.375 9.40021L12.1246 14.0623L8 11.8698L3.87541 14.0623L4.625 9.40021L1.25 6.14018L5.9377 5.48979L8 1.25Z" fill="#FF9529" />
                    </svg>
                  ))}
                </div>
                <p className="italic text-muted-foreground mb-4">
                  "Pour mon mariage, je voulais quelque chose d'unique et naturel. ChezFlora a dépassé toutes mes attentes avec des arrangements magnifiques qui ont enchanté tous nos invités."
                </p>
                <div className="flex items-center gap-3">
                  <img 
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961" 
                    alt="Julie B." 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">Julie B.</p>
                    <p className="text-xs text-muted-foreground">Mariée en juin 2023</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 1.25L10.0623 5.48979L14.75 6.14018L11.375 9.40021L12.1246 14.0623L8 11.8698L3.87541 14.0623L4.625 9.40021L1.25 6.14018L5.9377 5.48979L8 1.25Z" fill="#FF9529" />
                    </svg>
                  ))}
                </div>
                <p className="italic text-muted-foreground mb-4">
                  "Les fleurs pour notre événement d'entreprise étaient élégantes et parfaitement adaptées à notre image de marque. Le professionnalisme et l'attention aux détails sont remarquables."
                </p>
                <div className="flex items-center gap-3">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974" 
                    alt="Marc L." 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">Marc L.</p>
                    <p className="text-xs text-muted-foreground">Directeur événementiel</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 1.25L10.0623 5.48979L14.75 6.14018L11.375 9.40021L12.1246 14.0623L8 11.8698L3.87541 14.0623L4.625 9.40021L1.25 6.14018L5.9377 5.48979L8 1.25Z" fill="#FF9529" />
                    </svg>
                  ))}
                </div>
                <p className="italic text-muted-foreground mb-4">
                  "Je commande régulièrement des bouquets pour ma mère et l'équipe de ChezFlora prend toujours le temps de créer quelque chose de spécial qui lui arrache un sourire. Service impeccable et livraison ponctuelle."
                </p>
                <div className="flex items-center gap-3">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964" 
                    alt="Sarah M." 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">Sarah M.</p>
                    <p className="text-xs text-muted-foreground">Cliente fidèle</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-24 bg-primary text-white">
          <div className="container max-w-4xl mx-auto px-4 md:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6">Prêt à découvrir notre univers floral ?</h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Venez visiter notre boutique ou explorez notre catalogue en ligne pour trouver l'arrangement parfait pour votre prochain événement.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
                asChild
              >
                <Link to="/catalog">Découvrir nos produits</Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <Link to="/contact">Nous contacter</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;