
const { pool } = require('../config/db');
const Song = require('../models/song.model');

// Obtener todas las canciones
async function getAllSongs() {
    const result = await pool.query('SELECT * FROM TBL_SONGS');
    return result.rows.map(row => new Song(row));
}

// Obtener una canción por ID
async function getSongById(id) {
    const result = await pool.query('SELECT * FROM TBL_SONGS WHERE ID_SONG = $1', [id]);
    return result.rows[0] ? new Song(result.rows[0]) : null;
}

// Crear una nueva canción
async function createSong(songData) {
    const result = await pool.query(
        'INSERT INTO TBL_SONGS (SONG_NAME, SONG_PATH, PLAYS) VALUES ($1, $2, $3) RETURNING *',
        [songData.SONG_NAME, songData.SONG_PATH, songData.PLAYS]
    );
    return new Song(result.rows[0]);
}

// Actualizar una canción existente
async function updateSong(id, songData) {
    const result = await pool.query(
        'UPDATE TBL_SONGS SET SONG_NAME = $1, SONG_PATH = $2, PLAYS = $3 WHERE ID_SONG = $4',
        [songData.SONG_NAME, songData.SONG_PATH, songData.PLAYS, id]
    );
    return result.rowCount > 0;
}

// Eliminar una canción
async function deleteSong(id) {
    const result = await pool.query('DELETE FROM TBL_SONGS WHERE ID_SONG = $1', [id]);
    return result.rowCount > 0;
}

module.exports = {
    getAllSongs,
    getSongById,
    createSong,
    updateSong,
    deleteSong
};