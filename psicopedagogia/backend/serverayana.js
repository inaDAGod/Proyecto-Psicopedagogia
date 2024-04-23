import express from 'express';
import cors from 'cors';
import pg from 'pg';
import multer from 'multer';

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

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the destination directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  }
});

const upload = multer({ storage: storage });

// Route to handle file uploads
app.post('/upload', upload.single('sampleFile'), async (req, res) => {
  try {
    res.send('File uploaded successfully');
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
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

// Route to update page information
app.put('/api/pagina_nosotros', async (req, res) => {
  try {
    const { link_video, link_soc_cien, link_sembrando, link_psico_ucb, facebook, insta, youtube, tiktok, attencion_dire } = req.body;
    const client = await pool.connect();
    await client.query(`
      UPDATE pagina_nosotros 
      SET link_video = $1, 
          link_soc_cien = $2, 
          link_sembrando = $3, 
          link_psico_ucb = $4, 
          facebook = $5, 
          insta = $6, 
          youtube = $7, 
          tiktok = $8, 
          attencion_dire = $9
    `, [link_video, link_soc_cien, link_sembrando, link_psico_ucb, facebook, insta, youtube, tiktok, attencion_dire]);
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
