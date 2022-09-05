/* Replace with your SQL commands */
CREATE TABLE orders_products (
  id SERIAL PRIMARY KEY,
  order_id int NOT NULL REFERENCES orders (id),
  product_id int NOT NULL REFERENCES products (id),
  quantity int NOT NULL
); 