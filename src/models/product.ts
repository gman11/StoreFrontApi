import Client from '../database';

export type Product  = {
    id:Number;
    product:string;
    vendor:string;
}

export class ProductStore{
    async index(): Promise<Product[]>{
     try {
        const conn = await Client.connect();
        const sql = 'SELECT * FROM products';
        const result = await conn.query(sql);
        conn.release(); 
        return result.rows;  
     } catch (error) {
         throw new Error(`Cannot get products ${error}`);
     }
    }

    async show(id: string): Promise<Product>{
        try {
            const sql = 'SELECT * FROM products WHERE id=($1)';// @ts-ignore
            const conn = await Client.connect();

             const result = await conn.query(sql, [id]);

             conn.release();

            return result.rows[0];
            
        }
         catch (error) {
            
            throw new Error(`Could not find product ${id}. Error: ${error}`);

        }    
    }
    async create(p: Product): Promise<Product> {
        try {
      const sql = 'INSERT INTO product (product, vendor) VALUES($1, $2) RETURNING *';// @ts-ignore
      const conn = await Client.connect();
  
      const result = await conn.query(sql, [p.product, p.vendor]);
  
      const product = result.rows[0];
  
      conn.release();
  
      return product;
        } catch (error) {
            throw new Error(`Could not add new product ${p.product}. Error: ${error}`)
        }
    }
    async delete(id: string): Promise<Product> {
        try {
      const sql = 'DELETE FROM product WHERE id=($1)';
      // @ts-ignore
      const conn = await Client.connect();
  
      const result = await conn.query(sql, [id]);
  
      const product = result.rows[0];
  
      conn.release();
  
      return product;
        } catch (error) {
            throw new Error(`Could not delete book ${id}. Error: ${error}`)
        }
    }

}