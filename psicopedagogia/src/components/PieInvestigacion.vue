<template>
    <div>
      <img src="/src/assets/images/rocas.png" alt="Image Description" class="footer-img">
      <div class="contenido">
        <table class="redes">
          <tbody>
            <tr>
              <td class="redFace">
                <a class="faceImg" :href="face"><img style="width: 50px" src="/src/assets/images/facebook.png" alt="Imagen del logo"> {{ red }}</a>
               
              </td>
              <td class="derechaTable">Contacto: {{ contacto }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      face: {
        type: String,
      },
      contacto: {
        type: String,
      },
      red: {
        type: String,
      }
    }
  };
  </script>
<style>
    @import url('/src/assets/pieInvestigacion.css');
</style>
