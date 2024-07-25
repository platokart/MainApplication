const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    consultantId: {
        type: String,
        required: true
    },
    userSocket: {
        type: String,
        required: true
    },
    consultantSocket: {
        type: String,
        required: true
    },
    messages: [
        {
            sender: {
                type: String,
                enum: ['user', 'consultant'],
                required: true
            },
            senderId: {
                type: String,
                required: true
            },
            message: {
                type: String,
                required: true
            }
        }
    ]
});

const Messages = mongoose.model("Message", messageSchema)
module.exports = Messages;
