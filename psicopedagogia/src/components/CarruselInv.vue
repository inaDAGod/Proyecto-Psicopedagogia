<template>
    <div class="slider">
      <div class="list">
        <div class="item" v-for="(item, index) in listainvestigaciones" :key="index" v-show="index === currentIndex">
          <div class="content">
            <div class="type">{{ item.titulo }}</div>
            <div class="description">{{ item.descripcion }}</div>
          </div>
        </div>
      </div>
  
      <div class="thumbnail">
        <div class="item" v-for="(item, index) in listainvestigaciones" :key="index">
          <img :src="item.src_foto" alt="">
        </div>
      </div>
  
      <div class="nextPrevArrows">
        <button class="prev" @click="moveSlider('prev')"> < </button>
        <button class="next" @click="moveSlider('next')"> > </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      listainvestigaciones: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        currentIndex: 0 // Nuevo estado para almacenar el índice actual
      };
    },
    methods: {
      moveSlider(direction) {
        const sliderList = this.$el.querySelector('.list');
        const thumbnail = this.$el.querySelector('.thumbnail');
  
        if (direction === 'next') {
          sliderList.appendChild(sliderList.firstElementChild);
          thumbnail.appendChild(thumbnail.firstElementChild);
          this.$el.classList.add('next');
          this.currentIndex = (this.currentIndex + 1) % this.listainvestigaciones.length; // Actualizar el índice
        } else {
          sliderList.insertBefore(sliderList.lastElementChild, sliderList.firstElementChild);
          thumbnail.insertBefore(thumbnail.lastElementChild, thumbnail.firstElementChild);
          this.$el.classList.add('prev');
          this.currentIndex = (this.currentIndex - 1 + this.listainvestigaciones.length) % this.listainvestigaciones.length; // Actualizar el índice
        }
  
        this.$el.addEventListener('animationend', () => {
          if (direction === 'next') {
            this.$el.classList.remove('next');
          } else {
            this.$el.classList.remove('prev');
          }
        }, { once: true });
      }
    }
  };
  </script>
  
  <style scoped>
  .slider {
    height: 70%;
    width: 100%;
    overflow: hidden;
    position: absolute;
  }
  .slider .list .item {
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0 0 0 0;
  }
  .slider .list .item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .slider .list .item .content {
    position: absolute;
    top: 40%;
    width: 50%;
    max-width: 80%;
    left: 30%;
    transform: translateX(-50%);
    padding-right: 10%;
    color: black;

  }
  .description{
    
    font-family: 'Roboto Condensed';
  }
  .slider .list .item .content .title,
  .slider .list .item .content .type {
    font-size: 250%;
    line-height: 1.3em;
  }
  .slider .list .item .type {
    color: #FF7001;
    font-family: 'Oswald';
  }
  .slider .list .item .button {
    display: grid;
    grid-template-columns: repeat(2, 130px);
    grid-template-rows: 40px;
    gap: 5px;
    margin-top: 20px;
  }
  .slider .list .item .button button {
    border: none;
    background-color: #eee;
    font-family: Poppins;
    font-weight: 500;
    cursor: pointer;
    transition: 0.4s;
    letter-spacing: 2px;
  }
  .slider .list .item .button button:hover {
    letter-spacing: 3px;
  }
  .slider .list .item .button button:nth-child(2) {
    background-color: transparent;
    border: 1px solid #fff;
    color: #eee;
  }
  /* Thumbnail Section */
  .thumbnail {
    position: absolute;
    bottom: 50px;
    left: 40%;
    z-index: 100;
    display: flex;
    gap: 20px;
  }
  .thumbnail .item {
    width: 250px;
    height: 320px;
    flex-shrink: 0;
    position: relative;
  }
  .thumbnail .item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
    box-shadow: 5px 0 15px rgba(0, 0, 0, 0.3);
  }
  /* nextPrevArrows Section */
  .nextPrevArrows {
    position: absolute;
    top: 80%;
    right: 52%;
    z-index: 100;
    width: 300px;
    max-width: 30%;
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .nextPrevArrows button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #BADF3A;
    border: none;
    color: #fff;
    font-family: monospace;
    font-weight: bold;
    transition: .5s;
    cursor: pointer;
  }
  .nextPrevArrows button:hover {
    background-color: #fff;
    color: #000;
  }
  </style>
  