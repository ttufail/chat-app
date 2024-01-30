const  mongoose  = require("mongoose");

const chatSchema = require("../schema/chatschema");

const chatModel = new mongoose.model("chat", chatSchema)

module.exports = chatModel