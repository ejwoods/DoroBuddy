const mongoose = require('mongoose');
const { Schema } = mongoose;
require('dotenv').config();

console.log('confirm dotenv working in plModels: ', process.env.SECRET_KEY)
const MONGO_URI = `mongodb+srv://${process.env.DbUsername}:${process.env.DbPass}@cluster0.9xvtxtr.mongodb.net/?retryWrites=true&w=majority`

const playlistSchema = new Schema({
  playlistName: {type: String, required: true},
  videoIds: {type: Array, required: true}
});

module.exports = mongoose.model('playlist', playlistSchema)