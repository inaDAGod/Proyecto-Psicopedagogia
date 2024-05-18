<template>
    <div class="cuerpo">
      <div class="container">
        <div class="cardsInfo">
          <h2 class="tituloE">Red</h2>
          <CardsRed />
        </div>
        <div class="formAdd">
            <RedForm />
        </div>
      </div>
    </div>
</template>
<script setup>
    import CardsRed from '/src/components/CardsRedes.vue';
    import RedForm from '/src/components/RedFormAdd.vue';
</script>
<style scoped>
    @import url('/src/assets/admins.css');
</style>