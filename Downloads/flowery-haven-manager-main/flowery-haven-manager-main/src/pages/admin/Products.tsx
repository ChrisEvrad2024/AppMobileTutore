// src/pages/admin/Products.tsx
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  Eye,
  ArrowUpDown,
  Package,
  ChevronLeft,
  ChevronRight,
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
  const [itemsPerPage] = useState(10);
  const [productToDelete, setProductToDelete] = useState(null);

  // Chargement initial des produits
  useEffect(() => {
    // Dans une application réelle, nous chargerions les données depuis l'API
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
};
export default Products;
