const songRepo = require('../repositories/song.repository');

async function getAllSongs() {
  return await songRepo.findAll();
}

async function getSongById(id) {
  return await songRepo.findById(id);
}

async function createSong(songData) {
  return await songRepo.insert(songData);
}

async function updateSong(id, songData) {
  return await songRepo.update(id, songData);
}

async function deleteSong(id) {
  return await songRepo.remove(id);
}

module.exports = {
  getAllSongs,
  getSongById,
  createSong,
  updateSong,
  deleteSong,
};