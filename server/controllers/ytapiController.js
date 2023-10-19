const fetch = require('node-fetch');
require('dotenv').config();

const APIKEY = process.env.APIKEY;
const mostOfPlUrl = 'https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PL77GLSNDp6v77qkYUzsUGv8-csaX-M3ui&key=';
const plUrlSansId = 'https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=';
const testPlUrl = mostOfPlUrl + APIKEY;

const mostOfVUrl = 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=contentDetails';
const testVUrl = mostOfVUrl + APIKEY;

const ytapiController = {};

ytapiController.getPlaylist = (req, res, next) => {
  console.log('getPlaylist controller reached')
  console.log('gPl req body: ', req.body)
  const { playlistId } = req.body;
  console.log('pl id: ', playlistId)
  const url = plUrlSansId + playlistId + '&key=' + APIKEY
  fetch(url, {
    method: "GET"
  })  // don't need to specify GET method but
    .then((data) => data.json())
    .then((data) => {
      // console.log('data returned to gPl controller: ', data)
      console.log('playlist items arr length: ', data.items.length)
      let videoIdsArray = [];
      for (let i = 0; i < data.items.length; i++) {
        videoIdsArray.push(data.items[i].snippet.resourceId.videoId);
      }
      res.locals.videoIds = videoIdsArray;
      // console.log('res locals in gPl', res.locals)
      return next();
    })
    .catch((err) => {
      return next({
        log: 'ytapiController.getPlaylist: ERROR' + err.message,
        message: 'Server ERROR: Check server logs for details'
      })
    })
}

ytapiController.getVideoDetails = (req, res, next) => {
  console.log('getVideoDetails controller reached')
  // console.log('res locals videoIds in gVD', res.locals.videoIds)
  let url = 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=contentDetails'
  for (let i = 0; i < res.locals.videoIds.length; i++) {
    // console.log('count: ', i);
    // console.log('curr id: ', res.locals.videoIds[i]);
    url = url.concat('&id=', res.locals.videoIds[i]);
  }
  // console.log('big keyless url', url)
  url = url.concat('&key=', APIKEY)
  fetch(url, {
    method: "GET"
  })
    .then((data) => data.json())
    .then((data) => {
      // console.log('data items from gVD', data.items);
      const videoArray = [];
      for (let i = 0; i < data.items.length; i++) {
        videoArray.push({
          Name: data.items[i].snippet.title,
          Id: data.items[i].id,
          Duration: data.items[i].contentDetails.duration
        })
      }
      // console.log('video objects array: ', videoArray)
      res.locals.videos = videoArray;
      return next();
    })
    .catch((err) => {
      return next({
        log: 'ytapiController.getVideoDetails: ERROR: ' + err.message,
        message: 'Server ERROR: Check server logs for details'
      })
    })
}

module.exports = ytapiController;