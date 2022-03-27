import Client from '../database';

export type Product  = {
    id?:Number;
    name:string;
    price:string;
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
        console.log("inside show model " + id);
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
      const sql = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *';// @ts-ignore
      const conn = await Client.connect();
  
      const result = await conn.query(sql, [p.name, p.price]);
  
      const product = result.rows[0];
  
      conn.release();
  
      return product;
        } catch (error) {
            throw new Error(`Could not add new product ${p.name}. Error: ${error}`)
        }
    }
    async update(p: Product): Promise<Product> {
        try {
      const sql = 'UPDATE products SET name =($1), price = ($2) WHERE id = ($3) RETURNING *';// @ts-ignore
      const conn = await Client.connect();
  
      const result = await conn.query(sql, [p.name, p.price, p.id]);
  
      const product = result.rows[0];
  
      conn.release();
  
      return product;
        } catch (error) {
            throw new Error(`Could not add new product ${p.name}. Error: ${error}`)
        }
    }
    async delete(id: string): Promise<Product> {
        try {
      const sql = 'DELETE FROM products WHERE id=($1)';
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