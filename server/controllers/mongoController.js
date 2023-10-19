const Playlist = require('../models/playlistModels')

const mongoController = {};

mongoController.createPlaylist = (req, res, next) => {
  console.log('creatPlaylist reached');
  const { videoIds, playlistName } = res.locals;
  const newPlaylist = new Playlist({
    playlistName: playlistName,
    videoIds: videoIds
  });
  newPlaylist.save()
  Playlist.create(newPlaylist)
    .catch((err) => {
      return next({
        log: 'mongoController.createPlaylist ERROR: ' + err.message,
        message: 'Server ERROR: Check server logs for details'
      })
    })
  return next();  
} 

module.exports = mongoController;