<template>
  <div class="publicacionadmin-principal">
    <div class="pub_admin">
      <div class="visualizacion">
        <div class="content">
          <div class="titulo-publicacion">
            <br><br>
            <h1 style="font-family: 'Koulen';font-size: 400%;color: rgba(255, 112, 1, 1);padding: 2%;padding-left: 4%;text-align: left;" >PUBLICACIONES Y LIBROS</h1>
          </div>
          <div>
            <input type="text" v-model="filtro.todos" class="busquedaPubli" placeholder="Buscar por título, autor, año o descripción">
            <button class="buscarPubli" @click="filtrarPublicaciones">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
              </svg>
            </button>
          </div>
        </div>
        <br>
        <table class="container-publicaciones">
          <tbody>
            <tr v-if="publicacionesFiltradasEnFilas.length > 0" v-for="(publicacionRow, rowIndex) in publicacionesFiltradasEnFilas" :key="rowIndex">
              <td v-for="(publicacion, index) in publicacionRow" :key="index">
                <div class="publicaciones" v-if="publicacion._id">
                  <a :href="publicacion.ruta" target="_blank" rel="noopener noreferrer">
                    <div class="publicacion-imagen" @mouseover="aumentarImagen(rowIndex, index)" @mouseleave="reducirImagen(rowIndex, index)">
                      <img :src="publicacion.publicacion_src" :alt="publicacion.titulo" :style="{ transform: imagenesAgrandadas[rowIndex][index] ? 'scale(1.05)' : 'scale(1)' }">
                    </div>
                  </a>
                  <div class="info-publicacion">
                    <h1>{{ publicacion.titulo }}</h1>
                    <p>Autor: {{ publicacion.autor }}</p>
                    <p>Año: {{ publicacion.anio }}</p>
                    <p>{{ publicacion.descripcion }}</p>
                    <div class="acciones-publicacion">
                      <button class="boton-editar" @click="toggleForm(publicacion,publicacion._id)"><img src="/src/assets/images/edit.png" width="20vh" height="auto"></button>
                      <button class="boton-accion" @click="openDeleteModal(publicacion)" ><img src="/src/assets/images/trash2.png" width="20vh" height="auto"></button>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr v-else>
              <td colspan="2">No se encontraron publicaciones</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <EditModal v-show="selectedPublicacion" :publicacion="selectedPublicacion"  @onclose="toggleForm(null)" /> 
    <ConfirmDeleteModal
      v-if="showDeleteModal"
      :item="publicacionToDelete.titulo"
      @onConfirm="confirmDelete"
      @onClose="closeDeleteModal"
    />
    <SuccessModal
      v-if="showSuccessModal"
      message="La publicación se ha registrado exitosamente."
      @onClose="closeSuccessModal"
    />
    <div class="formulario-publicaciones" style="background-color: #D9D9D9 ">
      <div class="cuadro">
        <div class="modal-content-home">
          <h2 style="color: rgba(255, 112, 1, 1);padding: 2%;text-align: left;">Añadir publicación</h2>
          <form @submit.prevent="submitForm" style="font-family: 'Oswald', sans-serif;">
            <div class="form-group-home" style="font-family: 'Oswald', sans-serif;">
              <label for="tituloAnadir">Título:</label><br>
              <input type="text" id="tituloAnadir" v-model="tituloAnadir">
            </div>
            <div class="form-group-home">
              <label for="autorAnadir">Autor:</label><br>
              <input type="text" id="autorAnadir" v-model="autorAnadir">
            </div>
            <div class="form-group-home">
              <label for="descripcionAnadir">Descripción:</label><br>
              <textarea id="descripcionAnadir" v-model="descripcionAnadir"></textarea>
            </div>
            <div class="form-group-home">
              <label for="anioAnadir">Año:</label><br>
              <input type="number" id="anioAnadir" v-model="anioAnadir">
            </div>
            <div class="form-group-home">
              <label for="rutaAnadir">Ruta del PDF:</label><br>
              <input type="text" id="rutaAandir" v-model="rutaAnadir">
            </div>
            <div class="form-group-home">
              <label for="publicacion_srcAnadir">Imagen de portada:</label><br>
              <input type="file" id="publicacion_srcAnadir" @change="onFileChange">
            </div>
            <div style="text-align: center;">
              <button class="boton-guardar">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed} from 'vue';
