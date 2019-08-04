var inquirer = require('inquirer');
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    queryAllProducts();
    afterConnection();

});

function afterConnection() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // console.log(res);
        // connection.end();
    });
};
inquirer
    .prompt([
        {
            type: "list",
            message: "Menu options",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
            name: "menu"
        
        }
    ]).then (function(choice) {
        if (choice.menu === View_Products_for_Sale) {
            connection.query("SELECT * FROM products", function (err, res) {
                if (err) throw err;
                for (var i = 0; i < res.length; i++) {
                    console.log(res[i].id + " | " + res[i].itemId + " | " + res[i].product_name + " | " + res[i].price + " | " + res[i].stock_quantity);
                }
              }
        )}
            });