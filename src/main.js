import Vue from 'vue'
import App from './App.vue'
import Register from './Register.vue'
import Login from './Login.vue'
import Home from './Home.vue'
import VueRouter from 'vue-router'
import * as firebase from 'firebase'


Vue.config.productionTip = false

//Call para o Vue usar o VueRouter
Vue.use(VueRouter)
//Declaração de rotas
const routes = [
  { path: '/register', component: Register },
  { path: '/:userId', component: Home },
  { path: '/', component: Login }
];
//Declaração do VueRouter
const router = new VueRouter({
  routes
})

new Vue({
  router,
  render: h => h(App),
  //Variáveis utilizadas pelo Firebase para conexão
  created() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCoLXWpOOtkgn9xI-eSoYQ26XWwzhmKKHw',
      authDomain: 'teste-tecnico---jera.firebaseapp.com',
      databaseURL: 'https://teste-tecnico---jera.firebaseio.com',
      projectId: 'teste-tecnico---jera',
      storageBucket: 'teste-tecnico---jera.appspot.com',
      messagingSenderId: '879620519240',
      appId: '1:879620519240:web:247fef34e3270cab2c2f7d',
      measurementId: 'G-21YLMGJPLH'
    })
  }
}).$mount('#app')

