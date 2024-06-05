<!-- src/components/Animation.vue -->
<template>
  <div class="animation-container" @click="reiniciarAnimacion">
    <div class="image-left" ref="imageLeft">
      <img :src="leftImage" alt="Imagen izquierda">
    </div>
    <div class="animation-text">
      <p>{{ text }}</p>
    </div>
    <div class="image-right" ref="imageRight">
      <img :src="rightImage" alt="Imagen derecha">
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  leftImage: String,
  rightImage: String,
  text: String,
});

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

<style scoped>
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
  z-index: 1; 
  font-size: 24px;
  animation: slideIn 2s forwards;
}
.animation-text p {
  font-family: 'Oswald', sans-serif;
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
</style>
