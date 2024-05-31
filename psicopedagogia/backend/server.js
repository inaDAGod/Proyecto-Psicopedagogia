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
const url = 'mongodb://0.0.0.0:27017';
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
    const { id, img1, img2, img3, img4, img5, img6, quienes_somos, mision, imgMision, vision, imgVision, perfil_estudiante, imgPerfil } = req.body;
    await db.collection('home').updateOne(
      { _id: new ObjectId(id) },
      { $set: { imagen1: img1, imagen2: img2, imagen3: img3, imagen4: img4, imagen5: img5, imagen6: img6, 
        quienes_somos, mision, mision_src: imgMision, vision, vision_src: imgVision, 
        perfil_estudiante, perfil_estudiante_src: imgPerfil } }
    );
    res.status(200).json({ message: 'Pagina de inicio actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar el inicio:', error);
    res.status(500).json({ error: 'Error al actualizar' });
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
app.post('/api/actividades', async (req, res) => {
  try {
    const { actividad, fecha, hora, ubicacion, descripcion, imagenA} = req.body;
    await db.collection('actividades').insertOne({
      actividad, fecha, hora, ubicacion, descripcion, actividad_src:imagenA});
    res.status(201).json({ message: 'Actividad de guardada correctamente' });
  } catch (error) {
    console.error('Error al guardar la actividad:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});
app.post('/api/actividadesUpdate', async (req, res) => {
  try {
    // Extract the form data
    const { id, actividad, fecha, hora, ubicacion, descripcion, imagenA } = req.body;
    await db.collection('actividades').updateOne(
      { _id: new ObjectId(id) },
      { $set: { actividad, fecha, hora, ubicacion, descripcion, actividad_src: imagenA} }
    );
    res.status(200).json({ message: 'Actividad actualizada correctamente' });
  } catch (error) {
    console.error('Error al actualizar laactividad:', error);
    res.status(500).json({ error: 'Error al actualizar' });
  }
});
app.delete('/api/actividades/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await db.collection('actividades').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Actividad eliminada correctamente' });
    } else {
      res.status(404).json({ error: 'No se encontró la actividad' });
    }
  } catch (error) {
    console.error('Error al eliminar la actividad:', error);
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
app.post('/api/noticias', async (req, res) => {
  try {
    const { actividad, fecha,descripcion, imagenN} = req.body;
    await db.collection('noticias').insertOne({
      noticia, fecha, descripcion, noticia_src: imagenN});
    res.status(201).json({ message: 'Noticia de guardada correctamente' });
  } catch (error) {
    console.error('Error al guardar la noticia:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});
app.post('/api/noticiasUpdate', async (req, res) => {
  try {
    // Extract the form data
    const { id, noticia, fecha, descripcion, imagenN } = req.body;
    await db.collection('noticias').updateOne(
      { _id: new ObjectId(id) },
      { $set: { noticia, fecha, descripcion, noticia_src: imagenN} }
    );
    res.status(200).json({ message: 'Noticia actualizada correctamente' });
  } catch (error) {
    console.error('Error al actualizar la noticia:', error);
    res.status(500).json({ error: 'Error al actualizar' });
  }
});
app.delete('/api/noticias/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await db.collection('noticias').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Noticia eliminada correctamente' });
    } else {
      res.status(404).json({ error: 'No se encontró la noticia' });
    }
  } catch (error) {
    console.error('Error al eliminar la noticia:', error);
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
app.post('/api/interaccionsocialUpdate', async (req, res) => {
  try {
    const { id, objetivo,lineas} = req.body;
    await db.collection('interaccion_social').updateOne(
      { _id: new ObjectId(id) },
      { $set: { objetivo,lineas } }
    );
    res.status(200).json({ message: 'Interaccion social actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar el interaccion social:', error);
    res.status(500).json({ error: 'Error al actualizar' });
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
app.post('/api/actividades_social', async (req, res) => {
  try {
    const { actividad, fecha, hora, ubicacion, descripcion, imagen, tipo } = req.body;
    await db.collection('actividad_interaccion_social').insertOne({
      actividad, fecha, hora, ubicacion, descripcion, actividad_src:imagen, tipo});
    res.status(201).json({ message: 'Actividad de universidad guardada correctamente' });
  } catch (error) {
    console.error('Error al guardar la actividad de universidad:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


app.delete('/api/actividades_social/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await db.collection('actividad_interaccion_social').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Actividad eliminada correctamente' });
    } else {
      res.status(404).json({ error: 'No se encontró la actividad' });
    }
  } catch (error) {
    console.error('Error al eliminar la actividad:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});
app.post('/api/actividades_socialUpdate', async (req, res) => {
  try {
    // Extract the form data
    const { id, actividad, fecha, hora, ubicacion, descripcion, imagen, tipo } = req.body;
    await db.collection('actividad_interaccion_social').updateOne(
      { _id: new ObjectId(id) },
      { $set: { actividad, fecha, hora, ubicacion, descripcion, actividad_src: imagen, tipo} }
    );
    res.status(200).json({ message: 'Actividad actualizada correctamente' });
  } catch (error) {
    console.error('Error al actualizar laactividad:', error);
    res.status(500).json({ error: 'Error al actualizar' });
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
//cd  C:\Users\HP\Documents\Proyecto-Psicopedagogia\psicopedagogia\backend>

//-----------OTROS---------
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
    console.error('Error al guardar el egresado:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/api/egresadosUpdate', async (req, res) => {
  try {
    const { index, nombre, correo, anio_graduacion, trabajo, comentario, foto } = req.body;
    await db.collection('egresados').updateOne(
      { _id: new ObjectId(index) },
      { $set: { nombre, correo, anio_graduacion, trabajo, comentario,src_foto: foto  } }
    );
    res.status(200).send('Egresado actualizado correctamente');
  } catch (error) {
    console.error('Error al actualizar el egresado:', error);
    res.status(500).send('Error al actualizar el egresado');
  }
});

app.delete('/api/egresados/:id', async (req, res) => {
  try {
    const egresadoId = req.params.id;
    // Realizar la lógica para eliminar el egresado de la base de datos utilizando el ID proporcionado
    await db.collection('egresados').deleteOne({ _id: new ObjectId(egresadoId) });
    res.status(200).send('Egresado eliminado correctamente');
  } catch (error) {
    console.error('Error al eliminar el egresado:', error);
    res.status(500).send('Error al eliminar el egresado');
  }
});
//docentes

app.get('/api/docentes', async (req, res) => {
  try {
    const docentes = await db.collection('docentes').find().toArray();
    res.json(docentes);
  } catch (error) {
    console.error('Error fetching docentes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/docentes', async (req, res) => {
  try {
    const { nombre, apodo, cargo, correo, datoc, imagen } = req.body;
    await db.collection('docentes').insertOne({ nombre, apodo, cargo, correo, datoc, imagen });
    res.status(201).json({ message: 'Docente saved successfully' });
  } catch (error) {
    console.error('Error saving docente:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/docentes/:id', async (req, res) => {
  try {
    const docenteId = req.params.id;
    const { nombre, apodo, cargo, correo, datoc, imagen } = req.body;
    await db.collection('docentes').updateOne(
      { _id: new ObjectId(docenteId) },
      { $set: { nombre, apodo, cargo, correo, datoc, imagen } }
    );
    res.status(200).send('Docente updated successfully');
  } catch (error) {
    console.error('Error updating docente:', error);
    res.status(500).send('Error updating docente');
  }
});

app.delete('/api/docentes/:id', async (req, res) => {
  try {
    const docenteId = req.params.id;
    await db.collection('docentes').deleteOne({ _id: new ObjectId(docenteId) });
    res.status(200).send('Docente deleted successfully');
  } catch (error) {
    console.error('Error deleting docente:', error);
    res.status(500).send('Error deleting docente');
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

//investigaciones

app.get('/api/zona', async (req, res) => {
  try {
    const investigacion = await db.collection('zona').findOne();
    res.json(investigacion);
  } catch (error) {
    console.error('Error al obtener la investigación:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});
app.get('/api/zona/investigaciones', async (req, res) => {
  try {
    const investigacion = await db.collection('investigaciones_zona').find().toArray();
    res.json(investigacion);
  } catch (error) {
    console.error('Error al obtener la investigación:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});
app.get('/api/sociedad/investigaciones', async (req, res) => {
  try {
    const investigacion = await db.collection('investigaciones_sociedad').find().toArray();
    res.json(investigacion);
  } catch (error) {
    console.error('Error al obtener la investigación:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


app.get('/api/sociedad', async (req, res) => {
  try {
    const sociedad = await db.collection('sociedad').findOne();
    res.json(sociedad);
  } catch (error) {
    console.error('Error al obtener la investigación:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/api/sociedadUpdate', async (req, res) => {
  try {
    const { quienes_somos, desdecuando, quienes_conforman, como_unirse,link_face, contactos } = req.body;
    await db.collection('sociedad').updateOne(
      {}, // Filtro vacío para actualizar todos los documentos
      { $set: { quienes_somos, desdecuando, quienes_conforman, como_unirse,link_face, contactos } }
    );
    res.status(200).send('Actualizado correctamente');
  } catch (error) {
    console.error('Error al actualizar:', error);
    res.status(500).send('Error al actualizar');
  }
});
app.post('/api/zonaUpdate', async (req, res) => {
  try {
    const { quienes_somos, desdecuando, quienes_conforman, como_unirse,link_face, contactos } = req.body;
    await db.collection('zona').updateOne(
      {}, // Filtro vacío para actualizar todos los documentos
      { $set: { quienes_somos, desdecuando, quienes_conforman, como_unirse,link_face, contactos } }
    );
    res.status(200).send('Actualizado correctamente');
  } catch (error) {
    console.error('Error al actualizar:', error);
    res.status(500).send('Error al actualizar');
  }
});

app.post('/api/investigacionSociedad', async (req, res) => {
  try {
    const { titulo, descripcion, foto } = req.body;

    await db.collection('investigaciones_sociedad').insertOne({ titulo, descripcion, src_foto: foto });
    res.status(201).json({ message: 'Guardado correctamente' });
  } catch (error) {
    console.error('Error al guardar investigación:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});
app.post('/api/investigacionZona', async (req, res) => {
  try {
    const { titulo, descripcion, foto } = req.body;

    await db.collection('investigaciones_zona').insertOne({ titulo, descripcion, src_foto: foto });
    res.status(201).json({ message: 'Guardado correctamente' });
  } catch (error) {
    console.error('Error al guardar investigación:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


app.post('/api/sociedad/investigacionUpdate', async (req, res) => {
  try {
    const { index, titulo, descripcion, foto } = req.body;

    await db.collection('investigaciones_sociedad').updateOne(
      { _id: new ObjectId(index) },
      { $set:{titulo, descripcion, src_foto: foto }}
    );

    res.status(200).json({ message: 'Investigación de sociedad actualizada correctamente' });
  } catch (error) {
    console.error('Error al actualizar la investigación:', error);
    res.status(500).json({ error: 'Error al actualizar' });
  }
});
app.post('/api/zona/investigacionUpdate', async (req, res) => {
  try {
    const { index, titulo, descripcion, foto } = req.body;

    await db.collection('investigaciones_zona').updateOne(
      { _id: new ObjectId(index) },
      { $set:{titulo, descripcion, src_foto: foto }}
    );

    res.status(200).json({ message: 'Investigación de zona actualizada correctamente' });
  } catch (error) {
    console.error('Error al actualizar la investigación:', error);
    res.status(500).json({ error: 'Error al actualizar' });
  }
});

app.delete('/api/sociedad/inv/:index', async (req, res) => {
  try {
    const Investigaciónindex = req.params.index;
    //console.log(Investigaciónindex);
    await db.collection('investigaciones_sociedad').deleteOne({ _id: new ObjectId(Investigaciónindex) });
    res.status(200).json({ message: 'Investigación eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar la investigación:', error);
    res.status(500).json({ error: 'Error al eliminar la investigación' });
  }
});
app.delete('/api/zona/inv/:index', async (req, res) => {
  try {
    const Investigaciónindex = req.params.index;
    //console.log(Investigaciónindex);
    await db.collection('investigaciones_zona').deleteOne({ _id: new ObjectId(Investigaciónindex) });
    res.status(200).json({ message: 'Investigación eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar la investigación:', error);
    res.status(500).json({ error: 'Error al eliminar la investigación' });
  }
});

//Pregrado

app.get('/api/pregrado', async (req, res) => {
  try {
    const pregrado = await db.collection('pregrado').findOne();
    res.json(pregrado);
  } catch (error) {
    console.error('Error al obtener pregrado:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/api/pregrado', async (req, res) => {
  try {
    const { videos_asignaturas_1  ,videos_asignaturas_2  ,videos_asignaturas_3  ,videos_asignaturas_4  ,videos_asignaturas_5  ,videos_actividades_1, videos_actividades_2  ,videos_actividades_3  ,videos_actividades_4  , videos_actividades_5  , videos_perfiles_1  ,videos_perfiles_2  , videos_perfiles_3  ,videos_perfiles_4  ,videos_perfiles_5  ,images_1  ,images_2  ,images_3  ,images_4  ,images_5  ,educativo  ,imgedu  ,intercambio  ,alianza  } = req.body;
    
    // Actualiza el primer documento de la colección (suponiendo que solo hay uno)
    await db.collection('pregrado').updateOne({}, {
      $set: {
          
              videos_asignaturas_1  ,
              videos_asignaturas_2  ,
              videos_asignaturas_3  ,
              videos_asignaturas_4  ,
              videos_asignaturas_5  ,
              videos_actividades_1  ,
              videos_actividades_2  ,
              videos_actividades_3  ,
              videos_actividades_4  ,
              videos_actividades_5  ,
              videos_perfiles_1  ,
              videos_perfiles_2  ,
              videos_perfiles_3  ,
              videos_perfiles_4  ,
              videos_perfiles_5  ,
              images_1  ,
              images_2  ,
              images_3  ,
              images_4  ,
              images_5  ,
              educativo  ,
              imgedu  ,
              intercambio  ,
              alianza  

      }
    });

    res.status(200).json({ message: 'Datos actualizados correctamente pregrado' });
  } catch (error) {
    console.error('Error al actualizar los datos en pregrado:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/api/pregradoUpdate', async (req, res) => {
  try {
    const { videos_asignaturas_1  ,videos_asignaturas_2  ,videos_asignaturas_3  ,videos_asignaturas_4  ,videos_asignaturas_5  ,videos_actividades_1, videos_actividades_2  ,videos_actividades_3  ,videos_actividades_4  , videos_actividades_5  , videos_perfiles_1  ,videos_perfiles_2  , videos_perfiles_3  ,videos_perfiles_4  ,videos_perfiles_5  ,images_1  ,images_2  ,images_3  ,images_4  ,images_5  ,educativo  ,imgedu  ,intercambio  ,alianza  } = req.body;

    // Actualiza el primer documento de la colección (suponiendo que solo hay uno)
    await db.collection('pregrado').updateOne({}, {
      $set: {
          videos_asignaturas_1  ,
          videos_asignaturas_2  ,
          videos_asignaturas_3  ,
          videos_asignaturas_4  ,
          videos_asignaturas_5  ,
          videos_actividades_1  ,
          videos_actividades_2  ,
          videos_actividades_3  ,
          videos_actividades_4  ,
          videos_actividades_5  ,
          videos_perfiles_1  ,
          videos_perfiles_2  ,
          videos_perfiles_3  ,
          videos_perfiles_4  ,
          videos_perfiles_5  ,
          images_1  ,
          images_2  ,
          images_3  ,
          images_4  ,
          images_5  ,
          educativo  ,
          imgedu  ,
          intercambio  ,
          alianza
      }
    });

    console.log('Datos actualizados correctamente en pregrado');
    res.status(200).json({ message: 'Datos actualizados correctamente en pregrado' });
  } catch (error) {
    console.error('Error al actualizar los datos en pregrado:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/api/semestre', async (req, res) => {
  try {
    const semestre = await db.collection('semestre').find().toArray();
    res.json(semestre);
  } catch (error) {
    console.error('Error fetching semestre:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/api/semestre', async (req, res) => {
  try {
    const { semestre, area, sigla, materia, requisito, descrip} = req.body;
    await db.collection('semestre').insertOne({ semestre, area, sigla, materia, requisito, descrip });
    res.status(201).json({ message: 'semestre saved successfully' });
  } catch (error) {
    console.error('Error saving semestre:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/semestre/:id', async (req, res) => {
  try {
    const semestreId = req.params.id;
    const { semestre, area, sigla, materia, requisito, descrip } = req.body;
    await db.collection('semestre').updateOne(
      { _id: new ObjectId(semestreId) },
      { $set: { semestre, area, sigla, materia, requisito, descrip } }
    );
    res.status(200).send('semestre updated successfully');
  } catch (error) {
    console.error('Error updating semestre:', error);
    res.status(500).send('Error updating semestre');
  }
});

app.delete('/api/semestre/:id', async (req, res) => {
  try {
    const semestreId = req.params.id;
    await db.collection('semestre').deleteOne({ _id: new ObjectId(semestreId) });
    res.status(200).send('semestre deleted successfully');
  } catch (error) {
    console.error('Error deleting semestre:', error);
    res.status(500).send('Error deleting semestre');
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

app.post('/api/cursosfc', async (req, res) => {
try {
  const { titulo, about, competencia, requisitos, fecha, img } = req.body;
  await db.collection('cursosfc').insertOne({ titulo, about, competencia, requisitos, fecha, img });
  res.status(201).json({ message: 'Curso guardado correctamente' });
} catch (error) {
  console.error('Error al guardar el curso:', error);
  res.status(500).json({ error: 'Error interno del servidor' });
}
});


app.put('/api/cursosfc/:id', async (req, res) => {
try {
  const cursosfcId = req.params.id;
  const { titulo, about, competencia, requisitos, fecha, img } = req.body;
  await db.collection('cursosfc').updateOne(
    { _id: new ObjectId(cursosfcId) },
    { $set: { titulo, about, competencia, requisitos, fecha, img } }
  );
  res.status(200).send('cursosfc updated successfully');
} catch (error) {
  console.error('Error updating cursosfc:', error);
  res.status(500).send('Error updating cursosfc');
}
});

app.delete('/api/cursosfc/:id', async (req, res) => {
try {
  const cursosfcId = req.params.id;
  await db.collection('cursosfc').deleteOne({ _id: new ObjectId(cursosfcId) });
  res.status(200).send('cursosfc deleted successfully');
} catch (error) {
  console.error('Error deleting cursosfc:', error);
  res.status(500).send('Error deleting cursosfc');
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

app.post('/api/maestria', async (req, res) => {
try {
  const { titulo, about, competencia, requisitos, fecha, img } = req.body;
  await db.collection('maestria').insertOne({ titulo, about, competencia, requisitos, fecha, img });
  res.status(201).json({ message: 'Curso guardado correctamente' });
} catch (error) {
  console.error('Error al guardar el curso:', error);
  res.status(500).json({ error: 'Error interno del servidor' });
}
});


app.put('/api/maestria/:id', async (req, res) => {
try {
  const maestriaId = req.params.id;
  const { titulo, about, competencia, requisitos, fecha, img } = req.body;
  await db.collection('maestria').updateOne(
    { _id: new ObjectId(maestriaId) },
    { $set: { titulo, about, competencia, requisitos, fecha, img } }
  );
  res.status(200).send('maestria updated successfully');
} catch (error) {
  console.error('Error updating maestria:', error);
  res.status(500).send('Error updating maestria');
}
});

app.delete('/api/maestria/:id', async (req, res) => {
try {
  const maestriaId = req.params.id;
  await db.collection('maestria').deleteOne({ _id: new ObjectId(maestriaId) });
  res.status(200).send('maestria deleted successfully');
} catch (error) {
  console.error('Error deleting maestria:', error);
  res.status(500).send('Error deleting maestria');
}
});


//red
app.get('/api/red', async (req, res) => {
  try {
    const red = await db.collection('red').find().toArray();
    res.json(red);
  } catch (error) {
    console.error('Error al obtener las redes:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/api/red', async (req, res) => {
  try {
    const {  titulo, link, foto } = req.body;
    await db.collection('red').insertOne({ titulo, link, src: foto });
    res.status(201).json({ message: 'Red guardado correctamente' });
  } catch (error) {
    console.error('Error al guardar red', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/api/redUpdate', async (req, res) => {
  try {
    const { index, titulo, link,foto } = req.body;
    await db.collection('red').updateOne(
      { _id: new ObjectId(index) },
      { $set: {  titulo, link, src:foto } }
    );
    res.status(200).send('Red actualizado correctamente');
  } catch (error) {
    console.error('Error al actualizar el red:', error);
    res.status(500).send('Error al actualizar el red');
  }
});

app.delete('/api/red/:id', async (req, res) => {
  try {
    const redId = req.params.id;
    // Realizar la lógica para eliminar el egresado de la base de datos utilizando el ID proporcionado
    await db.collection('red').deleteOne({ _id: new ObjectId(redId) });
    res.status(200).send('Red eliminado correctamente');
  } catch (error) {
    console.error('Error al eliminar red:', error);
    res.status(500).send('Error al eliminar red');
  }
});

