import express, {Request, Response} from 'express';
import { statSync } from 'fs';
import verifyToken from '../MiddleWare/verifyToken';
import {Order, OrderStore} from '../models/orders';

const store = new OrderStore();

const show = async (req:Request, res:Response)=>{
    try {
        const id = req.params.id;
        const orders = await store.show(id);
        return res.json(orders);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const index = async (req:Request, res:Response)=>{
    try {
        const orders = await store.index();
        return res.json(orders);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const create =  async (req:Request, res:Response)=>{
    const user_id = req.body.user_id;
    const status = req.body.status;
    try {
       const newOrder = await store.create(Number(user_id),status);
       res.json(newOrder);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const addProduct = async (req:Request, res: Response) =>{
    const orderId:number = Number(req.params.id.toString());
    const productId:number = Number(req.body.productId);
    const quantity:number = parseInt(req.body.quantity);
   try {
    const addedProduct = await store.addProduct(orderId,productId,quantity);
    res.json(addedProduct)
   } catch (error) {
    res.status(400);
    res.json(error);
    
   }
}
const currentOrderByUser = async ( req: Request, res: Response) =>{
    const order = await store.currentUserOrders(req.params.id);
    res.json(order);
}

const order_routes = ( app:express.Application) =>{
    app.get('/currentOrderByUser/:id' ,verifyToken,currentOrderByUser);
    app.post('/addProductToOrder/:id',verifyToken, addProduct);
    app.post('/order',verifyToken,create);
    app.get('/order',verifyToken,index);
    app.get('/order/:id',verifyToken,show);

}
export default order_routes;