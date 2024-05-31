<template>
  <div class="navbar">
    <nav class="nav-container">
      <div class="navIzquierda">
        <img src="/src/assets/images/logo.png" alt="Imagen del logo" class="logo" style="width: 80px;">
        <h1 class="tituloNav" style=" color: white;">Psicopedagogia</h1>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.navbar {
  width: 100%;
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
.navIzquierda{
  display: flex;
  align-items: center;
}
.logo {
  width: 80px;
  margin-left: 2%;
  margin-right: 0;
}

.tituloNav {
  padding: 2%;
  animation: ocean-animation 5s infinite alternate;
  color: white;
}

@keyframes ocean-animation {
  0% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-10px);
  }
  50% {
    transform: translateY(0);
  }
  75% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0);
  }
}

</style>