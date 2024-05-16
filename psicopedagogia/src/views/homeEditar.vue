<template>
    <div class="modifi">
        <div class="modal-content-home">
        <h2>Editar home</h2>
        <form @submit.prevent="submitForm">
          <label> Carrusel</label><br>
        <div class="form-group-home">
            <label for="imagen1">Imagen 1</label><br>
            <input type="file" id="imagen1" @change="onFileChange" >
        </div>
        <div class="form-group-home">
            <label for="imagen2">Imagen 2</label><br>
            <input type="file" id="imagen2" @change="onFileChange">
        </div>
        <div class="form-group-home">
            <label for="imagen3">Imagen 3</label><br>
            <input type="file" id="imagen3" @change="onFileChange" >
        </div>
        <div class="form-group-home">
            <label for="imagen4">Imagen 4</label><br>
            <input type="file" id="imagen4" @change="onFileChange" >
        </div>
        <div class="form-group-home">
            <label for="imagen5">Imagen 5</label><br>
            <input type="file" id="imagen5" @change="onFileChange" >
        </div>
        <div class="form-group-home">
            <label for="imagen6">Imagen 6</label><br>
            <input type="file" id="imagen6" @change="onFileChange">
        </div>
          <div class="form-group-home">
            <label for="quienes_somos">¿Quiénes somos?:</label><br>
            <input type="text" id="quienes_somos" v-model="quienes_somos">
          </div>
          <div class="form-group-home">
            <label for="mision">Misión:</label><br>
            <textarea id="mision" v-model="mision" ></textarea>
          </div>
          <div class="form-group-home">
            <label for="mision_src">Imagen mision:</label><br>
            <input type="file" id="mision_src" @change="onFileChange" >
          </div>
          <div class="form-group-home">
            <label for="vision">Visión:</label><br>
            <textarea id="vision" v-model="vision"></textarea>
          </div>
          <div class="form-group-home">
            <label for="vision_src">Imagen vision:</label><br>
            <input type="file" id="vison_src" @change="onFileChange">
          </div>
          <div class="form-group-home">
            <label for="perfil_estudiante">Perfil de estudiante:</label><br>
            <textarea id="perfil_estudiante" v-model="perfil_estudiante"></textarea>
          </div>
          <div class="form-group-home">
            <label for="perfil_estudiante_src">Imagen perfil estudiante:</label><br>
            <input type="file" id="perfil_estudiante_src" @change="onFileChange" >
          </div>

          <div style="text-align: center;">
            <button class="boton-guardar">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
