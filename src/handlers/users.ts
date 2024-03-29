import express, {Request, Response} from 'express';
import {User, UserStore} from  '../models/users';
import jwt from 'jsonwebtoken';
import verifyToken from '../MiddleWare/verifyToken';

const store  = new UserStore();
const jwt_token_secret = process.env.TOKEN_SECRET as string;

const index = async (_req: Request, res: Response) =>{
    const users = await store.index();
    res.json(users);
}

const show = async (req: Request, res: Response) =>{
    const id:string = req.params.id;
    const user = await store.show(id);
    res.json(user); 
}
const create  = async (req: Request, res: Response) =>{
   try {
      const newUser: User = {
          id: 0,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          password: req.body.password
      }
     const user = await store.create(newUser);
     res.status(201);
     res.json(user);
     
   } catch (error) {
    res.status(400);
    res.json(error);
   }
}
const authenticate = async (req: Request, res: Response) => {

    const user: User = {
      id: req.body.id,
      first_name: "",
      last_name: "",
      password: req.body.password,
    }

    try {
        const u = await store.authenticate(user);
        let token = jwt.sign({ user: u }, jwt_token_secret,{expiresIn:'30d'});  
        res.json(token)
    } catch(error) {
        res.status(401)
        res.json({ error })
    }
  }

const user_routes= (app:express.Application) =>{
    app.get('/user',verifyToken,index);
    app.get('/user/:id',verifyToken,show);
    app.post('/user', create); // no verifyToken so I can create initial user.
    app.post('/userAuth',authenticate);   
}

export default user_routes;