const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const morgan = require("morgan");
// const {v4: uuidv4} = require("uuid");
const path = require("path");
const fs = require('fs');
const { notes } = require("./db/db.json");

app.use(morgan("tiny"));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/api/notes", (req,res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        const notesList = JSON.parse(data)
        res.json({notesList})
    })
})

app.post("/api/notes", (req, res) => {
    const newNote = req.body;

    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        const notesListArray = JSON.parse(data)
        // const newId = myuuid();
        // newNote.id = newId
        notesListArray.push(newNote)
        fs.writeFile("./db/db.json", JSON.stringify(notesListArray), (err) => {
            if (err) {
                console.log(err)
            }
            res.json({ success: true, newNote})
        })
    })
})

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});