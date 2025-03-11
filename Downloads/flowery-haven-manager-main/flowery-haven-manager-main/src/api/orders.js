// src/api/orders.js
import axios from 'axios';

// URL de base de l'API (à définir dans .env dans un environnement réel)
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

/**
 * Récupère toutes les commandes de l'utilisateur connecté
 * @param {Object} params - Paramètres de requête (filtre, pagination)
 * @returns {Promise} Liste des commandes
 */
export const getMyOrders = async (params = {}) => {
    try {
        const response = await axios.get(`${API_URL}/orders/me`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching user orders:', error);
        throw error;
    }
};

/**
 * Récupère une commande spécifique par son ID
 * @param {string} id - ID de la commande
 * @returns {Promise} Détails de la commande
 */
export const getOrderById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/orders/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching order ${id}:`, error);
        throw error;
    }
};

/**
 * Crée une nouvelle commande
 * @param {Object} orderData - Données de la commande (produits, adresses, etc.)
 * @returns {Promise} Commande créée
 */
export const createOrder = async (orderData) => {
    try {
        const response = await axios.post(`${API_URL}/orders`, orderData);
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

/**
 * Annule une commande
 * @param {string} id - ID de la commande
 * @param {string} reason - Raison de l'annulation
 * @returns {Promise} Confirmation de l'annulation
 */
export const cancelOrder = async (id, reason = '') => {
    try {
        const response = await axios.post(`${API_URL}/orders/${id}/cancel`, { reason });
        return response.data;
    } catch (error) {
        console.error(`Error canceling order ${id}:`, error);
        throw error;
    }
};

/**
 * Met à jour le statut d'une commande (admin uniquement)
 * @param {string} id - ID de la commande
 * @param {string} status - Nouveau statut
 * @param {string} notes - Notes additionnelles
 * @returns {Promise} Commande mise à jour
 */
export const updateOrderStatus = async (id, status, notes = '') => {
    try {
        const response = await axios.put(`${API_URL}/orders/${id}/status`, { status, notes });
        return response.data;
    } catch (error) {
        console.error(`Error updating status for order ${id}:`, error);
        throw error;
    }
};

/**
 * Récupère toutes les commandes (admin uniquement)
 * @param {Object} params - Paramètres de filtrage et pagination
 * @returns {Promise} Liste des commandes
 */
export const getAllOrders = async (params = {}) => {
    try {
        const response = await axios.get(`${API_URL}/orders`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching all orders:', error);
        throw error;
    }
};

/**
 * Récupère les statistiques des commandes (admin uniquement)
 * @param {Object} params - Paramètres de filtrage (période, etc.)
 * @returns {Promise} Statistiques des commandes
 */
export const getOrdersStats = async (params = {}) => {
    try {
        const response = await axios.get(`${API_URL}/orders/stats`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching order statistics:', error);
        throw error;
    }
};

/**
 * Ajoute un produit à la commande existante (si autorisé)
 * @param {string} orderId - ID de la commande
 * @param {Object} productData - Produit à ajouter
 * @returns {Promise} Commande mise à jour
 */
export const addProductToOrder = async (orderId, productData) => {
    try {
        const response = await axios.post(`${API_URL}/orders/${orderId}/items`, productData);
        return response.data;
    } catch (error) {
        console.error(`Error adding product to order ${orderId}:`, error);
        throw error;
    }
};

/**
 * Supprime un produit d'une commande existante (si autorisé)
 * @param {string} orderId - ID de la commande
 * @param {string} itemId - ID de l'élément à supprimer
 * @returns {Promise} Commande mise à jour
 */
export const removeProductFromOrder = async (orderId, itemId) => {
    try {
        const response = await axios.delete(`${API_URL}/orders/${orderId}/items/${itemId}`);
        return response.data;
    } catch (error) {
        console.error(`Error removing product from order ${orderId}:`, error);
        throw error;
    }
};

/**
 * Met à jour la quantité d'un produit dans une commande
 * @param {string} orderId - ID de la commande
 * @param {string} itemId - ID de l'élément à mettre à jour
 * @param {number} quantity - Nouvelle quantité
 * @returns {Promise} Commande mise à jour
 */
export const updateOrderItemQuantity = async (orderId, itemId, quantity) => {
    try {
        const response = await axios.put(`${API_URL}/orders/${orderId}/items/${itemId}`, { quantity });
        return response.data;
    } catch (error) {
        console.error(`Error updating item quantity in order ${orderId}:`, error);
        throw error;
    }
};

/**
 * Ajoute une note ou un commentaire à une commande
 * @param {string} orderId - ID de la commande
 * @param {string} note - Contenu de la note
 * @returns {Promise} Commande mise à jour
 */
export const addOrderNote = async (orderId, note) => {
    try {
        const response = await axios.post(`${API_URL}/orders/${orderId}/notes`, { note });
        return response.data;
    } catch (error) {
        console.error(`Error adding note to order ${orderId}:`, error);
        throw error;
    }
};

/**
 * Récupère les commandes récentes (admin uniquement)
 * @param {number} limit - Nombre de commandes à récupérer
 * @returns {Promise} Liste des commandes récentes
 */
export const getRecentOrders = async (limit = 10) => {
    try {
        const response = await axios.get(`${API_URL}/orders/recent`, { params: { limit } });
        return response.data;
    } catch (error) {
        console.error('Error fetching recent orders:', error);
        throw error;
    }
};

/**
 * Génère la facture PDF pour une commande
 * @param {string} orderId - ID de la commande
 * @returns {Promise} URL de téléchargement de la facture ou le Blob PDF
 */
export const generateInvoice = async (orderId) => {
    try {
        const response = await axios.get(`${API_URL}/orders/${orderId}/invoice`, {
            responseType: 'blob' // Important pour recevoir un PDF
        });
        return response.data;
    } catch (error) {
        console.error(`Error generating invoice for order ${orderId}:`, error);
        throw error;
    }
};

// Fonctions pour la gestion du panier

/**
 * Récupère le contenu du panier actuel
 * @returns {Promise} Contenu du panier
 */
export const getCart = async () => {
    try {
        const response = await axios.get(`${API_URL}/cart`);
        return response.data;
    } catch (error) {
        console.error('Error fetching cart:', error);
        throw error;
    }
};

/**
 * Ajoute un produit au panier
 * @param {string} productId - ID du produit
 * @param {number} quantity - Quantité à ajouter
 * @param {Object} customizations - Options de personnalisation (si applicable)
 * @returns {Promise} Panier mis à jour
 */
export const addToCart = async (productId, quantity = 1, customizations = {}) => {
    try {
        const response = await axios.post(`${API_URL}/cart/items`, {
            productId,
            quantity,
            customizations
        });
        return response.data;
    } catch (error) {
        console.error(`Error adding product ${productId} to cart:`, error);
        throw error;
    }
};

/**
 * Met à jour la quantité d'un produit dans le panier
 * @param {string} itemId - ID de l'élément du panier
 * @param {number} quantity - Nouvelle quantité
 * @returns {Promise} Panier mis à jour
 */
export const updateCartItemQuantity = async (itemId, quantity) => {
    try {
        const response = await axios.put(`${API_URL}/cart/items/${itemId}`, { quantity });
        return response.data;
    } catch (error) {
        console.error(`Error updating cart item ${itemId}:`, error);
        throw error;
    }
};

/**
 * Supprime un produit du panier
 * @param {string} itemId - ID de l'élément à supprimer
 * @returns {Promise} Panier mis à jour
 */
export const removeFromCart = async (itemId) => {
    try {
        const response = await axios.delete(`${API_URL}/cart/items/${itemId}`);
        return response.data;
    } catch (error) {
        console.error(`Error removing item ${itemId} from cart:`, error);
        throw error;
    }
};

/**
 * Vide entièrement le panier
 * @returns {Promise} Confirmation du panier vidé
 */
export const clearCart = async () => {
    try {
        const response = await axios.delete(`${API_URL}/cart`);
        return response.data;
    } catch (error) {
        console.error('Error clearing cart:', error);
        throw error;
    }
};

/**
 * Applique un code promo au panier
 * @param {string} code - Code promotionnel
 * @returns {Promise} Panier mis à jour avec la réduction
 */
export const applyPromoCode = async (code) => {
    try {
        const response = await axios.post(`${API_URL}/cart/promo`, { code });
        return response.data;
    } catch (error) {
        console.error(`Error applying promo code ${code}:`, error);
        throw error;
    }
};

/**
 * Retire un code promo du panier
 * @returns {Promise} Panier mis à jour sans la réduction
 */
export const removePromoCode = async () => {
    try {
        const response = await axios.delete(`${API_URL}/cart/promo`);
        return response.data;
    } catch (error) {
        console.error('Error removing promo code:', error);
        throw error;
    }
};

/**
 * Vérifie la disponibilité des produits du panier
 * @returns {Promise} Statut de disponibilité des produits
 */
export const checkCartItemsAvailability = async () => {
    try {
        const response = await axios.get(`${API_URL}/cart/check-availability`);
        return response.data;
    } catch (error) {
        console.error('Error checking cart items availability:', error);
        throw error;
    }
};

/**
 * Procède au checkout du panier
 * @param {Object} checkoutData - Données de paiement et de livraison
 * @returns {Promise} Résultat du checkout et ID de commande
 */
export const checkout = async (checkoutData) => {
    try {
        const response = await axios.post(`${API_URL}/cart/checkout`, checkoutData);
        return response.data;
    } catch (error) {
        console.error('Error during checkout:', error);
        throw error;
    }
};

// Export d'un objet d'API pour une utilisation plus propre
export default {
    // Fonctions relatives aux commandes
    getMyOrders,
    getOrderById,
    createOrder,
    cancelOrder,
    updateOrderStatus,
    getAllOrders,
    getOrdersStats,
    addProductToOrder,
    removeProductFromOrder,
    updateOrderItemQuantity,
    addOrderNote,
    getRecentOrders,
    generateInvoice,

    // Fonctions relatives au panier
    getCart,
    addToCart,
    updateCartItemQuantity,
    removeFromCart,
    clearCart,
    applyPromoCode,
    removePromoCode,
    checkCartItemsAvailability,
    checkout
};