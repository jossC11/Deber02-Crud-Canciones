const express = require('express');
const cors = require('cors');
const songRoutes = require('./routes/song.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/songs', songRoutes);

app.get('/', (req, res) => {
    res.send('API de canciones funcionando');
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
