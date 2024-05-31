<template>
    <div class="modal-success">
      <div class="modal-content">
        <span class="close-button" @click="$emit('onClose')">&times;</span>
        <h2>Registro Exitoso</h2>
        <p>{{ message }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    message: String
  });
  </script>
  
  <style scoped>
  .modal-success h2{
    font-family:'Roboto Condensed', sans-serif;
    font-size: 5vh;
    padding: 2vh;
    text-align: center;
    margin-bottom: 3vh;
  }
  .modal-success p{
    font-family:'Roboto Condensed', sans-serif;
    font-size: 3vh;
    text-align: center;
  }
  .modal-success {
    width:100%;
    padding-left: 25%;
    padding-right: 25%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
  }
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    cursor: pointer;
  }
  </style>
  