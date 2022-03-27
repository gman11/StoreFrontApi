import Client from '../database';

export type User ={
    id?:Number;
    firstName:string;
    lastName:string;
    password:string;
}

export class UserStore{
    async index(): Promise<User[]>{
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release(); 
            return result.rows;  
         } catch (error) {
             throw new Error(`Cannot get users ${error}`);
         } 
    }
    async show(id: string): Promise<User>{
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)';// @ts-ignore
            const conn = await Client.connect();
            const result = await conn.query(sql, [id]);
            conn.release();

            return result.rows[0];
            
        }
         catch (error) {
            
            throw new Error(`Could not find user ${id}. Error: ${error}`);

        }    
    }
    async create(u: User): Promise<User> {
        try {
            const sql = 'INSERT INTO users (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *';// @ts-ignore
            const conn = await Client.connect();
  
            const result = await conn.query(sql, [u.firstName, u.lastName, u.password]);
  
            const user = result.rows[0];
  
            conn.release();
  
            return user;
        } catch (error) {
            throw new Error(`Could not add new user ${u.firstName}. Error: ${error}`)
        }
    }
}