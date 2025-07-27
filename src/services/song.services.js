const { poolPromise } = require('../config/db');
const Song = require('../models/song.model');

// Obtener todas las canciones
async function getAllSongs() {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM TBL_SONG');
    return result.recordset.map(row => new Song(row));
}

// Obtener una canción por ID
async function getSongById(id) {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('ID_SONG', id)
        .query('SELECT * FROM TBL_SONG WHERE ID_SONG = @ID_SONG');
    return result.recordset[0] ? new Song(result.recordset[0]) : null;
}

// Crear una nueva canción
async function createSong(songData) {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('SONG_NAME', songData.SONG_NAME)
        .input('SONG_PATH', songData.SONG_PATH)
        .input('PLAYS', songData.PLAYS)
        .query('INSERT INTO TBL_SONG (SONG_NAME, SONG_PATH, PLAYS) OUTPUT INSERTED.* VALUES (@SONG_NAME, @SONG_PATH, @PLAYS)');
    return new Song(result.recordset[0]);
}

// Actualizar una canción existente
async function updateSong(id, songData) {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('ID_SONG', id)
        .input('SONG_NAME', songData.SONG_NAME)
        .input('SONG_PATH', songData.SONG_PATH)
        .input('PLAYS', songData.PLAYS)
        .query('UPDATE TBL_SONG SET SONG_NAME = @SONG_NAME, SONG_PATH = @SONG_PATH, PLAYS = @PLAYS WHERE ID_SONG = @ID_SONG');
    return result.rowsAffected[0] > 0;
}

// Eliminar una canción
async function deleteSong(id) {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('ID_SONG', id)
        .query('DELETE FROM TBL_SONG WHERE ID_SONG = @ID_SONG');
    return result.rowsAffected[0] > 0;
}

module.exports = {
    getAllSongs,
    getSongById,
    createSong,
    updateSong,
    deleteSong
};