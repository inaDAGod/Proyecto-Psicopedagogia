<template>
  <div>
      <div class="content">
          <div class="titulo">
          <h1>NOTICIAS Y ACTIVIDADES</h1>
          </div>
      </div>
      <div class="recuadros">
          <div class="formulario-anadir">
              <div class="cuadro-formulario">
                  <div class="modal-content-home">
                      <h2>Añadir actividad</h2>
                      <form @submit.prevent="submitForm">
                          <div class="form-group-home">
                              <label for="actividadAnadir">Actividad:</label><br>
                              <input type="text" id="actividadAnadir" v-model="actividadAnadir">
                          </div>
                          <div class="form-group-home">
                              <label for="fechaActAnadir">Fecha:</label><br>
                              <input type="Date" id="fechaAnadir" v-model="fechaAnadir">
                          </div>
                          <div class="form-group-home">
                              <label for="horaAnadir">Hora:</label><br>
                              <input type="Time" id="horaAnadir" v-model="horaAnadir">
                          </div>
                          <div class="form-group-home">
                              <label for="ubicacionAnadir">Ubicacion:</label><br>
                              <input type="text" id="ubicacionAnadir" v-model="ubicacionAnadir">
                          </div>
                          <div class="form-group-home">
                              <label for="descripcionAnadir">Descripción:</label><br>
                              <textarea id="descripcionAnadir" v-model="descripcionAnadir"></textarea>
                          </div>
                          <div class="form-group-home">
                              <label for="actividad_srcAnadir">Imagen de actividad:</label><br>
                              <input type="file" id="actividad_srcAnadir" @change="onFileChange">
                          </div>
                          <div style="text-align: center;">
                              <button class="boton-guardar">Guardar</button>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
          <div class="formulario-anadir">
          <div class="cuadro-formulario">
              <div class="modal-content-home">
                  <h2>Añadir noticia</h2>
                  <form @submit.prevent="submitFormNoticia">
                      <div class="form-group-home">
                          <label for="noticiaAnadir">Noticia:</label><br>
                          <input type="text" id="noticiaAnadir" v-model="noticiaAnadir">
                      </div>
                      <div class="form-group-home">
                          <label for="contenidoAnadir">Contenido:</label><br>
                          <textarea id="contenidoAnadir" v-model="contenidoAnadir"></textarea>
                      </div>
                      <div class="form-group-home">
                          <label for="fechaNotiAnadir">Fecha:</label><br>
                          <input type="Date" id="fechaNotiAnadir" v-model="fechaNotiAnadir">
                      </div>
                      <div class="form-group-home">
                          <label for="noticia_srcAnadir">Imagen de noticia:</label><br>
                          <input type="file" id="noticia_srcAnadir" @change="onFileChangeNoticia">
                      </div>
                      <div style="text-align: center;">
                          <button class="boton-guardar">Guardar</button>
                      </div>
                  </form>
              </div>
          </div>
      </div>
      
      </div>
      <div class="vacio">
          <br>
      </div>
      <div class="subtitulo-actividad">
          <h1>ACTIVIDADES</h1>
      </div>
      <br>
      <table class="container-actividades">
          <tbody>
          <tr v-for="(actividadRow, rowIndex) in actividadRows" :key="rowIndex">
              <td v-for="(actividad, index) in actividadRow" :key="index">
              <Actividad :actividad="actividad" />
              <div class="acciones-publicacion">
                  <button class="boton-accion" @click="editActividad(actividad,actividad._id)"><img src="/src/assets/images/edit.png" width="20vh" height="auto"></button>
                  <button class="boton-accion" @click="openDeleteModal(actividad)" ><img src="/src/assets/images/trash2.png" width="20vh" height="auto"></button>
              </div>
              </td>
          </tr>
          </tbody>
      </table>
      <div class="subtitulo-actividad">
          <h1>NOTICIAS</h1>
      </div>
      <br>
      <table class="container-noticias">
          <tbody>
          <tr v-for="(noticiaRow, rowIndex) in noticiaRows" :key="rowIndex">
              <td v-for="(noticia, index) in noticiaRow" :key="index">
              <Noticia :noticia="noticia" />
              <div class="acciones-publicacion">
                  <button class="boton-accion" @click="editNoticia(noticia)" @onclose="showModal = false"><img src="/src/assets/images/edit.png" width="20vh" height="auto"></button>
                  <button class="boton-accion" @click="openDeleteModalNoticia(noticia)" ><img src="/src/assets/images/trash2.png" width="20vh" height="auto"></button>
              </div>
              </td>
          </tr>
          </tbody>
      </table>
      <EditModalActividad v-if="selectedActividad" :actividades="selectedActividad" @onclose="closeEditActividad" />
      <EditModalNoticia v-if="selectedNoticia" :noticias="selectedNoticia" @onclose="closeEditNoticia" />

      <ConfirmDeleteModal
          v-if="showDeleteModal"
          :item="actividadToDelete.actividad"
          @onConfirm="confirmDeleteActividad"
          @onClose="closeDeleteModal"
      />
      <ConfirmDeleteModalNoticia
          v-if="showDeleteModalNoticia"
          :item="noticiaToDelete.noticia"
          @onConfirm="confirmDeleteNoticia"
          @onClose="closeDeleteModalNoticia"
      />
      <SuccessModal
          v-if="showSuccessModal"
          message="La actividad se ha registrado exitosamente."
          @onClose="closeSuccessModal"
      />
      <SuccessModal
          v-if="showSuccessModal"
          message="La noticia se ha registrado exitosamente."
          @onClose="closeSuccessModal"
      />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Actividad from '/src/components/Actividad.vue';
