import { useState } from 'react';
import { Link } from 'react-router-dom';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from 'lucide-react';
import { toast } from "sonner";

// Define form schema for validation
const formSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  phone: z.string().min(10, "Numéro de téléphone invalide"),
  subject: z.string().min(5, "Le sujet doit contenir au moins 5 caractères"),
  message: z.string().min(20, "Le message doit contenir au moins 20 caractères"),
});

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  // Form submission handler
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call to send contact form
      console.log("Contact form data:", data);
      
      // For demo purposes, we'll just simulate a successful submission
      setTimeout(() => {
        setIsSubmitted(true);
        toast.success("Message envoyé", {
          description: "Nous vous répondrons dans les plus brefs délais.",
          duration: 5000,
        });
      }, 1000);
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error("Échec de l'envoi", {
        description: "Une erreur s'est produite. Veuillez réessayer.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const resetForm = () => {
    form.reset();
    setIsSubmitted(false);
  };

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-16">
        <div className="section-container">
          <div className="text-center mb-16 animate-fade-up">
            <h1 className="section-title">Contactez-nous</h1>
            <p className="section-subtitle max-w-2xl mx-auto">
              Vous avez une question ou une demande spécifique ? Notre équipe est à votre écoute.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              {!isSubmitted ? (
                <div className="bg-white p-8 rounded-lg border border-border shadow-sm">
                  <h2 className="text-2xl font-serif mb-6">Envoyez-nous un message</h2>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nom</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Votre nom complet" 
                                  disabled={isSubmitting}
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input 
                                  type="email" 
                                  placeholder="votre@email.fr" 
                                  disabled={isSubmitting}
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Téléphone</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Votre numéro de téléphone" 
                                  disabled={isSubmitting}
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Sujet</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Objet de votre message" 
                                  disabled={isSubmitting}
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea 
                                rows={6}
                                placeholder="Détaillez votre demande ici..." 
                                disabled={isSubmitting}
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full sm:w-auto"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                      </Button>
                    </form>
                  </Form>
                </div>
              ) : (
                <div className="bg-white p-8 rounded-lg border border-border shadow-sm text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-serif mb-4">Message envoyé avec succès !</h2>
                  <p className="text-muted-foreground mb-8">
                    Nous avons bien reçu votre message et vous répondrons dans les plus brefs délais. 
                    Merci de nous avoir contacté.
                  </p>
                  <Button onClick={resetForm}>
                    Envoyer un autre message
                  </Button>
                </div>
              )}
            </div>
            
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
                <h3 className="font-serif text-xl mb-4">Informations de contact</h3>
                
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <MapPin className="h-5 w-5 text-primary shrink-0 mt-1" />
                    <div>
                      <p className="font-medium">Adresse</p>
                      <address className="not-italic text-muted-foreground">
                        123 Rue des Fleurs<br />
                        75001 Paris, France
                      </address>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Phone className="h-5 w-5 text-primary shrink-0 mt-1" />
                    <div>
                      <p className="font-medium">Téléphone</p>
                      <a href="tel:+33123456789" className="text-muted-foreground hover:text-primary transition-colors">
                        +33 1 23 45 67 89
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Mail className="h-5 w-5 text-primary shrink-0 mt-1" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a href="mailto:contact@chezflora.fr" className="text-muted-foreground hover:text-primary transition-colors">
                        contact@chezflora.fr
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Clock className="h-5 w-5 text-primary shrink-0 mt-1" />
                    <div>
                      <p className="font-medium">Horaires d'ouverture</p>
                      <p className="text-muted-foreground">
                        Lundi - Vendredi: 9h à 19h<br />
                        Samedi: 10h à 18h<br />
                        Dimanche: Fermé
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
                <h3 className="font-serif text-xl mb-4">Demandes spécifiques</h3>
                <p className="text-muted-foreground mb-4">
                  Pour des demandes spécifiques concernant des événements ou des décorations sur mesure, 
                  n'hésitez pas à nous contacter directement.
                </p>
                <Link to="/catalog" className="text-primary hover:underline flex items-center gap-1">
                  Découvrir nos services
                </Link>
              </div>
            </div>
          </div>
          
          {/* Map */}
          <div className="mt-16">
            <h2 className="text-2xl font-serif mb-6">Nous trouver</h2>
            <div className="w-full h-[400px] rounded-lg overflow-hidden border border-border">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.1423149385043!2d2.347636615941589!3d48.87071787928847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e17602d8761%3A0x3483c296cde9f279!2sParis%2C%20France!5e0!3m2!1sfr!2sfr!4v1647952566484!5m2!1sfr!2sfr" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Contact;