

class Song {
    constructor(data) {
        this.id_song = data.id_song || data.ID_SONG;
        this.song_name = data.song_name || data.SONG_NAME;
        this.song_path = data.song_path || data.SONG_PATH;
        this.plays = data.plays || data.PLAYS;
    }
}

module.exports = Song;
