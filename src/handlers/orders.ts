import express, {Request, Response} from 'express';
import {Order, OrderStore} from '../models/orders';

const store = new OrderStore();

const orderByUser = async ( req: Request, res: Response) =>{
    console.log("inside order show " + req.params.id);
    const order = await store.currentOrder(req.params.id);
    res.json(order);
}

const order_routes = ( app:express.Application) =>{
    app.get('/order:id' ,orderByUser);
}
export default order_routes;