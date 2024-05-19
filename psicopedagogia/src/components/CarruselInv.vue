<template>
    <div class="slider">
      <div class="content-section">
        <div class="list">
          <div class="item" v-for="(item, index) in listainvestigaciones" :key="index" v-show="index === currentIndex">
            <div class="content">
              <div class="type">{{ item.titulo }}</div>
              <div class="description">{{ item.descripcion }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="thumbnail-section">
        <div class="thumbnail">
          <div class="item" v-for="(item, index) in listainvestigaciones" :key="index">
            <img :src="item.src_foto" alt="">
          </div>
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
    display: flex;
    overflow: hidden;
    position: relative;
    margin: 0;
    padding: 0;
  }
  
  .content-section {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .list .item {
    width: 100%;
    height: 100%;
    position: relative;
  }
  
  .list .item .content {
    color: black;
    padding: 20px;
  }
  
  .description {
    font-family: 'Roboto Condensed';
  }
  
  .type {
    font-size: 250%;
    line-height: 1.3em;
    color: #FF7001;
    font-family: 'Oswald';
  }
  
  .thumbnail-section {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .thumbnail {
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
  
  .nextPrevArrows {
    position: absolute;
    bottom: 20px;
    right: 70%;
    z-index: 100;
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
    transition: 0.5s;
    cursor: pointer;
  }
  
  .nextPrevArrows button:hover {
    background-color: #fff;
    color: #000;
  }
  </style>
  