// src/pages/admin/Dashboard.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Users,
  ShoppingBag,
  TrendingUp,
  Package,
  AlertTriangle,
  ChevronRight,
  DollarSign,
  Calendar,
  Clock,
  Heart,
} from 'lucide-react';

// Données simulées pour les graphiques et statistiques
const revenueData = [
  { name: 'Jan', montant: 4500 },
  { name: 'Fév', montant: 5200 },
  { name: 'Mar', montant: 4800 },
  { name: 'Avr', montant: 6000 },
  { name: 'Mai', montant: 5700 },
  { name: 'Juin', montant: 6300 },
  { name: 'Juil', montant: 7100 },
];

const productCategoryData = [
  { name: 'Fleurs fraîches', value: 35 },
  { name: 'Bouquets', value: 40 },
  { name: 'Plantes en pot', value: 15 },
  { name: 'Décorations', value: 10 },
];

const orderStatusData = [
  { name: 'En attente', value: 5 },
  { name: 'En préparation', value: 8 },
  { name: 'Expédiées', value: 12 },
  { name: 'Livrées', value: 25 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const recentOrders = [
  {
    id: 'ORD-2023-1254',
    customer: 'Sophie Martin',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961',
    amount: 89.99,
    status: 'completed',
    date: '2023-12-08T13:45:00'
  },
  {
    id: 'ORD-2023-1253',
    customer: 'Jean Dupont',
    avatar: '',
    amount: 145.50,
    status: 'processing',
    date: '2023-12-08T10:22:00'
  },
  {
    id: 'ORD-2023-1252',
    customer: 'Marie Leclerc',
    avatar: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    amount: 59.90,
    status: 'completed',
    date: '2023-12-07T16:33:00'
  },
];

const recentQuotes = [
  {
    id: 'Q-2023-089',
    customer: 'Maxime Dubois',
    avatar: '',
    event: 'Mariage',
    date: '2023-12-15',
    status: 'pending'
  },
  {
    id: 'Q-2023-088',
    customer: 'Émilie Blanc',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964',
    event: 'Anniversaire d\'entreprise',
    date: '2023-12-20',
    status: 'proposed'
  },
];

const lowStockProducts = [
  {
    id: 'P-0452',
    name: 'Roses rouges Premium',
    stock: 3,
    threshold: 5,
    image: 'https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?q=80&w=2070'
  },
  {
    id: 'P-0123',
    name: 'Vase en céramique bleu',
    stock: 2,
    threshold: 5,
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1983'
  },
];

// Formatage de la monnaie
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount);
};

// Formatage des dates
const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
};

