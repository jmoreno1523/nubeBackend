const express = require('express');
const router = express.Router();
const registroController = require('../controllers/registroController');

// Ruta para agregar un registro (POST)
router.post('/registro', registroController.agregarRegistro);

// Ruta para obtener todos los registros (GET)
router.get('/registro', registroController.obtenerRegistros);

module.exports = router;


