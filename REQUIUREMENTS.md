# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
  route:  "/products" [GET]
- Show
   route: "/products:id" [GET]
- Create [token required]
   route "/products" [POST]

#### Users
- Index [token required]
   route: "/user" [GET]
- Show [token required]
   route: "/user:id [GET]
- Create [token required]
   route: "/user:user" [POST]

#### Orders
- Index [token required]
   route: "/order" [GET]
- Show [token required]
   route: "/order:id [GET]
- Create [token required]
   route: "/order:" [POST]
- Current Order by user (args: user id)[token required]
   route: "/currentOrderByUser/:id" [GET]
- add product to order
   route: "/addProductToOrder/:id [POST]
## Data Shapes
#### Product
-  id
- name
- price

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- user_id
- status of order (active or complete)

#### Orders_Products
- id
- order_id
- product_id
- quantity

### Database Schema
# Orders
 -id      type integers, not null, primary key
 -user_id type integer, foreign key users(id)
 -status  type var(150)

# users
-id       type integer, not null, primary key
-firstname type var(150)
-lastname  type var(150)
-password  type var(150)

# products
-id       type integer, not null, primary key
-name     type var(150)
-prive    type var(150)

# orders_products
-id       type integer, not null, primary key
-order_id type integer, not null, foreign key orders(id)
-product_id type integer, not null, foreign key products(id)
-quantity  type integer, not null
