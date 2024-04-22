<template>
  <div id="app">
    <!-- Existing content for Nosotrosadmin.vue goes here -->

    <!-- Button to toggle visibility of Formpaginanos -->
    <button @click="toggleFormVisibility">Modificar</button>

    <!-- Formpaginanos component -->
    <Formpaginanos v-if="showForm" @closeForm="closeForm" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Formpaginanos from './Formp.vue';



const showForm = ref(false); // Control visibility of Formpaginanos

const toggleFormVisibility = () => {
  showForm.value = !showForm.value;
};

const closeForm = () => {
  showForm.value = false;
};
</script>

<style>
/* Your styles here */
</style>
