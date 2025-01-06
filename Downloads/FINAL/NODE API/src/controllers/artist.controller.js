const fs = require('fs').promises;
const path = require('path');
const Artist = require('../models/artist.model');

// Fonction utilitaire pour gérer la suppression des fichiers
const removeFile = async (filePath) => {
    try {
        await fs.unlink(filePath);
    } catch (err) {
        console.error('Error removing file:', err);
    }
};

// Create a new artist entry
// controllers/artist.controller.js
exports.createArtist = async (req, res) => {
    console.log('Début de la création d\'artiste');
    try {
        // Log des données reçues
        console.log('Données reçues:', {
            body: req.body,
            file: req.file
        });

        // Vérification des données requises
        if (!req.body.name || !req.body.stageName) {
            console.log('Données manquantes');
            return res.status(400).json({
                status: 'error',
                message: 'Le nom et le nom de scène sont requis'
            });
        }

        // Gestion flexible des réseaux sociaux
        let socialNetworks = [];
        if (req.body.socialNetworks) {
            try {
                // Essayer d'abord de parser comme JSON
                socialNetworks = JSON.parse(req.body.socialNetworks);
            } catch (e) {
                // Si ce n'est pas du JSON valide, traiter comme une seule URL
                socialNetworks = [req.body.socialNetworks];
            }
        }

        // Préparation des données
        const artistData = {
            name: req.body.name,
            stageName: req.body.stageName,
            albumCount: parseInt(req.body.albumCount) || 0,
            label: req.body.label,
            publisher: req.body.publisher,
            careerStartDate: req.body.careerStartDate,
            image: req.file ? `/uploads/artists/${req.file.filename}` : null
        };

        console.log('Données formatées:', artistData);

        // Création de l'artiste
        const artistId = await Artist.create(artistData);
        console.log('Artiste créé avec l\'ID:', artistId);

        // Insertion des réseaux sociaux un par un
        if (socialNetworks.length > 0) {
            try {
                // Insérer chaque réseau social pour l'artiste
                await Artist.updateSocialNetworks(artistId, socialNetworks);
                console.log('Réseaux sociaux insérés pour l\'artiste');
            } catch (error) {
                console.error('Erreur lors de l\'insertion des réseaux sociaux:', error);
                // Si l'insertion échoue, supprimer l'artiste et gérer le fichier
                await Artist.delete(artistId); // Méthode à définir pour supprimer un artiste
                if (req.file) {
                    const fs = require('fs').promises;
                    try {
                        await fs.unlink(req.file.path);
                        console.log('Fichier temporaire supprimé');
                    } catch (unlinkError) {
                        console.error('Erreur lors de la suppression du fichier:', unlinkError);
                    }
                }
                return res.status(500).json({
                    status: 'error',
                    message: 'Erreur lors de l\'insertion des réseaux sociaux'
                });
            }
        }

        res.status(201).json({
            status: 'success',
            data: {
                id: artistId,
                message: 'Artiste créé avec succès'
            }
        });

    } catch (error) {
        console.error('Erreur lors de la création de l\'artiste:', error);
        // Si une erreur survient, supprimons le fichier uploadé si il existe
        if (req.file) {
            const fs = require('fs').promises;
            try {
                await fs.unlink(req.file.path);
                console.log('Fichier temporaire supprimé');
            } catch (unlinkError) {
                console.error('Erreur lors de la suppression du fichier:', unlinkError);
            }
        }

        res.status(500).json({
            status: 'error',
            message: error.message || 'Erreur lors de la création de l\'artiste'
        });
    }
};


// Update an existing artist
exports.updateArtist = async (req, res) => {
    try {
        const artistId = req.params.id;

        // Préparation des données de l'artiste mises à jour, incluant l'image si uploadée
        const artistData = {
            ...req.body,
            image: req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : undefined
        };

        // Suppression de l'ancienne image si une nouvelle est téléchargée
        if (req.file && req.body.oldImage) {
            const oldImagePath = path.join(__dirname, '..', 'public', req.body.oldImage);
            await removeFile(oldImagePath);
        }

        // Mise à jour des informations de l'artiste dans la base de données
        const updated = await Artist.update(artistId, artistData);

        // Mise à jour des réseaux sociaux si fournis
        if (req.body.socialNetworks && Array.isArray(req.body.socialNetworks)) {
            await Artist.updateSocialNetworks(artistId, req.body.socialNetworks);
        }

        if (!updated) {
            return res.status(404).json({ message: 'Artist not found' });
        }

        res.status(200).json({ message: 'Updated successfully' });
    } catch (error) {
        console.error('updateArtist error:', error);
        if (req.file) {
            await removeFile(req.file.path);
        }
        res.status(500).json({ message: error.message });
    }
};

// Retrieve the rating of an artist
// Dans artist.controller.js
exports.getArtists = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const result = await Artist.findAll(page, limit);

        res.json({
            status: 'success',
            data: result.artists,
            pagination: result.pagination
        });
    } catch (error) {
        console.error('getArtists error:', error);
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Retrieve a single artist by ID
exports.getArtist = async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id);
        if (!artist) {
            return res.status(404).json({ message: 'Artist not found' });
        }

        res.json(artist);
    } catch (error) {
        console.error('getArtist error:', error);
        res.status(500).json({ message: error.message });
    }
};

// Delete an artist by ID
exports.deleteArtist = async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id);

        if (!artist) {
            return res.status(404).json({ message: 'Artist not found' });
        }

        // Suppression de l'image de l'artiste si elle existe
        if (artist.image) {
            const imagePath = path.join(__dirname, '..', 'public', artist.image);
            await removeFile(imagePath);
        }

        // Suppression de l'artiste de la base de données
        const deleted = await Artist.delete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: 'Artist not found or already deleted' });
        }

        res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
        console.error('deleteArtist error:', error);
        res.status(500).json({ message: error.message });
    }
};

// Search for artists by name with optional limit
exports.searchArtists = async (req, res) => {
    try {
        const name = req.query.name || ''; // Requête de recherche (par défaut vide)
        const limit = parseInt(req.query.limit) || 10; // Limite par défaut
        
        // Effectuer la recherche dans la base de données
        const artists = await Artist.search(name, limit);

        res.json(artists);
    } catch (error) {
        console.error('searchArtists error:', error);
        res.status(500).json({ message: error.message });
    }
};

// Rate an artist
exports.rateArtist = async (req, res) => {
    try {
        const { userId, score } = req.body;

        // Validation de la plage de scores
        if (score < 0 || score > 5) {
            return res.status(400).json({ message: 'Score must be between 0 and 5' });
        }

        // Mise à jour de la notation de l'artiste
        const updatedRating = await Artist.rate(req.params.id, userId, score);

        res.status(200).json({ message: 'Rated successfully', updatedRating });
    } catch (error) {
        console.error('rateArtist error:', error);
        res.status(500).json({ message: error.message });
    }
};


// Ajoutez la fonction manquante getArtistRating
exports.getArtistRating = async (req, res) => {
    try {
        const artistId = req.params.id;
        const rating = await Artist.getRating(artistId);

        if (!rating) {
            return res.status(404).json({ message: 'Rating not found or artist does not exist' });
        }

        res.json(rating);
    } catch (error) {
        console.error('getArtistRating error:', error);
        res.status(500).json({ message: error.message });
    }
};
