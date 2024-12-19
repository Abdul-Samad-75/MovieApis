import { Movie } from "../models/movieModel.js";


//get movies
export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//add movie
export const addMovies = async (req, res) => {
  const { title, director, year } = req.body;
  try {
    const movie = new Movie({ title, director, year });
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//update movie
export const updateMovie = async (req, res) => {
  const { title, director, year } = req.body;

  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      { title, director, year },
      { new: true }
    );

    if (!movie) return res.status(404).json({ msg: "Movie not found" });

    res.status(200).json(movie);
  } catch (error) {
    res.status(400).json({ msg: "error updating movie", error: error.message });
  }
};

//delete movie
export const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    if (!movie) return res.status(404).json({ msg: "movie not found" });

    res.json({ msg: "Movie deleted successfully" });
  } catch (error) {
    res.status(400).json({ msg: "error deleting movie", error: error.message });
  }
};
