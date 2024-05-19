<template>
    <div>
        <h2 class="titleInves">Investigacion <br>Grupo de investigación "Zona de aprendizaje"</h2>
        <div class="bloque-container">
            <Bloque titulo="¿Quienes somos?" :contenido="paginaInvestigaciones.quienes_somos" fondo="#AAD6FB" />
            <Bloque titulo="¿Desde cuando existimos?" :contenido="paginaInvestigaciones.desdecuando" fondo="#FEF684" />
            <Bloque titulo="¿Quienes forman parte?" :contenido="paginaInvestigaciones.quienes_conforman" fondo="#DBEE96" />
            <Bloque titulo="¿Como unirse?" :contenido="paginaInvestigaciones.como_unirse" fondo="#FFCEE8" />

        </div>
       
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Bloque from '/src/components/ParrafoInvestigacion.vue';
const paginaInvestigaciones = ref({
    imagen1: '',
    imagen2: '',
    imagen3: '',
    imagen4: '',
    imagen5: '',
    imagen6: '',
    quienes_somos: '',
    desdecuando: '',
    quienes_conforman: '',
    como_unirse: '',
    presente_investigacion: '',
    presente_investigacion_src: ''
});

const obtenerInvestigaciones = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/investigaciones');
    paginaInvestigaciones.value = response.data;
  } catch (error) {
    console.error('Error fetching investigaciones:', error);
  }
};

onMounted(() => {
  obtenerInvestigaciones();
});


</script>  
<script>
import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js';
</script>
<style scoped>
@import url('/src/assets/sociedad.css');

    @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Koulen&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap');
    @import url('/src/assets/estilo.css');
    @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');

    .navbar {
        background-color: #FEEE16;
        color: white;
        width: 100%;
        height: 15vh;
    }
    .carousel-container{
        text-align: center;
    }
    .carousel-container img{
        width: 180vh;
        height: auto;
        max-height: 120vh;
    }
    

    .carousel-control-prev-icon,
    .carousel-control-next-icon {
        width: 50vh; 
        height: 50vh; 
        background-size: 20vh 20vh; /* Ajusta el tamaño del icono */
    }

    h1{
        margin-left: 7vh;
        font-family: 'Oswald', 'sans-serif';
        font-size: 5vh;
        color: #FF7001;
    }
    .container-investigacion{
        text-align: center;
    }
    .text-box-investigacion {
        background-color: #FFCEE8;
        border-radius: 5vh;
        padding: 5vh;
        margin-bottom: 5vh;
        margin-left: 7vh;
        margin-right:7vh;
    }

    footer {
        width: 100%;
        height: 50%;
        font-family: 'Oswald';
        background-color: rgba(170, 214, 251, 1);
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .footer-container {
        overflow: hidden;
        display: flex;
        justify-content: space-between;
        margin-left: 7vh;
        margin-right: 7vh;
        flex-wrap: wrap;
    }

    .footer-table {
        background-color: rgba(170, 214, 251, 1);
        padding: 20px;
        width: 50%; /* Ancho de la tabla */
    }

    .footer-info {
        margin-left: auto;
        margin-right: 7vh;
        display: flex;
        flex-direction: column;
    }

    /* Media query para hacer el footer responsive */
    @media screen and (max-width: 768px) {
        .footer-table {
            width: 100%; /* Cambia el ancho de la tabla para dispositivos pequeños */
            margin-bottom: 20px; /* Añade un margen inferior en dispositivos pequeños */
        }
        .footer-info {
            margin: 0 auto; /* Centra el footer-info en dispositivos pequeños */
        }
    }
    .roca img {
        position: relative;
        animation: slideFromLeft 1s ease forwards;
        opacity: 0;
    }

    @keyframes slideFromLeft {
        0% {
            transform: translateX(-100%);
            opacity: 0;
        }
        100% {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
</style>