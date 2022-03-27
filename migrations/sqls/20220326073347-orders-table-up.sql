/* Replace with your SQL commands */
CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    product_id int,
    quantity float8,
    user_id int,
    status VARCHAR(150)
);