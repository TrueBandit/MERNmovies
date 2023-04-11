const mongoose = require("mongoose");
const Member = require('../data_models/memberModel');

const movieSchema = new mongoose.Schema({
	name: { type : String } ,
    year: { type : String } ,
    genres: { type : Array } ,
    image: { type : String }
}, { versionKey: false });

const Movie = mongoose.model("movies", movieSchema);

module.exports = Movie;