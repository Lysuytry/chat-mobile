import { Router } from 'express';
import { createChannel, deleteChannelById, getChannelById, getChannelList, updateChannelById } from './channel.api';
import { validateCreatedChannel } from './channel.middleware';
import { getMessagesByChannelId } from '../../models/message';

const channelRoute = Router();

channelRoute.get('/', getChannelList);
channelRoute.post('/', validateCreatedChannel, createChannel);
channelRoute.get('/:id', getChannelById);
channelRoute.put('/:id', updateChannelById);
channelRoute.delete('/:id', deleteChannelById);
channelRoute.get('/:id/messages', getMessagesByChannelId);

export default channelRoute;
