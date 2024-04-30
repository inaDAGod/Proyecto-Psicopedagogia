<template>
    <div id="app">
      <Navbar />
      <router-view />
    </div>
  </template>
  
  <script>
  import Navbar from '/src/components/Navbar2.vue';
  
  export default {
    name: 'App',
    components: {
      Navbar,
    },
  };
  </script>
  