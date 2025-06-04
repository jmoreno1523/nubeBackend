const fs = require('fs').promises;
const path = require('path');

const rutaHistorial = path.join(__dirname, 'historial.json');

async function cargarHistorial() {
  try {
    const datos = await fs.readFile(rutaHistorial, 'utf-8');
    return JSON.parse(datos);
  } catch (error) {
    // Si el archivo no existe o hay error, retorna array vacío
    return [];
  }
}

async function guardarHistorial(historial) {
  try {
    await fs.writeFile(rutaHistorial, JSON.stringify(historial, null, 2));
  } catch (error) {
    throw new Error('Error guardando historial');
  }
}

exports.agregarRegistro = async (req, res) => {
  try {
    const { direccion, hora } = req.body;

    if (!direccion || typeof direccion !== 'string' || direccion.trim() === '') {
      return res.status(400).json({ mensaje: 'Dirección inválida o faltante' });
    }

    if (!hora || typeof hora !== 'string' || hora.trim() === '') {
      return res.status(400).json({ mensaje: 'Hora inválida o faltante' });
    }

    const historial = await cargarHistorial();

    historial.unshift({ direccion: direccion.trim(), hora: hora.trim() });

    await guardarHistorial(historial);

    res.status(201).json({ mensaje: 'Registro guardado correctamente' });
  } catch (error) {
    console.error('Error en agregarRegistro:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

exports.obtenerRegistros = async (req, res) => {
  try {
    const historial = await cargarHistorial();
    res.json(historial);
  } catch (error) {
    console.error('Error en obtenerRegistros:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

