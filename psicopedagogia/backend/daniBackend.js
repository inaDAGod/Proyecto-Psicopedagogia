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

//Para subir imagenes
app.use(fileUpload());
app.post('/upload', function(req, res) {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ error: 'No files were uploaded.' });
  }

  sampleFile = req.files.sampleFile;
  uploadPath = "./images/"+ sampleFile.name;

  sampleFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).json({ error: err }); 
    res.json({ message: 'File uploaded!' });
  });
});

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
    const publicaciones = await db.collection('publicaciones').find().toArray();;
    res.json(publicaciones);
  } catch (error) {
    console.error('Error al obtener las publicaciones:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend en funcionamiento en el puerto ${PORT}`);
});
