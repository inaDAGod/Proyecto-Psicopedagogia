import pkg from 'pg';
const { Pool } = pkg;

import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOptions));

// Configuración de la conexión a la base de datos
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'psicopedagogia',
  password: 'admin',
  port: 5432, // Puerto predeterminado de PostgreSQL
});

app.get('/api/egresados', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM egresados');
    client.release();
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener los egresados:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.use(fileUpload());
app.post('/upload', function(req, res) {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.sampleFile;
  uploadPath = "./images/"+ sampleFile.name;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});

app.post('/api/egresados', async (req, res) => {
  try {
    const { nombre, correo, anio_graduacion, trabajo, comentario, foto } = req.body;
    console.log( anio_graduacion);
    const client = await pool.connect();
    await client.query('INSERT INTO egresados (nombre, correo, anio_graduacion, trabajo, comentario, src_foto) VALUES ($1, $2, $3, $4, $5, $6)', [nombre, correo, anio_graduacion, trabajo, comentario, foto]);
    client.release();
    res.status(201).json({ message: 'Egresado guardado correctamente' });
  } catch (error) {
    console.error('Error al guardar el egresado:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


// Iniciar el servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend en funcionamiento en el puerto ${PORT}`);
});
