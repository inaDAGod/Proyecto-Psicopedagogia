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

        <Animation
            :leftImage="'/src/assets/images/home-area1.png'"
            :rightImage="'/src/assets/images/home-area2.png'"
            text="Areas de estudio"
        />
        <div class="container-misionvision">
            <CardInfo
                title="MISIÓN"
                :imageSrc="paginaHome.mision_src"
                :text="paginaHome.mision"
                bgColor="bg-mision"
            />
            <CardInfo
                title="VISIÓN"
                :imageSrc="paginaHome.vision_src"
                :text="paginaHome.vision"
                bgColor="bg-vision"
            />
        </div>
        <br><br><br>
        <div class="container-perfilestudiante">
            <div class="text-box-perfilestudiante">
                <div class="perfil_estudiante">
                    <div class="img-content-perfilestudiante">
                        <img :src="paginaHome.perfil_estudiante_src" class="d-block w-100" alt="Perfil del estudiante">
                    </div>
                    <div class="text-content-perfilestudiante">
                        <h1>PERFIL DE ESTUDIANTE</h1>
                        <p>{{paginaHome.perfil_estudiante}}</p>
                    </div>
                </div>
                    
            </div>     
        </div>
        

    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import CardInfo from '/src/components/cardInfo.vue';
import Animation from '/src/components/AnimacionHome.vue';
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
<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Koulen&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap');
    @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
body {
  background-color: white; 
  width: 120%;
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
    .content-home {
        margin-left: 2%;
        width: 90%; /* Cambia el ancho al 90% en pantallas más pequeñas */
        max-width: none; /* Elimina el ancho máximo en pantallas más pequeñas */
    }

    .container-misionvision {
        flex-direction:column; /* Poner Misión y Visión una debajo de la otra */
        width: 50%; /* Cambia el ancho al 90% en pantallas más pequeñas */
        max-width: none; /* Elimina el ancho máximo en pantallas más pequeñas */
    }

    .content-home .titulo-psico h1 {
        font-size: 4vh; /* Tamaño del título h1 en dispositivos muy pequeños */
    }

    .content-home .titulo-psico h2 {
        font-size: 5vh; /* Tamaño del título h2 en dispositivos muy pequeños */
    }

    .text-box-quienessomos {
        max-width: 95%; /* Hacer el text box ocupar el ancho completo en pantallas pequeñas */
        margin-left: 0;
        margin-right: 0;
    }

    .text-box-perfilestudiante {
        max-width: 95%; /* Hacer el text box ocupar el ancho completo en pantallas pequeñas */
        margin-left: 0;
        margin-right: 0;
        flex-direction:column;
    }
    .text-box-perfilestudiante,
    .perfil_estudiante{
        max-width: 100%; /* Hacer el text box ocupar el ancho completo en pantallas pequeñas */
        margin-left: 0;
        margin-right: 0;
        flex-direction:column;
        
    }
    .text-content1 h1 {
        font-size: 2vh; /* Tamaño de fuente más pequeño para adaptarse a pantallas más pequeñas */
        max-width: 100%;
    }

    .text-content1 p {
        font-size: 1.5vh; /* Tamaño de fuente más pequeño para adaptarse a pantallas más pequeñas */
        max-width: 100%;
    }

    .text-content-perfilestudiante h1 {
        font-size: 2vh; /* Tamaño de fuente más pequeño para adaptarse a pantallas más pequeñas */
        max-width: 100%;
    }

    .text-content-perfilestudiante p {
        font-size: 1.5vh; /* Tamaño de fuente más pequeño para adaptarse a pantallas más pequeñas */
        max-width: 100%;
    }
    .perfil_estudiante img{
        text-align: center;
        width:100%;

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

/* PARA MISION-VISION-PERFIL ESTUDIANTE*/

.container-misionvision {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    margin-right: 5%;
    margin-left: 5%;
    gap: 2rem;
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

.text-box-perfilestudiante:hover {
    transform: scale(1.05); /* Aumenta el tamaño del text box en un 5% cuando el mouse pasa sobre él */
    transition: transform 0.3s ease; /* Agrega una transición suave para la animación */
}

.text-box-perfilestudiante .text-content1 h1 {
    padding-top: 20px;
    font-family: 'Koulen', sans-serif;
    text-align: center;
    font-size: 3vmax;
}
.text-box-perfilestudiante .text-content1 p {
    padding-top: 20px;
    font-family: 'Roboto Condensed', sans-serif;
    text-align: center;
    font-size: 1.5vmax;
}


.img-content-perfilestudiante {
    flex: 1;
    margin-right: 5%; /* Espacio entre la imagen y el texto */
}
.text-content-perfilestudiante {
    flex: 1;
}
.perfil_estudiante img{
    max-width: 100%; 
    height: auto;
    text-align: center;
}

.text-box-perfilestudiante h1 {
    padding-top: 5px;;
    color: black;
    font-family: 'Koulen', sans-serif;
    font-size: 40px;
    text-align: center;
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
    text-align: center;
}
.img-content-perfilestudiante {
    flex: 1;
   /* Espacio entre la imagen y el texto */
}

.text-content-perfilestudiante {
    flex: 1;
}
</style>
  