import Noticia from '/src/components/Noticia.vue';
import SuccessEdit from '/src/components/SuccessEditModal.vue';
import EditModalActividad from '/src/components/formActividadEdit.vue';
import EditModalNoticia from '/src/components/formNoticiaEdit.vue';
import ConfirmDeleteModal from '/src/components/ConfirmDeleteModal.vue';
import ConfirmDeleteModalNoticia from '/src/components/ConfirmDeleteModalExtra.vue';
import SuccessModal from '/src/components/SuccessModal.vue';

  //EDITABLES NOTICIA Y ACTIVIDAD
  const closeEditActividad = () => {
    selectedActividad.value = null;
  };

  const closeEditNoticia = () => {
    selectedNoticia.value = null;
  };


  const selectedActividad = ref(null);
  const selectedNoticia = ref(null);
  const showSuccessModal = ref(false); 
  const closeSuccessModal = () => {
      showSuccessModal.value = false;
  };
  
  const editActividad = (actividad) => {
      selectedActividad.value = actividad;
  };
  const editNoticia = (noticia) => {
      selectedNoticia.value = noticia;
  };
  
  //ELIMINAR ACTIVIDAD
  const actividadToDelete = ref(null);
  const showDeleteModal = ref(false);
  const closeDeleteModal = () => {
      showDeleteModal.value = false;
  };
  const openDeleteModal = (actividad) => {
      actividadToDelete.value = actividad;
      showDeleteModal.value = true;
  };
  const confirmDeleteActividad = async () => {
  try {
      const id = actividadToDelete.value._id;
      const response = await axios.delete(`http://localhost:3000/api/actividades/${id}`);
      if (response.status === 200) {
      console.log('Actividad borrada correctamente');
      } else {
      console.error('Error al borrar la actividad:', response.statusText);
      }
  } catch (error) {
      console.error('Error al borrar la actividad:', error);
      if (error.response) {
      console.error('Respuesta del servidor:', error.response.data);
      console.error('Código de estado:', error.response.status);
      console.error('Encabezados:', error.response.headers);
      } else if (error.request) {
      console.error('Solicitud hecha pero no se recibió respuesta:', error.request);
      } else {
      console.error('Error en la configuración de la solicitud:', error.message);
      }
  } finally {
      closeDeleteModal();
  }
  };

  //eLIMINAR NOTICIA
  const noticiaToDelete = ref(null);
  const showDeleteModalNoticia = ref(false); 
  const openDeleteModalNoticia = (noticia) => {
      noticiaToDelete.value = noticia;
      showDeleteModalNoticia.value = true;
  };
  const closeDeleteModalNoticia = () => {
      showDeleteModalNoticia.value = false;
  };
  const confirmDeleteNoticia = async () => {
  try {
      const id = noticiaToDelete.value._id;
      const response = await axios.delete(`http://localhost:3000/api/noticias/${id}`);
      if (response.status === 200) {
      console.log('Noticia borrada correctamente');
      } else {
      console.error('Error al borrar la noticia:', response.statusText);
      }
  } catch (error) {
      console.error('Error al borrar la noticia:', error);
      if (error.response) {
      console.error('Respuesta del servidor:', error.response.data);
      console.error('Código de estado:', error.response.status);
      console.error('Encabezados:', error.response.headers);
      } else if (error.request) {
      console.error('Solicitud hecha pero no se recibió respuesta:', error.request);
      } else {
      console.error('Error en la configuración de la solicitud:', error.message);
      }
  } finally {
      closeDeleteModalNoticia();
  }
  };

  //para añadir actividad y noticia
  const limpiarFormularioActividad = () => {
    actividadAnadir.value = '';
    fechaAnadir.value = '';
    horaAnadir.value = '';
    ubicacionAnadir.value = '';
    descripcionAnadir.value = '';
    actividad_srcAnadir.value = '';
    currentFileAnadir.value = null;
  };
  const limpiarFormularioNoticia = () => {
    noticiaAnadir.value = '';
    fechaNotiAnadir.value = '';
    contenidoAnadir.value = '';
    noticia_srcAnadir.value = '';
    currentFileNotiAnadir.value = null;
  };
  const actividadAnadir = ref('');
  const fechaAnadir = ref('');
  const horaAnadir = ref('');
  const ubicacionAnadir = ref('');
  const descripcionAnadir = ref('');
  const actividad_srcAnadir = ref('');
  const currentFileAnadir = ref(null);

  const noticiaAnadir = ref('');
  const fechaNotiAnadir = ref('');
  const contenidoAnadir = ref('');
  const noticia_srcAnadir = ref('');
  const currentFileNotiAnadir = ref(null);

  const submitForm = async () => {
    try {
      const direc = "/backend/images/";
      actividad_srcAnadir.value = direc + currentFileAnadir.value.name;
      const formData = new FormData();
      formData.append('sampleFile', currentFileAnadir.value);
      await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData
      });
      const actividadData = new FormData();
      actividadData.append('actividad', actividadAnadir.value);
      actividadData.append('fecha', fechaAnadir.value);
      actividadData.append('hora', horaAnadir.value);
      actividadData.append('ubicacion', ubicacionAnadir.value);
      actividadData.append('descripcion', descripcionAnadir.value);
      actividadData.append('imagenA', actividad_srcAnadir.value);

      const response = await fetch('http://localhost:3000/api/actividades', {
        method: 'POST',
        body: actividadData
      });
      if (response.ok) {
        console.log('Actividad interaccion social guardada correctamente');
        limpiarFormularioActividad();
        obtenerActividades();
        showSuccessModal.value = true;
      } else {
        console.error('Error al guardar la nueva actividad:', response.statusText);
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  const submitFormNoticia = async () => {
    try {
      const direc = "/backend/images/";
      noticia_srcAnadir.value = direc + currentFileNotiAnadir.value.name;
      const formData = new FormData();
      formData.append('sampleFile', currentFileNotiAnadir.value);
      await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData
      });
      const noticiaData = new FormData();
      noticiaData.append('noticia', noticiaAnadir.value);
      noticiaData.append('fecha', fechaNotiAnadir.value);
      noticiaData.append('contenido', contenidoAnadir.value);
      noticiaData.append('imagenN', noticia_srcAnadir.value);

      const response = await fetch('http://localhost:3000/api/noticias', {
        method: 'POST',
        body: noticiaData
      });
      if (response.ok) {
        console.log('Noticia guardada correctamente');
        limpiarFormularioNoticia();
        obtenerNoticias();
        showSuccessModal.value = true;
      } else {
        console.error('Error al guardar la nueva noticia:', response.statusText);
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  const onFileChange = (event) => {
    const file = event.target.files[0];
    currentFileAnadir.value = file;
  };
  const onFileChangeNoticia = (event) => {
    const file = event.target.files[0];
    currentFileNotiAnadir.value = file;
  };

  onMounted(() => {
  obtenerActividades();
  obtenerNoticias();
  });


const actividades = ref([]);
const actividadRows = ref([]);

const obtenerActividades = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/actividades');
    actividades.value = response.data;
    calcularFilasDeActividades();
  } catch (error) {
    console.error('Error fetching Actividades:', error);
  }
};

