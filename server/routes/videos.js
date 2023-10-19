const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const ytapiController = require('../controllers/ytapiController')
const mongoController = require('../controllers/mongoController')
const router = express.Router();
const MONGO_URI = `mongodb+srv://${process.env.DbUsername}:${process.env.DbPass}@cluster0.9xvtxtr.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(MONGO_URI);
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

router.get('/', (req, res) => {
  console.log('videos GET route reached');
  return res.status(200).json([
    {
      title: 'Google',
      url: 'www.google.com'
    },
    {
      title: 'YouTube',
      url: 'www.youtube.com'
    }
  ])
});

router.post('/submit', (req, res, next) => {
  console.log('checking req entering post route', req.body)
  next()
}, ytapiController.getPlaylist, ytapiController.getVideoDetails, (req, res) => {
  console.log('returning from post route')
  res.status(200).json(res.locals.videos);
});

module.exports = router;