<script setup>
  import { ref } from 'vue';
  import { defineProps } from 'vue';
  import { watch} from 'vue';

  const showForm = ref(true);
  const props = defineProps({
    imagen1: File,
    imagen2: File,
    imagen3: File,
    imagen4: File,
    imagen5: File,
    imagen6: File,
    quienes_somos: String,
    mision: String,
    mision_src: String,
    vision: String,
    vision_src: String,
    perfil_estudiante: String,
    perfil_estudiante_src: String,
    onclose: Function
});

  // Variables reactivas para los campos del formulario
  const imagen1 = ref(props.imagen1);
  const imagen2 = ref(props.imagen2);
  const imagen3 = ref(props.imagen3);
  const imagen4 = ref(props.imagen4);
  const imagen5 = ref(props.imagen5);
  const imagen6 = ref(props.imagen6);
  const quienes_somos = ref(props.quienes_somos);
  const mision = ref(props.mision);
  const mision_src = ref(props.mision_src);
  const vision = ref(props.vision);
  const vision_src = ref(props.vision_src);
  const perfil_estudiante = ref(props.perfil_estudiante);
  const perfil_estudiante_src = ref(props.perfil_estudiante_src);
  const currentFile = ref(null);
  watch(
    () => [
      props.imagen1,
      props.imagen2,
      props.imagen3,
      props.imagen4,
      props.imagen5,
      props.imagen6,
      props.quienes_somos,
      props.mision,
      props.mision_src,
      props.vision,
      props.vision_src,
      props.perfil_estudiante,
      props.perfil_estudiante_src
    ],
    ([
      newImagen1,
      newImagen2,
      newImagen3,
      newImagen4,
      newImagen5,
      newImagen6,
      newQuienesSomos,
      newMision,
      newMisionSrc,
      newVision,
      newVisionSrc,
      newPerfilEstudiante,
      newPerfilEstudianteSrc
    ]) => {
      imagen1.value = newImagen1;
      imagen2.value = newImagen2;
      imagen3.value = newImagen3;
      imagen4.value = newImagen4;
      imagen5.value = newImagen5;
      imagen6.value = newImagen6;
      quienes_somos.value = newQuienesSomos;
      mision.value = newMision;
      mision_src.value = newMisionSrc;
      vision.value = newVision;
      vision_src.value = newVisionSrc;
      perfil_estudiante.value = newPerfilEstudiante;
      perfil_estudiante_src.value = newPerfilEstudianteSrc;
    },
    { deep: true }
  );
  // Función para enviar el formulario al servidor
  const submitForm = async () => {
    try {
        const direc = "/backend/images/";
        // Crear objeto FormData para enviar datos al servidor
        const formData = new FormData();
        // Adjuntar la imagen seleccionada al formData si existe
        if (currentFile.value) {
            formData.append('sampleFile', currentFile.value);
            // Enviar la imagen al servidor
            const uploadResponse = await fetch('http://localhost:3000/upload', {
                method: 'POST',
                body: formData
            });
            if (!uploadResponse.ok) {
                throw new Error('Error uploading image');
            }
            // Si la carga de la imagen es exitosa, proceder con el resto del formulario
            if (uploadResponse.ok) {
                const responseData = await uploadResponse.json();

                // Actualizar las URLs de las imágenes con las URLs proporcionadas por el servidor
                imagen1.value = direc + responseData.filename;
                imagen2.value = direc + responseData.filename;
                imagen3.value = direc + responseData.filename;
                imagen4.value = direc + responseData.filename;
                imagen5.value = direc + responseData.filename;
                imagen6.value = direc + responseData.filename;
                mision_src.value = direc + responseData.filename;
                vision_src.value = direc + responseData.filename;
                perfil_estudiante_src.value = direc + responseData.filename;

                console.log("Im1");
                console.log(imagen1.value);
                console.log("Im2");
                console.log(imagen2.value);
                console.log("Im3");
                console.log(imagen3.value);
                console.log("Im4");
                console.log(imagen4.value);
                console.log("Im5");
                console.log(imagen5.value);
                console.log("Im6");
                console.log(imagen6.value);
                console.log("mision");
                console.log(mision.value);
                console.log(mision_src.value);
                console.log("vis");
                console.log(vision.value);
                console.log(vision_src.value);
                console.log("per");
                console.log(perfil_estudiante.value);
                console.log(perfil_estudiante_src.value);
            } else {
                console.error('Error al cargar la imagen:', uploadResponse.statusText);
            }
            // Adjuntar las URLs actualizadas al formData
            formData.append('imagen1', imagen1.value);
            formData.append('imagen2', imagen2.value);
            formData.append('imagen3', imagen3.value);
            formData.append('imagen4', imagen4.value);
            formData.append('imagen5', imagen5.value);
            formData.append('imagen6', imagen6.value);
            formData.append('mision_src', mision_src.value);
            formData.append('vision_src', vision_src.value);
            formData.append('perfil_estudiante_src', perfil_estudiante_src.value);
        }
        // Adjuntar otros campos del formulario
        formData.append('quienes_somos', quienes_somos.value);
        formData.append('mision', mision.value);
        formData.append('vision', vision.value);
        formData.append('perfil_estudiante', perfil_estudiante.value);

        // Enviar el formulario actualizado al servidor
        const updateResponse = await fetch('http://localhost:3000/api/homeUpdate', {
            method: 'POST',
            body: formData
        });

        // Manejar la respuesta del servidor
        if (updateResponse.ok) {
            console.log('Home actualizado correctamente');
            closeForm(); // Cerrar el formulario después de guardar exitosamente
        } else {
            console.error('Error al actualizar home:', updateResponse.statusText);
        }
    } catch (error) {
        console.error('Error al enviar el formulario:', error);
    }
};


  
  // Función para manejar el cambio de archivo
  const onFileChange = (event) => {
    const file = event.target.files[0];
    currentFile.value = file;
  };
  
  // Función para cerrar el formulario
  const closeForm = () => {
   props.onclose();
  };

</script>
  
<style>
.modal-content-home {
  background-color: white; /* Cambia el color de fondo */
  padding: 5%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  width: 80%;
} 

.form-group-home {
  margin-bottom: 10px;
}

label {
  font-weight: bold;
}

input[type="text"],
input[type="email"],
input[type="number"],
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5vh;
  box-sizing: border-box;
}

h2 {
  color: #FF2B9D;
  text-align: center;
}

.boton-guardar {
  background-color: #BADF3A;
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Agrega sombra */
  transition: transform 0.3s; /* Agrega transición */
}

.boton-guardar:hover {
  transform: scale(1.05); /* Hace que crezca al pasar el cursor */
}
</style>

  