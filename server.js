const express = require('express');
const app = express();

// use this library to interface with SQLite databases: https://github.com/mapbox/node-sqlite3
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('myJSON.db');
app.set('json spaces', 2);
app.use(express.static('static_files'));

app.get('/messages', (req, res) => {
  //id INTEGER, handle TEXT, avatar TEXT, timestamp TEXT, source TEXT, content TEXT, score 
 // db.get("SELECT id handle FROM  json
  db.serialize(function() {
    db.all("SELECT handle,content,score FROM json_to_messages_db", function(err, allRows) {
        if(err != null){
            console.log(err);
            callback(err);
        }
        console.log((allRows));
        res.json(allRows.sort);
        db.close();
    });
  });
});


app.delete("/api/user/:id", (req, res, next) => {
  db.run(
      'DELETE FROM user WHERE id = ?',
      req.params.id,
      function (err, result) {
          if (err){
              res.status(400).json({"error": res.message})
              return;
          }
          res.json({"message":"deleted", changes: this.changes})
  });
})


app.get('/sortbyscore', (req, res) => {
  //id INTEGER, handle TEXT, avatar TEXT, timestamp TEXT, source TEXT, content TEXT, score 
 // db.get("SELECT id handle FROM  json
  db.serialize(function() {
    db.all("SELECT * FROM json_to_messages_db ORDER BY score ASC", function(err, allRows) {
        if(err != null){
            console.log(err);
            callback(err);
        }
        console.log((allRows));
        res.json(allRows.sort);
        db.close();
    });
  });
});


app.listen(3000, () => {
  console.log('Server started at http://localhost:3000/');
});
