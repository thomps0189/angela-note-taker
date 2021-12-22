const express = require("express");
const app = express();
// Do I need morgan?
// const morgan = require("morgan");
const path = require("path");
const fs = require('fs');
const { notes } = require("./db/db.json");

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
        const newId = uuidv4()
        newNote.id = newId
        notesListArray.push(newNote)
        fs.writeFile("./db/db.json", JSON.stringify(notesListArray), (err) => {
            if (err) {
                console.log(err)
            }
            res.json({ success: true, newNote})
        })
    })
})

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});