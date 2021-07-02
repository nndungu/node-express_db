const express = require("express");

const lessonsRouter = require("../Routes/lessons-routes");
const messagesRouter = require("../Routes/messages-routes");
const usersRouter = require("../Routes/users-routes");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
    res.json({ message: "I am awake" });
});

server.use("/api/lessons", lessonsRouter);
server.use("/api/messages", messagesRouter);
server.use("/api/users", usersRouter);

module.exports = server;
