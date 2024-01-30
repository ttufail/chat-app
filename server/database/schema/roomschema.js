const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomId: {
        type: Number,
        required: true
    },
    messages: [{
        user: {
            type: String,
            // required: true,
        },
        message: {
            type: String,
            // required: true,
        },
        timeStamp: {
            type: Number,
            // required: true
        },
    }],
    timeStamp: {
        type: Number,
        required: true
    },
});


module.exports = roomSchema;
