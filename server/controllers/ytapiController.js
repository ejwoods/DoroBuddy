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
    .then((data) => {
      console.log('data from API call', data)
      return next();
    })
    .catch((err) => {
      return next({
        log: 'ytapiController.getPlaylist: ERROR',
        message: 'Server ERROR: Check server logs for details'
      })
    })
}

module.exports = ytapiController;