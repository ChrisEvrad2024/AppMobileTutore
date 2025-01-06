const fs = require("fs").promises;
const path = require("path");
const db = require("../config/database");

class Artist {
  // Validation des données
  static validateArtist(artist) {
    const requiredFields = ["name", "stageName"];
    const missingFields = requiredFields.filter((field) => !artist[field]);

    if (missingFields.length > 0) {
      throw new Error(`Champs requis manquants: ${missingFields.join(", ")}`);
    }
  }

  // Traitement des erreurs
  static handleError(error, operation) {
    console.error(`Erreur lors de ${operation}:`, error);
    throw new Error(`Échec de l'opération: ${operation}`);
  }

  // CRUD Operations
  static async create(artist) {
    try {
      this.validateArtist(artist);

      // Transaction pour créer l'artiste et ses réseaux sociaux
      const connection = await db.getConnection();
      await connection.beginTransaction();

      try {
        const [result] = await connection.query(
          `INSERT INTO artists (
                        image, name, stageName, albumCount, 
                        label, publisher, careerStartDate
                    ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            artist.image || null,
            artist.name,
            artist.stageName,
            artist.albumCount || 0,
            artist.label || null,
            artist.publisher || null,
            artist.careerStartDate || null,
          ]
        );

        // Ajout des réseaux sociaux si présents
        if (artist.socialNetworks?.length > 0) {
          await this.updateSocialNetworks(
            result.insertId,
            artist.socialNetworks,
            connection
          );
        }

        await connection.commit();
        return result.insertId;
      } catch (error) {
        await connection.rollback();
        throw error;
      } finally {
        connection.release();
      }
    } catch (error) {
      this.handleError(error, "création artiste");
    }
  }

  // Dans artist.model.js
static async findAll(page = 1, limit = 10) {
    try {
        // 1. Calculer l'offset
        const offset = (page - 1) * limit;

        // 2. Faire deux requêtes: une pour les données, une pour le total
        const [countResult] = await db.query(
            'SELECT COUNT(*) as total FROM artists'
        );
        const totalItems = countResult[0].total;

        // 3. Requête principale avec pagination
        const query = `
            SELECT 
                a.*,
                COALESCE(AVG(r.score), 0) as rating,
                COUNT(DISTINCT r.id) as ratingCount,
                GROUP_CONCAT(DISTINCT sn.network_url) as socialNetworks
            FROM artists a
            LEFT JOIN ratings r ON a.id = r.artistId
            LEFT JOIN social_networks sn ON a.id = sn.artistId
            GROUP BY a.id
            ORDER BY a.id DESC
            LIMIT ? OFFSET ?
        `;

        const [rows] = await db.query(query, [parseInt(limit), parseInt(offset)]);

        // 4. Formater les résultats
        const artists = rows.map(row => ({
            ...row,
            rating: parseFloat(row.rating) || 0,
            ratingCount: parseInt(row.ratingCount) || 0,
            socialNetworks: row.socialNetworks ? row.socialNetworks.split(',') : [],
            careerStartDate: row.careerStartDate ? 
                new Date(row.careerStartDate).toISOString().split('T')[0] : null
        }));

        // 5. Retourner un objet avec les métadonnées de pagination
        return {
            artists,
            pagination: {
                currentPage: parseInt(page),
                itemsPerPage: parseInt(limit),
                totalItems: totalItems,
                totalPages: Math.ceil(totalItems / limit)
            }
        };

    } catch (error) {
        console.error('Erreur findAll:', error);
        throw new Error('Échec de la récupération des artistes');
    }
}

  static async findById(id) {
    try {
      const query = `SELECT 
                    a.*,
                    COALESCE(AVG(r.score), 0) as rating,
                    COUNT(DISTINCT r.id) as ratingCount,
                    GROUP_CONCAT(DISTINCT sn.network_url) as socialNetworks
                FROM artists a
                LEFT JOIN ratings r ON a.id = r.artistId
                LEFT JOIN social_networks sn ON a.id = sn.artistId
                WHERE a.id = ?
                GROUP BY a.id`;

      const [rows] = await db.query(query, [id]);
      if (rows.length === 0) return null;

      const artist = rows[0];
      return {
        ...artist,
        rating: parseFloat(artist.rating) || 0,
        ratingCount: parseInt(artist.ratingCount) || 0,
        socialNetworks: artist.socialNetworks
          ? artist.socialNetworks.split(",")
          : [],
        careerStartDate: artist.careerStartDate
          ? new Date(artist.careerStartDate).toISOString().split("T")[0]
          : null,
      };
    } catch (error) {
      this.handleError(error, "recherche artiste");
    }
  }

  static async update(id, artist) {
    try {
      this.validateArtist(artist);

      const connection = await db.getConnection();
      await connection.beginTransaction();

      try {
        const [result] = await connection.query(
          `UPDATE artists 
                     SET image = ?, name = ?, stageName = ?, 
                         albumCount = ?, label = ?, publisher = ?, 
                         careerStartDate = ?
                     WHERE id = ?`,
          [
            artist.image || null,
            artist.name,
            artist.stageName,
            artist.albumCount || 0,
            artist.label || null,
            artist.publisher || null,
            artist.careerStartDate || null,
            id,
          ]
        );

        if (artist.socialNetworks) {
          await this.updateSocialNetworks(
            id,
            artist.socialNetworks,
            connection
          );
        }

        await connection.commit();
        return result.affectedRows > 0;
      } catch (error) {
        await connection.rollback();
        throw error;
      } finally {
        connection.release();
      }
    } catch (error) {
      this.handleError(error, "mise à jour artiste");
    }
  }

  static async rate(artistId, userId, score) {
    try {
      if (score < 0 || score > 5) {
        throw new Error("Le score doit être entre 0 et 5");
      }

      await db.query(
        `INSERT INTO ratings (artistId, userId, score) 
                 VALUES (?, ?, ?)
                 ON DUPLICATE KEY UPDATE score = ?`,
        [artistId, userId, score, score]
      );

      return this.getArtistRating(artistId);
    } catch (error) {
      this.handleError(error, "notation artiste");
    }
  }

  static async updateSocialNetworks(artistId, networks, connection) {
    const conn = connection || db;
    await conn.query("DELETE FROM social_networks WHERE artistId = ?", [
      artistId,
    ]);

    if (networks?.length > 0) {
      const values = networks.map((url) => [artistId, url]);
      await conn.query(
        "INSERT INTO social_networks (artistId, network_url) VALUES ?",
        [values]
      );
    }
  }

  static async delete(id) {
    try {
      const connection = await db.getConnection();
      await connection.beginTransaction();

      try {
        // Suppression des données associées
        await connection.query(
          "DELETE FROM social_networks WHERE artistId = ?",
          [id]
        );
        await connection.query("DELETE FROM ratings WHERE artistId = ?", [id]);

        // Suppression de l'artiste
        const [result] = await connection.query(
          "DELETE FROM artists WHERE id = ?",
          [id]
        );

        await connection.commit();
        return result.affectedRows > 0;
      } catch (error) {
        await connection.rollback();
        throw error;
      } finally {
        connection.release();
      }
    } catch (error) {
      this.handleError(error, "suppression artiste");
    }
  }

  static async search(query, limit = 10) {
    try {
      const searchQuery = `%${query}%`;
      const [rows] = await db.query(
        `SELECT 
                    a.*,
                    COALESCE(AVG(r.score), 0) as rating,
                    COUNT(DISTINCT r.id) as ratingCount,
                    GROUP_CONCAT(DISTINCT sn.network_url) as socialNetworks
                FROM artists a
                LEFT JOIN ratings r ON a.id = r.artistId
                LEFT JOIN social_networks sn ON a.id = sn.artistId
                WHERE a.name LIKE ? OR a.stageName LIKE ?
                GROUP BY a.id
                LIMIT ?`,
        [searchQuery, searchQuery, limit]
      );

      return rows.map((row) => ({
        ...row,
        rating: parseFloat(row.rating) || 0,
        ratingCount: parseInt(row.ratingCount) || 0,
        socialNetworks: row.socialNetworks ? row.socialNetworks.split(",") : [],
        careerStartDate: row.careerStartDate
          ? new Date(row.careerStartDate).toISOString().split("T")[0]
          : null,
      }));
    } catch (error) {
      this.handleError(error, "recherche artistes");
    }
  }

  static async uploadImage(file, artistId) {
    try {
      if (!file) throw new Error("Aucun fichier fourni");

      // Mise à jour du chemin de l'image dans la base de données
      const imagePath = `/uploads/artists/${file.filename}`;

      // Si un artiste existe déjà, on récupère son ancienne image
      if (artistId) {
        const [oldImage] = await db.query(
          "SELECT image FROM artists WHERE id = ?",
          [artistId]
        );

        // Mise à jour de l'image dans la base de données
        await db.query("UPDATE artists SET image = ? WHERE id = ?", [
          imagePath,
          artistId,
        ]);

        // Suppression de l'ancienne image si elle existe
        if (oldImage[0]?.image) {
          const oldImagePath = path.join(
            __dirname,
            "../public",
            oldImage[0].image
          );
          try {
            await fs.unlink(oldImagePath);
          } catch (error) {
            console.warn("Impossible de supprimer l'ancienne image:", error);
          }
        }
      }

      return imagePath;
    } catch (error) {
      // En cas d'erreur, on supprime le fichier uploadé
      if (file?.path) {
        try {
          await fs.unlink(file.path);
        } catch (unlinkError) {
          console.error(
            "Erreur lors de la suppression du fichier:",
            unlinkError
          );
        }
      }
      throw error;
    }
  }

  // Dans artist.model.js
  static async delete(id) {
    const connection = await db.getConnection();

    try {
      await connection.beginTransaction();

      // 1. D'abord, récupérer les informations de l'artiste pour l'image
      const [artist] = await connection.query(
        "SELECT image FROM artists WHERE id = ?",
        [id]
      );

      // 2. Supprimer les références dans l'ordre
      await connection.query("DELETE FROM ratings WHERE artistId = ?", [id]);
      await connection.query("DELETE FROM social_networks WHERE artistId = ?", [
        id,
      ]);

      // 3. Supprimer l'artiste
      const [result] = await connection.query(
        "DELETE FROM artists WHERE id = ?",
        [id]
      );

      // 4. Si la suppression a réussi et qu'il y avait une image
      if (result.affectedRows > 0 && artist[0]?.image) {
        const imagePath = path.join(__dirname, "../public", artist[0].image);
        try {
          await fs.promises.unlink(imagePath);
        } catch (error) {
          console.warn("Impossible de supprimer l'image:", error);
          // On continue même si l'image n'a pas pu être supprimée
        }
      }

      await connection.commit();
      return result.affectedRows > 0;
    } catch (error) {
      await connection.rollback();
      console.error("Erreur lors de la suppression:", error);
      throw new Error("Échec de la suppression de l'artiste");
    } finally {
      connection.release();
    }
  }
}

module.exports = Artist;
