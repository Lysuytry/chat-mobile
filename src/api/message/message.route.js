import { Router } from 'express';
import { createMessage, deleteMessageById, getMessageById, getMessageList, updateMessageById } from './message.api';
import { validateMessageCreating } from './message.middleware';

const messageRoute = Router();

messageRoute.get('/', getMessageList);
messageRoute.post('/', validateMessageCreating, createMessage);
messageRoute.get('/:id', getMessageById);
messageRoute.put('/:id', updateMessageById);
messageRoute.delete('/:id', deleteMessageById);

export default messageRoute;
