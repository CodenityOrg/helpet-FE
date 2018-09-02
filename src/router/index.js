import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '../home/HomePage.vue';
import RegisterUser from '../user/RegisterUser.vue';
import LoginUser from '../user/LoginUser.vue';
import MapAnimal from '../animal/MapAnimal.vue';
import AnimalFound from '../animal/AnimalFound.vue';
import AnimalLost from '../animal/AnimalLost.vue';

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: 'Home',
    components: {
      default: HomePage,
    },
  },
  {
    path: '/registro',
    name: 'RegisterUser',
    components: {
      default: RegisterUser,
    },
  },
  {
    path: '/ingresar',
    name: 'LoginUser',
    components: {
      default: LoginUser,
    },
  },
  {
    path: '/mapa',
    name: 'Map',
    components: {
      default: MapAnimal,
    },
    children: [
      {
        name: 'ListFound',
        path: 'encontrados',
        component: AnimalFound,
      },
      {
        name: 'ListLost',
        path: 'perdidos',
        component: AnimalLost,
      },
    ],
  }],
});
