const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const artistRoutes = require('./routes/artist.route');
const { errorMiddleware, notFoundMiddleware } = require('./middlewares/errorHandler');
const { validationMiddleware } = require('./middlewares/validationMiddleware');
const db = require('./config/database');

const initializeServer = () => {
    const app = express();

    // Middlewares de base
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Configuration des dossiers d'upload
    const uploadsDir = path.join(__dirname, 'public/uploads/artists');
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Routes statiques
    app.use('/uploads', express.static(uploadsDir));

    // Routes API
    app.use('/api/artists', artistRoutes);

    // Route de base
    app.get('/', (req, res) => {
        res.json({ message: 'Bienvenue sur l\'API Artist Manager' });
    });

    // Gestion des erreurs
    app.use(notFoundMiddleware);
    app.use(errorMiddleware);

    return app;
};

const startServer = async () => {
    try {
        const app = initializeServer();
        const PORT = process.env.PORT || 3000;

        // Test de la connexion à la base de données
        try {
            // On teste la connexion avec une simple requête
            await db.query('SELECT 1');
            console.log('Connexion à la base de données établie avec succès');
        } catch (error) {
            console.error('Erreur de connexion à la base de données:', error);
            throw error;
        }

        // Démarrage du serveur
        app.listen(PORT, () => {
            console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
            console.log(`URL de base: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Erreur lors du démarrage du serveur:', error);
        process.exit(1);
    }
};

// Gestion des erreurs non capturées
process.on('unhandledRejection', (error) => {
    console.error('Erreur non gérée:', error);
    process.exit(1);
});

process.on('uncaughtException', (error) => {
    console.error('Exception non capturée:', error);
    process.exit(1);
});

// Lancement du serveur
startServer();

module.exports = initializeServer;