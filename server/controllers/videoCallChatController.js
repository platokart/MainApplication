const Messages = require('../models/Message');
const User = require("../models/user");
const ReportAbuse = require('../models/abuseschema');
const Review = require("../models/review");

exports.acceptedConsultation = (server) => {
    const io = require("socket.io")(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"]
        }
    });
    console.log("It has been hit");
    io.on("connection", (socket) => {
        socket.emit("me", socket.id);

        socket.on("disconnect", async () => {
            socket.broadcast.emit("callEnded");
            try {
                await UserSocket.findOneAndDelete({ socketId: socket.id });
            } catch (err) {
                console.error("Failed to remove user on disconnect", err);
            }
        });

        socket.on("register", async (data) => {
            const { userid } = data;
            try {
                await UserSocket.findOneAndUpdate(
                    { userid },
                    { socketId: socket.id },
                    { upsert: true, new: true }
                );
                console.log("User registered:", userid, socket.id);
            } catch (err) {
                console.error("Failed to register user", err);
            }
        });

        socket.on("callUser", async (data) => {
            const { customerId, consultantId, signalData, from, name } = data;
            try {
                const user = await UserSocket.findOne({ userid: customerId });
                if (user) {
                    io.to(user.socketId).emit("callUser", { signal: signalData, from, name });
                } else {
                    console.log("User to call not found:", customerId);
                }
            } catch (err) {
                console.error("Failed to find user to call", err);
            }
        });

        socket.on("answerCall", (data) => {
            io.to(data.to).emit("callAccepted", data.signal);
        });

        socket.on("sendMessage", async (data) => {
            const { message, to, from, customerId, consultantId } = data;

            let messageRecord = await Message.findOne({
                $or: [
                    { userId: customerId, consultantId: consultantId },
                    { userId: consultantId, consultantId: customerId }
                ]
            });

            if (!messageRecord) {
                messageRecord = new Message({
                    userId: customerId,
                    consultantId: consultantId,
                    userSocket: from,
                    consultantSocket: (await UserSocket.findOne({ userid: consultantId })).socketId,
                    messages: []
                });
            } else {
                if (email === messageRecord.userId) {
                    messageRecord.userSocket = from;
                    messageRecord.consultantSocket = (await UserSocket.findOne({ userid: consultantId })).socketId;
                } else {
                    messageRecord.userSocket = (await UserSocket.findOne({ userid: consultantId })).socketId;
                    messageRecord.consultantSocket = from;
                }
            }

            messageRecord.messages.push({
                sender: userId === messageRecord.userId ? 'user' : 'consultant',
                senderId: from,
                message: message
            });

            await messageRecord.save();

            io.to((await UserSocket.findOne({ userid: consultantId })).socketId).emit("message", {
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
};

exports.getMessagesforUser = async (req, res) => {
    const { customerId } = req.params;
    console.log("customerId:",customerId);
    try {
        const messages = await Messages.find({ userId: customerId });
        res.status(200).json({ messages });
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
};

exports.reportAbuse = async (req, res) => {
    const userId = req.params.id;
    const { message } = req.body;

    if (!userId || !message) {
        return res.status(400).json({ error: 'User ID and message are required.' });
    }

    try {
        const newReport = new ReportAbuse({
            userId,
            message
        });

        await newReport.save();
        res.status(201).json({ message: 'Abuse report submitted successfully.' });
    } catch (error) {
        console.error('Error reporting abuse:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

exports.postReviewRating = async (req, res) => {
    const { customerId, consultantId } = req.params;
    const { rating, feedback, reason } = req.body;

    if (!rating || !customerId || !consultantId) {
        return res.status(400).json({ error: 'Consultation ID, rating, customer ID, and consultant ID are required.' });
    }

    try {
        const newReview = new Review({
            rating,
            feedback,
            reason,
            userId: customerId,
            consultantId
        });

        await newReview.save();
        res.status(201).json({ message: 'Review submitted successfully.', review: newReview });
    } catch (error) {
        console.error('Error posting review:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};
