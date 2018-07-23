import app from './app';
const server = require('http').Server(app);
const io = require('socket.io')(server);

const { PORT } = process.env;

//if no route match => matched this route instead
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

//error handling middleware
//always at the bottom of the code
app.use((err, req, res, next) => {
  return res.status(err.status || 500).json(err);
});


server.listen(PORT, () => {
  console.log(`We are open port ${PORT} for our express app`);
});
