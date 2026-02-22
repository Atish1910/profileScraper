const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  username: String,
  name: String,
  bio: String,
  followers: Number,
  following: Number,
  repos: Number,
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);