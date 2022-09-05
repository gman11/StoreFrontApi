# Storefront Backend Project
Programmer: Jesus Guerrero
Date: 2/01/2022

# How to run this program
1. Run the docker-compose.yml file
2. Connect to the Postsgres server using the default username and password.
3. the ports are 5432/5432
4. Create user for the database
5. create the store_front and store_front_test databases
6. npm install
7. npm install --save-dev typescript
9. run npm run biuld to build the program.
9. run npm run start to start the program.
10. run npm run test to test the program.
note: must manually set the ENV variable equal to test:  ENV = test

# How to use the API?
1. First use the user create a new user using the user post method.
2. Using the password from step 1, use the authenticate post method to get your token.
3. Save this token so that you can use the rest of the methods.
4. Please first create orders and products before using the addProductToOrder method.

# Create user
    CREATE USER user1 WITH PASSWORD 'password1';

# Create databases
    CREATE DATABASE store_front;
    CREATE DATABASE store_front_test;
# Grant all database privileges to user1 in both databases
    GRANT ALL PRIVILEGES ON DATABASE store_front TO user1;
    GRANT ALL PRIVILEGES ON DATABASE store_front_test TO user1;

# Environment variables to pass the project.
POSTGRES_HOST = "127.0.0.1"
POSTGRES_DB = "store_front"
POSTGRES_TEST_DB = "store_front_test"
POSTGRES_USER = "user1"
POSTGRES_PASSWORD="password1"
ENV=test
BCRYPT_PASSWORD=mypassword
SALT_ROUNDS=10
TOKEN_SECRET=newpasswordtoken

