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
  connection.query("select * from products", function(err, res) 
  {
    if (err) throw err;
    console.table(res)
    startMenu();
    connection.end();
  });
}

function startMenu() {
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
          validate: function (value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }
      ])
};

function updateProducts() {
    console.log("Updating all product quantities...\n");
    var query = connection.query(
      "update products set ? where ?",
      [
        {
          productID: item_id
        },
        {
          productQuantity: stock_quantity
        }
      ], 
      function (err, res) 
      {
        if (err) throw err;
        console.log(res.affectedRows + " products updated!\n");
      readProducts();
      }
    )
  };
