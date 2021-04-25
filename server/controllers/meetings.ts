import { Request, Response } from 'express';

import Meetings from '../models/meetings';

export const getMeetings = async (req: Request, res: Response) => {
    try {
        const allMeetings = await Meetings.find(req.query); 

        res.send(allMeetings);
    } catch(error) {
        res.status(400).send(error);
    }
}

export const createMeeting = async (req: Request, res: Response) => {
    try {
        const response = await Meetings.create(req.body);

        res.send(response);
    } catch(error) {
        res.status(400).send(error);
    }
}

export const editMeeting = async (req: Request, res: Response) => {
    try {
        const response = await Meetings.updateOne({ id: req.query.id }, req.body);

        res.send(response);
    } catch(error) {
        res.status(400).send(error);
    }
}