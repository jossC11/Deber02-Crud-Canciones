const express = require('express');
const router = express.Router();
const songController = require('../controllers/song.controller');


// GET /songs - Obtener todas las canciones
router.get('/', songController.getAll);

// GET /songs/:id - Obtener una canción por ID 
router.get('/:id', songController.getById);

// POST /songs - Crear una nueva canción
router.post('/', songController.create);

// PUT /songs/:id - Actualizar una canción existente 
router.put('/:id', songController.update);

// DELETE /songs/:id - Eliminar una canción
router.delete('/:id', songController.remove);

module.exports = router;
