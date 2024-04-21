import express from 'express';
import cors from 'cors';
import pg from 'pg';

const { Pool } = pg;
const app = express();
app.use(cors());
// Configuración de la conexión a la base de datos
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'psicopedagogia',
  password: 'pastelitos',
  port: 5432, // Puerto predeterminado de PostgreSQL
});

app.get('/api/home', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM home');
    client.release();
    res.json(result.rows[0]);//solo hay un row
  } catch (error) {
    console.error('Error al obtener los archivos de home:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend en funcionamiento en el puerto ${PORT}`);
});