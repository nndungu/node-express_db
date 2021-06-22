const express = require("express");
const Lessons = require("./models/dbHelpers");

const server = express();

server.use(express.json());

PORT = 5500;

server.get("/", (req, res) => {
    res.json({ message: "I am awake" });
});

server.post("/api/lessons", (req, res) => {
    Lessons.add(req.body)
        .then((lesson) => {
            res.status(200).json(lesson);
        })
        .catch((error) => {
            res.status(500).json({ message: "Lesson not found" });
        });
});

server.get("/api/lessons", (req, res) => {
    Lessons.find(req.body)
        .then((lessons) => {
            res.status(200).json(lessons);
        })
        .catch((error) => {
            res.status(500).json({ message: "Unable to retrieve lessons" });
        });
});

server.get("/api/lessons/:id", (req, res) => {
    const { id } = req.params;

    Lessons.findById(id)
        .then((lesson) => {
            if (lesson) {
                res.status(200).json(lesson);
            } else {
                res.status(404).json({ message: "Lesson does not exist" });
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: "Unable to perform the operation",
            });
        });
});

server.delete("/api/lessons/:id", (req, res) => {
    const { id } = req.params;

    Lessons.remove(id)
        .then((count) => {
            if (count > 0) {
                res.status(200).json({ message: "Successfuly deleted" });
            } else {
                res.status(404).json({ message: "Unable to locate record" });
            }
        })
        .catch((error) => {
            res.status(500).json({ message: "Unable to delete" });
        });
});

server.patch("/api/lessons/:id", (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Lessons.update(id, changes)
        .then((lesson) => {
            if (lesson) {
                res.status(200).json(lesson);
            } else {
                res.status(404).json({ message: "Record not found" });
            }
        })
        .catch((error) => {
            res.status(500).json({ message: "Error updating" });
        });
});

server.post("/api/lessons/:id/messages", (req, res) => {
    const { id } = req.params;
    const msg = req.body;

    if (!msg.lesson_id) {
        msg["lesson_id"] = parseInt(id, 10);
    }

    Lessons.findById(id)
        .then((lesson) => {
            if (!lesson) {
                res.status(404).json({ message: "Invalid id" });
            }
            // check for all required fileds
            if (!msg.sender || !msg.text) {
                res.status(400).json({
                    message: "must provide both Sender and Text",
                });
            }

            Lessons.addMessage(msg, id)
                .then((message) => {
                    if (message) {
                        res.status(200).json(message);
                    }
                })
                .catch((error) => {
                    res.status(500).json({ message: "Failed to add message" });
                });
        })
        .catch((error) => {
            res.status(500).json({ message: "Error finding lesson" });
        });
});

server.get("/api/lessons/:id/messages", (req, res) => {
    const { id } = req.params;

    Lessons.findLessonMessages(id)
        .then((lesson) => {
            res.status(200).json(lesson);
        })
        .catch((error) => {
            res.status(500).json({ message: "Error retrieving message" });
        });
});

server.delete("/api/messages/:id", (req, res) => {
    const { id } = req.params;

    Lessons.removeMessage(id)
        .then((count) => {
            if (count > 0) {
                res.status(200).json({
                    message: `Message with id ${id} successfully deleted`,
                });
            } else {
                res.status(404).json({ message: "No message with that id" });
            }
        })
        .catch((error) => {
            res.status(500).json({ message: "Unable to delete message" });
        });
});

server.listen(PORT, () => {
    console.log(`\n*** Server running on port ${PORT} ***\n`);
});
