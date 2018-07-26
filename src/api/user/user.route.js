import { Router } from 'express';
import { createUser, getUserById, getUserList, updateUser, deleteUser, checkUser } from './user.api';
import { validateUserCreating, validateUserUpdating } from './user.middleware';

const userRoute = Router();

userRoute.get('/', getUserList);
userRoute.post('/', validateUserCreating, createUser);
userRoute.post('/check', validateUserCreating, checkUser);
userRoute.get('/:id', getUserById);
userRoute.put('/:id', validateUserUpdating, updateUser);
userRoute.delete('/:id', deleteUser);

export default userRoute;
