const express = require("express");
const Lessons = require("../models/dbHelpers");

const router = express.Router();

// all endpoints are for /api/lessons
router.post("/", (req, res) => {
    Lessons.add(req.body)
        .then((lesson) => {
            res.status(200).json(lesson);
        })
        .catch((error) => {
            res.status(500).json({ message: "Lesson not found" });
        });
});

router.get("/", (req, res) => {
    Lessons.find(req.body)
        .then((lessons) => {
            res.status(200).json(lessons);
        })
        .catch((error) => {
            res.status(500).json({ message: "Unable to retrieve lessons" });
        });
});

router.get("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
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

router.patch("/:id", (req, res) => {
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

router.post("/:id/messages", (req, res) => {
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

router.get("/:id/messages", (req, res) => {
    const { id } = req.params;

    Lessons.findLessonMessages(id)
        .then((lesson) => {
            res.status(200).json(lesson);
        })
        .catch((error) => {
            res.status(500).json({ message: "Error retrieving message" });
        });
});

module.exports = router;
