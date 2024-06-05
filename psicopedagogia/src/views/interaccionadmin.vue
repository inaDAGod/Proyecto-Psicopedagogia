<template>
    <h2 class="titu-principal">Sembrando semillas de paz</h2>
    <div class="recuadros">
      <div class="cuadro">
        <div class="formDatos">
          <div class="modifi">
            <div class="modal-content">
              <h2>Información interacción social</h2>
              <form @submit.prevent="submitForm">
                <div class="form-group">
                  <label for="objetivo">Objetivos: </label><br>
                  <textarea id="objetivo" :disabled="!editar" v-model="objetivo"></textarea>
                </div>
                <div class="form-group">
                  <label for="lineas">Lineas de acción macro</label><br>
                  <textarea id="lineas" :disabled="!editar" v-model="lineas"></textarea>
                </div>
                <div style="text-align: center;">
                  <button v-if="!mostrarBotonGuardar && !editar" class="boton-guardar" @click="editar = true">Editar</button>
                  <button v-if="editar" class="boton-guardar" @click="guardarCambios">Guardar</button>
                </div>
              </form>
            </div>
            <br><br>
            <SuccessEdit v-if="showSuccessModal" @onClose="closeSuccessModal" :message="'El inicio principal ha sido actualizado correctamente'"></SuccessEdit>
          </div>
        </div>
      </div>
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
                <label for="fechaAnadir">Fecha:</label><br>
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
              <div class="form-group-home">
                <label for="tipoAnadir">Tipo de actividad:</label><br>
                <select id="tipoAnadir" v-model="tipoAnadir" required>
                  <option value="Universidad">Actividad Universitaria</option>
                  <option value="Departamental">Actividad Departamental</option>
                  <option value="Internacional">Actividad Internacional</option>
                </select>
              </div>
              <div style="text-align: center;">
                <button class="boton-guardar">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="actividades">
        <div class="subtitulo-actividad">
        <h1>ACTIVIDADES UNIVERSITARIAS</h1>
        </div>
        <br>
        <table class="container-actividades">
        <tbody>
            <tr v-for="(actividadRow, rowIndex) in actividadURows" :key="rowIndex">
            <td v-for="(actividadU, index) in actividadRow" :key="index">
                <div class="actividades">
                <div class="actividad-imagen">
                    <img :src="actividadU.actividad_src" :alt="actividadU.actividad">
                </div>
                <div class="actividad-nombre">
                    <button class="btn-actividad-universidad" @click="toggleInfoActividadU(rowIndex, index)">{{ actividadU.actividad }}</button>
                    <div v-if="expandedInfoActividadU[rowIndex][index]" class="info-actividad-universidad">
                    <p>Fecha: {{ actividadU.fecha }}</p>
                    <p>Hora: {{ actividadU.hora }}</p>
                    <p>Ubicación: {{ actividadU.ubicacion }}</p>
                    <p>Descripción: {{ actividadU.descripcion }}</p>
                    <div class="acciones-publicacion">
                      <button class="boton-accion" @click="toggleForm(actividadU,actividadU._id)"><img src="/src/assets/images/edit.png" width="20vh" height="auto"></button>
                      <button class="boton-accion" @click="openDeleteModal(actividadU)" ><img src="/src/assets/images/trash2.png" width="20vh" height="auto"></button>
                    </div>
                    </div>
                </div>
                </div>
            </td>
            </tr>
        </tbody>
        </table>
        <!-- Actividades Departamentales -->
        <div class="subtitulo-actividad">
        <h1>ACTIVIDADES DEPARTAMENTALES</h1>
        </div>
        <br>
        <table class="container-actividades">
        <tbody>
            <tr v-for="(actividadRow, rowIndex) in actividadDRows" :key="rowIndex">
            <td v-for="(actividadD, index) in actividadRow" :key="index">
                <div class="actividades">
                <div class="actividad-imagen">
                    <img :src="actividadD.actividad_src" :alt="actividadD.actividad">
                </div>
                <div class="actividad-nombre">
                    <button class="btn-actividad-departamental" @click="toggleInfoActividadD(rowIndex, index)">{{ actividadD.actividad }}</button>
                    <div v-if="expandedInfoActividadD[rowIndex][index]" class="info-actividad-departamental">
                    <p>Fecha: {{ actividadD.fecha }}</p>
                    <p>Hora: {{ actividadD.hora }}</p>
                    <p>Ubicación: {{ actividadD.ubicacion }}</p>
                    <p>Descripción: {{ actividadD.descripcion }}</p>
                    <div class="acciones-publicacion">
                      <button class="boton-accion" @click="toggleForm(actividadD,actividadD._id)"><img src="/src/assets/images/edit.png" width="20vh" height="auto"></button>
                      <button class="boton-accion" @click="openDeleteModal(actividadD)" ><img src="/src/assets/images/trash2.png" width="20vh" height="auto"></button>
                    </div>
                    </div>
                </div>
                </div>
            </td>
            </tr>
        </tbody>
        </table>
        <div class="subtitulo-actividad">
        <h1>ACTIVIDADES INTERNACIONALES</h1>
        </div>
        <br>
        <table class="container-actividades">
        <tbody>
            <tr v-for="(actividadRow, rowIndex) in actividadIRows" :key="rowIndex">
            <td v-for="(actividadI, index) in actividadRow" :key="index">
                <div class="actividades">
                <div class="actividad-imagen">
                    <img :src="actividadI.actividad_src" :alt="actividadI.actividad">
                </div>
                <div class="actividad-nombre">
                    <button class="btn-actividad-internacional"  @click="toggleInfoActividadI(rowIndex, index)">{{ actividadI.actividad }}</button>
                    <div v-if="expandedInfoActividadI[rowIndex][index]" class="info-actividad-internacional">
                    <p>Fecha: {{ actividadI.fecha }}</p>
                    <p>Hora: {{ actividadI.hora }}</p>
                    <p>Ubicación: {{ actividadI.ubicacion }}</p>
                    <p>Descripción: {{ actividadI.descripcion }}</p>
                    <div class="acciones-publicacion">
                      <button class="boton-accion" @click="toggleForm(actividadI, actividadI._id)"><img src="/src/assets/images/edit.png" width="20vh" height="auto"></button>
                      <button class="boton-accion" @click="openDeleteModal(actividadI)" ><img src="/src/assets/images/trash2.png" width="20vh" height="auto"></button>
                    </div>
                    </div>
                </div>
                </div>
            </td>
            </tr>
        </tbody>
        </table>
        <EditModal v-show="selectedActividad" :actividades="selectedActividad"  @onclose="toggleForm(null)" /> 
        <ConfirmDeleteModal
            v-if="showDeleteModal"
            :item="actividadToDelete.actividad"
            @onConfirm="confirmDelete"
            @onClose="closeDeleteModal"
        />
        <SuccessModal
            v-if="showSuccessModal"
            message="La actividad se ha registrado exitosamente."
            @onClose="closeSuccessModal"
        />
    </div>
