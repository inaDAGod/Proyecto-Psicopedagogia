import express from 'express';
import cors from 'cors';
import pg from 'pg';
import fileUpload from 'express-fileupload';
import pkg from 'pg';

const { Pool } = pg;

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
    const client = await pool.connect();
    await client.query('INSERT INTO egresados (nombre, correo, anio_graduacion, trabajo, comentario, src_foto) VALUES ($1, $2, $3, $4, $5, $6)', [nombre, correo, anio_graduacion, trabajo, comentario, foto]);
    client.release();
    res.status(201).json({ message: 'Egresado guardado correctamente' });
  } catch (error) {
    console.error('Error al guardar el egresado:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/api/egresadosUpdate', (req, res) => {
  const { index, nombre, correo, anio_graduacion, trabajo, comentario } = req.body;

  const query = `
    UPDATE egresados 
    SET nombre = $1, correo = $2, anio_graduacion = $3, trabajo = $4, comentario = $5
    WHERE id_egresado = $6
  `;
  const values = [nombre, correo, anio_graduacion, trabajo, comentario, index];

  // Ejecutar la consulta SQL
  pool.query(query, values, (error, results) => {
    if (error) {
      console.error('Error al actualizar el egresado:', error);
      res.status(500).send('Error al actualizar el egresado');
    } else {
      console.log('Egresado actualizado correctamente:', results.rowCount);
      res.status(200).send('Egresado actualizado correctamente');
    }
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











app.get('/api/cursosfc', async (req, res) => {
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


app.get('/api/interaccionsocial', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('select objetivo, lineas from interaccion_social');
    client.release();
    res.json(result.rows[0]);//solo hay un row
  } catch (error) {
    console.error('Error al obtener los archivos de investigaciones:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/api/actividades_universidad', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('select * from actividad_interaccion_social where tipo=\'Universidad\'');
    client.release();
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener los archivos de actividades de universidad:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});
app.get('/api/actividades_departamental', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('select * from actividad_interaccion_social where tipo=\'Departamental\'');
    client.release();
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener los archivos de actividades departamentales:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});
app.get('/api/actividades_internacional', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('select * from actividad_interaccion_social where tipo=\'Internacional\'');
    client.release();
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener los archivos de actividades internacionales:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});
//publicaciones e investigaciones
app.get('/api/publicaciones', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('select * from publicaciones');
    client.release();
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener las publicaciones:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});
// Iniciar el servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend en funcionamiento en el puerto ${PORT}`);
});
