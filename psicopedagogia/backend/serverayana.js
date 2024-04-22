import express from 'express';
import cors from 'cors';
import pg from 'pg';

const { Pool } = pg;

const app = express();

// Configure CORS middleware
app.use(cors());

// Database connection configuration
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'psicopedagogia',
  password: 'admin',
  port: 5432, // Default PostgreSQL port
});

// Route to get docentes data
app.get('/api/docentes', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM docentes');
    client.release();
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching docentes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get page information
app.get('/api/info-pagina', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM pagina_nosotros');
    client.release();
    res.json(result.rows[0]); // Assuming there's only one row in the pagina_nosotros table
  } catch (error) {
    console.error('Error fetching page information:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get egresados data
app.get('/api/egresados', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM egresados');
    client.release();
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching egresados:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to add a new docente
app.post('/api/docentes', async (req, res) => {
  try {
    const { nombre, apodo, cargo, correo, datoc, imagen } = req.body;
    const client = await pool.connect();
    const result = await client.query('INSERT INTO docentes (nombre, apodo, cargo, correo, datoc, imagen) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [nombre, apodo, cargo, correo, datoc, imagen]);
    client.release();
    res.status(201).json({ message: 'Docente added successfully', docente: result.rows[0] });
  } catch (error) {
    console.error('Error adding docente:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to update existing docente
app.put('/api/docentes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apodo, cargo, correo, datoc, imagen } = req.body;
    const client = await pool.connect();
    await client.query('UPDATE docentes SET nombre = $1, apodo = $2, cargo = $3, correo = $4, datoc = $5, imagen = $6 WHERE id_docente = $7', [nombre, apodo, cargo, correo, datoc, imagen, id]);
    client.release();
    res.json({ message: 'Docente updated successfully' });
  } catch (error) {
    console.error('Error updating docente:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to delete a docente
app.delete('/api/docentes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const client = await pool.connect();
    await client.query('DELETE FROM docentes WHERE id_docente = $1', [id]);
    client.release();
    res.json({ message: 'Docente deleted successfully' });
  } catch (error) {
    console.error('Error deleting docente:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to update page information
app.put('/api/info-pagina', async (req, res) => {
  try {
    const { link_video, link_soc_cien, link_sembrando, link_psico_ucb, facebook, insta, youtube, tiktok, attencion_dire } = req.body;
    const client = await pool.connect();
    await client.query('UPDATE pagina_nosotros SET link_video = $1, link_soc_cien = $2, link_sembrando = $3, link_psico_ucb = $4, facebook = $5, insta = $6, youtube = $7, tiktok = $8, attencion_dire = $9 WHERE id = 1', [link_video, link_soc_cien, link_sembrando, link_psico_ucb, facebook, insta, youtube, tiktok, attencion_dire]);
    client.release();
    res.json({ message: 'Page information updated successfully' });
  } catch (error) {
    console.error('Error updating page information:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
