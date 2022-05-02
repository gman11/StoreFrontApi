import express, {Request, Response} from 'express';
import verifyToken from '../MiddleWare/verifyToken';
import {Order, OrderStore} from '../models/orders';

const store = new OrderStore();

const currentOrderByUser = async ( req: Request, res: Response) =>{
    const order = await store.currentOrder(req.params.id);
    res.json(order);
}

const order_routes = ( app:express.Application) =>{
    app.get('/order/:id' ,verifyToken,currentOrderByUser);
}
export default order_routes;