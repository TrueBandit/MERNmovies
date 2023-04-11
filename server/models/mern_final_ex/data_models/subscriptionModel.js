const mongoose = require("mongoose");
const Movie = require('../data_models/movieModel');
const Member = require('../data_models/memberModel');

const subscriptionSchema = new mongoose.Schema({
    movieid: { type : String },
    memberid: { type : String },
    date: { type : String }
  }, { versionKey: false });

const Subscription = mongoose.model("subscriptions", subscriptionSchema);

module.exports = Subscription;
