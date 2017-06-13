var inquirer = require('inquirer'),
mysql = require('mysql'),
columnify = require('columnify'),

prompt = inquirer.createPromptModule(),

connection = mysql.createConnection({
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

function superChoices() {
    inquirer.prompt([
        {
        type: "list",
        name: "department",
        message: "What would you like to do now?",
        choices: ["View Product Sales by Department", "Create New Department"]
        }
    ]).then(function(supervise) {
        switch (supervise.department) {
            case "View Product Sales by Department":
                viewDept();
            break;
            case "Create New Department":
                newDept();
            break;
        }    
    });
}
superChoices();

// Display all database fields
function viewDept() {
    connection.query("SELECT * FROM departments", function(err, res) {
        connection.query("UPDATE departments SET ? + (product_sales - over_head_costs)", {
            total_profit: 0
        }, function(err, res) {});

        var column = columnify(res, {
            config: {
                department_id: {minWidth: 5},
                department_name: {minWidth: 15},
                over_head_costs: {minWidth: 10},
                product_sales: {minWidth: 10},
                total_profit: {minWidth: 10}
            }
        })
        console.log(column + "\n");
        superChoices(); // offer original questions again
    });
}

// Create a new department
function newDept() {
    inquirer.prompt([
        {
        type: "input",
        name: "dept",
        message: "What is the department name?"
        },
        {
        type: "input",
        name: "costs",
        message: "What are the overhead costs?"
        }
    ]).then(function(addNew) {
        connection.query("INSERT INTO departments SET ?", {
            department_name: addNew.dept,
            over_head_costs: addNew.costs,
            product_sales: 0,
            total_profit: 0
        }, function(err, res) {
            console.log("The new department has been added\n");
            superChoices(); // offer original questions again
        });
    });
}