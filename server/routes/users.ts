import { getUsers, createUser } from '../controllers/users';
import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.post('/register', createUser);

export default userRouter;