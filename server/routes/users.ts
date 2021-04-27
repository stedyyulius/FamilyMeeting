import { getUsers, createUser, login } from '../controllers/users';
import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.post('/register', createUser);
userRouter.post('/login', login);

export default userRouter;