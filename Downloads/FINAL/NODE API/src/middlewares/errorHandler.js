// middleware/errorHandler.js
class ApiError extends Error {
    constructor(statusCode, message, source = null) {
        super(message);
        this.statusCode = statusCode;
        this.source = source;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        Error.captureStackTrace(this, this.constructor);
    }
}

class ErrorHandler {
    static notFound(message = "Resource not found") {
        return new ApiError(404, message);
    }

    static badRequest(message = "Bad request", source = null) {
        return new ApiError(400, message, source);
    }

    static unauthorized(message = "Unauthorized") {
        return new ApiError(401, message);
    }

    static forbidden(message = "Forbidden") {
        return new ApiError(403, message);
    }

    static validation(message = "Validation error", errors = []) {
        const error = new ApiError(422, message);
        error.errors = errors;
        return error;
    }

    static internal(message = "Internal server error") {
        return new ApiError(500, message);
    }
}

// Middleware de gestion des erreurs
const errorMiddleware = (err, req, res, next) => {
    console.error('Error:', {
        message: err.message,
        stack: err.stack,
        timestamp: new Date().toISOString(),
        path: req.path,
        method: req.method,
        body: req.body,
        params: req.params,
        query: req.query
    });

    // Si c'est une erreur API personnalisée
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            ...(err.source && { source: err.source }),
            ...(err.errors && { errors: err.errors }),
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        });
    }

    // Gestion des erreurs de validation Multer
    if (err.name === 'MulterError') {
        return res.status(400).json({
            status: 'fail',
            message: `Erreur d'upload: ${err.message}`
        });
    }

    // Gestion des erreurs MySQL
    if (err.code && err.sqlMessage) {
        const mysqlErrors = {
            'ER_DUP_ENTRY': {
                statusCode: 400,
                message: 'Cette entrée existe déjà'
            },
            'ER_NO_REFERENCED_ROW': {
                statusCode: 400,
                message: 'Référence invalide'
            }
        };

        const mysqlError = mysqlErrors[err.code] || {
            statusCode: 500,
            message: 'Erreur de base de données'
        };

        return res.status(mysqlError.statusCode).json({
            status: 'error',
            message: mysqlError.message,
            ...(process.env.NODE_ENV === 'development' && {
                sqlMessage: err.sqlMessage,
                sqlState: err.sqlState
            })
        });
    }

    // Erreur par défaut
    return res.status(500).json({
        status: 'error',
        message: 'Une erreur interne est survenue',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

// Middleware pour les routes non trouvées
const notFoundMiddleware = (req, res, next) => {
    next(ErrorHandler.notFound(`Route ${req.originalUrl} non trouvée`));
};

module.exports = {
    ApiError,
    ErrorHandler,
    errorMiddleware,
    notFoundMiddleware
};