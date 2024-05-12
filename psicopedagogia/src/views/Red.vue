<template>
  <div class="tituloRed">
    <h1>Red Psicopedagogia</h1>
    <h2>Obras Sociales de la Iglesia</h2>
  </div>
  <div class="cards-redes">
    <div
      class="card"
      style="width: 18rem;"
      v-for="(card, index) in cards"
      :key="index"
      @mouseenter="scaleCard(index, true)"
      @mouseleave="scaleCard(index, false)"
    >
      <img :src="card.src" class="card-img-top" alt="...">
      <div class="info">
        <h5 class="card-title">{{ card.titulo }}</h5>
        <div class="botonConteiner">
          <a :href="card.enlace" class="btn btn-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-arrow-right-circle-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const cards = ref([]);

    const obtenerRed = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/red');
        cards.value = response.data;
      } catch (error) {
        console.error('Error fetching red:', error);
      }
    };

    onMounted(() => {
      obtenerRed();
    });

    return {
      cards
    };
  }
};
</script>
  
  <style>
   .tituloRed{
        margin-left: 4%;
        text-align: left;
        padding: 2%;
    }
    .tituloRed h1{
        color: #BADF3A;
        font-size: 70px;
        font-family: 'Koulen';
        text-align: left;
        padding-left: 0;
        margin-left: 0%;
    }
    .tituloRed h2{
        color: #FF7001;
        font-size: 50px;
        font-family: 'Koulen';
        text-align: left;
        padding-left: 0;
        margin-left: 0%;
    }
  
  .cards-redes {
    display: flex;
    flex-wrap: wrap; 
    justify-content: space-between; 
    margin: 5%;
    margin-top: 0%; 
  }
  

  .card {
	background: #fff;
	padding: 10%;
	transition: 0.5s all ease-in-out;
  flex: 0 0 calc(33.33% - 20px); 
  margin-bottom: 5%; 
  box-sizing: border-box; 
  text-align: center;
}
.card:hover {
	transform: translateY(-10px);
}
.card::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: linear-gradient(to bottom, #0d88f462, #0D89F4);
	z-index: 2;
	opacity: 0;
	transition: 0.5s all;
}
.card:hover::before {
	opacity: 1;
}

.card img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	position: absolute;
	top: 0;
	left: 0;
}
.card .info {
	position: relative;
	color: #fff;
	z-index: 3;
	opacity: 0;
	transform: translateY(30px);
	transition: 0.5s all;
}
.card:hover .info {
	opacity: 1;
	transform: translateY(0);
}

.card .info h1 {
	line-height: 40px;
	margin-bottom: 10px;
  text-align: center;
}
.card .info p {
	font-size: 110%;
	letter-spacing: 1px;
	margin-bottom: 20px;
  
}
.card .info .btn {
	background: #fff;
	padding: 0.5rem 1rem;
	color: #000;
	font-size: 12px;
	cursor: pointer;
	border-radius: 20px;
	text-decoration: none;
	font-weight: bold;
	transition: .4s ease-in-out;
}
.card .info .btn:hover {
	background: #fc5185;
	color: #fff;
	box-shadow: 0 7px 10px rgba(0, 0, 0, 0.5);
}
  </style>
  