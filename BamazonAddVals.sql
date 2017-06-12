USE Bamazon;

UPDATE products
SET
	stock_quantity = 25
WHERE id = 5;

SELECT * FROM products;