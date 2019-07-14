// function startMenu() {
  // prompt for info about the item being put up for auction
  inquirer
    .prompt([
      {
        name: "productID",
        type: "input",
        message: "What product ID do you want to buy?"
      }
      // {
      //   name: "productQuantity",
      //   type: "input",
      //   message: "How many units of that product do you want to buy?",
      //   validate: function(value) {
      //     if (isNaN(value) === false) {
      //       return true;
      //     }
      //     return false;
      //   }
      // }
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        // "INSERT INTO auctions SET ?",
        {
          // item_name: answer.item,
          // category: answer.category,
          // starting_bid: answer.startingBid || 0,
          // highest_bid: answer.startingBid || 0
        },
        function(err) {
          if (err) throw err;
          console.log("Your auction was created successfully!");
          // re-prompt the user for if they want to bid or post
          // readProducts();
        }
      );
    });
}






var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "bamazon_db"
});

// npm install mysql inquirer

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  startMenu();
});

//https://www.npmjs.com/package/console.table

var query = "select item_id product_name department_name price stock_quantity from products";

connection.query(query, 
  // {
  //   item_id: resp.id,
  //   product_name:  answer.product_name,
  //   department_name : answer.department_name,
  //   price: answer.price,
  //   stock_quantity: answer.stock_quantity
  // },
function (err, res) {
        for (var i = 0; i < res.length; i++) {

          console.log(
            "Item ID: " + res[i].item_id        
            );
        }

function startMenu() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Enter product ID you want to view",
        "How many units do you want to buy?"
        // "Find data within a specific range",
        // "Search for a specific song",
        // "Find artists with a top song and top album in the same year"
      ]
    })
    .then(function (answer) {
      switch (answer.action) {

        case "Enter item ID you want to buy":
          productQuantity();
          break;

        case "How many units do you want to buy?":
          productBuy();
          break;
      }
    });
   // connection.end();
}

function productQuantity() {
  // inquirer
  //   .prompt({
  //     name: "artist",
  //     type: "input",
  //     message: "What artist would you like to search for?"
  //   })
  //   .then(function (answer) {
  //     var query = "SELECT position, song, year FROM top5000 WHERE ?";
  //     connection.query(query, { artist: answer.artist }, function (err, res) {
  //       for (var i = 0; i < res.length; i++) {
  //         console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
  //       }
  //       startMenu();
  //     });
  //   });
}

function productBuy() {
  // var query = "SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1";
  // connection.query(query, function(err, res) {
  //   for (var i = 0; i < res.length; i++) {
  //     console.log(res[i].artist);
  //   }
  startMenu();
}

// function rangeSearch() {
//   inquirer
//     .prompt([
//       {
//         name: "start",
//         type: "input",
//         message: "Enter starting position: ",
//         validate: function(value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false;
//         }
//       },
//       {
//         name: "end",
//         type: "input",
//         message: "Enter ending position: ",
//         validate: function(value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false;
//         }
//       }
//     ])
//     .then(function(answer) {
//       var query = "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
//       connection.query(query, [answer.start, answer.end], function(err, res) {
//         for (var i = 0; i < res.length; i++) {
//           console.log(
//             "Position: " +
//               res[i].position +
//               " || Song: " +
//               res[i].song +
//               " || Artist: " +
//               res[i].artist +
//               " || Year: " +
//               res[i].year
//           );
//         }
//         startMenu();
//       });
//     });
// }

// function songSearch() {
//   inquirer
//     .prompt({
//       name: "song",
//       type: "input",
//       message: "What song would you like to look for?"
//     })
//     .then(function(answer) {
//       console.log(answer.song);
//       connection.query("SELECT * FROM top5000 WHERE ?", { song: answer.song }, function(err, res) {
//         console.log(
//           "Position: " +
//             res[0].position +
//             " || Song: " +
//             res[0].song +
//             " || Artist: " +
//             res[0].artist +
//             " || Year: " +
//             res[0].year
//         );
//         startMenu();
//       });
//     });
// }

// function songAndAlbumSearch() {
//   inquirer
//     .prompt({
//       name: "artist",
//       type: "input",
//       message: "What artist would you like to search for?"
//     })
//     .then(function(answer) {
//       var query = "SELECT top_albums.year, top_albums.album, top_albums.position, top5000.song, top5000.artist ";
//       query += "FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ";
//       query += "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position";

//       connection.query(query, [answer.artist, answer.artist], function(err, res) {
//         console.log(res.length + " matches found!");
//         for (var i = 0; i < res.length; i++) {
//           console.log(
//             i+1 + ".) " +
//               "Year: " +
//               res[i].year +
//               " Album Position: " +
//               res[i].position +
//               " || Artist: " +
//               res[i].artist +
//               " || Song: " +
//               res[i].song +
//               " || Album: " +
//               res[i].album
//           );
//         }
//         startMenu();
//       });
//     });
// }
