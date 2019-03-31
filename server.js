const express = require('express');
const app = express();
const util = require('util');


// use this library to interface with SQLite databases: https://github.com/mapbox/node-sqlite3
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('myJSON.db');
app.set('json spaces', 2);
app.use(express.static('static_files'));

app.get('/sort', (req, res) => {
  db.serialize(function() {
   // db.all("SELECT * FROM json_to_messages_db", function(err, allRows) {
    db.all("SELECT * FROM json_to_messages_db ORDER BY score ASC", function(err, allRows) {
        if(err != null){
            console.log(err);
            callback(err);
        }
        console.log((allRows));
        res.json(allRows);
    });
  });
});

app.get('/message', (req, res) => {
  db.serialize(function() {
    db.all("SELECT * FROM json_to_messages_db", function(err, allRows) {
   // db.all("SELECT * FROM json_to_messages_db ORDER BY score ASC", function(err, rows) {
        if(err != null){
            console.log(err);
            callback(err);
        }
        console.log((allRows));
        res.json(allRows);
    });
  });
});

//db.close();
// start the server at URL: http://localhost:3000/
app.listen(3000, () => {
  console.log('Server started at http://localhost:3000/');
});