const fetch = require('node-fetch');
require('dotenv').config();

const APIKEY = process.env.APIKEY;
const mostOfPlUrl = 'https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PL77GLSNDp6v77qkYUzsUGv8-csaX-M3ui&key=';
const testPlUrl = mostOfPlUrl + APIKEY;
const mostOfVUrl = 'https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&id=RneTQwm3yn4&key=';
const testVUrl = mostOfVUrl + APIKEY;

const ytapiController = {};

ytapiController.getPlaylist = (req, res, next) => {
  console.log('getPlaylist controller reached')
  // const { PlaylistId } = req.params;
  fetch(testPlUrl, {
    method: "GET"
  })  // don't need to specify GET method but
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
  console.log('getVideoDetails controller reached')
  fetch(testVUrl, {
    method: "GET"
  })
    .then((data) => data.json())
    .then((data) => {
      console.log('data from gVD - content details', data.items[0].contentDetails);
      return next();
    })
    .catch((err) => {
      return next({
        log: 'ytapiController.getVideoDetails: ERROR',
        message: 'Server ERROR: Check server logs for details'
      })
    })
}

module.exports = ytapiController;