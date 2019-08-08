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
            ]).then(function (answers) {
                console.log(answers);
                connection.query("SELECT * FROM products WHERE ?", [{ id: answers.whatId
                    }], function (err, res) {
                        if (err) throw err;
console.log(res);
                        if (res[0].stock_quantity >= parseInt(answers.howMany)) {
                            connection.query("UPDATE products SET  ? WHERE ?", [{ stock_quantity: res[0].stock_quantity - parseInt(answers.howMany) }, { id: parseInt(answers.whatId) }], function (err, res) {
                                if (err) throw err
                                else {
                                    queryAllProducts()
                                }
                            })
                        } else {
                            console.log("Insufficient Quantity")
                        }
                        // connection.end();

                    })
                // console.log(res);
            })
    });
};

// connection.end();



