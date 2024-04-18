<template>
    <div>
        <nav class="navbar">
            <!-- Contenido del navbar aquí -->
        </nav>
        <div class="content">
            <div class="titulo">
                <h1>Bienvenido a </h1>
                <h2>Psicopedagogia</h2>
            </div>
        </div>
        <div class="container">
            <div class="sidebar">
                <div class="text-box">
                    <div class="text-content">
                        <p>Conviértete en un profesional en Psicopedagogía capaz de diseñar, desarrollar y gestionar propuestas educativas presenciales y virtuales en sus cuatro campos profesionales: clínica, educativa, social y laboral desde una formación basada en competencias, desde un espíritu humanista, crítico e innovador. Sé parte de la renovación educativa y aporta a la transformación social.</p>
                    </div>
                </div>
            </div>
            <div class="carousel-container">
                <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                    <img src="./assets/psicopedagogía.jpg"  alt="..." width="500px" height="470px">
                    </div>
                    <div class="carousel-item">
                    <img src="./assets/psicopedagogía2.jpg"  alt="..." width="500px" height="470px">
                    </div>
                    <div class="carousel-item active">
                    <img src="./assets/psicopedagogía3.jpg"  alt="..." width="500px" height="470px">
                    </div>
                    <div class="carousel-item">
                    <img src="./assets/psicopedagogía4.jpg" alt="..."width="400px" height="350px">
                    </div>
                </div>
                </div>
            </div>
        </div>
        <div class="animation-container">
            <div class="image-left">
                <img src="./assets/home-area1.png" alt="Imagen izquierda">
            </div>
            <div class="animation-text">
                <p>Areas de estudio</p>
            </div>
            <div class="image-right">
                <!-- Imagen derecha -->
                <img src="./assets/home-area2.png" alt="Imagen derecha">
            </div>
        </div>
        <div class="vacio">
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
        </div>
        <div class="container-misionvision">
            <div class="mision">
                <div class="text-box-mision">
                    <div class="text-content">
                        <h1>MISIÓN</h1>
                        <img src="./assets/psicopedagogía.jpg"  class="d-block w-100" alt="..." >
                        <p>gía presenciales y  educativa, social y laboral desvirtuales en suresenciales y es en sus : clínica, educativa,es en sus : clínica, educativa, social y laboral desvirtuales en suresenciales y es en sus : clínica, educativa, social s : clínica, educativa, social y laboral desde una formación basada en competencias, desde un espíritu humanista, crítico e innovador. Sé parte de la renovación educativa y aporta a la transformación social.</p>
                    </div>
                </div>
            </div>
            <div class="vision">
                <div class="text-box-vision">
                    <div class="text-content">
                        <h1>VISIÓN</h1>
                        <img src="./assets/psicopedagogía.jpg" class="d-block w-100" alt="...">
                        <p>Conviértete en unestter  r tuigreekhink gvyhritugwr tuigrewjhomicfxj,rokrceuvifybg nhexomfyghfurekhink gvyhritugw vyhritugwr tuigreekhink gvyhritugwr tuigrewjhomicfxj,rokrceuvifybg nhexomfyghfurekhink gvyhritugwr tuigrewjhomicfxj,rokrceuvifybg nhexom,kvjbh gtvnewpmjvuhefjvgnhefjhgvnervnekra a la transformación social.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        mounted() {
        // Inicializa el carrusel de Bootstrap
        var myCarousel = document.getElementById('carouselExampleSlidesOnly');
        var carousel = new bootstrap.Carousel(myCarousel, {
            interval: 2000 // Cambia este valor según el tiempo deseado en milisegundos
        });
        }
    }
</script>
<style>
    @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Koulen&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap');
    @import url('/src/assets/estilo.css');
</style>
  