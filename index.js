'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { PORT, CLIENT_ORIGIN } = require('./config');
// const { dbConnect } = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');

const app = express();

const cats = require('./cats.json');
const dogs = require('./dogs.json');

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);
// GET Cat info
app.get('/api/cat', (req, res, next) => {
  res.json(cats[0]);
});
// GET Dog info
app.get('/api/dog', (req, res, next) => {
  res.json(dogs[0]);
});
// delete
app.delete('/api/cat', (req, res, next) => {
  res.send(cats.shift()).sendStatus(204);
});
app.delete('/api/dog', (req, res, next) => {
  res.send(dogs.shift()).sendStatus(204);

});

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  // dbConnect();
  runServer();
}

module.exports = { app };
