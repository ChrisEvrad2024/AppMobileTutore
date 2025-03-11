import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  FileText,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  Search,
  Bell,
  ChevronDown,
  PanelLeft,
  Flower,
  Bookmark,
  Tag,
  FileEdit,
  BarChart3,
  Palette
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// Définition des éléments de menu
const menuItems = [
  {
    title: 'Vue d\'ensemble',
    icon: LayoutDashboard,
    href: '/admin',
    end: true
  },
  {
    title: 'Catalogue',
    icon: Package,
    items: [
      {
        title: 'Produits',
        href: '/admin/products',
        icon: Flower,
      },
      {
        title: 'Catégories',
        href: '/admin/categories',
        icon: Tag,
      },
    ],
  },
  {
    title: 'Commandes',
    icon: ShoppingBag,
    href: '/admin/orders',
  },
  {
    title: 'Devis',
    icon: FileText,
    href: '/admin/quotes',
  },
  {
    title: 'Clients',
    icon: Users,
    href: '/admin/customers',
  },
  {
    title: 'Blog',
    icon: FileEdit,
    href: '/admin/blog',
  },
  {
    title: 'Rapports',
    icon: BarChart3,
    href: '/admin/reports',
  },
  {
    title: 'Apparence',
    icon: Palette,
    href: '/admin/appearance',
  },
  {
    title: 'Paramètres',
    icon: Settings,
    href: '/admin/settings',
  }
];

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([
    {
      id: 'n1',
      title: 'Nouvelle commande',
      description: 'Commande #1254 reçue il y a 5 minutes',
      time: '5 min',
      read: false
    },
    {
      id: 'n2',
      title: 'Stock faible',
      description: 'Le produit "Roses rouges Premium" est presque épuisé',
      time: '1 heure',
      read: false
    },
    {
      id: 'n3',
      title: 'Demande de devis',
      description: 'Nouvelle demande de devis pour un mariage',
      time: '2 heures',
      read: true
    }
  ]);
  
  // Gestion des sous-menus
  const toggleExpanded = (title) => {
    setExpandedItems(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };
  
  // Déterminer si un élément de menu est actif
  const isActive = (href, end = false) => {
    if (end) {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };
  
  // Vérifier automatiquement si les sous-menus doivent être ouverts en fonction de la route active
  useEffect(() => {
    menuItems.forEach(item => {
      if (item.items && item.items.some(subItem => isActive(subItem.href))) {
        setExpandedItems(prev => ({ ...prev, [item.title]: true }));
      }
    });
  }, [location.pathname]);
  
  // Adaptation à la taille de l'écran
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 1024);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Marquage des notifications comme lues
  const markNotificationAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };
  
  // Nombre de notifications non lues
  const unreadNotificationsCount = notifications.filter(n => !n.read).length;
  
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar pour desktop */}
      <aside 
        className={cn(
          "fixed inset-y-0 z-50 flex h-full w-72 flex-col border-r bg-white transition-transform lg:translate-x-0 lg:border-r lg:bg-background",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo/Header du sidebar */}
        <div className="border-b px-6 py-5 flex items-center">
          <Link to="/" className="flex items-center gap-2 font-serif text-xl font-medium">
            <Flower className="h-5 w-5 text-primary" />
            <span>ChezFlora</span>
            <Badge variant="outline" className="ml-2 text-xs">Admin</Badge>
          </Link>
        </div>
        
        {/* Menu de navigation */}
        <nav className="flex-1 overflow-auto px-3 py-3">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <div key={item.title}>
                {item.items ? (
                  <div className="space-y-1">
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start text-left",
                        expandedItems[item.title] && "bg-muted"
                      )}
                      onClick={() => toggleExpanded(item.title)}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.title}
                      <ChevronDown 
                        className={cn(
                          "ml-auto h-4 w-4 transition-transform",
                          expandedItems[item.title] && "rotate-180"
                        )} 
                      />
                    </Button>
                    {expandedItems[item.title] && item.items && (
                      <div className="pl-6 space-y-1">
                        {item.items.map((subItem) => (
                          <Button
                            key={subItem.title}
                            variant="ghost"
                            asChild
                            className={cn(
                              "w-full justify-start text-left",
                              isActive(subItem.href) && "bg-accent text-accent-foreground font-medium"
                            )}
                            size="sm"
                          >
                            <Link to={subItem.href}>
                              <subItem.icon className="mr-2 h-4 w-4" />
                              {subItem.title}
                            </Link>
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    asChild
                    className={cn(
                      "w-full justify-start text-left",
                      isActive(item.href, item.end) && "bg-accent text-accent-foreground font-medium"
                    )}
                  >
                    <Link to={item.href}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.title}
                    </Link>
                  </Button>
                )}
              </div>
            ))}
          </div>
        </nav>
        
        {/* Footer du sidebar avec lien d'aide et déconnexion */}
        <div className="border-t p-4">
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <HelpCircle className="mr-2 h-4 w-4" />
              Centre d'aide
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/auth/login")}>
              <LogOut className="mr-2 h-4 w-4" />
              Se déconnecter
            </Button>
          </div>
        </div>
      </aside>
      
      {/* Mobile menu */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <SheetHeader className="border-b px-6 py-5">
            <SheetTitle className="flex items-center gap-2 font-serif text-xl">
              <Flower className="h-5 w-5 text-primary" />
              ChezFlora Admin
            </SheetTitle>
          </SheetHeader>
          <nav className="flex-1 overflow-auto px-3 py-3">
            <div className="space-y-1">
              {menuItems.map((item) => (
                <div key={item.title}>
                  {item.items ? (
                    <div className="space-y-1">
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start text-left",
                          expandedItems[item.title] && "bg-muted"
                        )}
                        onClick={() => toggleExpanded(item.title)}
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.title}
                        <ChevronDown 
                          className={cn(
                            "ml-auto h-4 w-4 transition-transform",
                            expandedItems[item.title] && "rotate-180"
                          )} 
                        />
                      </Button>
                      {expandedItems[item.title] && item.items && (
                        <div className="pl-6 space-y-1">
                          {item.items.map((subItem) => (
                            <Button
                              key={subItem.title}
                              variant="ghost"
                              asChild
                              className={cn(
                                "w-full justify-start text-left",
                                isActive(subItem.href) && "bg-accent text-accent-foreground font-medium"
                              )}
                              size="sm"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <Link to={subItem.href}>
                                <subItem.icon className="mr-2 h-4 w-4" />
                                {subItem.title}
                              </Link>
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      asChild
                      className={cn(
                        "w-full justify-start text-left",
                        isActive(item.href, item.end) && "bg-accent text-accent-foreground font-medium"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Link to={item.href}>
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.title}
                      </Link>
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </nav>
          <div className="border-t p-4">
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <HelpCircle className="mr-2 h-4 w-4" />
                Centre d'aide
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/auth/login")}>
                <LogOut className="mr-2 h-4 w-4" />
                Se déconnecter
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      
      {/* Contenu principal */}
      <div className={cn(
        "flex min-h-screen flex-1 flex-col bg-background",
        isSidebarOpen ? "lg:pl-72" : ""
      )}>
        {/* Header */}
        <header className="sticky top-0 z-40 border-b bg-background">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="hidden lg:flex"
              >
                <PanelLeft className="h-5 w-5" />
              </Button>
              <div className="relative sm:block hidden">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher..."
                  className="w-64 pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <TooltipProvider>
                <DropdownMenu>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative">
                          <Bell className="h-5 w-5" />
                          {unreadNotificationsCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              {unreadNotificationsCount}
                            </span>
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent>Notifications</TooltipContent>
                  </Tooltip>
                  <DropdownMenuContent align="end" className="w-80">
                    <DropdownMenuLabel className="flex items-center justify-between">
                      <span>Notifications</span>
                      <Button variant="ghost" size="sm" className="text-xs h-auto py-1">
                        Tout marquer comme lu
                      </Button>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {notifications.length > 0 ? (
                      <>
                        {notifications.map((notification) => (
                          <DropdownMenuItem 
                            key={notification.id} 
                            className={cn(
                              "flex flex-col items-start cursor-pointer p-3",
                              !notification.read && "bg-muted/50"
                            )}
                            onClick={() => markNotificationAsRead(notification.id)}
                          >
                            <div className="flex w-full justify-between">
                              <span className="font-medium">{notification.title}</span>
                              <span className="text-xs text-muted-foreground">{notification.time}</span>
                            </div>
                            <span className="text-sm text-muted-foreground mt-1">
                              {notification.description}
                            </span>
                          </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex justify-center cursor-pointer">
                          <Link to="/admin/notifications" className="text-sm text-primary">
                            Voir toutes les notifications
                          </Link>
                        </DropdownMenuItem>
                      </>
                    ) : (
                      <div className="py-4 text-center text-muted-foreground">
                        Aucune notification
                      </div>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipProvider>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887" alt="Admin" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">Caroline Dubois</p>
                      <p className="text-xs text-muted-foreground">admin@chezflora.fr</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/admin/profile">Mon profil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/admin/settings">Paramètres</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/">Voir le site</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/auth/login")}>
                    Se déconnecter
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        
        {/* Contenu de la page */}
        <main className="flex-1 p-4 sm:p-6 pt-6">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="border-t py-4 px-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} ChezFlora. Tous droits réservés.
            </p>
            <p className="text-sm text-muted-foreground">
              Version 1.0.0
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;