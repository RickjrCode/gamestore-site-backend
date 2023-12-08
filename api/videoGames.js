const express = require("express");
const router = express.Router();

const REPLACE_ME = "HELP REPLACE ME!!!!";

const {
  getAllVideoGames,
  getVideoGameById,
  createVideoGame,
  updateVideoGame,
  deleteVideoGame,
} = require("../db/videoGames");

// GET - /api/video-games - get all video games
router.get("/", async (req, res, next) => {
  try {
    const videoGames = await getAllVideoGames();
    res.send(videoGames);
  } catch (error) {
    next(error);
  }
});

// GET - /api/video-games/:id - get a single video game by id
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const videoGame = await getVideoGameById(id);
    res.send(videoGame);
  } catch (error) {
    next(error);
  }
});

// POST - /api/video-games - create a new video game
router.post("/", async (req, res, next) => {
  // LOGIC GOES HERE
  try {
    console.log(req.body);
    const newGame = req.body;
    const result = await createVideoGame(newGame);

    console.log(result);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

// PUT - /api/video-games/:id - update a single video game by id
router.put("/:id", async (req, res, next) => {
  // LOGIC GOES HERE
  try {
    //extract the ID from the request parameters
    const id = req.params.id;
    //extract the updated fields from the request body
    const updatedFields = req.body;
    //call the updateVideoGame function to update the video game in the database
    const result = await updateVideoGame(id, updatedFields);
    //send the updated video game as the response
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

// DELETE - /api/video-games/:id - delete a single video game by id
router.delete("/:id", async (req, res, next) => {
  // LOGIC GOES HERE
  try {
    const id = req.params.id;
    console.log(id);
    //call the delete game function with the id as an argument
    const result = await deleteVideoGame(id);
    console.log(result);
    //send the result in the response
    res.send("deleting the game");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
