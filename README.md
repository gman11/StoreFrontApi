# Storefront Backend Project
Programmer: Jesus Guerrero
Date: 2/01/2022

# How to run this program
1. Run the docker-compose.yml file
2. Connect to the Postsgres server using the default username and password.
3. the ports are 5432/5432
4. create the store_front and store_front_test databases
5. run npm run biuld to build the program.
6. run npm run start to start the program.
7. run npm run test to test the program.
note: must manually set the ENV variable equal to test:  ENV = test

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