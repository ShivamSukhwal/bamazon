var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("cli-table2");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "bamazon_db",
  port: 3306
});

connection.connect();

var display = function() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log("");
    console.log("      Bamazon - Bam It's yours    ");
    console.log("");
    console.log("We Hope You Find What Your Looking For :)");
    console.log("");
    var tables = new table({
      head: ["Id", "Product", "Price($)"],
      colWidths: [10, 40, 10],
      colAligns: ["center", "center", "right"],
      style: {
        head: ["lime"],
        compact: true
      }
    });
    for (var i = 0; i < res.length; i++) {
      tables.push([res[i].id, res[i].product_name, res[i].Price]);
    }

    console.log(tables.toString());
    console.log("");
    shop();
  });
};

var shop = function() {
  inquirer
    .prompt({
      type: "input",
      name: "desiredProduct",
      message: "Please enter the ID of the prouct you would like to purchase."
    })
    .then(function(productId) {
      var selection = productId.desiredProduct;
      connection.query("SELECT * FROM products WHERE Id=?", selection, function(
        err,
        res
      ) {
        if (err) throw err;
        if (res.length === 0) {
          console.log(
            "That Product doesn't exist, Please enter a Product Id from the list above"
          );

          shop();
        } else {
          console.log("Thanks for the selection");
        }
      });
    });
};
display();