const calcularFilasDeActividades = () => {
  actividadRows.value = [];
  for (let i = 0; i < actividades.value.length; i += 3) {
    const row = [];
    for (let j = i; j < i + 3 && j < actividades.value.length; j++) {
      row.push(actividades.value[j]);
    }
    actividadRows.value.push(row);
  }
};

onMounted(() => {
  obtenerActividades();
});

const noticias = ref([]);
const noticiaRows = ref([]);

const obtenerNoticias = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/noticias');
    noticias.value = response.data;
    calcularFilasDeNoticias();
  } catch (error) {
    console.error('Error fetching Noticias:', error);
  }
};

const calcularFilasDeNoticias = () => {
  noticiaRows.value = [];
  for (let i = 0; i < noticias.value.length; i += 3) {
    const row = [];
    for (let j = i; j < i + 3 && j < noticias.value.length; j++) {
      row.push(noticias.value[j]);
    }
    noticiaRows.value.push(row);
  }
};

onMounted(() => {
  obtenerNoticias();
});
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Koulen&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap');
@import url('/src/assets/estilo.css');
@import url('/src/assets/formAnadir.css');
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
.recuadros{
    display:flex;
    width:100%;
    padding-left: 20%;;
    text-align: center;
    align-items: center;
  }
.titulo h1{
  font-size: 11vh;
  color: #FF7001;
  font-family: 'Koulen', 'sans-serif';
  margin-top: 4vh;
}
.subtitulo-actividad h1{
  font-size: 7vh;
  color: #FF7001;
  font-family: 'Koulen', 'sans-serif';
  margin-top: 4vh;
}
.container-anuncio{
  text-align: center;
  align-items: center;
  margin-right: 7%;
  margin-left: 7%;
  width:86%;
}
.anuncio{
  text-align: center;
}
.text-box-act{
  padding: 3vh;
  border-radius: 5vh;
  text-align: center;
  align-items: center;
  padding-left: 5%;
  padding-right: 5%;
  background-color: #BEAFE5;
}
.text-content-act p{
  font-size: 5vh;
  font-family: 'Oswald', sans-serif;
  color: white;
  text-align: center;
}
.container-actividades,
.container-noticias {
  margin-left: 5%;
  margin-right:5%;
  width:90%;
  text-align: center;
}

h1{
  margin-left: 5vh;
  font-family: 'Oswald', 'sans-serif';
  font-size: 5vh;
}
.boton-accion {
  font-size: 2vh;
  margin-top: 0.2vh;
  margin-right: 5%;
  margin-bottom: 2vh;
  background-color: #ffffff;
  border-color: #acacac;
  padding: 0.5vh;
  border-radius: 3vh;
  box-shadow: 0px 0px 10px rgba(82, 218, 89, 0.452);
}
</style>
