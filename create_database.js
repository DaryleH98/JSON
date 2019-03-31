// Node.js + Express server backend for petsapp
// v2 - use SQLite (https://www.sqlite.org/index.html) as a database
//
// COGS121 by Philip Guo
// https://github.com/pgbovine/COGS121

// run this once to create the initial database as the pets.db file
//   node create_database.js

// to clear the database, simply delete the pets.db file:
//   rm pets.db

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('myJSON.db');

// run each database statement *serially* one after another
// (if you don't do this, then all statements will run in parallel,
//  which we don't want)
db.serialize(() => {
  // create a new database table:
  db.run("CREATE TABLE json_to_messages_db (id INTEGER, handle TEXT, avatar TEXT, timestamp TEXT, source TEXT, content TEXT, score INTEGER)");

  // insert 3 rows of data:
  db.run("INSERT INTO json_to_messages_db VALUES ( '55747', 'Kaitlyn.Barton32', 'https://s3.amazonaws.com/uifaces/faces/twitter/marclgonzales/128.jpg', '2019-01-02T05:07:54.048Z', 'Twitter', 'Delectus facilis nisi consequatur numquam consequatur temporibus minima. Quaerat et id et asperiores alias inventore repellat qui. Laudantium at ut temporibus. Architecto delectus modi consequatur. Velit labore fuga iusto.', '26')");
  db.run("INSERT INTO json_to_messages_db VALUES ( '55070', 'Jamar89', 'https://s3.amazonaws.com/uifaces/faces/twitter/Stievius/128.jpg', '2018-04-03T06:40:56.003Z', 'Twitter','Quia ut molestiae ipsum. Impedit deleniti rerum doloribus. At repellat adipisci delectus neque distinctio iusto nulla. Occaecati sed quam dolorum. Aut ut quibusdam sunt. Magni velit ut repellat voluptatem.',  '61')");
  db.run("INSERT INTO json_to_messages_db VALUES ( '9693', 'Cathy.Rosenbaum', 'https://s3.amazonaws.com/uifaces/faces/twitter/missaaamy/128.jpg', '2018-11-20T19:46:07.507Z', 'Twitter', 'Quos sapiente distinctio quia labore id. Non laborum fuga corporis magni voluptatem. Deleniti aut vel quibusdam. Hic amet voluptatum assumenda aliquam. Consequatur hic earum minus. Occaecati ipsa quam quos dolor tempore et repellendus est eligendi.', '68')");
  db.run("INSERT INTO json_to_messages_db VALUES ( '72523', 'Eriberto_Stamm', 'https://s3.amazonaws.com/uifaces/faces/twitter/curiousonaut/128.jpg', '2019-01-28T06:47:39.497Z', 'Twitter', 'Et accusantium occaecati ut. Inventore voluptatem sit illo eos omnis eos. Excepturi temporibus deserunt perspiciatis omnis vero. Omnis accusamus maiores consectetur quibusdam ipsam expedita recusandae laboriosam.', '65')");
  db.run("INSERT INTO json_to_messages_db VALUES ( '78896', 'Tom14', 'https://s3.amazonaws.com/uifaces/faces/twitter/coderdiaz/128.jpg', '2019-02-15T13:45:07.413Z', 'Twitter','Eligendi dignissimos sit repellendus provident. Eveniet eos aperiam illo.',  '43')");
  db.run("INSERT INTO json_to_messages_db VALUES ( '64717', 'Reta.Pfeffer29', 'https://s3.amazonaws.com/uifaces/faces/twitter/ateneupopular/128.jpg', '2018-05-10T16:29:36.060Z', 'Twitter', 'Placeat temporibus ea eligendi quod esse. Commodi quaerat quia sequi soluta sit alias. Officia illum recusandae quia omnis suscipit qui debitis. Tempora dolor quod consequuntur odit laudantium quaerat ut. Et perferendis sit blanditiis aut neque velit dolores a illo.', '46')");
  db.run("INSERT INTO json_to_messages_db VALUES ( '12811', 'Willy.Kertzmann', 'https://s3.amazonaws.com/uifaces/faces/twitter/liminha/128.jpg', '2018-10-10T22:27:48.120Z', 'Twitter', 'Sit fugit illum voluptatem et praesentium. Maiores assumenda aspernatur ipsa pariatur molestias asperiores aut quia. Et et tenetur reiciendis voluptatem animi. Vel aut sit voluptatem et libero totam. Sunt expedita aut nobis error aut quia eveniet molestiae repellendus. Voluptas expedita iste voluptatem unde eos quia.', '7')");
  db.run("INSERT INTO json_to_messages_db VALUES ( '57354', 'Maximillia3', 'https://s3.amazonaws.com/uifaces/faces/twitter/franciscoamk/128.jpg', '2018-12-29T08:57:05.202Z', 'Twitter','Voluptatem natus animi sint perspiciatis id sed est. Dignissimos ab aliquid aut ullam excepturi.',  '97')");
  db.run("INSERT INTO json_to_messages_db VALUES ( '13594', 'Kaleb54', 'https://s3.amazonaws.com/uifaces/faces/twitter/thierrykoblentz/128.jpg', '2018-06-21T22:32:07.574Z', 'Twitter', 'Quam tempore mollitia quasi minima. Eos occaecati et qui ex mollitia sit qui qui et. Ad enim vel commodi. Magni voluptatum alias libero provident quibusdam neque aperiam.', '79')");
  db.run("INSERT INTO json_to_messages_db VALUES ( '74835', 'Anabel_Swaniawski', 'https://s3.amazonaws.com/uifaces/faces/twitter/spacewood_/128.jpg', '2018-10-19T17:41:49.267Z', 'Twitter', 'Laboriosam voluptas quia consequatur ducimus rerum. Expedita iste enim doloremque rerum ipsam. Consequatur eveniet corporis eos. Velit sed assumenda. Molestiae itaque molestias quisquam quae rem est mollitia autem.', '79')");
  db.run("INSERT INTO json_to_messages_db VALUES ( '62569', 'Keith_Huel', 'https://s3.amazonaws.com/uifaces/faces/twitter/8d3k/128.jpg', '2018-06-24T11:41:26.774Z', 'Twitter','Voluptate enim doloribus placeat excepturi. Eius sed doloremque laborum ad facere laboriosam quis. Corporis voluptas nulla nulla molestiae et. Et cum atque voluptatem delectus ex rem sed. Quidem dolorem aliquam molestiae nostrum rerum.',  '93')");
  db.run("INSERT INTO json_to_messages_db VALUES ( '3642', 'Estell_Wintheiser', 'https://s3.amazonaws.com/uifaces/faces/twitter/antonyzotov/128.jpg', '2018-10-17T09:21:03.845Z', 'Twitter', 'Laboriosam aut perferendis ut qui quas ducimus. Tempore nihil totam corporis ratione soluta accusantium labore hic.', '76')");
  db.run("INSERT INTO json_to_messages_db VALUES ( '1780', 'Brody.Yost98', 'https://s3.amazonaws.com/uifaces/faces/twitter/naupintos/128.jpg', '2018-09-10T11:01:23.854Z', 'Twitter', 'Iste voluptas eaque est doloribus dolorum nemo reiciendis distinctio. Qui quia minus. Sed est suscipit.', '40')");
  db.run("INSERT INTO json_to_messages_db VALUES ( '92074', 'Lilliana_Will38', 'https://s3.amazonaws.com/uifaces/faces/twitter/dutchnadia/128.jpg', '2019-03-26T18:21:27.558Z', 'Twitter','Voluptas sapiente molestias vitae. Sunt neque ipsa quam. Tempore odit ipsam est qui ut eius harum molestiae. Nulla sit eos doloribus iusto consequatur dolores. Possimus dolor alias tempora culpa consequuntur aliquam et quo delectus.',  '39')");
  db.run("INSERT INTO json_to_messages_db VALUES ( '28906', 'Wilfredo_Dickens', 'https://s3.amazonaws.com/uifaces/faces/twitter/madebybrenton/128.jpg', '2019-03-24T11:31:29.278Z', 'Twitter', 'Id id non ut sed sed et sint eaque. Inventore optio fugiat unde nulla voluptates quia quasi tenetur omnis. Dolorem in enim nihil autem recusandae. Nesciunt enim necessitatibus sunt eveniet ipsam cum. Rerum aut iure earum non neque quas qui.', '4')");
  db.run("INSERT INTO json_to_messages_db VALUES ( '67736', 'Milan_Kunde67', 'https://s3.amazonaws.com/uifaces/faces/twitter/rangafangs/128.jpg', '2019-03-03T16:23:31.674Z', 'Twitter', 'Ipsam sunt possimus quod voluptas explicabo. Occaecati molestiae placeat et quia sit eaque consequatur.', '9')");
  db.run("INSERT INTO json_to_messages_db VALUES ( '69703', 'Rashad.Predovic', 'https://s3.amazonaws.com/uifaces/faces/twitter/ricburton/128.jpg', '2018-10-23T16:58:19.168Z', 'Twitter','Unde quo molestias molestias veritatis rerum quis. Et quia enim aliquid sed. Aut nisi consequatur et animi. Rerum debitis ipsa natus velit nam suscipit autem. Et animi itaque alias quos at vel amet.',  '53')");
  db.run("INSERT INTO json_to_messages_db VALUES ( '91826', 'Verna.Casper', 'https://s3.amazonaws.com/uifaces/faces/twitter/lepinski/128.jpg', '2019-01-11T07:35:33.351Z', 'Twitter', 'Cumque recusandae accusamus voluptas. Quia repellat eos.', '73')");
  db.run("INSERT INTO json_to_messages_db VALUES ( '87442', 'Will_Collins7', 'https://s3.amazonaws.com/uifaces/faces/twitter/bistrianiosip/128.jpg', '2018-05-04T11:29:35.144Z', 'Twitter', 'Et et rerum temporibus libero natus. Beatae deleniti necessitatibus repellendus quo. In recusandae tempore totam quis suscipit mollitia. Sed cupiditate sequi ipsum. Facere rerum quaerat delectus et earum consequuntur. Mollitia labore et est nihil reprehenderit nisi ratione.', '6')");
  db.run("INSERT INTO json_to_messages_db VALUES ( '51946', 'Genesis.Cassin3', 'https://s3.amazonaws.com/uifaces/faces/twitter/joe_black/128.jpg', '2018-09-03T12:19:33.793Z', 'Twitter','Voluptates rerum illo delectus dicta et. Doloremque laudantium perspiciatis suscipit. Dolor et veniam. Omnis eos aut et hic dolor. Quia et aut.',  '5')");
  console.log('successfully created the json_to_messages_db table in myJSON.db');

  // print them out to confirm their contents:
  db.each("SELECT id , handle, avatar, timestamp, source, content, score FROM json_to_messages_db", (err, row) => {
      console.log(row.id + ": " + row.handle+ ' - ' + row.avatar + ": " + row.timestamp + ": " + row.source  + ": " +  row.content  + ": " + row.score);
  });
});

db.close();
