import { getUsers, getUserById, createUser } from '../controllers/users';
import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', getUserById);
userRouter.post('/register', createUser);

export default userRouter;