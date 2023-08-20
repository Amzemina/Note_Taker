//Express import
const express = require('express');
//File system module import
const fs = require("fs");
//Path import
const path = require("path");
//Helper method for creating unique ids
const uniqid = require("uniqid");
//Port which the Express.js server will run
const PORT = process.env.PORT || 3001;
//Initialize an instance of Express.js
const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//GET Route for homepage
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);
//GET Route for notes
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

//Reads the db.json file and returns back the JSON data
app.get("/api/notes", function (req, res) {
    fs.readFile("db/db.json", "utf8", (err, data) => {
      var jsonData = JSON.parse(data);
      console.log(jsonData);
      res.json(jsonData);
    });
  });









//Listen() method is responsible for listening for incoming connections on the specified port
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);