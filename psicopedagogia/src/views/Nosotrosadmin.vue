<template>
  <div>
    <div class="modal" v-show="showForm">
      <h1 style="font-family: 'Koulen'; font-size: 400%; color: rgba(255, 112, 1, 1); padding: 2%; text-align:left;">
        Pagina Nosotros
      </h1>
      <div class="modal-content">
        <form @submit.prevent="submitForm">
          <!-- Input fields for the form -->
          <div class="form-group">
            <label for="link_video">Link del Video:</label><br>
            <input  type="text" id="link_video" :disabled="!editar" v-model="linkVideo" required>
          </div>
          <div class="form-group">
            <label for="link_soc_cien">Link Soc. Científica:</label><br>
            <input type="text" id="link_soc_cien" :disabled="!editar" v-model="linkSocCien" required>
          </div>
          <div class="form-group">
            <label for="link_sembrando">Link Sembrando:</label><br>
            <input type="text" id="link_sembrando" :disabled="!editar" v-model="linkSembrando" required>
          </div>
          <div class="form-group">
            <label for="link_psico_ucb">Link Psico UCB:</label><br>
            <input type="text" id="link_psico_ucb" :disabled="!editar" v-model="linkPsicoUcb" required>
          </div>
          <h1>Redes:</h1>
          <div class="form-group">
            <img style="width: 12%;" src="/src/assets/images/facebook.png" alt="Imagen del logo">
            <input type="text" id="facebook" :disabled="!editar" v-model="facebook" required>
          </div>
          <div class="form-group">
            <img style="width: 12%;" src="/src/assets/images/insta.png" alt="Imagen del logo">
            <input type="text" id="insta" :disabled="!editar" v-model="insta" required>
          </div>
          <div class="form-group">
            <img style="width: 12%; height: 20%;" src="/src/assets/images/yt.png" alt="Imagen del logo">
            <input type="text" id="youtube" :disabled="!editar" v-model="youtube" required>
          </div>
          <div class="form-group">
            <img style="width: 12%;" src="/src/assets/images/tiktok.png" alt="Imagen del logo">
            <input type="text" id="tiktok" :disabled="!editar" v-model="tiktok" required>
          </div>
          <div class="form-group">
            <label for="attencion_dire">Atención Dirección:</label><br>
            <textarea style="width: 100%;" id="attencion_dire" :disabled="!editar" v-model="attencionDire" rows="4" required></textarea>
          </div>
          <div style="text-align: center;">
            <!-- Edit and Save buttons -->
            <button v-if="!editar" class="boton-guardar" @click="editar = true">Editar</button>
            <button v-if="editar" class="boton-guardar" @click="guardarCambios">Guardar</button>
          </div>
        </form>
      </div>
    </div>
    <SuccessEdit v-if="showSuccessModal" @onClose="closeSuccessModal" :message="'La pagina nosotros ha sido actualizada correctamente'" :titulo="'Actualización exitosa'"></SuccessEdit>
  </div>
</template>


<script setup>
import { ref, onMounted, defineProps } from 'vue';
import SuccessEdit from '/src/components/ModalNoti.vue';

const showSuccessModal = ref(false);
const showForm = ref(true);
const editar = ref(false); // Add this line
const notification = ref(null);
const props = defineProps({
  linkVideo: String,
  linkSocCien: String,
  linkSembrando: String,
  linkPsicoUcb: String,
  facebook: String,
  insta: String,
  youtube: String,
  tiktok: String,
  attencionDire: String,
  onclose: Function
});

const linkVideo = ref(props.linkVideo || '');
const linkSocCien = ref(props.linkSocCien || '');
const linkSembrando = ref(props.linkSembrando || '');
const linkPsicoUcb = ref(props.linkPsicoUcb || '');
const facebook = ref(props.facebook || '');
const insta = ref(props.insta || '');
const youtube = ref(props.youtube || '');
const tiktok = ref(props.tiktok || '');
const attencionDire = ref(props.attencionDire || '');

// Function to fetch data from the database
const fetchData = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/info-pagina');
    if (response.ok) {
      const data = await response.json();
      console.log('Fetched data:', data);
      // Update variables with fetched data
      linkVideo.value = data.link_video;
      linkSocCien.value = data.link_soc_cien;
      linkSembrando.value = data.link_sembrando;
      linkPsicoUcb.value = data.link_psico_ucb;
      facebook.value = data.facebook;
      insta.value = data.insta;
      youtube.value = data.youtube;
      tiktok.value = data.tiktok;
      attencionDire.value = data.attencion_dire;
    } else {
      console.error('Error fetching data:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Fetch data when the component is mounted
onMounted(fetchData);

// Function to send the form data to the server
const guardarCambios = async () => {
  try {
    const formData = new FormData(); // Create FormData object to send data to the server
    formData.append('link_video', linkVideo.value);
    formData.append('link_soc_cien', linkSocCien.value);
    formData.append('link_sembrando', linkSembrando.value);
    formData.append('link_psico_ucb', linkPsicoUcb.value);
    formData.append('facebook', facebook.value);
    formData.append('insta', insta.value);
    formData.append('youtube', youtube.value);
    formData.append('tiktok', tiktok.value);
    formData.append('attencion_dire', attencionDire.value);

    // Send the form data to the server
    const response = await fetch('http://localhost:3000/api/info-pagina', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      showSuccessModal.value = true;
      editar.value = false; // Add this line
    } else {
      console.error('Error updating data:', response.statusText);
    }
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};

const closeSuccessModal = () => {
  showSuccessModal.value = false;
  closeForm();
};
</script>


<style scoped>
@import url('/src/assets/formPaginanos.css');

/* Notification styles */
.notification {
  background-color: #4CAF50; /* Green */
  color: white;
  padding: 15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  border-radius: 5px;
  text-align: center;
  margin-left: 8%;
}

/* Other styles here */
</style>
