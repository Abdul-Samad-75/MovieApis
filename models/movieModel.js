import { Schema,model } from "mongoose";

const movieSchema = new Schema({
    title: { type: String, required: true },
    director: { type: String, required: true },
    year: { type: Number, required: true },
})

const Movie=model("movie",movieSchema)

export {Movie}