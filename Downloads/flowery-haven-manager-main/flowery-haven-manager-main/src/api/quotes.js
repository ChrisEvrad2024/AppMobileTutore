// src/api/quotes.js
import axios from 'axios';

// URL de base de l'API (à définir dans .env dans un environnement réel)
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

/**
 * Récupère toutes les demandes de devis de l'utilisateur connecté
 * @param {Object} params - Paramètres de requête (filtres, pagination)
 * @returns {Promise} Liste des demandes de devis
 */
export const getMyQuotes = async (params = {}) => {
    try {
        const response = await axios.get(`${API_URL}/quotes/me`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching user quotes:', error);
        throw error;
    }
};

/**
 * Récupère une demande de devis spécifique par son ID
 * @param {string} id - ID de la demande de devis
 * @returns {Promise} Détails de la demande de devis
 */
export const getQuoteById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/quotes/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching quote ${id}:`, error);
        throw error;
    }
};

/**
 * Crée une nouvelle demande de devis
 * @param {Object} quoteData - Données de la demande de devis
 * @returns {Promise} Demande de devis créée
 */
export const createQuote = async (quoteData) => {
    try {
        const response = await axios.post(`${API_URL}/quotes`, quoteData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Si des images sont téléchargées
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating quote request:', error);
        throw error;
    }
};

/**
 * Met à jour une demande de devis existante (si autorisé)
 * @param {string} id - ID de la demande de devis
 * @param {Object} quoteData - Nouvelles données
 * @returns {Promise} Demande de devis mise à jour
 */
export const updateQuote = async (id, quoteData) => {
    try {
        const response = await axios.put(`${API_URL}/quotes/${id}`, quoteData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Si des images sont téléchargées
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error updating quote ${id}:`, error);
        throw error;
    }
};

/**
 * Annule une demande de devis
 * @param {string} id - ID de la demande de devis
 * @param {string} reason - Raison de l'annulation
 * @returns {Promise} Confirmation de l'annulation
 */
export const cancelQuote = async (id, reason = '') => {
    try {
        const response = await axios.post(`${API_URL}/quotes/${id}/cancel`, { reason });
        return response.data;
    } catch (error) {
        console.error(`Error canceling quote ${id}:`, error);
        throw error;
    }
};

/**
 * Accepte un devis proposé
 * @param {string} id - ID de la demande de devis
 * @returns {Promise} Confirmation de l'acceptation
 */
export const acceptQuote = async (id) => {
    try {
        const response = await axios.post(`${API_URL}/quotes/${id}/accept`);
        return response.data;
    } catch (error) {
        console.error(`Error accepting quote ${id}:`, error);
        throw error;
    }
};

/**
 * Rejette un devis proposé
 * @param {string} id - ID de la demande de devis
 * @param {string} reason - Raison du rejet
 * @returns {Promise} Confirmation du rejet
 */
export const rejectQuote = async (id, reason = '') => {
    try {
        const response = await axios.post(`${API_URL}/quotes/${id}/reject`, { reason });
        return response.data;
    } catch (error) {
        console.error(`Error rejecting quote ${id}:`, error);
        throw error;
    }
};

/**
 * Propose un prix pour la demande de devis (admin seulement)
 * @param {string} id - ID de la demande de devis
 * @param {number} price - Prix proposé
 * @param {Object} details - Détails additionnels du devis
 * @returns {Promise} Devis mis à jour
 */
export const proposeQuotePrice = async (id, price, details = {}) => {
    try {
        const response = await axios.post(`${API_URL}/quotes/${id}/price`, { price, ...details });
        return response.data;
    } catch (error) {
        console.error(`Error proposing price for quote ${id}:`, error);
        throw error;
    }
};

/**
 * Récupère toutes les demandes de devis (admin seulement)
 * @param {Object} params - Paramètres de filtrage et pagination
 * @returns {Promise} Liste des demandes de devis
 */
export const getAllQuotes = async (params = {}) => {
    try {
        const response = await axios.get(`${API_URL}/quotes`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching all quotes:', error);
        throw error;
    }
};

/**
 * Récupère les demandes de devis récentes (admin seulement)
 * @param {number} limit - Nombre de demandes à récupérer
 * @returns {Promise} Liste des demandes récentes
 */
export const getRecentQuotes = async (limit = 10) => {
    try {
        const response = await axios.get(`${API_URL}/quotes/recent`, { params: { limit } });
        return response.data;
    } catch (error) {
        console.error('Error fetching recent quotes:', error);
        throw error;
    }
};

/**
 * Récupère les statistiques des demandes de devis (admin seulement)
 * @param {Object} params - Paramètres de filtrage (période, etc.)
 * @returns {Promise} Statistiques des demandes
 */
export const getQuotesStats = async (params = {}) => {
    try {
        const response = await axios.get(`${API_URL}/quotes/stats`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching quote statistics:', error);
        throw error;
    }
};

/**
 * Ajoute une note ou un commentaire à une demande de devis
 * @param {string} quoteId - ID de la demande de devis
 * @param {string} note - Contenu de la note
 * @param {boolean} isPrivate - Indique si la note est privée (visible uniquement par l'admin)
 * @returns {Promise} Demande mise à jour
 */
export const addQuoteNote = async (quoteId, note, isPrivate = false) => {
    try {
        const response = await axios.post(`${API_URL}/quotes/${quoteId}/notes`, { note, isPrivate });
        return response.data;
    } catch (error) {
        console.error(`Error adding note to quote ${quoteId}:`, error);
        throw error;
    }
};

/**
 * Convertit un devis accepté en commande
 * @param {string} quoteId - ID de la demande de devis
 * @returns {Promise} Détails de la commande créée
 */
export const convertQuoteToOrder = async (quoteId) => {
    try {
        const response = await axios.post(`${API_URL}/quotes/${quoteId}/convert-to-order`);
        return response.data;
    } catch (error) {
        console.error(`Error converting quote ${quoteId} to order:`, error);
        throw error;
    }
};

/**
 * Met à jour le statut d'une demande de devis (admin seulement)
 * @param {string} id - ID de la demande
 * @param {string} status - Nouveau statut
 * @param {string} notes - Notes additionnelles
 * @returns {Promise} Demande mise à jour
 */
export const updateQuoteStatus = async (id, status, notes = '') => {
    try {
        const response = await axios.put(`${API_URL}/quotes/${id}/status`, { status, notes });
        return response.data;
    } catch (error) {
        console.error(`Error updating status for quote ${id}:`, error);
        throw error;
    }
};

/**
 * Envoie une notification à l'utilisateur concernant sa demande de devis
 * @param {string} quoteId - ID de la demande
 * @param {Object} notificationData - Données de la notification
 * @returns {Promise} Résultat de l'envoi
 */
export const sendQuoteNotification = async (quoteId, notificationData) => {
    try {
        const response = await axios.post(`${API_URL}/quotes/${quoteId}/notify`, notificationData);
        return response.data;
    } catch (error) {
        console.error(`Error sending notification for quote ${quoteId}:`, error);
        throw error;
    }
};

// Export d'un objet d'API pour une utilisation plus propre
export default {
    // Fonctions accessibles aux clients
    getMyQuotes,
    getQuoteById,
    createQuote,
    updateQuote,
    cancelQuote,
    acceptQuote,
    rejectQuote,

    // Fonctions administratives
    getAllQuotes,
    getRecentQuotes,
    getQuotesStats,
    proposeQuotePrice,
    addQuoteNote,
    convertQuoteToOrder,
    updateQuoteStatus,
    sendQuoteNotification
};