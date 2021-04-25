import { Request, Response } from 'express';

import Family from '../models/family';


export const getFamilies = async (req: Request, res: Response) => {
    try {
        const allFamily = await Family.find();

        res.send(allFamily);
    } catch(error) {
        res.status(400).send(error);
    }
}


export const getFamily = async (req: Request, res: Response) => {
    try {
        const family = await Family.find(req.query);

        res.send(family);
    } catch(error) {
        res.status(400).send(error);
    }
}

export const editFamily = async (req: Request, res: Response) => {
    try {
        const updatedFamily = await Family.updateOne({ _id: req.params.familyId }, req.body);

        res.send(updatedFamily);
    } catch(error) {
        res.status(400).send(error);
    }
}

export const createFamily = async (req: Request, res: Response) => {
    try {
        const newFamily = { ...req.body, createdAt: new Date() };
      
        const response = await Family.create(newFamily);

        res.send(response);
    } catch(error) {
        res.status(400).send(error);
    }
}
