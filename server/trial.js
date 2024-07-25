const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const Message = require('./models/Message');
const User = require('./models/user'); // Import User model

mongoose.connect('mongodb://admin:ALQ01jFH2763%5E2H@103.110.127.195:28029/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("Failed to connect to MongoDB", err);
});

io.on("connection", (socket) => {
    socket.emit("me", socket.id);

    socket.on("disconnect", async () => {
        socket.broadcast.emit("callEnded");
        try {
            await User.findOneAndDelete({ socketId: socket.id });
        } catch (err) {
            console.error("Failed to remove user on disconnect", err);
        }
    });

    socket.on("register", async (data) => {
        const { email } = data;
        try {
            await User.findOneAndUpdate(
                { email },
                { socketId: socket.id },
                { upsert: true, new: true }
            );
            console.log("User registered:", email, socket.id);
        } catch (err) {
            console.error("Failed to register user", err);
        }
    });

    socket.on("callUser", async (data) => {
        const { userToCall, signalData, from, name } = data;
        try {
            const user = await User.findOne({ email: userToCall });
            if (user) {
                io.to(user.socketId).emit("callUser", { signal: signalData, from, name });
            } else {
                console.log("User to call not found:", userToCall);
            }
        } catch (err) {
            console.error("Failed to find user to call", err);
        }
    });

    socket.on("answerCall", (data) => {
        io.to(data.to).emit("callAccepted", data.signal);
    });

    socket.on("sendMessage", async (data) => {
        const { message, to, from, email, consultantEmail } = data;

        let messageRecord = await Message.findOne({
            $or: [
                { userId: email, consultantId: consultantEmail },
                { userId: consultantEmail, consultantId: email }
            ]
        });

        if (!messageRecord) {
            messageRecord = new Message({
                userId: email,
                consultantId: consultantEmail,
                userSocket: from,
                consultantSocket: (await User.findOne({ email: consultantEmail })).socketId,
                messages: []
            });
        } else {
            if (email === messageRecord.userId) {
                messageRecord.userSocket = from;
                messageRecord.consultantSocket = (await User.findOne({ email: consultantEmail })).socketId;
            } else {
                messageRecord.userSocket = (await User.findOne({ email: consultantEmail })).socketId;
                messageRecord.consultantSocket = from;
            }
        }

        messageRecord.messages.push({
            sender: email === messageRecord.userId ? 'user' : 'consultant',
            senderId: from,
            message: message
        });

        await messageRecord.save();

        io.to((await User.findOne({ email: consultantEmail })).socketId).emit("message", {
            from: from,
            message: message
        });
    });

    socket.on("instantRequest", (data) => {
        const { consultantSocket, clientName, topic, duration, channel } = data;
        io.to(consultantSocket).emit("instantRequest", {
            clientSocket: socket.id,
            clientName,
            topic,
            duration,
            channel
        });
    });

    socket.on("scheduledRequest", (data) => {
        const { consultantSocket, clientName, topic, dateTime, duration, channel } = data;
        io.to(consultantSocket).emit("scheduledRequest", {
            clientSocket: socket.id,
            clientName,
            topic,
            dateTime,
            duration,
            channel
        });
    });
});

server.listen(5001, () => console.log("server is running on port 5001"));