const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('videos route reached');
  return res.status(200).json([
    {
      title: 'Google',
      url: 'www.google.com'
    },
    {
      title: "YouTube",
      url: 'www.youtube.com'
    }
  ])
});

module.exports = router;