// middleware/validationMiddleware.js
const { ErrorHandler } = require('./errorHandler');

const validateArtist = (req, res, next) => {
    try {
        const { name, stageName } = req.body;
        const errors = [];

        if (!name) errors.push('Le nom est requis');
        if (!stageName) errors.push('Le nom de scène est requis');
        
        if (errors.length > 0) {
            throw ErrorHandler.validation('Erreur de validation', errors);
        }

        // Validation des formats
        if (req.body.albumCount && isNaN(req.body.albumCount)) {
            errors.push('Le nombre d\'albums doit être un nombre');
        }

        if (req.body.careerStartDate && isNaN(new Date(req.body.careerStartDate).getTime())) {
            errors.push('La date de début de carrière est invalide');
        }

        if (errors.length > 0) {
            throw ErrorHandler.validation('Erreur de validation', errors);
        }

        next();
    } catch (error) {
        next(error);
    }
};

const validateRating = (req, res, next) => {
    try {
        const { score } = req.body;
        
        if (score === undefined) {
            throw ErrorHandler.validation('Le score est requis');
        }

        const numScore = Number(score);
        if (isNaN(numScore) || numScore < 0 || numScore > 5) {
            throw ErrorHandler.validation('Le score doit être un nombre entre 0 et 5');
        }

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    validateArtist,
    validateRating
};