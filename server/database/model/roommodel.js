const  mongoose  = require("mongoose");

const roomSchema = require("../schema/roomschema");

const roomModel = new mongoose.model("room", roomSchema)

module.exports = roomModel