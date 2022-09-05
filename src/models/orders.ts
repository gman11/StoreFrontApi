import Client from '../database';

export type Order = {
    id: Number,
    user_id: Number,
    status:string
}
export class OrderStore{
    async index(): Promise<Order[]>{
        try {
           const conn = await Client.connect();
           const sql = 'SELECT * FROM orders';
           const result = await conn.query(sql);
           conn.release(); 
           return result.rows;  
        } catch (error) {
            throw new Error(`Cannot get orders ${error}`);
        }
       }
   
       async show(id: string): Promise<Order>{
           try {
               const sql = 'SELECT * FROM orders WHERE id=($1)';// @ts-ignore
               const conn = await Client.connect();
               const result = await conn.query(sql, [id]);
               conn.release();
   
               return result.rows[0];
           }
            catch (error) {
               
               throw new Error(`Could not find orders ${id}. Error: ${error}`);
           }    
       }
    async create(userId:number,status:string):Promise<Order>{
        try {
            const sql = 'INSERT INTO orders (user_Id, status) VALUES ($1,$2) RETURNING *';
            //@ts-ignore
            const  conn = await Client.connect();
            const result = await conn.query(sql,[userId,status]);
            const order = result.rows[0];
            return order;
        } catch (error) {
            throw new Error(`Could not add order for userId  ${userId}: ${error}`);

        }
    }

    async addProduct(orderId:number,productId:number,quantity:number):Promise<Order>{

        try {
            const sql = 'INSERT INTO orders_products (order_id, product_id,quantity) VALUES ($1,$2,$3) RETURNING *';
        //@ts-ignore
        const conn = await Client.connect();
        const result = await conn.query(sql,[orderId,productId,quantity]);
        const order = result.rows[0];
        conn.release();
        return order;

        } catch (error) {
            throw new Error(`Could not add product ${productId} to order ${orderId}: ${error}`);
        }
    }
    //current order
    async currentUserOrders(userId: string): Promise<Order[]>{
        try {
            const sql = 'SELECT * FROM orders WHERE user_id=($1)';// @ts-ignore
            const conn = await Client.connect();
            const result = await conn.query(sql, [userId]);
            conn.release();

            return result.rows;
        }
         catch (error) {
            
            throw new Error(`Could not find orders for user ${userId}. Error: ${error}`);

        }    
    }
}
