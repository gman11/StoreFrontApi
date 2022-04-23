/* Replace with your SQL commands */
CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    product_id int REFERENCES products(id),
    quantity float8,
    user_id int REFERENCES users(id),
    status VARCHAR(150)
);