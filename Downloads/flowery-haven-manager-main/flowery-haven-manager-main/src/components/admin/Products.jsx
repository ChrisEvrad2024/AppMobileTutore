import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  Eye,
  ArrowUpDown,
  Package,
} from "lucide-react";
import { toast } from "sonner";

// Données de test pour les produits
const mockProducts = [
  {
    id: "P-0452",
    name: "Roses rouges Premium",
    category: "Fleurs fraîches",
    price: 59.99,
    stock: 24,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?q=80&w=2070",
  },
  {
    id: "P-0123",
    name: "Bouquet Élégance Rose",
    category: "Bouquets",
    price: 74.9,
    stock: 15,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1537530360953-3b8b369e01fe?q=80&w=2070",
  },
  {
    id: "P-0789",
    name: "Orchidée blanche",
    category: "Plantes en pot",
    price: 39.99,
    stock: 8,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1566907225472-1cd367274e73?q=80&w=1887",
  },
  {
    id: "P-0234",
    name: "Vase en céramique bleu",
    category: "Accessoires",
    price: 29.99,
    stock: 12,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1983",
  },
  {
    id: "P-0567",
    name: "Tulipes multicolores",
    category: "Fleurs fraîches",
    price: 44.9,
    stock: 18,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1554631435-93f416e5b7d7?q=80&w=1974",
  },
  {
    id: "P-0890",
    name: "Bouquet Champêtre",
    category: "Bouquets",
    price: 64.5,
    stock: 10,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1613539246066-78db6f03a16f?q=80&w=1974",
  },
  {
    id: "P-0901",
    name: "Pot en terre cuite",
    category: "Accessoires",
    price: 19.99,
    stock: 30,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=2072",
  },
  {
    id: "P-1023",
    name: "Bouquet Anniversaire",
    category: "Bouquets",
    price: 54.9,
    stock: 0,
    status: "out_of_stock",
    image:
      "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=1980",
  },
  {
    id: "P-1045",
    name: "Cactus décoratif",
    category: "Plantes en pot",
    price: 24.99,
    stock: 7,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=2074",
  },
  {
    id: "P-1067",
    name: "Chrysanthèmes colorés",
    category: "Fleurs fraîches",
    price: 49.9,
    stock: 0,
    status: "draft",
    image:
      "https://images.unsplash.com/photo-1508610048659-a06b669e3321?q=80&w=2070",
  },
];

