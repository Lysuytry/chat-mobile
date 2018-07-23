import express from 'express';
import { createMessage, deleteMessageById, getMessageById, getMessageList, updateMessageById } from './message.api';
import { validateCreatedMessage } from './message.middleware';

const messageRoute = express.Router();

messageRoute.get('', getMessageList);
messageRoute.post('', createMessage);
messageRoute.get('/:id', getMessageById);

export default messageRoute;
