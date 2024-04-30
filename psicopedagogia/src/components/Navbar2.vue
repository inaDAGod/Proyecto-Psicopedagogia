<template>
    <div class="navbar">
      <nav class="nav-container">
        <img src="/src/assets/images/logo.png" alt="Imagen del logo" class="logo" style="width: 80px;">
        <button class="menuboton" @click="toggleMenu"><img src="/src/components/icons/menu.png" alt="" width="10%"></button>
        <ul v-show="showMenu" class="menu">
          <li><router-link @click="toggleMenu" to="/"><img src="/src/components/icons/index.png" alt="" width="10%"> Inicio</router-link></li>
          
          <li><router-link @click="toggleMenu" to="/about"><img src="/src/components/icons/nosotros.png" alt="" width="10%"> Nosotros</router-link></li>
          <li @click="toggleSubMenu(1)" @mouseenter="changeCursor('pointer')" @mouseleave="changeCursor('default')">
            <a><img src="/src/components/icons/formacion.png" alt="" width="9%"> Formación</a>
            <ul v-show="showSubMenu === 1" class="submenu-right ">
              <li><router-link to="/formacion/pregrado"  @click="toggleMenu"><img src="/src/components/icons/formacion.png" alt="" width="20%"> Pregrado</router-link></li>
              <li><router-link to="/formacion/postgrado"  @click="toggleMenu"><img src="/src/components/icons/formacion.png" alt="" width="20%"> PostGrado</router-link></li>
            </ul>
          </li>
          <li @click="toggleSubMenu(2)" @mouseenter="changeCursor('pointer')" @mouseleave="changeCursor('default')">
            <a><img src="/src/components/icons/uni.png" alt="" width="10%">Instancias UCB</a>
            <ul v-show="showSubMenu === 2" class="submenu-right " style="top: 35%;">
              <li><a href=""><img src="/src/components/icons/ucb.png" alt="" width="20%"> Inscripciones</a></li>
              <li><a href=""><img src="/src/components/icons/ucb.png" alt="" width="20%"> Tarifarios</a></li>
              <li><a href=""><img src="/src/components/icons/ucb.png" alt="" width="20%"> Planes de Pago</a></li>
              <li><a href=""><img src="/src/components/icons/ucb.png" alt="" width="20%"> Becas</a></li>
              <li><a href=""><img src="/src/components/icons/ucb.png" alt="" width="20%"> Programa Agora</a></li>
            </ul>
          </li>
          <li @click="toggleSubMenu(3)" @mouseenter="changeCursor('pointer')" @mouseleave="changeCursor('default')">
            <a><img src="/src/components/icons/inves.png" alt="" width="10%"> Investigación</a>
            <ul v-show="showSubMenu === 3" class="submenu-right " style="top: 50%;">
              <li><router-link @click="toggleMenu" to="/investigacion/Sociedad" ><img src="/src/components/icons/inves.png" alt="" width="15%"> INPSICOPEDIA</router-link> </li>
              <li><router-link @click="toggleMenu" to="/investigacion/Zona" ><img src="/src/components/icons/inves.png" alt="" width="15%">Zona de aprendizaje</router-link> </li>
            </ul>
          </li>
          <li @click="toggleSubMenu(4)" @mouseenter="changeCursor('pointer')" @mouseleave="changeCursor('default')">
            <a><img src="/src/components/icons/egresados.png" alt="" width="10%"> Programa Integra</a>
            <ul v-show="showSubMenu === 4" class="submenu-right " style="top: 60%;">
              <li><router-link @click="toggleMenu" to="/integra/egresados"><img src="/src/components/icons/egresados.png" alt="" width="10%"> Egresados</router-link></li>
              <li><router-link @click="toggleMenu" to="/integra/publicaciones"><img src="/src/components/icons/inves.png" alt="" width="10%"> Publicaciones</router-link></li>
            </ul>
          </li>
          <li><router-link @click="toggleMenu" to="/sembrando"><img src="/src/components/icons/social.png" alt="" width="10%"> Interaccion Social</router-link></li>
          <li><router-link @click="toggleMenu" to="/red"><img src="/src/components/icons/red.png" alt="" width="10%"> Nuestra Red</router-link></li>
          <li><router-link @click="toggleMenu" to="/noticias"><img src="/src/components/icons/noti.png" alt="" width="10%"> Noticias</router-link></li>
        </ul>
      </nav>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Navbar',
    data() {
      return {
        showMenu: false,
        showSubMenu: 0
      };
    },
    methods: {
      toggleMenu() {
        this.showMenu = !this.showMenu;
        this.showSubMenu = 0;
      },
      toggleSubMenu(index) {
        this.showSubMenu = this.showSubMenu === index ? 0 : index;
      },
      changeCursor(cursorType) {
        document.body.style.cursor = cursorType;
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos del navbar y los elementos principales */
  .navbar {
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to right,   #FFC497,#FEF684, #DBEE96, #AAD6FB);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .nav-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between; 
  }
  
  .logo {
    width: 80px;
    margin-left: 2%;
  }
  
  .menuboton {
    background-color: transparent;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
    text-align: right;
    padding-right: 3%;
  }
  .menuboton img{
    width: 3.5%;
  }
  .menu img{
    margin-right: 5%;
  }
  .menu {
    position: absolute;
    width: 20%;
    text-align: left;
    top: 100%;
    right: 20px;
    background-color: #DBEE96;
    list-style: none;
    padding: 10px;
    margin: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    z-index: 1000;
  }
  
  .menu li {
    margin-bottom: 10px;
  }
  
  .menu li:last-child {
    margin-bottom: 0;
  }
  
  .menu li a{
    color: rgb(5, 0, 0);
    text-decoration: none;
    font-size: 16px;
    font-family: 'Roboto Condensed';
    height: 2%;
   
  }
  
  .menu li a:hover {
    color: #0D89F4;
    font-weight: bold;
    font-size: 18px;
  }
  
  .submenu-right {
    position: absolute;
    width: 75%;
    text-align: left;
    top: 50%;
    right: 100%;
    background-color: #DBEE96;
    list-style: none;
    padding: 10px;
    margin: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    z-index: 1000;
  }
  
  .submenu-right li {
    margin-bottom: 10px;
  }
  
  .submenu-right li:last-child {
    margin-bottom: 0;
  }
  
  .submenu-right li a{
    color: rgb(5, 0, 0);
    text-decoration: none;
    font-size: 16px;
    font-family: 'Roboto Condensed';
  }
  
  .submenu-right li a:hover {
    color: #0D89F4;
    font-weight: bold;
  }
  </style>