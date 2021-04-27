import { Response, Request } from 'express';
import sha256 from 'sha256';
import jwt from 'jsonwebtoken';

import Users from '../models/users';

import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + '../.env' });

export const getUsers = async (req: Request, res: Response) => {

    try {
        const allUsers = await Users.find();
        res.send(allUsers);

    } catch(error: any) {
        res.status(400).json({ error: error.toString() });
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {

        const newUser = {
            ...req.body,
            password: sha256(req.body.password)
        }
        
        const response = await Users.create(newUser);

        res.send(response);

    } catch(error: any) {
        res.status(400).json({ error: error.toString() });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        console.log(req.body._doc)
        const payload = Object.keys(req.body._doc).length ? req.body._doc : req.body;

        const userExist = await Users.findOne({ email: payload.email, password: sha256(payload.password) });

        if (userExist) {
            const token = jwt.sign(userExist.toJSON(), process.env.PRIVATE_KEY || '');
    
            res.send(token);
        } else {
            throw new Error('Invalid email or password');
        }


    } catch(error: any) {
        res.status(400).json({ error: error.toString() });
    }
}