import express from 'express';
import { filterQuery } from './common/filter-query';
import logger from 'morgan';
import body from 'body-parser';
import 'dotenv/config';
import mongoose from 'mongoose';
import userRoute from './api/user/user.route';
import channelRoute from './api/channel/channel.route';
import messageRoute from './api/message/message.route';
import path from 'path';

const { DBNAME, DBUSER, DBPASS, ENDPOINT } = process.env;

mongoose.connect(
  `mongodb://${DBUSER}:${DBPASS}@ds243441.mlab.com:43441/${DBNAME}`,
  () => {
    console.log('connected mLab');
  }
);

const app = express();

app.use(logger('dev'));
app.use(body.json());
app.use(body.urlencoded({ extended: false }));

app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,accept,access_token,X-Requested-With');
  next();
});

app.use((req, res, next) => {
  //bind query
  filterQuery(req);
  //for response success
  res.success = (data, options, code = 200) => {
    return typeof data === 'object'
      ? options
        ? res.status(code).json({ data, options })
        : res.status(code).json(data)
      : res.status(code).json({ message: data });
  };
  //for response error
  res.fail = (message, code = 500) => {
    console.log(message);
    return res.status(code).json({ message });
  };
  //parse to next
  next();
});

app.use('/test', (req, res) => {
  const file = path.join(__dirname + '../../html/index.html');
  res.sendFile(file);
});

app.use(`${ENDPOINT}/users`, userRoute);
app.use(`${ENDPOINT}/channels`, channelRoute);
app.use(`${ENDPOINT}/messages`, messageRoute);

export default app;
