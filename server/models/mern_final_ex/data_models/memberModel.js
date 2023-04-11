const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
	name: { type : String } ,
    email: { type : String } ,
    city: { type : String }
}, { versionKey: false });

const Member = mongoose.model("members", memberSchema);

module.exports = Member;