import express, {Request, Response} from 'express';
import {User, UserStore} from  '../models/users';

const store  = new UserStore();

const index = async (_req: Request, res: Response) =>{
    console.log("inside users index");
    const users = await store.index();
    res.json(users);
}

const show = async (req: Request, res: Response) =>{
    console.log("inside user show " + req.params.id);
    const user = await store.show(req.params.id);
    res.json(user);
}
const create  = async (req: Request, res: Response) =>{
    console.log("inside user create");
    console.log(req.body.firstName);
   try {
      const newUser: User = {
          id: 0,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          password: req.body.password
      }
     const user = await store.create(newUser);
     res.json(user);
   } catch (error) {
    res.status(400)
    res.json(error)
   }
}

const user_routes= (app:express.Application) =>{
    app.get('/user', index);
    app.get('/user/:id', show);
    app.post('/user', create);   
}

export default user_routes;