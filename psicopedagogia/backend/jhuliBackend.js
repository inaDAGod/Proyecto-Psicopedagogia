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

app.post('/api/homeUpdate', (req, res) => {
  const {imagen1, imagen2, imagen3, imagen4, imagen5, imagen6, quienes_somos, mision, mision_src, vision, vision_src,perfil_estudainte, perfil_estudiante_src } = req.body;

  const query = `
    UPDATE home 
    SET imagen1= $1, imagen2 = $2, imagen3 = $3, imagen4 = $4, imagen5 = $5, imagen6= $6, quienes_somos=$7, mision=$8, mision_src=$9, vision=$10, vision_src=$11, perfil_estudiante=$12, perfil_estudiante_src=$13
    WHERE home = 'home0'
  `;
  const values = [imagen1, imagen2, imagen3, imagen4, imagen5, imagen6, quienes_somos, mision, mision_src, vision, vision_src,perfil_estudainte, perfil_estudiante_src ];
  pool.query(query, values, (error, results) => {
    if (error) {
      console.error('Error al actualizar el home:', error);
      res.status(500).send('Error al actualizar el home');
    } else {
      console.log('Home actualizado correctamente:', results.rowCount);
      res.status(200).send('Home actualizado correctamente');
    }
  });
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

app.get('/api/actividades', async (req, res) => {
  try {
    const actividad = await pool.connect();
    const result = await actividad.query('select * from actividades');
    actividad.release();
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener los archivos de actividades:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/api/noticias', async (req, res) => {
  try {
    const noticia = await pool.connect(); // Usar 'client' en lugar de 'evento'
    const result = await noticia.query('select * from noticias');
    noticia.release();
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener los archivos de noticias:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/api/investigaciones', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('select * from investigaciones');
    client.release();
    res.json(result.rows[0]);//solo hay un row
  } catch (error) {
    console.error('Error al obtener los archivos de investigaciones:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend en funcionamiento en el puerto ${PORT}`);
});