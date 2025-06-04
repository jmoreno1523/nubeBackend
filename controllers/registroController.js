// registroController.js

let historial = [
  // Puedes poner algunos datos iniciales si quieres, o dejarlo vacío:
  // { direccion: "Arriba", hora: "3/6/2025, 8:29:29 p. m." }
];

exports.agregarRegistro = async (req, res) => {
  try {
    const { direccion, hora } = req.body;
    if (!direccion || !hora) return res.status(400).json({ mensaje: 'Datos faltantes' });

    historial.unshift({ direccion, hora }); // guardamos solo en memoria (temporal)

    res.status(201).json({ mensaje: 'Registro guardado correctamente (memoria)' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

exports.obtenerRegistros = async (req, res) => {
  res.json(historial);
};
