const { default: mongoose } = require("mongoose");

const chatSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timeStamp: {
        type: Number,
        required: true
    },
})

module.exports = chatSchema