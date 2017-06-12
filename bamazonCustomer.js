var inquirer = require('inquirer');
var mysql = require('mysql');
var columnify = require('columnify');

var prompt = inquirer.createPromptModule();

var connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "root",
    database: "Bamazon"
});

connection.connect(function(err) {
	if (err) throw err;
	// console.log("connected as id " + connection.threadId);
});

// Display all database fields
function inventoryList() {
connection.query("SELECT id,product_name,price FROM products", function(err, res) {
    console.log("\nItems available for purchase:");
    var column = columnify(res, {
        config: {
            id: {minWidth: 5},
            product_name: {minWidth: 15},
            price: {minWidth: 10}
        }
    })
    console.log(column);
    orderDetails(res); // pass results to orderDetails function
});
}
inventoryList();
// Prompt customer for order details
function orderDetails(res) {
    inquirer.prompt([
        {
    type: "input",
    name: "id",
    message: "What is the ID# of the item you would like to buy?"
    },
    {
    type: "input",
    name: "quantity",
    message: "What quantity would you like to purchase?"
    }
    ]).then(function(inventoryCheck) {
        connection.query("SELECT * FROM products", function(err, res) {
            var id = inventoryCheck.id; // variable of user choice id
            var item_id = id - 1; // necessary to match user choice id to index position
            var qty = inventoryCheck.quantity; // variable of user choice quantity
            var qtyAvail = res[item_id].stock_quantity; // variable of database quantity available
            // If enough stock, fulfill order
            if (qty <= qtyAvail) { // check if enough product in stock
                var newQtyAvail = qtyAvail - qty; // variable of remaining stock
                // Update the database with new quantity
                connection.query("UPDATE products SET ? WHERE ?", [{
                    stock_quantity: newQtyAvail
                }, {
                    id: id
                }], function(err, res) {});
                // Display total cost
                connection.query("SELECT * FROM products", function(err, res) {
                    var cost = res[item_id].price;
                    var totalCost = cost * qty;
                    console.log("Your total cost is: $" + totalCost);
                    again();
                });
            }   
            else { // not enough stock to fulfill order
                console.log("Insufficient Inventory!");
                again();
            }
        function again() {
            inquirer.prompt([
                {
            type: "list",
            name: "another",
            message: "Would you like to purchase another item?",
            choices: ["Yes", "No"]
            }
            ]).then(function(anotherItem) {
                if (anotherItem.another === "Yes") {
                    inventoryList();
                }
                else {
                    console.log("Thank you and have a wonderful day");
                }
            });
        }
        });
    });
    
}

