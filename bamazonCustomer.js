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

function queryAllProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].itemId + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }
        console.log("-----------------------------------");

        inquirer
            .prompt([
                {
                    type: "input",
                    name: "whatId",
                    message: "What is the Id of the product you would like to buy?"
                },

                {
                    type: "input",
                    name: "howMany",
                    message: "How many would you like?"
                },
            ]);
        function updateCount() {
            connection.query("SELECT * FROM products", function (err, res) {
                if (err) throw err;
                if (res[i].stock_quantity >= "name.howMany") + (res[i].itemId === "name.whatId")

                "UPDATE products SET stock_quantity = stock_quantity - name.howMany"
            // console.log(res);
            // connection.end();
        })
        };


        connection.end();

    });
};






// logs the actual query being run
// console.log(query.sql);
// connection.end();




//     .then(function() {
//         if   {
// .howMany === res[i].stock_quantity
//         }
//     })