
import dotnet from 'dotenv';
dotnet.config();
import express from 'express';
import jwt from 'jsonwebtoken';
const jwt_token_secret = process.env.TOKEN_SECRET as string;

const verifyToken = (req:express.Request, res:express.Response, next:Function) =>{
console.log("inside middleware authenticate");
    try {
        console.log(req.headers);               
        const authorizationHeader = req.headers.authorization as string;
        const token = authorizationHeader.split(' ')[1];
        console.log("token afater");
        console.log(token);
        console.log("jwt afater");
        console.log(jwt_token_secret);
        const decoded = jwt.verify(token, jwt_token_secret);

        next();
    } catch (error) {
        res.status(401);
        res.json(`Invalid token ${error}`);
    }
}

export default verifyToken;