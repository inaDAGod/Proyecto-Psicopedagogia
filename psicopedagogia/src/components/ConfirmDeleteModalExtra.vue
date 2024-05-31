<template>
    <div class="modal-confirm-delete">
      <div class="modal-content">
        <span class="close-button" @click="$emit('onClose')">&times;</span>
        <h2>Confirmar eliminación</h2>
        <p>¿Estás seguro de que quieres eliminar la publicación "{{ item }}"?</p>
        <div class="modal-actions">
          <button class="boton-cancelar" @click="$emit('onClose')">Cancelar</button>
          <button class="boton-confirmar" @click="$emit('onConfirm')">Eliminar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    item: String
  });
  </script>
  
  <style scoped>
  .modal-confirm-delete {
    width:100%;
    padding-left: 25%;
    padding-right: 25%;
    text-align: center;
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
  .boton-confirmar{
    background-color: #FF7001;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    height: 25%;
    width: 25%;
    font-size: 100%;
  }
  .modal-confirm-delete h2{
    font-family:'Roboto Condensed', sans-serif;
    font-size: 5vh;
    padding: 2vh;
    text-align: center;
    margin-bottom: 3vh;
  }
  .modal-confirm-delete p{
    font-family:'Roboto Condensed', sans-serif;
    font-size: 3vh;
    text-align: center;
  }
  .boton-cancelar{
    background-color: #E4E4E4;
    color: rgb(44, 44, 44);
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    height: 25%;
    width: 25%;
    font-size: 100%;
  }
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    cursor: pointer;
  }
  .modal-actions {
    margin-top: 20px;
  }
  .modal-actions button {
    margin: 0 10px;
  }
  </style>
  