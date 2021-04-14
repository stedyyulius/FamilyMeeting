import { Response, Request } from 'express'

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
        const response = await Users.create(req.body);

        res.send(response);

    } catch(error: any) {
        res.status(400).send(error);
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const foundedUser = await Users.findById(req.query.id);
        res.send(foundedUser);

    } catch(error) {
        res.status(400).send(error)
    }
}