import axios from 'axios';
import EditModal from '/src/views/formPublicacionEdit.vue';
import ConfirmDeleteModal from '/src/components/ConfirmDeleteModal.vue';
import SuccessModal from '/src/components/SuccessModal.vue';
const props = defineProps({
  titulo: String,
  autor: String,
  descripcion: String,
  anio: Number,
  ruta: String,
  id: String
});
const publicacionesS = ref([]);
const selectedPublicacion = ref(null);
  
  const toggleForm = (publicacion,id) => {
    selectedPublicacion.value = publicacion;
  };
  
  onMounted(async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/publicaciones');
      publicacionesS.value = response.data;
    } catch (error) {
      console.error('Error al obtener las investigaciones:', error);
    }
  });
const limpiarFormulario = () => {
  tituloAnadir.value = '';
  autorAnadir.value = '';
  descripcionAnadir.value = '';
  anioAnadir.value = '';
  rutaAnadir.value = '';
  publicacion_srcAnadir.value = '';
  currentFileAnadir.value = null;
};

const showSuccessModal = ref(false);
const closeSuccessModal = () => {
  showSuccessModal.value = false;
};
const showDeleteModal = ref(false);
const publicacionToDelete = ref(null);
const openDeleteModal = (publicacion) => {
  publicacionToDelete.value = publicacion;
  showDeleteModal.value = true;
};
const closeDeleteModal = () => {
  showDeleteModal.value = false;
};
const confirmDelete = async () => {
  try {
    const id = publicacionToDelete.value._id;
    obtenerPublicaciones();
    const response = await axios.delete(`http://localhost:3000/api/publicaciones/${id}`);
    obtenerPublicaciones()
    if (response.status === 200) {
      console.log('Publicación borrada correctamente');
      obtenerPublicaciones();
    } else {
      console.error('Error al borrar la publicación:', response.statusText);
    }
  } catch (error) {
    console.error('Error al borrar la publicación:', error);
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      console.error('Respuesta del servidor:', error.response.data);
      console.error('Código de estado:', error.response.status);
      console.error('Encabezados:', error.response.headers);
    } else if (error.request) {
      // La solicitud se hizo pero no se recibió respuesta
      console.error('Solicitud hecha pero no se recibió respuesta:', error.request);
    } else {
      // Algo pasó al configurar la solicitud
      console.error('Error en la configuración de la solicitud:', error.message);
    }
  } finally {
    closeDeleteModal();
  }
};
const tituloAnadir = ref('');
const autorAnadir = ref('');
const descripcionAnadir = ref('');
const anioAnadir = ref('');
const rutaAnadir = ref('');
const publicacion_srcAnadir = ref('');
const currentFileAnadir = ref(null);

const submitForm = async () => {
  try {
    const direc = "/backend/images/";
    publicacion_srcAnadir.value = direc + currentFileAnadir.value.name;
    const formData = new FormData();
    formData.append('sampleFile', currentFileAnadir.value);
    await fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData
    });
    const publicacionData = new FormData();
    publicacionData.append('titulo', tituloAnadir.value);
    publicacionData.append('autor', autorAnadir.value);
    publicacionData.append('descripcion', descripcionAnadir.value);
    publicacionData.append('anio', anioAnadir.value);
    publicacionData.append('ruta', rutaAnadir.value);
    publicacionData.append('portada', publicacion_srcAnadir.value);

    const response = await fetch('http://localhost:3000/api/publicaciones', {
      method: 'POST',
      body: publicacionData
    });
    if (response.ok) {
      console.log('Publicacion guardada correctamente');
      limpiarFormulario();
      obtenerPublicaciones();
      showSuccessModal.value = true;
    } else {
      console.error('Error al guardar la nueva publicacion:', response.statusText);
    }
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
  }
};

const onFileChange = (event) => {
  const file = event.target.files[0];
  currentFileAnadir.value = file;
};

const publicaciones = ref([]);
const imagenesAgrandadas = ref([]);
const filtro = ref({
  todos: ''
});

const publicacionesFiltradas = computed(() => {
  const terminos = filtro.value.todos.toLowerCase().split(' ');
  return publicaciones.value.filter(publicacion => {
    return terminos.every(termino => {
      return Object.values(publicacion).some(valor => {
        return String(valor).toLowerCase().includes(termino);
      });
    });
  });
});

