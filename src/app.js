import express from 'express';
import {filterQuery} from './common/filter-query';
import logger from 'morgan';
import body from 'body-parser';
import 'dotenv/config';

const app = express();

app.use(logger('dev'));
app.use(body.json());
app.use(body.urlencoded({ extended: false }));

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

app.use( (req, res, next) => {
  res.success('hello');
});

export default app;
