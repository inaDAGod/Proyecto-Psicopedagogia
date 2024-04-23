<template>
    <div class="contenidoDiv" :style="{ backgroundColor: fondo }">
        <h3>{{ titulo }}</h3>
        <p>{{ contenido }}</p>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

    const props = defineProps({
        titulo: String,
        contenido: String,
        fondo: String,
     });
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Koulen&family=Oswald:wght@200..700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Koulen&family=Oswald:wght@200..700&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');
    h3 {
        text-align: center;
        color: black;
        font-size: 170%;
        font-family: 'Oswald';
    }

    p {
        text-align: justify;
        font-size: 130%;
        font-family: 'Roboto Condensed';
    }

    .contenidoDiv {
        width: 50%;
        height: 100%;
        padding: 3%;

    }
</style>
