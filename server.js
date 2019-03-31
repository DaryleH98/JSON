// Node.js + Express server backend for petsapp
// version 2 - use SQLite (https://www.sqlite.org/index.html) as a database
//
// COGS121 by Philip Guo
// https://github.com/pgbovine/COGS121

// Prerequisites - first run:
//   npm install
//
// which will look in package.json and install all dependencies
// (e.g., express, sqlite3)
//
// To start the server, run:
//   node server.js
//
// and open the frontend webpage at http://localhost:3000/petsapp.html
//
//
// [optional] you can use nodemon to automatically restart your Node.js
// server whenever your backend files change. https://nodemon.io/
//
// Install globally using:
//
// sudo npm install -g nodemon
//
// and then start the server using:
//   nodemon server.js

const express = require('express');
const app = express();
const util = require('util');


// use this library to interface with SQLite databases: https://github.com/mapbox/node-sqlite3
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('myJSON.db');
app.set('json spaces', 2);

// put all of your static files (e.g., HTML, CSS, JS, JPG) in the static_files/
// sub-directory, and the server will serve them from there. e.g.,:
//
// http://localhost:3000/petsapp.html
// http://localhost:3000/cat.jpg
//
// will send the file static_files/cat.jpg to the user's web browser
//
// Learn more: http://expressjs.com/en/starter/static-files.html
app.use(express.static('static_files'));


// To learn more about server routing:
// Express - Hello world: http://expressjs.com/en/starter/hello-world.html
// Express - basic routing: http://expressjs.com/en/starter/basic-routing.html
// Express - routing: https://expressjs.com/en/guide/routing.html


// GET a list of all usernames
//
// To test, open this URL in your browser:
//   http://localhost:3000/users
app.get('/messages', (req, res) => {
  //id INTEGER, handle TEXT, avatar TEXT, timestamp TEXT, source TEXT, content TEXT, score 
 // db.get("SELECT id handle FROM  json_to_messages_db", function(err, row){
 //   res.json({ "count" : row.id });
   // res.json({ "handle": row.handle});
 //  db.all("SELECT * FROM json_to_messages_db", function(err,rows){
   // if(err) return cb(err);
     //    let contador = 0; 
       //  rows.forEach(function (row) {
      
    //  }); 

   // db.all('SELECT * from pass', function(err, rows) {
     // res.json(rows);
 
     // var user = rows[0].userid;
     // var password= rows[0].password;
 
  //  });

  db.serialize(function() {

    db.all("SELECT * FROM json_to_messages_db", function(err, allRows) {

        if(err != null){
            console.log(err);
            callback(err);
        }

        console.log((allRows));

        res.json(allRows);

        
        //db.close();

    });


});
  
});



// GET profile data for a user
//
// To test, open these URLs in your browser:
//   http://localhost:3000/users/Philip
//   http://localhost:3000/users/Carol
//   http://localhost:3000/users/invalidusername
app.get('/users/:userid', (req, res) => {
  const nameToLookup = req.params.userid; // matches ':userid' above

  // db.all() fetches all results from an SQL query into the 'rows' variable:
  db.all(
    'SELECT * FROM users_to_pets WHERE name=$name',
    // parameters to SQL query:
    {
      $name: nameToLookup
    },
    // callback function to run when the query finishes:
    (err, rows) => {
      console.log(rows);
      if (rows.length > 0) {
        res.send(rows[0]);
      } else {
        res.send({}); // failed, so return an empty object instead of undefined
      }
    }
  );
});


// start the server at URL: http://localhost:3000/
app.listen(3000, () => {
  console.log('Server started at http://localhost:3000/');
});
