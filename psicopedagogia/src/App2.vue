
<template>
  <div id="app" class="appAdmi">
    <Navbar />
    <div class="contentWrapper">
      <div class="menuDiv">
        <ul class="menu">
          <li><router-link to="/admi"> Inicio</router-link></li>
          <br>
          <li><router-link to="/aboutadmi"> Nosotros</router-link></li>
          <br>
          <li><router-link to="/docentesadmi"> Docentes </router-link></li>
          <br>
          <li><router-link to="/egresadosadmi"> Egresados </router-link></li>
          <br>
          <li><router-link to="/redadmi"> Red </router-link></li>
          <br>
          <li><router-link to="/publicacionesadmi"> Publicaciones </router-link></li>
          <br>
          <li><router-link to="/interaccionsadmi"> Interaccion Social </router-link></li>
          <br>
          <li><router-link to="/noticiasadmi"> Noticias</router-link></li>
          <br>
          <li><router-link to="/sociedadadmi"> Sociedad </router-link></li>
          <br>
          <li><router-link to="/zonaadmi"> Zona </router-link></li>
          <br>
          <li><router-link to="/postgradoadmi"> Postgrado </router-link></li>
          <br>
          <li><router-link to="/pregradoadmi"> Pregrado </router-link></li>
          <br>
          <li><router-link to="/mallaadmi"> Malla </router-link></li>
        </ul>
      </div>
      <div class="mainContentAdmi">
        <router-view />
      </div>
    </div>
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

<style scoped>
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.contentWrapper {
  display: flex;
  flex: 1;
  height: calc(100% - 60px); /* Ajusta esto si el Navbar tiene una altura diferente */
}

.menuDiv {
  width: 20%;
  background-color: #FEF684;
  text-align: left;
  padding: 2%;
}

.menu {
  list-style: none;
}

.menu li a {
  color: rgb(5, 0, 0);
  text-decoration: none;
  font-size: 17px;
  font-family: 'Roboto Condensed';
  padding: 10px;
}

.menu li a:hover {
  color: #FF7001;
  font-weight: bold;
}

.mainContentAdmi {
  width: 80%;
  overflow-y: auto;
}
@media (max-width: 768px) {
      .menuDiv {
      width: 30%;
    }
    .menu li a {
      font-size: 11px;
    }
}
</style>