// Formatage des prix pour l'affichage
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [sortConfig, setSortConfig] = useState({
    field: "name",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Chargement initial des produits
  useEffect(() => {
    // Dans une application réelle, nous chargerions les données depuis l'API
    // getProducts().then(data => setProducts(data));
    setProducts(mockProducts);
  }, []);

  // Filtrage et tri des produits
  useEffect(() => {
    let result = [...products];

    // Filtrage par recherche
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(lowerCaseQuery) ||
          product.id.toLowerCase().includes(lowerCaseQuery)
      );
    }

    // Filtrage par catégorie
    if (selectedCategory) {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filtrage par statut
    if (selectedStatus) {
      result = result.filter((product) => product.status === selectedStatus);
    }

    // Tri
    result.sort((a, b) => {
      const aValue = a[sortConfig.field];
      const bValue = b[sortConfig.field];

      if (typeof aValue === "string") {
        if (sortConfig.direction === "asc") {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      } else {
        if (sortConfig.direction === "asc") {
          return aValue - bValue;
        } else {
          return bValue - aValue;
        }
      }
    });

    setFilteredProducts(result);
  }, [products, searchQuery, selectedCategory, selectedStatus, sortConfig]);

  // Gestion du tri
  const handleSort = (field) => {
    setSortConfig((prevConfig) => ({
      field,
      direction:
        prevConfig.field === field && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  // Gestion de la pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Gestion de la suppression d'un produit
  const handleDelete = () => {
    if (productToDelete) {
      // Dans une application réelle, nous appellerions l'API
      // deleteProduct(productToDelete.id).then(() => {
      //   setProducts(products.filter(product => product.id !== productToDelete.id));
      //   toast.success(`Le produit ${productToDelete.name} a été supprimé`);
      // });

      // Simulation
      setProducts(
        products.filter((product) => product.id !== productToDelete.id)
      );
      toast.success(`Le produit ${productToDelete.name} a été supprimé`);
      setProductToDelete(null);
    }
  };

  // Réinitialiser les filtres
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedStatus("");
    setSortConfig({ field: "name", direction: "asc" });
    setCurrentPage(1);
  };

  // Extraire les catégories uniques
  const categories = [...new Set(products.map((product) => product.category))];

  // Obtenir le statut formaté pour l'affichage
  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            Actif
          </Badge>
        );
      case "out_of_stock":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
            Rupture
          </Badge>
        );
      case "draft":
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
            Brouillon
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Produits</h1>
            <p className="text-muted-foreground">
              Gérez votre catalogue de produits, ajoutez de nouveaux articles et
              mettez à jour les stocks.
            </p>
          </div>
          <Button asChild>
            <Link to="/admin/products/new">
              <Plus className="mr-2 h-4 w-4" /> Ajouter un produit
            </Link>
          </Button>
        </div>

        {/* Filtres et recherche */}
        <Card>
          <CardHeader className="p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher un produit..."
                  className="pl-8 w-full sm:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Toutes les catégories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tous les statuts</SelectItem>
                    <SelectItem value="active">Actif</SelectItem>
                    <SelectItem value="out_of_stock">
                      Rupture de stock
                    </SelectItem>
                    <SelectItem value="draft">Brouillon</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  onClick={resetFilters}
                  className="hidden sm:flex"
                >
                  Réinitialiser
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Liste des produits */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("id")}
                  >
                    <div className="flex items-center">
                      ID
                      <ArrowUpDown className="h-4 w-4 ml-1" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("name")}
                  >
                    <div className="flex items-center">
                      Nom
                      <ArrowUpDown className="h-4 w-4 ml-1" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("category")}
                  >
                    <div className="flex items-center">
                      Catégorie
                      <ArrowUpDown className="h-4 w-4 ml-1" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer text-right"
                    onClick={() => handleSort("price")}
                  >
                    <div className="flex items-center justify-end">
                      Prix
                      <ArrowUpDown className="h-4 w-4 ml-1" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer text-right"
                    onClick={() => handleSort("stock")}
                  >
                    <div className="flex items-center justify-end">
                      Stock
                      <ArrowUpDown className="h-4 w-4 ml-1" />
                    </div>
                  </TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.length > 0 ? (
                  currentItems.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="w-10 h-10 rounded-md overflow-hidden bg-muted">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {product.id}
                      </TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(product.price)}
                      </TableCell>
                      <TableCell className="text-right">
                        {product.stock === 0 ? (
                          <span className="text-red-500">Rupture</span>
                        ) : (
                          product.stock
                        )}
                      </TableCell>
                      <TableCell>{getStatusBadge(product.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                              <Link
                                to={`/product/${product.id}`}
                                target="_blank"
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                Voir
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to={`/admin/products/${product.id}/edit`}>
                                <Edit className="h-4 w-4 mr-2" />
                                Modifier
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link
                                to={`/admin/products/new?duplicate=${product.id}`}
                              >
                                <Copy className="h-4 w-4 mr-2" />
                                Dupliquer
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600 focus:text-red-600"
                              onClick={() => setProductToDelete(product)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <Package className="h-12 w-12 text-muted-foreground opacity-30" />
                        <h3 className="font-medium text-lg">
                          Aucun produit trouvé
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {searchQuery || selectedCategory || selectedStatus ? (
                            <>
                              Aucun produit ne correspond à vos critères de
                              recherche.{" "}
                              <Button
                                variant="link"
                                onClick={resetFilters}
                                className="p-0 h-auto"
                              >
                                Réinitialiser les filtres
                              </Button>
                            </>
                          ) : (
                            "Commencez par ajouter un produit à votre catalogue."
                          )}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Affichage de {indexOfFirstItem + 1}-
              {Math.min(indexOfLastItem, filteredProducts.length)} sur{" "}
              {filteredProducts.length} produits
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1}
                  />
                </PaginationItem>
                {Array.from({ length: Math.min(totalPages, 5) }).map(
                  (_, index) => {
                    // For more than 5 pages, show first, last, current, and one on each side of current
                    let pageToShow;
                    if (totalPages <= 5) {
                      pageToShow = index + 1;
                    } else if (currentPage <= 3) {
                      pageToShow = index + 1;
                      if (index === 4) pageToShow = totalPages;
                    } else if (currentPage >= totalPages - 2) {
                      pageToShow = totalPages - 4 + index;
                      if (index === 0) pageToShow = 1;
                    } else {
                      pageToShow = currentPage - 2 + index;
                      if (index === 0) pageToShow = 1;
                      if (index === 4) pageToShow = totalPages;
                    }

                    return (
                      <PaginationItem key={pageToShow}>
                        <PaginationLink
                          isActive={currentPage === pageToShow}
                          onClick={() => setCurrentPage(pageToShow)}
                        >
                          {pageToShow}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }
                )}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                    }
                    disabled={currentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>

      {/* Boîte de dialogue de confirmation de suppression */}
      <AlertDialog
        open={!!productToDelete}
        onOpenChange={(open) => !open && setProductToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer le produit{" "}
              <strong>{productToDelete?.name}</strong> ? Cette action est
              irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default Products;
