import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Eye, EyeOff, LogIn, Mail, Lock, ArrowRight } from "lucide-react";

// Service d'authentification (à adapter selon votre implémentation)
import auth from "@/api/auth";

// Définition du schéma de validation
const loginSchema = z.object({
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(1, "Le mot de passe est requis"),
  rememberMe: z.boolean().optional(),
});

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Initialisation du formulaire
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Fonction de soumission du formulaire
  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    
    try {
      // Appel au service d'authentification
      // Dans un environnement de production, remplacez cette partie par un appel API réel
      console.log("Tentative de connexion avec:", { email: data.email, rememberMe: data.rememberMe });
      
      // Simulation d'un appel API (à remplacer par votre logique d'authentification)
      setTimeout(() => {
        // Stockage des préférences de connexion si "Se souvenir de moi" est coché
        if (data.rememberMe) {
          localStorage.setItem("savedEmail", data.email);
        } else {
          localStorage.removeItem("savedEmail");
        }
        
        // Simulation de connexion réussie et redirection
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", JSON.stringify({ 
          email: data.email, 
          name: "Marie Dupont", 
          role: "client" 
        }));
        
        toast.success("Connexion réussie !", {
          description: "Bienvenue sur votre espace ChezFlora",
        });
        
        // Redirection vers le tableau de bord ou la page d'accueil
        navigate("/account");
      }, 1500);
      
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      toast.error("Échec de la connexion", {
        description: "Identifiants incorrects ou problème de connexion",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Chargement des données sauvegardées
  useState(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      form.setValue("email", savedEmail);
      form.setValue("rememberMe", true);
    }
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b py-4">
        <div className="container max-w-6xl mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="font-serif text-2xl font-medium text-primary">ChezFlora</Link>
          <Link to="/auth/register" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Vous n'avez pas de compte ? <span className="text-primary font-medium">S'inscrire</span>
          </Link>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-lg border border-border shadow-sm p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-serif font-medium">Connexion</h1>
            <p className="text-muted-foreground mt-1">
              Accédez à votre espace client
            </p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Mail className="h-4 w-4" /> Adresse email
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="votre@email.fr"
                        type="email"
                        autoComplete="email"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="flex items-center gap-2">
                        <Lock className="h-4 w-4" /> Mot de passe
                      </FormLabel>
                      <Link 
                        to="/auth/forgot-password" 
                        className="text-xs text-primary hover:underline"
                      >
                        Mot de passe oublié ?
                      </Link>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          placeholder="Votre mot de passe"
                          type={showPassword ? "text" : "password"}
                          autoComplete="current-password"
                          disabled={isLoading}
                          {...field}
                        />
                        <button 
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground p-1 hover:text-foreground transition-colors"
                          tabIndex={-1}
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal cursor-pointer">
                      Se souvenir de moi
                    </FormLabel>
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Connexion en cours...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" /> Se connecter
                  </span>
                )}
              </Button>
            </form>
          </Form>
          
          <div className="mt-6">
            <div className="relative flex items-center justify-center">
              <Separator className="absolute w-full" />
              <span className="bg-white px-2 z-10 text-xs text-muted-foreground">ou</span>
            </div>
            
            <div className="mt-4 space-y-3">
              <Button variant="outline" className="w-full flex items-center gap-2" onClick={() => toast.info("Fonctionnalité en développement")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
                </svg>
                Continuer avec Google
              </Button>
              
              <Button variant="outline" className="w-full flex items-center gap-2" onClick={() => toast.info("Fonctionnalité en développement")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                </svg>
                Continuer avec GitHub
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t py-4">
        <div className="container max-w-6xl mx-auto px-4">
          <p className="text-sm text-center text-muted-foreground">
            &copy; {new Date().getFullYear()} ChezFlora. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Login;