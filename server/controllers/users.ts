import { Response, Request } from 'express';
import sha256 from 'sha256';
import jsonwebtoken from 'jsonwebtoken';

import Users from '../models/users';

export const getUsers = async (req: Request, res: Response) => {

    try {
        const allUsers = await Users.find();
        res.send(allUsers);

    } catch(error: any) {
        res.status(400).send(error);
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
        res.status(400).send(error);
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const userExist = await Users.find({ email: req.body.email, password: sha256(req.body.password) });
        

    } catch(error: any) {
        res.status(400).send(error);
    }
}