const express = require('express');

const ytapiController = require('../controllers/ytapiController')
const router = express.Router();

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
  console.log(req.body)
  next()
}, ytapiController.getPlaylist, ytapiController.getVideoDetails, (req, res) => {
  console.log('returning from post route')
  res.status(200).json(res.locals.videos);
});

module.exports = router;