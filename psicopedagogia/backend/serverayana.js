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

app.get('/api/docentes', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM docentes');
    client.release();
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener los docentes:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para obtener la información de la página
app.get('/api/info-pagina', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM pagina_nosotros');
    client.release();
    res.json(result.rows[0]); // Suponiendo que solo hay una fila en la tabla pagina_nosotros
  } catch (error) {
    console.error('Error al obtener la información de la página:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});
//NUEVOSSSSSSSS

app.get('/api/cursoscf', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM cursosfc');
    client.release();
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener los cursosfc:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});
app.get('/api/maestria', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM maestria');
    client.release();
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener los maestria:', error);
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

app.post('/api/info-pagina', async (req, res) => {
  try {
    const { link_video, link_soc_cien, link_sembrando, link_psico_ucb, facebook, insta, youtube, tiktok, attencion_dire } = req.body;

    const client = await pool.connect();

    // Use UPDATE statement without a WHERE clause to update all rows in the table
    await client.query('UPDATE pagina_nosotros SET link_video = $1, link_soc_cien = $2, link_sembrando = $3, link_psico_ucb = $4, facebook = $5, insta = $6, youtube = $7, tiktok = $8, attencion_dire = $9', [link_video, link_soc_cien, link_sembrando, link_psico_ucb, facebook, insta, youtube, tiktok, attencion_dire]);

    client.release();

    res.status(200).json({ message: 'Data updated successfully in pagina_nosotros table' });
  } catch (error) {
    console.error('Error updating data in pagina_nosotros table:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




app.post('/api/info-paginaUpdate', async (req, res) => {
  try {
    const { link_video, link_soc_cien, link_sembrando, link_psico_ucb, facebook, insta, youtube, tiktok, attencion_dire } = req.body;

    const query = `
      UPDATE pagina_nosotros 
      SET link_video = $1, link_soc_cien = $2, link_sembrando = $3, link_psico_ucb = $4, 
          facebook = $5, insta = $6, youtube = $7, tiktok = $8, attencion_dire = $9
    `;
    const values = [link_video, link_soc_cien, link_sembrando, link_psico_ucb, facebook, insta, youtube, tiktok, attencion_dire];

    const client = await pool.connect();
    await client.query(query, values);
    client.release();

    console.log('Data updated successfully in pagina_nosotros table');
    res.status(200).json({ message: 'Data updated successfully in pagina_nosotros table' });
  } catch (error) {
    console.error('Error updating data in pagina_nosotros table:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




app.post('/api/docentes', async (req, res) => {
  try {
    const { nombre, apodo, cargo, correo, datoc, imagen } = req.body;
    const client = await pool.connect();
    await client.query('INSERT INTO docentes (nombre, apodo, cargo, correo, datoc, imagen) VALUES ($1, $2, $3, $4, $5, $6)', [nombre, apodo, cargo, correo, datoc, imagen]);
    client.release();
    res.status(201).json({ message: 'Docente guardado correctamente' });
  } catch (error) {
    console.error('Error al guardar el docente:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


app.post('/api/docentes', async (req, res) => {
  try {
    const { id_docente, nombre, apodo, cargo, correo, datoc, imagen } = req.body;

    const query = `
      UPDATE docentes 
      SET nombre = $2, apodo = $3, cargo = $4, correo = $5, datoc = $6, imagen = $7
      WHERE id_docente = $1
    `;
    const values = [id_docente, nombre, apodo, cargo, correo, datoc, imagen];

    const client = await pool.connect();
    await client.query(query, values);
    client.release();

    console.log('Data updated successfully in Docentes table');
    res.status(200).json({ message: 'Data updated successfully in Docentes table' });
  } catch (error) {
    console.error('Error updating data in Docentes table:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});








app.post('/api/docentesUpdate', async (req, res) => {
  try {
    const { id_docente, nombre, apodo, cargo, correo, datoc, imagen } = req.body;

    const query = `
      UPDATE docentes 
      SET nombre = $2, apodo = $3, cargo = $4, correo = $5, datoc = $6, imagen = $7
      WHERE id_docente = $1
    `;
    const values = [id_docente, nombre, apodo, cargo, correo, datoc, imagen];

    const client = await pool.connect();
    await client.query(query, values);
    client.release();

    console.log('Data updated successfully in Docentes table');
    res.status(200).json({ message: 'Data updated successfully in Docentes table' });
  } catch (error) {
    console.error('Error updating data in Docentes table:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.delete('/api/docentes/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
      DELETE FROM docentes 
      WHERE id_docente = $1
    `;
    const values = [id];

    const client = await pool.connect();
    await client.query(query, values);
    client.release();

    console.log('Docente deleted successfully');
    res.status(200).json({ message: 'Docente deleted successfully' });
  } catch (error) {
    console.error('Error deleting docente:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


























// Iniciar el servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend en funcionamiento en el puerto ${PORT}`);
});