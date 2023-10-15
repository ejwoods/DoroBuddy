const express = require('express');
const app = express();
const videos = require('./routes/videos')

app.use(express.json());
app.use('/api/videos', videos);

app.get('/api', (req, res) => {
  res.status(200).send('hello world from express!');
});

app.listen(1234);