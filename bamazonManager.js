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

// List choices of things to do
function choices() {
inquirer.prompt([
    {
    type: "list",
    name: "product",
    message: "What would you like to do now?",
    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }
]).then(function(admin) {
    switch (admin.product) {
        case "View Products for Sale":
            productList();
        break;
        case "View Low Inventory":
            lowInventory();
        break;
        case "Add to Inventory":
            addInventory();
        break;
        case "Add New Product":
            newItem();
        break;
    }    
});
}

// Columnify data results
function columnData(res) {
    // console.log("\n");
    var column = columnify(res, {
        config: {
            id: {minWidth: 5},
            product_name: {minWidth: 15},
            department_name: {minWidth: 15},
            price: {minWidth: 10},
            stock_quantity: {minWidth: 5}
        }
    })
    console.log(column + "\n"); // create columns and add line break
}

// List all products
function productList() {
    connection.query("SELECT id,product_name,price,stock_quantity FROM products", function(err, res) {
        columnData(res); // invoke function to create column data and pass response
        choices(); // invoke function of choice options
    });
}

// List low inventory items of quantity less than 5
function lowInventory() {
    connection.query("SELECT id,product_name,stock_quantity FROM products GROUP BY product_name HAVING MAX(stock_quantity) < 5", function(err, res) {
        if (!res) { // no results - no low inventory
            console.log("Stock is Good");
        }
        else { // list low inventory items
            columnData(res); // invoke function to create column data and pass response
        }
        choices(); // invoke function of choice options
    });
}

function addInventory() {
    connection.query("SELECT * FROM products", function(err, res) {
        // Create array of all product names to list as choices
        var nameArray = [];
        for (var i=0; i<res.length; i++) {
            nameArray.push(res[i].product_name);
        }        
        inquirer.prompt([
            {
            type: "list",
            name: "product",
            message: "Choose a product to add inventory:",
            choices: nameArray
            },
            {
            type: "input",
            name: "quantity",
            message: "Quantity to add?"
            }
            ]).then(function(add) { // add quantity input to the products table by product name
                connection.query("UPDATE products SET ? +stock_quantity WHERE ?", [{
                stock_quantity: add.quantity
            },
            {
                product_name: add.product
            }], function(err, res) { // return a quantity change successful message
                console.log("Quantity has been updated\n");
                choices(); // invoke function of choice options
            });
        });
    });
}

// Add a new product item to the products table
function newItem() {
    inquirer.prompt([
        {
        type: "input",
        name: "product",
        message: "What is the product name?"
        },
        {
        type: "input",
        name: "department",
        message: "What department?"
        },
        {
        type: "input",
        name: "price",
        message: "Cost per item?"
        },
        {
        type: "input",
        name: "quantity",
        message: "Quantity?"
        }
        ]).then(function(addNew) { // insert new product into the products table
        connection.query("INSERT INTO products SET ?", {
            product_name: addNew.product,
            department_name: addNew.department,
            price: addNew.price,
            stock_quantity: addNew.quantity
        }, function(err, res) { // return a product add successful message
            console.log("New product has been added\n");
            choices(); // invoke function of choice options
        });
    });
}

choices(); // invoke function of choice options - upon first load