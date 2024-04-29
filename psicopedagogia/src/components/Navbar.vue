<template>
  <div class="navbar">
    <nav class="nav-container">
      
      <img src="/src/assets/images/logo.png" alt="Imagen del logo" class="logo" style="width: 80px;">
      <button class="menuboton" @click="toggleMenu">Menu</button>
      <ul v-show="showMenu" class="menu">
        <li><router-link @click="toggleMenu" to="/">Inicio</router-link></li>
        <li><router-link @click="toggleMenu" to="/egresados">Egresados</router-link></li>
        <li><router-link @click="toggleMenu" to="/about">Nosotros</router-link></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      showMenu: false
    };
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    }
  }
};
</script>

<style scoped>
.navbar {
  width: 100%;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #BADF3A;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-container {
  width: 95%;
  display: flex;
  align-items: center;
  justify-content: space-between; /* Añadido */
}

.logo {
  width: 80px;
}

.menuboton {
  background-color: transparent;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  text-align: right;
}

.menu {
  position: absolute;
  top: 100%;
  right: 20px;
  background-color: #BADF3A;
  list-style: none;
  padding: 10px;
  margin: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
}

.menu li {
  margin-bottom: 10px;
}

.menu li:last-child {
  margin-bottom: 0;
}

.menu li a {
  color: white;
  text-decoration: none;
  font-size: 16px;
}

.menu li a:hover {
  color: #fff;
  font-weight: bold;
}
</style>
