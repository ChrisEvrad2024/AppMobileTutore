const mysql = require('mysql2');
const fs = require('fs');
require('dotenv').config();

class DatabaseConnection {
  constructor() {
    this.pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: parseInt(process.env.DB_PORT, 10),
      waitForConnections: true,
      connectionLimit: parseInt(process.env.POOL_CONNECTION_LIMIT, 10),
      queueLimit: parseInt(process.env.POOL_QUEUE_LIMIT, 10),
      enableKeepAlive: true,
    }).promise(); // Ajout de .promise() ici
  }

  async testConnection() {
    try {
      await this.pool.query('SELECT 1');
      console.log('Connexion à la base de données réussie');
      return true;
    } catch (err) {
      this.handleError(err);
      return false;
    }
  }

  handleError(err) {
    const errorMessages = {
      'ER_ACCESS_DENIED_ERROR': 'Accès refusé. Vérifiez vos identifiants.',
      'ER_BAD_DB_ERROR': 'Base de données introuvable.',
      'ECONNREFUSED': 'Connexion refusée. Vérifiez host et port.',
    };
    
    const message = errorMessages[err.code] || err.message;
    this.logError(`${err.code}: ${message}`);
  }

  logError(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    fs.appendFileSync('db_errors.log', logMessage);
    console.error(logMessage);
  }

  getConnection() {
    return this.pool;
  }
}

module.exports = new DatabaseConnection().getConnection();