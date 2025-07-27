const { pool } = require('../config/db');
const Song = require('../models/song.model');

// Obtener todas las canciones
async function getAllSongs() {
    const result = await pool.query('SELECT * FROM tbl_songs');
    return result.rows.map(row => new Song(row));
}

// Obtener una canción por ID
async function getSongById(id) {
    const result = await pool.query('SELECT * FROM tbl_songs WHERE id_song = $1', [id]);
    return result.rows[0] ? new Song(result.rows[0]) : null;
}

// Crear una nueva canción
async function createSong(songData) {
    const result = await pool.query(
        'INSERT INTO tbl_songs (song_name, song_path, plays) VALUES ($1, $2, $3) RETURNING *',
        [songData.SONG_NAME, songData.SONG_PATH, songData.PLAYS]
    );
    return new Song(result.rows[0]);
}

// Actualizar una canción 
async function updateSong(id, songData) {
    const result = await pool.query(
        'UPDATE tbl_songs SET song_name = $1, song_path = $2, plays = $3 WHERE id_song = $4',
        [songData.SONG_NAME, songData.SONG_PATH, songData.PLAYS, id]
    );
    return result.rowCount > 0;
}

// Eliminar una canción
async function deleteSong(id) {
    const result = await pool.query('DELETE FROM tbl_songs WHERE id_song = $1', [id]);
    return result.rowCount > 0;
}

module.exports = {
    getAllSongs,
    getSongById,
    createSong,
    updateSong,
    deleteSong
};