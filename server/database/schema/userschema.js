const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    useremail: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    }
})

module.exports = userSchema