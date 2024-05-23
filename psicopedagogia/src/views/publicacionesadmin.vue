<template>
    <div class="publicacionadmin-principal">
        <div class="pub_admin">
            <div class="visualizacion">
                <div class="content">
                    <div class="titulo-publicacion">
                    <br><br>
                    <h1>PUBLICACIONES Y LIBROS</h1>
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
                                    <button class="boton-accion" @click="editarPublicacion(publicacion)"><img src="/src/assets/images/edit.png" width="20vh" height="auto"></button>
                                    <button class="boton-accion" @click="borrarPublicacion(publicacion._id)"><img src="/src/assets/images/trash2.png" width="20vh" height="auto"></button>
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
        <div class="formulario-publicaciones">
            <div class="modifi">
                <div class="modal-content-home">
                    <h2>Añadir publicación</h2>
                    <form @submit.prevent="submitForm">
                        <div class="form-group-home">
                            <label for="titulo">Título:</label><br>
                            <input type="text" id="titulo" v-model="titulo">
                        </div>
                        <div class="form-group-home">
                            <label for="autor">Autor:</label><br>
                            <input type="text" id="autor" v-model="autor">
                        </div>
                        <div class="form-group-home">
                            <label for="descripcion">Descripción:</label><br>
                            <textarea id="descripcion" v-model="descripcion" ></textarea>
                        </div>
                        <div class="form-group-home">
                            <label for="anio">Año:</label><br>
                            <input type="number" id="anio" v-model="anio">
                        </div>
                        <div class="form-group-home">
                            <label for="ruta">Ruta del PDF:</label><br>
                            <input type="text" id="ruta" v-model="ruta">
                        </div>
                        <div class="form-group-home">
                            <label for="publicacion_src">Imagen de portada:</label><br>
                            <input type="file" id="publicacion_src" @change="onFileChange" >
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
//visualizacion de las publicaciones con busqueda.
  import { ref, onMounted, computed , defineProps } from 'vue';
  import axios from 'axios';
  //Para añadir nueva publicacion
  const titulo = ref('');
  const autor = ref('');
  const anio= ref('');
  const descripcion = ref('');
  const ruta = ref('');
  const publicacion_src = ref('');
  const showForm = ref(true);
  const currentFile = ref(null);
  const props = defineProps({
    onclose: Function,
  });
  const submitForm = async () => {
    try {
      const direc = "/backend/images/";
      console.log(currentFile.value);
      publicacion_src.value = direc + currentFile.value.name;
      const formData = new FormData();
      formData.append('sampleFile', currentFile.value);
      fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData
      }).then(async (res) => {
        console.log(res);
        const formData = new FormData(); // Crear objeto FormData para enviar archivos
        formData.append('titulo', titulo.value);
        formData.append('autor', autor.value);
        formData.append('descripcion', descripcion.value);
        formData.append('anio', anio.value);
        formData.append('ruta', ruta.value);
        formData.append('portada', publicacion_src.value); 
        console.log(publicacion_src.value);
        const response = await fetch('http://localhost:3000/api/publicaciones', {
          method: 'POST',
          body: formData // Pasar el formData como cuerpo de la solicitud
        });
        if (response.ok) {
          console.log('Publicacion guardada correctamente');
        } else {
          console.error('Error al guardar el nueva publicacion:', response.statusText);
        }
      })

      
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };
  const onFileChange = (event) => {
    const file = event.target.files[0];
    currentFile.value = file;
  };
  //para borrar la publicacion
  const borrarPublicacion = async (id) => {
    try {
        console.log('ID de la publicación a eliminar:', id);
        const response = await fetch(`http://localhost:3000/api/publicaciones/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            console.log('Publicación borrada correctamente');
            obtenerPublicaciones(); // Para actualizar la lista de publicaciones después de borrar
        } else {
            console.error('Error al borrar la publicación:', response.statusText);
        }
    } catch (error) {
        console.error('Error al borrar la publicación:', error);
    }
  };

  //otros de cargado de publicaciones
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
    .publicacionadmin-principal{
        width: 100%;
        display: flex;
    }
    .pub_admi{
        width: 50%;
    }
    .modifi{
        background-color: #D9D9D9;
        padding-top: 7vh;
        padding-left: 7vh;
        padding-right: 7vh;
        padding-bottom: 7vh;
        width: 90%;
        margin-top:15%;
        margin-left:2%;
    }
    .acciones-publicacion {
        display: flex;
        justify-content: flex-start;
    }
    .boton-accion{
        font-size: 2vh;
        margin-top:0.2vh;
        margin-right:5%;
        margin-bottom:2vh;
        background-color: #BADF3A;
        border-color: #BADF3A;
        padding: 0.5vh;
        border-radius: 3vh;
        box-shadow: 0px 0px 10px rgba(82, 218, 89, 0.452); 
    }
    .formulario-publicaciones{ 
        width: 35%;
    }
    .formulario-publicaciones h2{ 
        font-size: 4vh;
        font-family: 'Roboto Condensed', sans-serif;
    }
    .formulario-publicaciones label{ 
        font-size: 2vh;
    }
    .titulo-publicacion h1{
      font-size: 4vh;
      color: #FF7001;
      font-family: 'Koulen', 'sans-serif';
    }
    .container-publicaciones{
      margin-right:5%;
      margin-left: 3%;
      width:90%;
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
      transition: transform 0.3s ease; /* Agrega una transición suave */
    }
    .publicaciones {
      display: flex;
      margin-top: 3vh;
      margin-bottom: 3vh;
      padding: 1%;
      margin: 2%;
    }
    .busquedaPubli{
      width: 60%;
      margin: 2%;
      padding: 1%;
      margin-left: 5%;
      border-radius: 40px;
      border-color: #ff710441;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5); 
    }
    .buscarPubli{
      background-color: #BADF3A;
      border-color: #BADF3A;
      padding: 1%;
      border-radius: 3vh;
      box-shadow: 0px 0px 10px rgba(82, 218, 89, 0.452); 
    }
    .boton-guardar{
        margin-top: 2.5vh;
        size: 4vh;
    }
    .buscarPubli:hover{
      background-color: #FF7001;
      border-color: #FF7001;
    }
    .publicacion-imagen{
      flex:1;
    }
    .info-publicacion {
      flex: 2.5;
    }
    .filtro{
      display: none;
    }
</style>
  