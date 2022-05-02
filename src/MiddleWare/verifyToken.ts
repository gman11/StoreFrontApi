
import dotnet from 'dotenv';
dotnet.config();
import express from 'express';
import jwt from 'jsonwebtoken';
const jwt_token_secret = process.env.TOKEN_SECRET as string;

const verifyToken = (req:express.Request, res:express.Response, next:Function) =>{
    try {
        const authorizationHeader = req.headers.authorization as string;
        const token = authorizationHeader.split(' ')[1];
        const decoded = jwt.verify(token, jwt_token_secret);

        next();
    } catch (error) {
        res.status(401);
        res.json(`Invalid token ${error}`);
    }
}

export default verifyToken;