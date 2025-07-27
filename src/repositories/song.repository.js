const { pool } = require('../config/db');
const Song = require('../models/song.model');

async function findAll() {
  const result = await pool.query('SELECT * FROM tbl_songs');
  return result.rows.map(row => new Song(row));
}

async function findById(id) {
  const result = await pool.query('SELECT * FROM tbl_songs WHERE id_song = $1', [id]);
  return result.rows[0] ? new Song(result.rows[0]) : null;
}

async function insert(song) {
  const result = await pool.query(
    'INSERT INTO tbl_songs (song_name, song_path, plays) VALUES ($1, $2, $3) RETURNING *',
    [song.SONG_NAME, song.SONG_PATH, song.PLAYS]
  );
  return new Song(result.rows[0]);
}

async function update(id, song) {
  const result = await pool.query(
    'UPDATE tbl_songs SET song_name = $1, song_path = $2, plays = $3 WHERE id_song = $4',
    [song.SONG_NAME, song.SONG_PATH, song.PLAYS, id]
  );
  return result.rowCount > 0;
}

async function remove(id) {
  const result = await pool.query('DELETE FROM tbl_songs WHERE id_song = $1', [id]);
  return result.rowCount > 0;
}

module.exports = {
  findAll,
  findById,
  insert,
  update,
  remove,
};