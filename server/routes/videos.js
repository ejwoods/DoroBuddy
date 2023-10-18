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

router.post('/submit', ytapiController.getPlaylist, ytapiController.getVideoDetails, (req, res) => {
  res.status(200).send('Playlist data received');
});

module.exports = router;