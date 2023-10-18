const fetch = require('node-fetch');
require('dotenv').config();

const APIKEY = process.env.APIKEY;
const mostOfUrl = 'https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PL77GLSNDp6v77qkYUzsUGv8-csaX-M3ui&key='
const testUrl = mostOfUrl + APIKEY

const ytapiController = {};

ytapiController.getPlaylist = (req, res, next) => {
  console.log('getPlaylist controller reached')
  // const { PlaylistId } = req.params;
  fetch(testUrl)  // may/may not need to specify GET method
    .then((data) => data.json())
    .then((data) => {
      console.log('data from API call - trying to grab one video id: ', data.items[0].snippet.resourceId.videoId)
      return next();
    })
    .catch((err) => {
      return next({
        log: 'ytapiController.getPlaylist: ERROR',
        message: 'Server ERROR: Check server logs for details'
      })
    })
}

ytapiController.getVideoDetails = (req, res, next) => {
  
}

module.exports = ytapiController;