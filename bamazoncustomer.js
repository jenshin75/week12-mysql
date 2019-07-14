var mysql = require("mysql"); // npm install mysql inquirer
var inquirer = require("inquirer");
var cTable = require('console.table'); //https://www.npmjs.com/package/console.table

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "bamazon_db"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  readProducts();

});

function readProducts() {
  console.log("Reading all products...\n");
  connection.query("select * from products", function (err, res)
  {
    if (err) throw err;
    console.table(res);
    startMenu()
  });
  
function startMenu() {
  // prompt for info about the item being put up for auction
  inquirer
    .prompt([
      {
        name: "productID",
        type: "input",
        message: "What product ID do you want to buy?"
      },
      {
        name: "productQuantity",
        type: "input",
        message: "How many units of that product do you want to buy?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }

          return false;
        }
      }])
  // .then(function(answer) {
  // when finished prompting, insert a new item into the db with that info
  // connection.query(
  // "INSERT INTO auctions SET ?",
  // {
  // item_name: answer.item,
  // category: answer.category,
  // starting_bid: answer.startingBid || 0,
  // highest_bid: answer.startingBid || 0
  // },
  // function(err) {
  //   if (err) throw err;
  //   console.log("Your auction was created successfully!");
  // re-prompt the user for if they want to bid or post
  // readProducts();
  //         }
  //       );
  //     });
  // }
}
};