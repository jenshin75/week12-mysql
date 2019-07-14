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
  startMenu();
});

function readProducts() {
  console.log("Reading all products...\n");
  connection.query("select * from products", function (err, res) {
    if (err) throw err;
    console.table(res);
  }
  )
};

function startMenu() {

};
