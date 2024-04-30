import { createApp } from 'vue';
import App from './App.vue';
import App2 from './App2.vue';
import router from '/src/router/index.js'; 
import router2 from '/src/router/index2.js'; 

//createApp(App).use(router).mount('#app');  //vista normal
createApp(App2).use(router2).mount('#app');  //vista administrador
