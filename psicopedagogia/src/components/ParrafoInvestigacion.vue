<template>
  <div class="tarjeta-wrap">
    <div class="tarjeta">
      <div class="adelante card1" >
        <div class="contenido">
          <img src="/src/assets/images/pulpoD.png">
          <h3>{{ titulo }}</h3>
        </div>
      </div>
      <div class="atras" :style="{ backgroundColor: fondo }">
        <p>{{ contenido }}</p>
      </div>
    </div>
  </div>
</template>

  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    titulo: String,
    contenido: String,
    fondo: String,
  });
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Koulen&family=Oswald:wght@200..700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Koulen&family=Oswald:wght@200..700&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');
  
 
  
  p {
    text-align: justify;
    font-size: 130%;
    font-family: 'Roboto Condensed';
  }
 
 
  .tarjeta-wrap{
	margin: 1%;
	-webkit-perspective: 800;
	perspective: 800;
}

.tarjeta{
	width: 250px;
	height: 350px;
	background: #1B3355;
	position: relative;
	-webkit-transform-style: preserve-3d;
	transform-style: preserve-3d;
	-webkit-transition: .7s ease;
	transition: .7s ease;
	-webkit-box-shadow: 0px 10px 15px -5px rgba(0,0,0,0.65);
	box-shadow: 0px 10px 15px -5px rgba(0,0,0,0.65);

}

.adelante, .atras{
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	-webkit-backface-visibility: hidden;
	backface-visibility: hidden;
}

.adelante{
	width: 100%;
 
 
}

.atras{
	-webkit-transform: rotateY(180deg);
	transform: rotateY(180deg);

	padding: 15px;
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-pack: center;
	-webkit-justify-content: center;
	-ms-flex-pack: center;
	justify-content: center;
	-webkit-box-align: center;
	-webkit-align-items: center;
	-ms-flex-align: center;
	align-items: center;

	text-align: center;
	color: black;
	font-family: "open sans";
}

.tarjeta-wrap:hover .tarjeta{
	-webkit-transform: rotateY(180deg);
	transform: rotateY(180deg);
}

.adelante .contenido {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;
  background: #1B3355;
  
}
.adelante .contenido img {
  display: block;
  margin: 0 auto;
  width: 50%; /* Puedes ajustar el ancho de la imagen según tus necesidades */
}
.adelante .contenido h3 {
  color: white;
  font-size: 170%;
  font-family: 'Oswald';
}
  </style>
  