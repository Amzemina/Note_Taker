//Express import
const express = require('express');
//File system module import
const fs = require("fs");
//Path import
const path = require("path");
//Helper method for creating unique ids
const uniqid = require("uniqid");
//Note import
const Note = require('./note')
//Port which the Express.js server will run
const PORT = process.env.PORT || 3001;
//Initialize an instance of Express.js
const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


//GET Route for notes
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

//Reads the db.json file and returns back the JSON data
app.get("/api/notes", function (req, res) {
    fs.readFile("db/db.json", "utf8", (err, data) => {
        var jsonData = JSON.parse(data);
        console.log(err)
        console.log(data);
        res.json(jsonData);
    });
  });

//GET Route for homepage
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

//
function readNotes() {
    const dbNotes = fs.readFileSync('db/db.json', 'utf8')
    return JSON.parse(dbNotes)
    
};

//
function writeNote(note) {
    const currentNote = readNotes()
    currentNote.push(note)
    fs.writeFile('db/db.json', JSON.stringify(currentNote, null, 2), (err) => {
        if (err) {
            console.error('Error', err);
        } else {
            console.log('Generated note');
        }
    })
};

//POST new note to save on the request body, add it to the db.json file, and then return the new note to the client with a unique id
app.post("/api/notes", (req, res) => {
    if (req.body && req.body.title && req.body.text) {
    const note = new Note(req.body.title, req.body.text, uniqid())
    writeNote(note)
    res.status(201).json(note);
  } else {
    res.status(400).json('Request body must at least contain a product name');
  }
    
})







//Listen() method is responsible for listening for incoming connections on the specified port
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);