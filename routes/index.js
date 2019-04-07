const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('myJSON.db');
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hi here is my challenge for the back end track. Please paste exisiting links into the browser to test out my API routes! ' });
});

/* Sorts messages by score in ascending order */
router.get('/api/sort', (req, res) => {
  db.serialize(function() {
    db.all("SELECT * FROM json_to_messages_db ORDER BY score ASC", function(err, rows) {
        if(err != null){
            console.log(err);
            callback(err);
        }
        console.log((rows));
        res.json(rows);
    });
  }); 
});


/* A get request that returns all data as modeled in messages.json and displays handle, content, score and meta fields */
/* For the entirety of this assignment I chose to represent false in terms of 0 and true in terms of 1 */
router.get('/api/getAll', (req, res) => {
  db.serialize(function() {
    db.all("SELECT handle, content, score, isStarred, isTrashed FROM json_to_messages_db", function(err, rows) {
        if(err != null){
            console.log(err);
            callback(err);
        }
        console.log((rows));
        res.json(rows);
    });
  });
});

/* Displays length of messages starred */
router.get('/api/displaylen', (req, res) => {
  db.serialize(function() {
    db.all("SELECT isStarred,LENGTH(content) FROM json_to_messages_db WHERE isStarred==1", function(err, rows) {
        if(err != null){
            console.log(err);
            callback(err);
        }
        console.log((rows));
        res.json(rows);
    });
  });
});



/* Method that toggles starring messages. This request eill update a messages's isStarred status by id */
router.get('/api/message/id/:id', (req, res) => {
  processData(res, "SELECT * FROM json_to_messages_db where id == "+req.params.id);
});

function processData(res, sql){      
  db.serialize(function() {
    let sql= `UPDATE json_to_messages_db SET isStarred = CASE isStarred WHEN 0 THEN 1 ELSE 0 END;` ;
    db.all(sql, function(err, rows) {
        if(err){
          console.error(err);
          res.status(500).send(err);
        }
        else
          sendData(res, rows, err);
    });
  });
}


function sendData(res, data, err){ 
  if(data[0])
    res.send(data);
  else{
    res.status(404).send("Message isStarred has been changed please call getAll route to refresh page");
  }
};

/* Method that deletes a message by ID */
router.get('/api/deleteMessage/id/:id', (req, res) =>{
  removeData(res, "DELETE FROM  json_to_messages_db where id == " + req.params.id);
});

function removeData(res, sql){
  db.serialize(function() {
    db.all(sql, function(err, rows) {
        if(err){
          console.error(err);
          res.status(500).send(err);
        }
        else
          sendDeleteData(res, rows, err); 
    });
  });
}

function sendDeleteData(res, data, err){ 
  if(data[0])
    res.send(data);
  else{
    res.status(404).send("Message has been deleted please call getAll route to refresh page");
  }
};



  
//This is for adding a button to each javascript object in my array using EJS
//This proved to be the hardest in designing the back end track
// router.get('/api/messages', (req, res) => {
//   var messages = [];
//    db.serialize(function() {
//      db.each("SELECT * FROM json_to_messages_db", function(err, row) {
//          messages.push({messages: row.handle, date: row.content, text: row.score});
//            var myJSONString = JSON.stringify(messages);
//            console.log(myJSONString);
//              res.render("index", {  messages: myJSONString });
module.exports = router;
