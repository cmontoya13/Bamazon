CREATE DATABASE if not exists Bamazon;
USE Bamazon;
CREATE TABLE products (
	id INTEGER(50) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price INTEGER(10) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL,
PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("tent", "camping", 59.95, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("sleeping bag", "camping", 30.99, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("cot", "camping", 19.99, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("baseball", "sports", 3.95, 30);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("basketball", "sports", 17.99, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("hockey stick", "sports", 42.99, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("fishing pole", "fishing", 34.99, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("tackle box", "fishing", 12.95, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("mask", "diving", 18.99, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("snorkel", "diving", 12.99, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("fins", "diving", 24.95, 5);

SELECT * FROM products;