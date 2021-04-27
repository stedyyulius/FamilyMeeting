import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction  } from 'express';

import Users from './models/users';

const allowedApi = ['/users/login', '/users/register'];

interface decoded {
    _id: String;
}

const middleware = async (req: Request, res: Response, next: NextFunction ) => {
    const { authorization } = req.headers;

    const session = authorization as string;

    if (allowedApi.includes(req.originalUrl)) {
        next();
    } else if (session) {
        const user = jwt.verify(session, process.env.PRIVATE_KEY || '') as decoded;
    
        const userExist = await Users.findOne({ _id: user._id });
    
        if (userExist) {
            req.body.createdBy = user._id;
            next();
       }  

    } else {
        res.status(400).send('Unauthorized');
    }


}

export default middleware;