DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products
(
    id INT(20) NOT NULL,
    product_name VARCHAR
    (40) NOT NULL,
    department_id INT
    (50) NOT NULL,
    price DECIMAL
    (10,2) NOT NULL,
    quantity_available INT
    (10) NOT NULL,
    primary key
    (id)
);

select *
from products;

INSERT INTO products

VALUES
    (1, "Red Roses", 1, 25.00, 200),
    (2, "Drill", 2, 49.99, 170),
    (3, "Dinosaur Toy", 3, 4.50, 120),
    (4, "Cricket Bat", 4, 99.99, 150),
    (5, "Bamazon Bindle", 5, 145.99, 2000),
    (6, "Flower Pot", 1, 4.99, 240),
    (7, "Nails", 2, 0.20, 25),
    (8, "Toy Guitar", 3, 25.99, 202),
    (9, "Volleyball", 4, 15.00, 100),
    (10, "Bamazon Bill", 5, 199.99, 2000),
    (11, "Bamazon Water stick", 5, 25.99, 2000),
    (12, "Wickets", 4, 30.99, 4, 100),
    (13, "Plant Seeds", 1, 0.99, 1, 100);

    