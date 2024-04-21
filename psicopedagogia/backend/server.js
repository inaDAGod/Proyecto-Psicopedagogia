import express from 'express';
import cors from 'cors';
import pg from 'pg';

const { Pool } = pg;

const app = express();

// Configurar el middleware CORS
app.use(cors());

// Configuración de la conexión a la base de datos
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'psicopedagogia',
  password: 'admin',
  port: 5432, // Puerto predeterminado de PostgreSQL
});

// Ruta para obtener los datos de los docentes
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


//-----------------------

// Ruta para agregar un nuevo docente
app.post('/api/docentes', async (req, res) => {
  try {
    const { nombre, apodo, cargo, correo, datoc, imagen } = req.body;
    const client = await pool.connect();
    await client.query('INSERT INTO docentes (nombre, apodo, cargo, correo, datoc, imagen) VALUES ($1, $2, $3, $4, $5, $6)', [nombre, apodo, cargo, correo, datoc, imagen]);
    client.release();
    res.status(201).json({ message: 'Docente agregado correctamente' });
  } catch (error) {
    console.error('Error al agregar el docente:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para actualizar un docente existente
app.put('/api/docentes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apodo, cargo, correo, datoc, imagen } = req.body;
    const client = await pool.connect();
    await client.query('UPDATE docentes SET nombre = $1, apodo = $2, cargo = $3, correo = $4, datoc = $5, imagen = $6 WHERE id_docente = $7', [nombre, apodo, cargo, correo, datoc, imagen, id]);
    client.release();
    res.json({ message: 'Docente actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar el docente:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para eliminar un docente
app.delete('/api/docentes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const client = await pool.connect();
    await client.query('DELETE FROM docentes WHERE id_docente = $1', [id]);
    client.release();
    res.json({ message: 'Docente eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el docente:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


app.put('/api/info-pagina', async (req, res) => {
  try {
    const { link_video, link_soc_cien, link_sembrando, link_psico_ucb, facebook, insta, youtube, tiktok, attencion_dire } = req.body;
    const client = await pool.connect();
    await client.query('UPDATE pagina_nosotros SET link_video = $1, link_soc_cien = $2, link_sembrando = $3, link_psico_ucb = $4, facebook = $5, insta = $6, youtube = $7, tiktok = $8, attencion_dire = $9 WHERE id = 1', [link_video, link_soc_cien, link_sembrando, link_psico_ucb, facebook, insta, youtube, tiktok, attencion_dire]);
    client.release();
    res.json({ message: 'Información de la página actualizada correctamente' });
  } catch (error) {
    console.error('Error al actualizar la información de la página:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});




// Iniciar el servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend en funcionamiento en el puerto ${PORT}`);
});
