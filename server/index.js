const express = require('express');
const favicon = require('serve-favicon')
require('dotenv').config();

const app = express();
const videos = require('./routes/videos');
const path = require('path')

// CAN REMOVE - testing process.env
// console.log('process env', process.env);
// const SECRET_KEY = process.env.APIKEY;
// console.log('secret key', SECRET_KEY)
// console.log('s3 bucket', process.env.S3_BUCKET)


app.use(express.json());
app.use('/api/videos', videos);

app.get('/api', (req, res) => {
  res.status(200).send('hello world from express!');
});

// doesn't work but not wasting any more time on it right now
app.use(favicon(path.join(__dirname, '../client/assets/tomato.ico')));


// error handlers
app.use('/', (req, res) => {
  res.status(404).send('Requested resource not found')
})

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'A server-side error occurred' },
 };
 const errorObj = Object.assign({}, defaultErr, err);
 console.log(errorObj.log);
 return res.status(errorObj.status).send(errorObj.message) 
});

app.listen(1234);