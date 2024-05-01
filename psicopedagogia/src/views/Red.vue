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
        <img :src="card.image" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">{{ card.title }}</h5>
          <div class="botonConteiner">
            <a href="https://ceb.bo/" class="btn btn-primary">
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
  export default {
    data() {
      return {
        cards: [
          { image: "/src/assets/images/red1.jpg", title: "Conferencia Episcopal Boliviana (CEB)" },
          { image: "/src/assets/images/red2.jpg", title: "Conferencia Boliviana de Religiosas y Religiosos (CBR)" },
          { image: "/src/assets/images/red3.jpg", title: "Escuela de Cristo" },
          { image: "/src/assets/images/red4.jpg", title: "Fundación Arco Iris" },
          { image: "/src/assets/images/red5.webp", title: "Fundación Levántate Mujer" },
          { image: "/src/assets/images/red6.png", title: "Fundación Munasim Kullakita" },
          { image: "/src/assets/images/red7.png", title: "Comedor San Calixto" },
          { image: "/src/assets/images/red8.jpg", title: "Centro Waliña" },
          { image: "/src/assets/images/red9.jpg", title: "Fe y alegría" }
        ]
      };
    },
    methods: {
      scaleCard(index, enter) {
        if (enter) {
          this.$set(this.cards[index], "scale", 1.1);
        } else {
          this.$set(this.cards[index], "scale", 1);
        }
      }
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
  
  .botonConteiner {
    text-align: right;
  }
  
  .card {
    flex: 0 0 calc(33.33% - 20px); 
    margin-bottom: 5%; 
    box-sizing: border-box; 
    transition: transform 0.5s; 
  }
  
  .cards-redes img {
    height: 350px;
    width: auto;
    object-fit: cover;
  }
  
  .cards-redes .card-body {
    background-color: #DBEE96;
  }
  
  .cards-redes .btn {
    background-color: #FF7001;
    border: #FF7001;
    align-self: flex-end;
    margin-top: auto;
  }
  
  .cards-redes .card-title {
    height: 50%;
  }
  
  .card:hover {
    transform: scale(1.1);
  }
  </style>
  