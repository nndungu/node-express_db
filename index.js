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
        .then((lesson) => {
            res.status(200).json(lesson);
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
                res.status(lesson);
            } else {
                res.status(404).json({ message: "Record not found" });
            }
        })
        .catch((error) => {
            res.status(500).json({ message: "Error updating" });
        });
});

server.listen(PORT, () => {
    console.log(`\n*** Server running on port ${PORT} ***\n`);
});
