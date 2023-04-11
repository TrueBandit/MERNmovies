const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	fullname: { type : String } ,
    username: { type : String } ,
    password: { type : String }
}, { versionKey: false });

const User = mongoose.model("users", userSchema);

module.exports = User;