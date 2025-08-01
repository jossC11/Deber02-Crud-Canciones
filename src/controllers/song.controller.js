const songService = require('../services/song.services');

async function getAll(req, res) {
  try {
    const songs = await songService.getAllSongs();
    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener canciones', details: err.message });
  }
}

async function getById(req, res) {
  try {
    const song = await songService.getSongById(req.params.id);
    if (!song) return res.status(404).json({ error: 'Canción no encontrada' });
    res.json(song);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener la canción', details: err.message });
  }
}

async function create(req, res) {
  try {
    const { SONG_NAME, SONG_PATH, PLAYS } = req.body;
    if (!SONG_NAME || !SONG_PATH || PLAYS === undefined) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }
    const song = await songService.createSong({ SONG_NAME, SONG_PATH, PLAYS });
    res.status(201).json({ success: true, message: 'Canción creada', song });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear la canción', details: err.message });
  }
}

async function update(req, res) {
  try {
    const { SONG_NAME, SONG_PATH, PLAYS } = req.body;
    const updated = await songService.updateSong(req.params.id, { SONG_NAME, SONG_PATH, PLAYS });
    if (!updated) return res.status(404).json({ error: 'Canción no encontrada' });
    res.json({ message: 'Canción actualizada correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar la canción', details: err.message });
  }
}

async function remove(req, res) {
  try {
    const deleted = await songService.deleteSong(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Canción no encontrada' });
    res.json({ message: 'Canción eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar la canción', details: err.message });
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};