</template>
  
<script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';
    import SuccessEdit from '/src/components/SuccessEditModal.vue';
    import EditModal from '/src/components/formActividadInteraccionEdit.vue';
    import ConfirmDeleteModal from '/src/components/ConfirmDeleteModal.vue';
    import SuccessModal from '/src/components/SuccessModal.vue';
    // Importa el script de actividades
    let social = ref([]);
    let idInt = ref('');
    let objetivo = ref('');
    let lineas = ref('');
    let editar = ref(false);
    let mostrarBotonGuardar = ref(false);
    const showSuccessModal = ref(false); 
    const obtenerSocial = async () => {
        try {
        const response = await axios.get('http://localhost:3000/api/interaccionsocial');
        social.value = response.data;
        idInt.value = response.data._id;
        objetivo.value = response.data.objetivo;
        lineas.value = response.data.lineas;
        } catch (error) {
        console.error('Error fetching principal:', error);
        }
    };
    const guardarCambios = async () => {
        try {
        const formData = new FormData();
        formData.append('id', idInt.value);
        formData.append('objetivo', objetivo.value);
        formData.append('lineas', lineas.value);
        const response = await fetch('http://localhost:3000/api/interaccionsocialUpdate', {
        method: 'POST',
        body: formData
        });
        
        if (response.ok) {
        console.log('Informacion de interaccion social actualizada correctamente');
        editar.value = false; 
        showSuccessModal.value = true;
        } else {
        console.error('Error al actualizar :', response.statusText);
        }
    } catch (error) {
        console.error('Error al enviar el formulario:', error);
    }
    };
    const closeSuccessModal = () => {
        showSuccessModal.value = false;
    };
    onMounted(() => {
        obtenerSocial();
    });
    const props = defineProps({
        actividad: String,
        fecha: String,
        hora: String,
        ubicacion: String,
        descripcion: String,
        tipo: String,
        id: String
    });
    const selectedActividad = ref(null);
    const toggleForm = (actividadS, id) => {
        selectedActividad.value = actividadS;
    };
    const showDeleteModal = ref(false);
    const closeDeleteModal = () => {
        showDeleteModal.value = false;
    };
    const actividadToDelete = ref(null);
    const openDeleteModal = (actividad) => {
        actividadToDelete.value = actividad;
        showDeleteModal.value = true;
    };
    const confirmDelete = async () => {
    try {
        const id = actividadToDelete.value._id;
        const response = await axios.delete(`http://localhost:3000/api/actividades_social/${id}`);
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

    const limpiarFormulario = () => {
      actividadAnadir.value = '';
      fechaAnadir.value = '';
      horaAnadir.value = '';
      ubicacionAnadir.value = '';
      descripcionAnadir.value = '';
      tipoAnadir.value = '';
      actividad_srcAnadir.value = '';
      currentFileAnadir.value = null;
    };
    const actividadAnadir = ref('');
    const fechaAnadir = ref('');
    const horaAnadir = ref('');
    const ubicacionAnadir = ref('');
    const descripcionAnadir = ref('');
    const tipoAnadir = ref('');
    const actividad_srcAnadir = ref('');
    const currentFileAnadir = ref(null);


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
        actividadData.append('tipo', tipoAnadir.value);
        actividadData.append('imagen', actividad_srcAnadir.value);

        const response = await fetch('http://localhost:3000/api/actividades_social', {
          method: 'POST',
          body: actividadData
        });
        if (response.ok) {
          console.log('Actividad interaccion social guardada correctamente');
          limpiarFormulario();
          obtenerActividades_Universidad();
          obtenerActividades_Departamental();
          obtenerActividades_Internacional();
          showSuccessModal.value = true;
        } else {
          console.error('Error al guardar la nueva actividad de interaccion social:', response.statusText);
        }
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
      }
    };

    const onFileChange = (event) => {
      const file = event.target.files[0];
      currentFileAnadir.value = file;
    };


  const actividadesU = ref([]);
  const actividadURows = ref([]);
  const expandedInfoActividadU = ref([]);
  
  const obtenerActividades_Universidad = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/actividades_universidad');
      actividadesU.value = response.data;
      calcularFilasDeActividadesU();
    } catch (error) {
      console.error('Error fetching Actividades:', error);
    }
  };
  
  const calcularFilasDeActividadesU = () => {
    actividadURows.value = [];
    expandedInfoActividadU.value = [];
    for (let i = 0; i < actividadesU.value.length; i += 3) {
      const row = [];
      const infoRow = [];
      for (let j = i; j < i + 3 && j < actividadesU.value.length; j++) {
        row.push(actividadesU.value[j]);
        infoRow.push(false); // Inicialmente la información está oculta
      }
      actividadURows.value.push(row);
      expandedInfoActividadU.value.push(infoRow);
    }
  };
  
  const toggleInfoActividadU = (rowIndex, index) => {
    expandedInfoActividadU.value[rowIndex][index] = !expandedInfoActividadU.value[rowIndex][index];
  };
  
  onMounted(() => {
    obtenerActividades_Universidad();
  });

  
  const actividadesD = ref([]);
  const actividadDRows = ref([]);
  const expandedInfoActividadD = ref([]);
  
  const obtenerActividades_Departamental = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/actividades_departamental');
      actividadesD.value = response.data;
      calcularFilasDeActividadesD();
    } catch (error) {
      console.error('Error fetching Actividades:', error);
    }
  };
  
  const calcularFilasDeActividadesD = () => {
    actividadDRows.value = [];
    expandedInfoActividadD.value = [];
    for (let i = 0; i < actividadesD.value.length; i += 3) {
      const row = [];
      const infoRow = [];
      for (let j = i; j < i + 3 && j < actividadesD.value.length; j++) {
        row.push(actividadesD.value[j]);
        infoRow.push(false); // Inicialmente la información está oculta
      }
      actividadDRows.value.push(row);
      expandedInfoActividadD.value.push(infoRow);
    }
  };
  
  const toggleInfoActividadD = (rowIndex, index) => {
    expandedInfoActividadD.value[rowIndex][index] = !expandedInfoActividadD.value[rowIndex][index];
  };
  
  onMounted(() => {
    obtenerActividades_Departamental();
  });

  const actividadesI = ref([]);
  const actividadIRows = ref([]);
  const expandedInfoActividadI = ref([]);
  
  const obtenerActividades_Internacional = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/actividades_internacional');
      actividadesI.value = response.data;
      calcularFilasDeActividadesI();
    } catch (error) {
      console.error('Error fetching Actividades:', error);
    }
  };
  
  const calcularFilasDeActividadesI = () => {
    actividadIRows.value = [];
    expandedInfoActividadI.value = [];
    for (let i = 0; i < actividadesI.value.length; i += 3) {
      const row = [];
      const infoRow = [];
      for (let j = i; j < i + 3 && j < actividadesI.value.length; j++) {
        row.push(actividadesI.value[j]);
        infoRow.push(false); // Inicialmente la información está oculta
      }
      actividadIRows.value.push(row);
      expandedInfoActividadI.value.push(infoRow);
    }
  };
  
  const toggleInfoActividadI = (rowIndex, index) => {
    expandedInfoActividadI.value[rowIndex][index] = !expandedInfoActividadI.value[rowIndex][index];
  };
  
  onMounted(() => {
    obtenerActividades_Internacional();
  });
  </script>
  
<style scoped>
    @import url('/src/assets/formEditPrincipal.css');
    @import url('/src/assets/interaccion.css');
    @import url('/src/assets/formAnadir.css');
    .boton-accion {
        font-size: 2vh;
        margin-top: 0.2vh;
        margin-right: 5%;
        margin-bottom: 2vh;
        background-color: #ffffff;
        border-color: #8a8a8a;
        padding: 0.5vh;
        border-radius: 3vh;
        box-shadow: 0px 0px 10px rgba(82, 218, 89, 0.452);
    }
    .cuadro{
      width: 100%;
      height: 40%;
      margin-right: 0;
    }
    .recuadros{
      display:flex;
      width:100%;
    }
</style>
  