const client = require("./client");
const util = require("util");

const REPLACE_ME = "HELP REPLACE ME!!!!";

// GET - /api/video-games - get all video games
async function getAllVideoGames() {
  try {
    const { rows: videoGames } = await client.query(`SELECT * FROM videoGames`);
    return videoGames;
  } catch (error) {
    throw new Error("Make sure you have replaced the REPLACE_ME placeholder.");
  }
}

// GET - /api/video-games/:id - get a single video game by id
async function getVideoGameById(id) {
  try {
    const {
      rows: [videoGame],
    } = await client.query(
      `
            SELECT * FROM videoGames
            WHERE id = $1;
        `,
      [id]
    );
    return videoGame;
  } catch (error) {
    throw error;
  }
}

// POST - /api/video-games - create a new video game
async function createVideoGame(body) {
  const { name, description, price, inStock, isPopular, imgUrl } = body;
  try {
    const {
      rows: [videoGame],
    } = await client.query(
      `

            INSERT INTO videoGames(name, description, price, "inStock", "isPopular", "imgUrl")
            VALUES($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `,
      [name, description, price, inStock, isPopular, imgUrl]
    );
    return videoGame;
  } catch (error) {
    throw error;
  }
}

// PUT - /api/video-games/:id - update a single video game by id
async function updateVideoGame(id, fields = {}) {
  // LOGIC GOES HERE
  try {
    // Extract keys and values from the fields object
    const fieldKeys = Object.keys(fields);
    const fieldValues = Object.values(fields);

    // Create the SET clause for the UPDATE query
    const updateSetClauses = fieldKeys
      .map((key, index) => `"${key}" = $${index + 1}`)
      .join(", ");

    // Construct and execute the UPDATE query
    const {
      rows: [updatedVideoGame],
    } = await client.query(
      `
        UPDATE videoGames
        SET ${updateSetClauses}
        WHERE id = $${fieldKeys.length + 1}
        RETURNING *;
    `,
      [...fieldValues, id]
    );

    return updatedVideoGame;
  } catch (error) {
    throw error;
  }
}

// DELETE - /api/video-games/:id - delete a single video game by id
async function deleteVideoGame(id) {
  // LOGIC GOES HERE
  try {
    const {
      rows: [videoGame],
    } = await client.query(
      `
        DELETE FROM videoGames
        WHERE id=$1
        RETURNING *;
    `,
      [id]
    );
    return videoGame;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllVideoGames,
  getVideoGameById,
  createVideoGame,
  updateVideoGame,
  deleteVideoGame,
};
