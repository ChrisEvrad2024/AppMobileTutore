// src/api/products.js
import axios from 'axios';

// URL de base de l'API (à définir dans .env dans un environnement réel)
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

/**
 * Récupère tous les produits
 * @param {Object} params - Paramètres de requête (filtres, tri, pagination)
 * @returns {Promise} Liste des produits
 */
export const getProducts = async (params = {}) => {
    try {
        const response = await axios.get(`${API_URL}/products`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

/**
 * Récupère un produit par son ID
 * @param {string} id - ID du produit
 * @returns {Promise} Données du produit
 */
export const getProductById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/products/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product with ID ${id}:`, error);
        throw error;
    }
};

/**
 * Récupère les produits par catégorie
 * @param {string} categoryId - ID de la catégorie
 * @param {Object} params - Paramètres de requête supplémentaires
 * @returns {Promise} Liste des produits dans la catégorie
 */
export const getProductsByCategory = async (categoryId, params = {}) => {
    try {
        const response = await axios.get(`${API_URL}/categories/${categoryId}/products`, { params });
        return response.data;
    } catch (error) {
        console.error(`Error fetching products for category ${categoryId}:`, error);
        throw error;
    }
};

/**
 * Récupère les produits populaires/mis en avant
 * @param {number} limit - Nombre de produits à récupérer
 * @returns {Promise} Liste des produits populaires
 */
export const getPopularProducts = async (limit = 8) => {
    try {
        const response = await axios.get(`${API_URL}/products/popular`, { params: { limit } });
        return response.data;
    } catch (error) {
        console.error('Error fetching popular products:', error);
        throw error;
    }
};

/**
 * Ajoute un nouveau produit
 * @param {Object} productData - Données du produit à ajouter
 * @returns {Promise} Produit créé
 */
export const createProduct = async (productData) => {
    try {
        const response = await axios.post(`${API_URL}/products`, productData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Si des images sont téléchargées
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};

/**
 * Met à jour un produit existant
 * @param {string} id - ID du produit
 * @param {Object} productData - Nouvelles données du produit
 * @returns {Promise} Produit mis à jour
 */
export const updateProduct = async (id, productData) => {
    try {
        const response = await axios.put(`${API_URL}/products/${id}`, productData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Si des images sont téléchargées
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error updating product with ID ${id}:`, error);
        throw error;
    }
};

/**
 * Supprime un produit
 * @param {string} id - ID du produit à supprimer
 * @returns {Promise} Réponse de suppression
 */
export const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/products/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting product with ID ${id}:`, error);
        throw error;
    }
};

/**
 * Recherche des produits
 * @param {string} query - Terme de recherche
 * @param {Object} params - Paramètres additionnels (filtres, pagination)
 * @returns {Promise} Résultats de recherche
 */
export const searchProducts = async (query, params = {}) => {
    try {
        const response = await axios.get(`${API_URL}/products/search`, {
            params: {
                q: query,
                ...params
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error searching products:', error);
        throw error;
    }
};

/**
 * Récupère les produits récemment consultés (via un cookie ou le localStorage)
 * @param {number} limit - Nombre de produits à récupérer
 * @returns {Promise} Liste des produits récemment consultés
 */
export const getRecentlyViewedProducts = async (limit = 4) => {
    // Récupère les IDs stockés localement
    const recentlyViewedIds = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');

    if (recentlyViewedIds.length === 0) {
        return [];
    }

    try {
        // Récupère les détails complets des produits à partir des IDs
        const response = await axios.post(`${API_URL}/products/batch`, {
            ids: recentlyViewedIds.slice(0, limit)
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching recently viewed products:', error);
        throw error;
    }
};

/**
 * Ajoute un produit à la liste des produits récemment consultés
 * @param {string} productId - ID du produit consulté
 * @param {number} maxItems - Nombre maximum d'éléments à conserver
 */
export const addToRecentlyViewed = (productId, maxItems = 8) => {
    try {
        // Récupère la liste actuelle
        let recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');

        // Supprime le produit s'il existe déjà (pour le remettre en tête de liste)
        recentlyViewed = recentlyViewed.filter(id => id !== productId);

        // Ajoute le produit au début de la liste
        recentlyViewed.unshift(productId);

        // Limite le nombre d'éléments
        if (recentlyViewed.length > maxItems) {
            recentlyViewed = recentlyViewed.slice(0, maxItems);
        }

        // Sauvegarde la liste mise à jour
        localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
    } catch (error) {
        console.error('Error updating recently viewed products:', error);
    }
};

/**
 * Met à jour le stock d'un produit
 * @param {string} id - ID du produit
 * @param {number} quantity - Nouvelle quantité en stock
 * @returns {Promise} Réponse de la mise à jour
 */
export const updateProductStock = async (id, quantity) => {
    try {
        const response = await axios.patch(`${API_URL}/products/${id}/stock`, { quantity });
        return response.data;
    } catch (error) {
        console.error(`Error updating stock for product ${id}:`, error);
        throw error;
    }
};

/**
 * Récupère les produits avec un stock faible (pour les alertes d'admin)
 * @param {number} threshold - Seuil en dessous duquel un stock est considéré comme faible
 * @returns {Promise} Liste des produits à stock faible
 */
export const getLowStockProducts = async (threshold = 5) => {
    try {
        const response = await axios.get(`${API_URL}/products/low-stock`, {
            params: { threshold }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching low stock products:', error);
        throw error;
    }
};

/**
 * Ajoute ou met à jour des produits en masse (import)
 * @param {Array} products - Liste des produits à importer
 * @returns {Promise} Résultat de l'import
 */
export const bulkImportProducts = async (products) => {
    try {
        const response = await axios.post(`${API_URL}/products/bulk-import`, { products });
        return response.data;
    } catch (error) {
        console.error('Error importing products:', error);
        throw error;
    }
};

/**
 * Met à jour la visibilité d'un produit (publié/non publié)
 * @param {string} id - ID du produit
 * @param {boolean} isVisible - État de visibilité
 * @returns {Promise} Réponse de la mise à jour
 */
export const updateProductVisibility = async (id, isVisible) => {
    try {
        const response = await axios.patch(`${API_URL}/products/${id}/visibility`, { isVisible });
        return response.data;
    } catch (error) {
        console.error(`Error updating visibility for product ${id}:`, error);
        throw error;
    }
};

/**
 * Récupère les produits liés/recommandés pour un produit spécifique
 * @param {string} productId - ID du produit
 * @param {number} limit - Nombre de produits à récupérer
 * @returns {Promise} Liste des produits recommandés
 */
export const getRelatedProducts = async (productId, limit = 4) => {
    try {
        const response = await axios.get(`${API_URL}/products/${productId}/related`, {
            params: { limit }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching related products for ${productId}:`, error);
        throw error;
    }
};

// Export d'un objet d'API pour une utilisation plus propre
export default {
    getProducts,
    getProductById,
    getProductsByCategory,
    getPopularProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    getRecentlyViewedProducts,
    addToRecentlyViewed,
    updateProductStock,
    getLowStockProducts,
    bulkImportProducts,
    updateProductVisibility,
    getRelatedProducts
};