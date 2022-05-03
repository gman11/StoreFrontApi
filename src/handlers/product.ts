import express, {Request, Response} from 'express';
import verifyToken from '../MiddleWare/verifyToken';
import { Product, ProductStore } from '../models/product';

const store  = new ProductStore();

const index = async (_req: Request, res: Response) =>{
    const products = await store.index();
    res.json(products);
}

const show = async (req: Request, res: Response) =>{
    const product = await store.show(req.params.id);
    res.json(product);
}
const create  = async (req: Request, res: Response) =>{
   try {
      const newProduct: Product = {
          id: 0,
          name: req.body.name,
          price: req.body.price
      }
     const product = await store.create(newProduct);
     res.json(product);
   } catch (error) {
    res.status(400)
    res.json(error)
   }
   
}

const update = async (req: Request, res: Response) =>{
    try{
    const updateProduct: Product = {
        id: req.body.id,
        name: req.body.name,
        price: req.body.price
    }
    const product = await store.update(updateProduct);
    res.json(product);
} catch (error) {
    res.status(400)
    res.json(error)
   }
}
const product_routes= (app:express.Application) =>{
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products',verifyToken, create);
    app.patch('/products', update);   
}

export default product_routes;