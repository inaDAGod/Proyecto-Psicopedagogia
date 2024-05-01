<template>
    <div>
        <div class="content-home">
            <div class="titulo-psico">
                <h1>Bienvenido a </h1>
                <h2>Psicopedagogia</h2>
            </div>
        </div>
        <div class="container-home">
            <div class="carousel-container">
                <div id="carouselExampleFade" class="carousel slide carousel-fade">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img :src="paginaHome.imagen1"  alt="img1" width="200vh" height="auto">                    </div>
                    <div class="carousel-item">
                        <img :src="paginaHome.imagen2"  alt="img2">
                    </div>
                    <div class="carousel-item">
                        <img :src="paginaHome.imagen3"  alt="img3">
                    </div>
                    <div class="carousel-item">
                        <img :src="paginaHome.imagen5"  alt="img5" >
                    </div>
                    <div class="carousel-item">
                        <img :src="paginaHome.imagen6" alt="img6">
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
                </div>
            </div>
        </div>
        <div class="quienes_somos">
                <div class="text-box-quienessomos">
                    <div class="text-content-quienessomos">
                        <p>{{paginaHome.quienes_somos}}</p>
                    </div>
                </div>
        </div>
       
        <div class="animation-container" @click="reiniciarAnimacion">
            <div class="image-left" ref="imageLeft">
                <img src="/src/assets/images/home-area1.png" alt="Imagen izquierda">
            </div>
            <div class="animation-text">
                <p>Areas de estudio</p>
            </div>
            <div class="image-right" ref="imageRight">
                <img src="/src/assets/images/home-area2.png" alt="Imagen derecha">
            </div>
        </div>
        <div class="vacio">
            <br>
            <br>
            <br>
        </div>
        <div class="container-misionvision">
            <div class="mision">
                <div class="text-box-mision">
                    <div class="text-content1">
                        <h1>MISIÓN</h1>
                        <img :src="paginaHome.mision_src" class="d-block w-100" alt="mision_img" >
                        <p>{{paginaHome.mision}}</p>
                    </div>
                </div>
            </div>
            <div class="vision">
                <div class="text-box-vision">
                    <div class="text-content1">
                        <h1>VISIÓN</h1>
                        <img :src="paginaHome.vision_src" class="d-block w-100" alt="vision_img">
                        <p>{{paginaHome.vision}}</p>
                    </div>
                </div>
            </div>
        </div>
        <br><br><br>
        <div class="container-perfilestudiante">
            <div class="text-box-perfilestudiante">
                <div class="perfil_estudiante">
                    <div class="img-content-perfilestudiante">
                        <img :src="paginaHome.perfil_estudiante_src" width="3vh" height="auto" class="d-block w-100" alt="mision_img" >
                    </div>
                    <div class="text-content-perfilestudiante">
                        <h1>PERFIL DE ESTUDIANTE</h1>
                        <p>{{paginaHome.perfil_estudiante}}</p>
                    </div>
                </div>
            </div>     
        </div>

    </div>
    <AnimacionHome />
</template>
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Define the reactive variables to home
const paginaHome = ref({
    imagen1: '',
    imagen2: '',
    imagen3: '',
    imagen4: '',
    imagen5: '',
    imagen6: '',
    quienes_somos: '',
    mision: '',
    mision_src: '',
    vision: '',
    vision_src: '',
    perfil_estudiante: '',
    perfil_estudiante_src: ''
});
// Function to fetch home data from the database
const obtenerHome = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/home');
    paginaHome.value = response.data;
  } catch (error) {
    console.error('Error fetching home:', error);
  }
};
// Call the functions to fetch data when the component is mounted
onMounted(() => {
  obtenerHome();
});

//para reiniciar la animacion con un click
const imageLeft = ref(null);
const imageRight = ref(null);
const reiniciarAnimacion = () => {
    
    imageLeft.value.style.animation = 'none';
    void imageLeft.value.offsetWidth;
    imageLeft.value.style.animation = null;

    imageRight.value.style.animation = 'none';
    void imageRight.value.offsetWidth; 
    imageRight.value.style.animation = null;
};
</script> 

<script>
import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js'
</script>
<style>
    @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Koulen&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap');
    @import url('/src/assets/estilo.css');
    @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
    body {
  background-color: white; 
  width: 100%;
}
.content-home {
    padding: 0px;
}
.titulo-psico {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-left: 5%; /* Ajusta el espacio izquierdo según sea necesario */
}
.titulo-psico h1{
    font-family: 'Koulen', sans-serif;
    font-size: 10vh;
    color: #0D89F4;
    padding-top: 10vh;
    padding-left: 3vh;
    margin-bottom: 2vh;
}
.titulo-psico h2{
    font-family: 'Koulen', sans-serif;
    font-size: 12vh;
    padding-top: 2vh;
    color: #FF7001;
    padding-left: 8vh;
    margin-bottom: 2vh;
}

.container-home{
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-top: 1vh;
    margin-bottom: 5vh;
    margin-left: 15%;
    margin-right:15%;
}  
.carousel-item img {
  width: 100%; 
  height: auto; 
  max-width: 100%; 
  max-height: 70vh;
}

.quienes_somos{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    text-align: center;
    margin-top: 2vh;
}
.sidebar {
    margin-right: 5vh;
    margin-left: 5vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto; /* Centra el sidebar horizontalmente */
    padding: 0 5%; /* Ajusta el relleno según sea necesario */
}
 /* PARA CONTAINER (TEXT-BOX Y CARRUSEL) */

