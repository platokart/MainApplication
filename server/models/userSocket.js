const mongoose = require("mongoose");

const userSocket = new mongoose.Schema({
    userid: {
        type: String,
        required: true,
        unique:true
    },
    socketId: {
        type: String,
        required: true
    }
});

const UserSocket = mongoose.model("UserSocket", userSocket);

module.exports=UserSocket;