function Dashboard() {
  const [stats, setStats] = useState({
    totalOrders: 152,
    pendingOrders: 8,
    totalRevenue: 12480,
    averageOrderValue: 82.10,
    totalCustomers: 95,
    totalQuotes: 25,
    pendingQuotes: 6,
    lowStockItemsCount: 3
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Tableau de bord</h1>
          <p className="text-muted-foreground">
            Bienvenue sur votre tableau de bord. Voici un aperçu des activités récentes et des statistiques importantes.
          </p>
        </div>
        
        {/* Cartes des statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Commandes totales
              </CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">
                +8% depuis le mois dernier
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Revenus totaux
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
              <p className="text-xs text-muted-foreground">
                +12% depuis le mois dernier
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Clients totaux
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCustomers}</div>
              <p className="text-xs text-muted-foreground">
                +3 nouveaux clients cette semaine
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Panier moyen
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(stats.averageOrderValue)}</div>
              <p className="text-xs text-muted-foreground">
                +5% depuis le mois dernier
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Graphiques */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Graphique des revenus */}
          <Card>
            <CardHeader>
              <CardTitle>Revenus mensuels</CardTitle>
              <CardDescription>
                Évolution des revenus sur les 7 derniers mois
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => formatCurrency(value)}
                      labelFormatter={(label) => `Mois: ${label}`}
                    />
                    <Bar dataKey="montant" fill="#8884d8" name="Revenus" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="ml-auto" asChild>
                <Link to="/admin/reports/revenue">Voir le rapport détaillé</Link>
              </Button>
            </CardFooter>
          </Card>
          
          {/* Graphiques circulaires */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Catégories de produits */}
            <Card>
              <CardHeader>
                <CardTitle>Répartition des ventes</CardTitle>
                <CardDescription>
                  Par catégorie de produits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={productCategoryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {productCategoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Statuts des commandes */}
            <Card>
              <CardHeader>
                <CardTitle>Statut des commandes</CardTitle>
                <CardDescription>
                  Répartition des commandes par statut
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={orderStatusData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {orderStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value} commandes`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Section des alertes */}
        <Card>
          <CardHeader className="bg-amber-50 border-b border-amber-100">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
              <CardTitle>Alertes et actions requises</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
              {/* Commandes en attente */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Commandes en attente</h3>
                  <Badge variant="outline">{stats.pendingOrders}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Commandes nécessitant votre attention
                </p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/admin/orders?status=pending">
                    Voir les commandes
                  </Link>
                </Button>
              </div>
              
              {/* Devis en attente */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Devis à traiter</h3>
                  <Badge variant="outline">{stats.pendingQuotes}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Demandes de devis nécessitant une réponse
                </p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/admin/quotes?status=pending">
                    Voir les devis
                  </Link>
                </Button>
              </div>
              
              {/* Produits en stock faible */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Stock faible</h3>
                  <Badge variant="outline">{stats.lowStockItemsCount}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Produits nécessitant un réapprovisionnement
                </p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/admin/products/low-stock">
                    Voir les produits
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Commandes récentes et devis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Commandes récentes */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Commandes récentes</CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/admin/orders">
                    Voir toutes
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={order.avatar} alt={order.customer} />
                      <AvatarFallback>{order.customer.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{order.customer}</p>
                        <Badge variant={
                          order.status === 'completed' ? 'default' : 
                          order.status === 'processing' ? 'secondary' : 
                          'outline'
                        }>
                          {order.status === 'completed' ? 'Terminée' : 
                           order.status === 'processing' ? 'En cours' : 
                           'En attente'}
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>{order.id}</span>
                        <span className="mx-2">•</span>
                        <span>{formatCurrency(order.amount)}</span>
                        <span className="mx-2">•</span>
                        <span>{formatDate(order.date)}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" asChild>
                      <Link to={`/admin/orders/${order.id}`}>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Demandes de devis récentes */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Demandes de devis récentes</CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/admin/quotes">
                    Voir toutes
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentQuotes.map((quote) => (
                  <div key={quote.id} className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={quote.avatar} alt={quote.customer} />
                      <AvatarFallback>{quote.customer.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{quote.customer}</p>
                        <Badge variant={
                          quote.status === 'accepted' ? 'default' : 
                          quote.status === 'proposed' ? 'secondary' : 
                          'outline'
                        }>
                          {quote.status === 'accepted' ? 'Accepté' : 
                           quote.status === 'proposed' ? 'Proposé' : 
                           'En attente'}
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>{quote.id}</span>
                        <span className="mx-2">•</span>
                        <span>{quote.event}</span>
                        <span className="mx-2">•</span>
                        <span>Pour le {formatDate(quote.date)}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" asChild>
                      <Link to={`/admin/quotes/${quote.id}`}>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Produits à stock faible */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Produits à stock faible</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link to="/admin/products/low-stock">
                  Voir tous
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockProducts.map((product) => (
                <div key={product.id} className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-muted rounded-md overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium truncate">{product.name}</p>
                      <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                        Stock: {product.stock}/{product.threshold}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">ID: {product.id}</p>
                  </div>
                  <Button variant="ghost" size="icon" asChild>
                    <Link to={`/admin/products/${product.id}/edit`}>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

// Export explicite du composant
export default Dashboard;