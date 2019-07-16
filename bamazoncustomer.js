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
  console.log("connected as id " + connection.threadId);
  readProducts();
});

function readProducts() {
  console.log("\n*****Displaying all products*****\n");
  connection.query("select * from products", function (err, res) {
    if (err) throw err;
    console.table(res)
    startMenu();
  });
}

function startMenu() {
  inquirer
    .prompt([
      {
        name: "productID",
        type: "input",
        message: "What product ID do you want to buy?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
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
    .then(function (answer) {
      console.log(answer)
      if (answer.productID > 0) {
        updateProducts(answer);
      }
      else
        connection.end();
    }
    )
};

function updateProducts(data) {
  // console.log("data:", data)
  console.log("\nChecking and updating database...\n");
  connection.query("select * from products where item_id=" + parseInt(data.productID), function (err, res) {
  
  if (err) throw err;
    // console.log(res[0].stock_quantity)s
    if (parseInt(data.productQuantity) <= res[0].stock_quantity) {
      connection.query(
        "update products set ? where ?",
        [
          { stock_quantity: res[0].stock_quantity - parseInt(data.productQuantity) },
          { item_id: parseInt(data.productID) }
        ],
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " product updated!");
          readProducts();
        }
      )
    }
    else {
      console.log("*****INSUFFICIENT QUANTITY! PICK SOMETHING ELSE.*****\n")
      startMenu();
    }
  });
};
