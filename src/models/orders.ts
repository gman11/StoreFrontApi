import Client from '../database';

export type Order = {
    id: Number,
    product_id: Number, 
    quantity:Number, 
    user_id: Number,
    status:string
}
export class OrderStore{

    //current order
    async currentOrder(userId: string): Promise<Order>{
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)';// @ts-ignore
            const conn = await Client.connect();
            const result = await conn.query(sql, [userId]);
            conn.release();

            return result.rows[0];
        }
         catch (error) {
            
            throw new Error(`Could not find order for user ${userId}. Error: ${error}`);

        }    
    }
}
