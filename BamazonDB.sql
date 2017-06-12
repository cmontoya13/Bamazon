#CREATE DATABASE if not exists Bamazon;
USE Bamazon;
CREATE TABLE products (
	id INTEGER(30) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price FLOAT(7,2) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL,
PRIMARY KEY (id)
);

SELECT * FROM products;