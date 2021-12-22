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
    res.json(notes);
})

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});