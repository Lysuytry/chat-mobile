import express from 'express';
import { createChannel, deleteChannelById, getChannelById, getChannelList, updateChannelById } from './channel.api';
import { validateCreatedChannel } from './channel.middleware';

const channelRoute = express.Router();

channelRoute.get('/', getChannelList);
channelRoute.post('/', validateCreatedChannel, createChannel);
channelRoute.get('/:id', getChannelById);
channelRoute.put('/:id', updateChannelById);
channelRoute.delete('/:id', deleteChannelById);

export default channelRoute;
