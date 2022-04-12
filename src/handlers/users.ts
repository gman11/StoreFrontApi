import express, {Request, Response} from 'express';
import {User, UserStore} from  '../models/users';
import jwt from 'jsonwebtoken';
import verifyToken from '../MiddleWare/verifyToken';

const store  = new UserStore();
const jwt_token_secret = process.env.TOKEN_SECRET as string;

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
     console.log(user);
     let token = jwt.sign(user,jwt_token_secret,{expiresIn:'30d'}); 
     console.log(token);
     res.json(token);
     
   } catch (error) {
    res.status(400);
    res.json(error);
   }
}
const authenticate = async (req: Request, res: Response) => {
    console.log("inside authenticate");
    const user: User = {
      id: req.body.id,
      firstName: "",
      lastName: "",
      password: req.body.password,
    }

    try {

        const u = await store.authenticate(user);
        console.log(u);
        console.log("inside authenticate after model");
        let token = jwt.sign({ user: u }, jwt_token_secret,{expiresIn:'30d'});
        console.log("inside authent  after token");

        
        res.json(token)
    } catch(error) {
        res.status(401)
        res.json({ error })
    }
  }

const user_routes= (app:express.Application) =>{
    app.get('/user',verifyToken,index);
    app.get('/user/:id',verifyToken,show);
    app.post('/user', create);
    app.post('/userAuth',authenticate);   
}

export default user_routes;