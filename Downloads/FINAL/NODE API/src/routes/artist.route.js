const express = require('express');
const artistController = require('../controllers/artist.controller');
const upload = require('../config/upload');
const { validateArtist, validateRating } = require('../middlewares/validationMiddleware');

const router = express.Router();

// Routes publiques
router.get('/', artistController.getArtists);
router.get('/search', artistController.searchArtists);
router.get('/:id', artistController.getArtist);
router.get('/:id/rating', artistController.getArtistRating);

// Routes protégées
router.post('/', upload.single('image'), validateArtist, artistController.createArtist);
router.put('/:id', upload.single('image'), validateArtist, artistController.updateArtist);
router.delete('/:id', artistController.deleteArtist);
router.post('/:id/rate', validateRating, artistController.rateArtist);

module.exports = router;