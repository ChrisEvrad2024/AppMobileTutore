// src/api/auth.js
import axios from 'axios';

// URL de base de l'API (à définir dans .env dans un environnement réel)
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Configurer axios pour inclure les cookies dans les requêtes
axios.defaults.withCredentials = true;

/**
 * Inscription d'un nouvel utilisateur
 * @param {Object} userData - Données d'inscription de l'utilisateur
 * @returns {Promise} Utilisateur créé et token
 */
export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, userData);

        // Stocke le token JWT dans le localStorage
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);

            // Stocke les informations de base de l'utilisateur
            localStorage.setItem('user', JSON.stringify({
                id: response.data.user.id,
                email: response.data.user.email,
                firstName: response.data.user.firstName,
                lastName: response.data.user.lastName,
                role: response.data.user.role
            }));
        }

        return response.data;
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
};

/**
 * Connexion d'un utilisateur
 * @param {Object} credentials - Identifiants de connexion (email/password)
 * @returns {Promise} Utilisateur connecté et token
 */
export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, credentials);

        // Stocke le token JWT dans le localStorage
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);

            // Stocke les informations de base de l'utilisateur
            localStorage.setItem('user', JSON.stringify({
                id: response.data.user.id,
                email: response.data.user.email,
                firstName: response.data.user.firstName,
                lastName: response.data.user.lastName,
                role: response.data.user.role
            }));
        }

        return response.data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

/**
 * Déconnexion de l'utilisateur
 * @returns {Promise} Confirmation de déconnexion
 */
export const logout = async () => {
    try {
        // Appelle l'API de déconnexion (qui invalide les sessions côté serveur)
        const response = await axios.post(`${API_URL}/auth/logout`);

        // Supprime les informations d'authentification du stockage local
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        return response.data;
    } catch (error) {
        console.error('Error during logout:', error);

        // Même en cas d'erreur, on supprime les données locales
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        throw error;
    }
};

/**
 * Vérifie si l'utilisateur est authentifié
 * @returns {boolean} État d'authentification
 */
export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token; // Convertit en booléen
};

/**
 * Récupère l'utilisateur actuellement connecté
 * @returns {Object|null} Données de l'utilisateur ou null si non connecté
 */
export const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

/**
 * Récupère un nouveau token en utilisant le refresh token
 * @returns {Promise} Nouveau token d'accès
 */
export const refreshToken = async () => {
    try {
        const response = await axios.post(`${API_URL}/auth/refresh-token`);

        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }

        return response.data;
    } catch (error) {
        console.error('Error refreshing token:', error);

        // Si erreur de rafraîchissement, déconnexion
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        throw error;
    }
};

/**
 * Demande de réinitialisation de mot de passe
 * @param {string} email - Email de l'utilisateur
 * @returns {Promise} Confirmation de l'envoi du mail
 */
export const requestPasswordReset = async (email) => {
    try {
        const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
        return response.data;
    } catch (error) {
        console.error('Error requesting password reset:', error);
        throw error;
    }
};

/**
 * Réinitialise le mot de passe avec un token
 * @param {string} token - Token de réinitialisation
 * @param {string} newPassword - Nouveau mot de passe
 * @returns {Promise} Confirmation de la réinitialisation
 */
export const resetPassword = async (token, newPassword) => {
    try {
        const response = await axios.post(`${API_URL}/auth/reset-password`, {
            token,
            newPassword
        });
        return response.data;
    } catch (error) {
        console.error('Error resetting password:', error);
        throw error;
    }
};

/**
 * Met à jour le mot de passe de l'utilisateur connecté
 * @param {string} currentPassword - Mot de passe actuel
 * @param {string} newPassword - Nouveau mot de passe
 * @returns {Promise} Confirmation de la mise à jour
 */
export const updatePassword = async (currentPassword, newPassword) => {
    try {
        const response = await axios.put(`${API_URL}/auth/password`, {
            currentPassword,
            newPassword
        });
        return response.data;
    } catch (error) {
        console.error('Error updating password:', error);
        throw error;
    }
};

/**
 * Configure un intercepteur Axios pour ajouter automatiquement le token JWT
 * aux requêtes et rafraîchir le token si nécessaire
 */
export const setupAuthInterceptors = () => {
    // Intercepteur pour les requêtes
    axios.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    // Intercepteur pour les réponses
    axios.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            // Si l'erreur est 401 (non autorisé) et qu'on n'a pas déjà essayé de rafraîchir le token
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    // Tente de rafraîchir le token
                    const { token } = await refreshToken();

                    // Met à jour le header avec le nouveau token
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    originalRequest.headers['Authorization'] = `Bearer ${token}`;

                    // Réessaie la requête originale
                    return axios(originalRequest);
                } catch (refreshError) {
                    // Si le rafraîchissement échoue, redirection vers la page de connexion
                    window.location.href = '/login';
                    return Promise.reject(refreshError);
                }
            }

            return Promise.reject(error);
        }
    );
};

// Configure les intercepteurs dès l'importation de ce module
setupAuthInterceptors();

// Export d'un objet d'API pour une utilisation plus propre
export default {
    register,
    login,
    logout,
    isAuthenticated,
    getCurrentUser,
    refreshToken,
    requestPasswordReset,
    resetPassword,
    updatePassword
};