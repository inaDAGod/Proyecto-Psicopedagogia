import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { MongoClient, ObjectId } from 'mongodb';

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOptions));

// Conexión a MongoDB
const url = 'mongodb://localhost:27017';
const dbName = 'psicopedagogia'; // Nombre de tu base de datos
const client = new MongoClient(url);

let db;

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Conectado a MongoDB');
    db = client.db(dbName);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToMongoDB();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend en funcionamiento en el puerto ${PORT}`);
});

//Para subir imagenes
app.use(fileUpload());
app.post('/upload', function(req, res) {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  sampleFile = req.files.sampleFile;
  uploadPath = "./images/"+ sampleFile.name;

  sampleFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});
//pagina inicio

app.post('/api/homeUpdate', async (req, res) => {
  try {
    const { imagen1, imagen2, imagen3, imagen4, imagen5, imagen6, quienes_somos, mision, mision_src, vision, vision_src, perfil_estudiante, perfil_estudiante_src } = req.body;

    await db.collection('home').updateOne(
      {
        $set: {
          imagen1,
          imagen2,
          imagen3,
          imagen4,
          imagen5,
          imagen6,
          quienes_somos,
          mision,
          mision_src,
          vision,
          vision_src,
          perfil_estudiante,
          perfil_estudiante_src
        }
      }
    );
    console.log(req.body);
    // También puedes verificar si se están enviando las imágenes correctamente
    console.log(req.files); 
   
    console.error("Ocurrió un error durante el procesamiento");

    // Finalmente, envías una respuesta al cliente
    res.status(200).json({ message: 'Solicitud procesada correctamente' });
    console.log('Home actualizado correctamente');
    res.status(200).send('Home actualizado correctamente');
  } catch (error) {
    console.error('Error al actualizar el home:', error);
    res.status(500).send('Error al actualizar el home');
  }
});

app.get('/api/home', async (req, res) => {
  try {
    const homeData = await db.collection('home').findOne(); 
    res.json(homeData);
  } catch (error) {
    console.error('Error al obtener la información de la página de inicio:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});
//actividades
app.get('/api/actividades', async (req, res) => {
  try {
    const actividades = await db.collection('actividades').find().toArray();
    res.json(actividades);
  } catch (error) {
    console.error('Error al obtener las actividades:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


//noticias
app.get('/api/noticias', async (req, res) => {
  try {
    const noticias = await db.collection('noticias').find().toArray();
    res.json(noticias);
  } catch (error) {
    console.error('Error al obtener las noticias:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

//Interaccion social
app.get('/api/interaccionsocial', async (req, res) => {
  try {
    const interaccionSocial = await db.collection('interaccion_social').findOne({}, { objetivo: 1, lineas: 1 });
    res.json(interaccionSocial);
  } catch (error) {
    console.error('Error al obtener la interaccion social:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/api/actividades_universidad', async (req, res) => {
  try {
    const actividadesUniversidad = await db.collection('actividad_interaccion_social').find({ tipo: 'Universidad' }).toArray();
    res.json(actividadesUniversidad);
  } catch (error) {
    console.error('Error al obtener las actividades de universidad:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/api/actividades_departamental', async (req, res) => {
  try {
    const actividadesDepartamental = await db.collection('actividad_interaccion_social').find({ tipo: 'Departamental' }).toArray();
    res.json(actividadesDepartamental);
  } catch (error) {
    console.error('Error al obtener las actividades departamentales:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/api/actividades_internacional', async (req, res) => {
  try {
    const actividadesInternacional = await db.collection('actividad_interaccion_social').find({ tipo: 'Internacional' }).toArray();
    res.json(actividadesInternacional);
  } catch (error) {
    console.error('Error al obtener las actividades internacionales:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

//Publicaciones
app.get('/api/publicaciones', async (req, res) => {
  try {
    // Obtener los parámetros de consulta
    const { titulo, autor, anio, descripcion } = req.query;
    let filtro = {};

    // Construir el filtro basado en los parámetros de consulta proporcionados
    if (titulo) filtro.titulo = { $regex: new RegExp(titulo, 'i') };
    if (autor) filtro.autor = { $regex: new RegExp(autor, 'i') };
    if (anio) filtro.anio = anio;
    if (descripcion) filtro.descripcion = { $regex: new RegExp(descripcion, 'i') };

    // Consultar la base de datos utilizando el filtro
    const publicaciones = await db.collection('publicaciones').find(filtro).toArray();
    // Enviar las publicaciones filtradas como respuesta
    res.json(publicaciones);
  } catch (error) {
    console.error('Error al obtener las publicaciones:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});
app.post('/api/publicaciones', async (req, res) => {
  try {
    const {  titulo, autor, anio, descripcion, portada, ruta } = req.body;
    await db.collection('publicaciones').insertOne({ titulo, autor, anio, descripcion, publicacion_src: portada, ruta });
    res.status(201).json({ message: 'Publicacion guardada correctamente' });
  } catch (error) {
    console.error('Error al guardar el publicacion:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});
app.delete('/api/publicaciones/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await db.collection('publicaciones').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Publicación eliminada correctamente' });
    } else {
      res.status(404).json({ error: 'No se encontró la publicación' });
    }
  } catch (error) {
    console.error('Error al eliminar la publicación:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});
app.post('/api/publicacionesUpdate', async (req, res) => {
  try {
    // Extract the form data
    const { id, titulo, autor, descripcion, anio, ruta, portada } = req.body;
    
    const parsedAnio = parseInt(anio);
    await db.collection('publicaciones').updateOne(
      { _id: new ObjectId(id) },
      { $set: { titulo, autor, descripcion, anio: parsedAnio, publicacion_src: portada, ruta } }
    );
    res.status(200).json({ message: 'Publicación actualizada correctamente' });
  } catch (error) {
    console.error('Error al actualizar la publicación:', error);
    res.status(500).json({ error: 'Error al actualizar' });
  }
});


//-----------OTROS---------
//egresados
app.get('/api/egresados', async (req, res) => {
  try {
    const egresados = await db.collection('egresados').find().toArray();
    res.json(egresados);
  } catch (error) {
    console.error('Error al obtener los egresados:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/api/egresados', async (req, res) => {
  try {
    const { nombre, correo, anio_graduacion, trabajo, comentario, foto } = req.body;
    await db.collection('egresados').insertOne({ nombre, correo, anio_graduacion, trabajo, comentario, src_foto: foto });
    res.status(201).json({ message: 'Egresado guardado correctamente' });
  } catch (error) {
    console.log('Error al guardar el egresado:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/api/egresadosUpdate', async (req, res) => {
  try {
    const { index, nombre, correo, anio_graduacion, trabajo, comentario } = req.body;
    await db.collection('egresados').updateOne(
      { _id: ObjectId(index) },
      { $set: { nombre, correo, anio_graduacion, trabajo, comentario } }
    );
    res.status(200).send('Egresado actualizado correctamente');
  } catch (error) {
    console.error('Error al actualizar el egresado:', error);
    res.status(500).send('Error al actualizar el egresado');
  }
});

//docentes

app.get('/api/docentes', async (req, res) => {
  try {
    const docentes = await db.collection('docentes').find().toArray();
    res.json(docentes);
  } catch (error) {
    console.error('Error al obtener los docentes:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/api/docentes', async (req, res) => {
  try {
    const { nombre, apodo, cargo, correo, datoc, imagen } = req.body;
    await db.collection('docentes').insertOne({ nombre, apodo, cargo, correo, datoc, imagen });
    res.status(201).json({ message: 'Docente guardado correctamente' });
  } catch (error) {
    console.error('Error al guardar el docente:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/api/docentesUpdate', async (req, res) => {
  try {
    const { id_docente, nombre, apodo, cargo, correo, datoc, imagen } = req.body;
    await db.collection('docentes').updateOne(
      { _id: ObjectId(id_docente) },
      { $set: { nombre, apodo, cargo, correo, datoc, imagen } }
    );
    res.status(200).send('Docente actualizado correctamente');
  } catch (error) {
    console.error('Error al actualizar el docente:', error);
    res.status(500).send('Error al actualizar el docente');
  }
});

app.delete('/api/docentes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('docentes').deleteOne({ _id: ObjectId(id) });
    console.log('Docente eliminado correctamente');
    res.status(200).json({ message: 'Docente eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el docente:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

//pagina nosotros

app.get('/api/info-pagina', async (req, res) => {
  try {
    const infoPagina = await db.collection('pagina_nosotros').findOne();
    res.json(infoPagina);
  } catch (error) {
    console.error('Error al obtener la información de la página:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/api/info-pagina', async (req, res) => {
  try {
    const { link_video, link_soc_cien, link_sembrando, link_psico_ucb, facebook, insta, youtube, tiktok, attencion_dire } = req.body;
    
    // Actualiza el primer documento de la colección (suponiendo que solo hay uno)
    await db.collection('pagina_nosotros').updateOne({}, {
      $set: {
        link_video,
        link_soc_cien,
        link_sembrando,
        link_psico_ucb,
        facebook,
        insta,
        youtube,
        tiktok,
        attencion_dire
      }
    });

    res.status(200).json({ message: 'Datos actualizados correctamente en la tabla pagina_nosotros' });
  } catch (error) {
    console.error('Error al actualizar los datos en la tabla pagina_nosotros:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/api/info-paginaUpdate', async (req, res) => {
  try {
    const { link_video, link_soc_cien, link_sembrando, link_psico_ucb, facebook, insta, youtube, tiktok, attencion_dire } = req.body;

    // Actualiza el primer documento de la colección (suponiendo que solo hay uno)
    await db.collection('pagina_nosotros').updateOne({}, {
      $set: {
        link_video,
        link_soc_cien,
        link_sembrando,
        link_psico_ucb,
        facebook,
        insta,
        youtube,
        tiktok,
        attencion_dire
      }
    });

    console.log('Datos actualizados correctamente en la tabla pagina_nosotros');
    res.status(200).json({ message: 'Datos actualizados correctamente en la tabla pagina_nosotros' });
  } catch (error) {
    console.error('Error al actualizar los datos en la tabla pagina_nosotros:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

//investigaciones

app.get('/api/investigaciones', async (req, res) => {
  try {
    const investigacion = await db.collection('investigaciones').findOne();
    res.json(investigacion);
  } catch (error) {
    console.error('Error al obtener la investigación:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

//Postgrado
app.get('/api/cursosfc', async (req, res) => {
  try {
    const cursosfc = await db.collection('cursosfc').find().toArray();
    res.json(cursosfc);
  } catch (error) {
    console.error('Error al obtener los cursosfc:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/api/maestria', async (req, res) => {
  try {
    const maestria = await db.collection('maestria').find().toArray();
    res.json(maestria);
  } catch (error) {
    console.error('Error al obtener los maestria:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});