<template>
  <div class="navbar">
    <nav class="nav-container">
      <img src="/src/assets/images/logo.png" alt="Imagen del logo" class="logo" style="width: 80px;">
      <button class="menuboton" @click="toggleMenu"><img src="/src/components/icons/menu.png" alt="" width="10%"></button>
      <ul v-show="showMenu" class="menu">
        <li><router-link @click="toggleMenu" to="/"><img src="/src/components/icons/index.png" alt="" width="10%"> Inicio</router-link></li>
        <li><router-link @click="toggleMenu" to="/egresados"><img src="/src/components/icons/egresados.png" alt="" width="10%"> Egresados</router-link></li>
        <li><router-link @click="toggleMenu" to="/about"><img src="/src/components/icons/nosotros.png" alt="" width="10%"> Nosotros</router-link></li>
        <li @click="toggleSubMenu(1)" @mouseenter="changeCursor('pointer')" @mouseleave="changeCursor('default')">
          <a><img src="/src/components/icons/formacion.png" alt="" width="9%"> Formacion</a>
          <ul v-show="showSubMenu === 1" class="submenu-right ">
            <li><router-link to="/pregrado"  @click="toggleMenu"><img src="/src/components/icons/formacion.png" alt="" width="20%"> Pregrado</router-link></li>
            <li><router-link to="/postgrado"  @click="toggleMenu"><img src="/src/components/icons/formacion.png" alt="" width="20%"> PostGrado</router-link></li>
          </ul>
        </li>
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
  text-align: justify;
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
  color: #fff;
  font-weight: bold;
  font-size: 18px;
}

.submenu-right {
  position: absolute;
  width: 50%;
  text-align: justify;
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
  color: #fff;
  font-weight: bold;
}
</style>