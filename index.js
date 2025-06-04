const express = require('express');
const cors = require('cors');
const registroRoutes = require('./routes/registro.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', registroRoutes);  // Montamos las rutas bajo /api

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

