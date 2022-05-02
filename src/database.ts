import dotnet from 'dotenv';
import {Pool} from 'pg';
dotnet.config();

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_TEST_DB,
    ENV
} = process.env;

let Client = new Pool({
    host : POSTGRES_HOST,
    database: ENV ==='dev'? POSTGRES_DB:  POSTGRES_TEST_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
});

export default Client;