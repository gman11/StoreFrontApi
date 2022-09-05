import Client from '../database';
import bcrypt from 'bcrypt';

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS as string;

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
       
            const sql = 'INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *';// @ts-ignore
            const conn = await Client.connect();
  
            const hash = bcrypt.hashSync(
                u.password + pepper, 
                parseInt(saltRounds)
              );

            const result = await conn.query(sql, [u.firstName, u.lastName, hash]);
  
            const user = result.rows[0];
  
            conn.release();
        
            return user;
        } catch (error) {
            throw new Error(`Could not add new user ${u.firstName}. Error: ${error}`)
        }
    }
   async authenticate(u:User):Promise<User | null>  {
    try {
        const conn = await Client.connect();
        const sql = 'SELECT * FROM users WHERE id=($1)';
        const result = await conn.query(sql,[u.id]);
        
        if(result.rows.length){

            const user = result.rows[0];
            if(bcrypt.compareSync(u.password+pepper, user.password)){
                return user;
            }
        }
        
        return null; 
    } catch (error) {
        throw new Error(`Could not authenticate user ${u.id}. Error: ${error}`)
    }
   }
}