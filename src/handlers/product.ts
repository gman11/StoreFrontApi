import express, {Request, Response} from 'express';
import { Product, ProductStore } from '../models/product';

const store  = new ProductStore();

const index = async (_req: Request, res: Response) =>{
    console.log("inside index");
    const products = await store.index();
    res.json(products);
}

const show = async (req: Request, res: Response) =>{
    console.log("inside show " + req.params.id);
    const product = await store.show(req.params.id);
    res.json(product);
}
const create  = async (req: Request, res: Response) =>{
    console.log("inside create");
    console.log(req.body.product);
   try {
      const newProduct: Product = {
          id: 0,
          product: req.body.product,
          vendor: req.body.vendor
      }
     const product = await store.create(newProduct);
     res.json(product);
   } catch (error) {
    res.status(400)
    res.json(error)
   }
   
}

const update = async (req: Request, res: Response) =>{
    console.log("inside update " + req.body.id);
    try{
    const updateProduct: Product = {
        id: req.body.id,
        product: req.body.product,
        vendor: req.body.vendor
    }
    console.log(updateProduct);
    const product = await store.update(updateProduct);
    res.json(product);
} catch (error) {
    res.status(400)
    res.json(error)
   }
}

const destroy = async (req: Request, res: Response) =>{
    console.log("inside delete " + req.params.id);

    const product = await store.delete(req.params.id);
    res.json(product);
}


const product_routes= (app:express.Application) =>{
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', create);
    app.patch('/products', update);
    app.delete('/products/:id', destroy);
    
}

export default product_routes;