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
            "Unfortunetly you have selected an unrecognizable ID, Please select an Id from the list above"
          );

          shop();
        } else {
          inquirer
            .prompt({
              type: "input",
              name: "quantity",
              message: "How many of those you like to buy?"
            })
            .then(function(amount) {
              var quantity = amount.quantity;
              if (quantity > res[0].quantity_available) {
                console.log(
                  "Sorry we only have " +
                    res[0].quantity_available +
                    " items in stock"
                );
                shopping();
              } else {
                console.log("");
                console.log("you have selected " + res[0].product_name);
                console.log(
                  "the amount you have selected " +
                    quantity +
                    " at a price of " +
                    res[0].Price +
                    " a peice"
                );
                console.log(
                  "for a grand total of $" +
                    (quantity * res[0].Price).toFixed(2)
                );
                var newQuantity = res[0].quantity_available - quantity;
                connection.query(
                  "UPDATE products SET quantity_available = " +
                    newQuantity +
                    " WHERE id = " +
                    res[0].id,
                  function(err, resUpdate) {
                    if (err) throw err;
                    console.log("");
                    console.log("Your Order has been Processed");
                    console.log("Thank you for Shopping with us...!");
                    console.log("");
                    connection.end();
                  }
                );
              }
            });
        }
      });
    });
};

display();