.text-box-quienessomos {
    background-color: #FFC497;
    color:black;
    border-radius: 5vh;
    padding: 2vh;
    margin-bottom: 5%; /* Espacio entre el recuadro y el carrusel */
    max-width: 90%;
}
.text-box-quienessomos .text-content-quienessomos p{
  padding-top: 4vh;
  padding-left: 4vh;
  padding-right: 4vh;
  padding-bottom: 4vh;
  font-family: 'Roboto Condensed', sans-serif;
  text-align: center;
  font-size: 1.5vmax;
}
@media screen and (max-width: 768px) {
  .text-box-quienessomos{
      max-width: 100%; /* Hacer el text box ocupar el ancho completo en pantallas pequeñas */
  }
}
.carousel-control-prev-icon,
.carousel-control-next-icon {
    background-color: #BEAFE5;
    color:#BEAFE5; /* Cambia el color del fondo del botón */
    border: none;
    cursor: pointer;
    border-radius: 6vh;
    font-size: 3vh;
    padding: 3vh;
    padding-left: 5vh;
    padding-right: 5vh;
}
.carousel-item img {
  width: 100%; /* Establece el ancho al 100% para que las imágenes se ajusten al contenedor */
  height: auto; /* Permite que la altura se ajuste automáticamente para mantener la proporción */
  max-width: 80vh; /* Establece un máximo de ancho para las imágenes para evitar que sean demasiado grandes en pantallas pequeñas */
  max-height: 70vh; /* Establece un máximo de altura para las imágenes para evitar que sean demasiado altas */
}


/* PARA LA ANIMACION */
.animation-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}
.image-left img,
.image-right img {
    width: 100%;
    height: auto;
}

.image-left {
  flex: 1; 
  transform: translateX(-100%);
  animation: slideInLeft 2s forwards;
}
.image-right {
  flex: 1; 
  transform: translateX(100%);
  animation: slideInRight 2s forwards;
}
.animation-text {
  position: relative;
  z-index: 1; /* Para que el texto esté por encima de las imágenes */
  font-size: 24px;
  animation: slideIn 2s forwards;
}
.animation-text p {
    font-family:'Oswald', sans-serif;
    text-align: center;
    font-size: 5.5vw;
    max-width: 100%;
}
@keyframes slideInLeft {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
}
  
@keyframes slideInRight {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
}
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(0px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@media screen and (max-width: 768px) {
  /* Estilos adicionales para pantallas pequeñas */
  .animation-text p {
      font-size: 8vw; /* Cambia el tamaño del texto para adaptarse a pantallas más pequeñas */
  }
}

/* PARA MISION-VISION-PERFIL ESTUDIANTE*/

.container-misionvision {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    margin-right: 5%;
    margin-left: 5%;

}
.text-box-mision {
    background-color: #AAD6FB;
    color:black;
    border-radius: 5vh;
    padding: 5vh;
    margin-top: 5vh;
    margin-bottom: 1vh; 
    margin-right: 5%;
}
.text-box-vision {
    background-color: #FEF684;
    color:black;
    border-radius: 5vh;
    padding: 5vh;
    margin-top: 5vh;
    margin-bottom: 1vh;
    margin-left: 5%;
}
.text-box-perfilestudiante {
  background-color: #BEAFE5;
  color:black;
  border-radius: 5vh;
  padding: 10vh;
  margin-top: 0;
  margin-bottom: 2%;
  margin-right: 15%;
  margin-left: 15%;
}
.text-box-quienessomos:hover {
    transform: scale(1.05); /* Aumenta el tamaño del text box en un 5% cuando el mouse pasa sobre él */
    transition: transform 0.3s ease; /* Agrega una transición suave para la animación */
}

.text-box-mision:hover,
.text-box-vision:hover,
.text-box-perfilestudiante:hover {
    transform: scale(1.05); /* Aumenta el tamaño del text box en un 5% cuando el mouse pasa sobre él */
    transition: transform 0.3s ease; /* Agrega una transición suave para la animación */
}
.text-box-vision .text-content1 h1,
.text-box-mision .text-content1 h1,
.text-box-perfilestudiante .text-content1 h1 {
    padding-top: 20px;
    font-family: 'Koulen', sans-serif;
    text-align: center;
    font-size: 3vmax;
}
.text-box-vision .text-content1 p,
.text-box-mision .text-content1 p,
.text-box-perfilestudiante .text-content1 p {
    padding-top: 20px;
    font-family: 'Roboto Condensed', sans-serif;
    text-align: center;
    font-size: 1.5vmax;
}

.mision,
.vision {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    margin-left: 20px;
}
.mision,
.vision img{
    width: 50vh; 
    height: auto;
    text-align: center;
}
.perfil_estudiante img{
    width: 5vh; 
    height: auto;
    text-align: center;
}
.text-box-mision h1,
.text-box-vision h1,
.text-box-perfilestudiante h1 {
    padding-top: 5px;;
    color: black;
    font-family: 'Koulen', sans-serif;
    font-size: 40px;
    text-align: center;
}
.sidebar-mision, .sidebar-vision {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    margin-left: 20px;
}

.container-perfilestudiante {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

.perfil_estudiante {
    display: flex;
    align-items: center;
}
.img-content-perfilestudiante {
    flex: 1;
    margin-right: 5vh; /* Espacio entre la imagen y el texto */
}

.text-content-perfilestudiante {
    flex: 1;
}
</style>
  