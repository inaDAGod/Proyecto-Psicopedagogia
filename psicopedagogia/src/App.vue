<template>
    <h1>Menu</h1>
    <div id="app">
        
   
    <nav>
        <ul>
            <li> <router-link to="/Egresados.vue">Pagina Egresados</router-link> </li>
            <li> <router-link to="/Nosotros.vue">Pagina Nosotros</router-link> </li>
            <li> <router-link to="/principal.vue">Pagina Principal</router-link> </li>
        </ul>
    </nav>
</div>
    <router-view></router-view>
</template>
<style>
nav {
    background-color: rgba(255, 112, 1, 1);
    width: 100%;
    height: 100px;
}
</style>