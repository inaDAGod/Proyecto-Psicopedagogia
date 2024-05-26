<template>
    <div class="modal-confirm-delete">
      <div class="modal-content">
        <span class="close-button" @click="$emit('onClose')">&times;</span>
        <h2>Confirmar eliminación</h2>
        <p>¿Estás seguro de que quieres eliminar la publicación "{{ item }}"?</p>
        <div class="modal-actions">
          <button @click="$emit('onConfirm')">Eliminar</button>
          <button @click="$emit('onClose')">Cancelar</button>
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
  