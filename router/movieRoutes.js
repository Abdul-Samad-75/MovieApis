import { addMovies, deleteMovie, getMovies, updateMovie } from "../controllers/movieControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

import express from "express";

const movieRouter = express.Router()

movieRouter.use(authMiddleware) //LOGGED IN
// movieRouter.get('/', authMiddleware, roleMiddleware(['user', 'admin']),getMovies)
movieRouter.get('/',getMovies)

movieRouter.use(roleMiddleware(['admin'])) //neche k sare routes kewal admin ko allowed hai

movieRouter.post('/', addMovies)
movieRouter.put('/:id', updateMovie)
movieRouter.delete('/:id',roleMiddleware(['admin']),deleteMovie)

export default movieRouter