import { Request, Response } from 'express';

import Family from '../models/family';

export const getFamily = async (req: Request, res: Response) => {
    try {
        const memberFamily = await Family.find({ members: req.query.userId });

        res.send(memberFamily);
    } catch(error) {
        res.status(400).send(error);
    }
}

export const editFamily = async (req: Request, res: Response) => {
    try {
        const updatedFamily = await Family.updateOne({ id: req.query.id }, req.body);

        res.send(updatedFamily);
    } catch(error) {
        res.status(400).send(error);
    }
}

export const createFamily = async (req: Request, res: Response) => {
    try {
        const response = await Family.create(req.body);

        res.send(response);
    } catch(error) {
        res.status(400).send(error);
    }
}