const publicacionesFiltradasEnFilas = computed(() => {
  const filas = [];
  for (let i = 0; i < publicacionesFiltradas.value.length; i += 2) {
    filas.push(publicacionesFiltradas.value.slice(i, i + 2));
  }
  return filas;
});

const obtenerPublicaciones = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/publicaciones');
    publicaciones.value = response.data;
    inicializarImagenesAgrandadas();
  } catch (error) {
    console.error('Error fetching publicaciones:', error);
  }
};

const inicializarImagenesAgrandadas = () => {
  const filas = publicacionesFiltradasEnFilas.value;
  imagenesAgrandadas.value = filas.map(fila => fila.map(() => false));
};

const aumentarImagen = (rowIndex, index) => {
  imagenesAgrandadas.value[rowIndex][index] = true;
};

const reducirImagen = (rowIndex, index) => {
  imagenesAgrandadas.value[rowIndex][index] = false;
};

onMounted(() => {
  obtenerPublicaciones();
});
</script>

<style scoped>
.modal-success,
.modal-confirm-delete {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}
.publicacionadmin-principal {
  width: 100%;
  display: flex;
}
.pub_admi {
  width: 50%;
}
.cuadro {
  background-color: #d9d9d9;
  padding-top: 7vh;
  padding-left: 7vh;
  padding-right: 7vh;
  padding-bottom: 7vh;
  width: 90%;
  margin-top: 15%;
  margin-left: 2%;
}
.acciones-publicacion {
  display: flex;
  justify-content: flex-start;
}
.boton-editar {
  font-size: 100%;
  width: 5vw;
  height: 2.5vw;
  margin-right: 5%;
  margin-bottom: 2vh;
  background-color: #BADF3A;
  border-color: #BADF3A;
  padding: 0.5vh;
  border-radius: 3vh;
  box-shadow: #BADF3A;
}
.boton-accion {
  font-size: 100%;
  width: 5vw;
  height: 2.5vw;
  margin-right: 5%;
  margin-bottom: 2vh;
  background-color: #FFA198;
  border-color: #FFA198;
  padding: 0.5vh;
  border-radius: 3vh;
  box-shadow: #FFA198;
}
.boton-accion img, .boton-editar img {
  width: 40%; /* Hacer que la imagen ocupe todo el espacio disponible dentro del botón */
  height: auto; /* Mantener la proporción de aspecto */
}
.formulario-publicaciones {
  width: 35%;
}
.formulario-publicaciones h2 {
  font-size: 4vh;
  font-family: 'Roboto Condensed', sans-serif;
}
.formulario-publicaciones label {
  font-size: 2vh;
}
.formulario-publicaciones input[type="text"],
  input[type="number"],
  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 40px;
    box-sizing: border-box;
  }
.titulo-publicacion h1 {
  font-size: 4vh;
  color: #ff7001;
  font-family: 'Koulen', 'sans-serif';
}
.container-publicaciones {
  margin-right: 5%;
  margin-left: 3%;
  width: 90%;
}
.info-publicacion p {
  color: black;
  text-align: left;
  align-items: center;
  font-size: 2vh;
  font-family: 'Roboto Condensed', sans-serif;
}
.info-publicacion h1 {
  color: black;
  text-align: center;
  align-items: center;
  font-size: 2vh;
  font-family: 'Oswald', sans-serif;
}
.publicacion-imagen img {
  width: 15vh;
  height: 25vh;
  margin-right: 3vh;
  transition: transform 0.3s ease;
}
.publicaciones {
  display: flex;
  margin-top: 3vh;
  margin-bottom: 3vh;
  padding: 1%;
  margin: 2%;
}
.busquedaPubli {
  width: 60%;
  margin: 2%;
  padding: 1%;
  margin-left: 5%;
  border-radius: 40px;
  border-color: #ff710441;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}
.buscarPubli {
  background-color: #badf3a;
  border-color: #badf3a;
  padding: 1%;
  border-radius: 3vh;
  box-shadow: 0px 0px 10px rgba(82, 218, 89, 0.452);
}
.boton-guardar {
  background-color: #FF7001;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  height: 20%;
  width: 50%;
  font-size: 100%;
  margin-top: 5%;
}
.buscarPubli:hover {
  background-color: #ff7001;
  border-color: #ff7001;
}
.publicacion-imagen {
  flex: 1;
}
.info-publicacion {
  flex: 2.5;
}
.filtro {
  display: none;
}
</style>