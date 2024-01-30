const { default: mongoose } = require("mongoose");

const userSchema = require("../schema/userschema");

const userModel = new mongoose.model("user", userSchema)

module.exports = { userModel }