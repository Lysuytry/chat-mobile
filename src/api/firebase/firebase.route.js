import { Router } from 'express';
import { verifyToken } from './firebase.api';

const firebaseRoute = Router();

firebaseRoute.get('/verifyToken/:token', verifyToken);

export default firebaseRoute;
