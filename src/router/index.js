import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '../home/HomePage.vue';
import NavBar from '../includes/NavBar.vue';
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
      navbar: NavBar,
    },
  },
  {
    path: '/registro',
    name: 'RegisterUser',
    components: {
      default: RegisterUser,
      navbar: NavBar,
    },
  },
  {
    path: '/ingresar',
    name: 'LoginUser',
    components: {
      default: LoginUser,
      navbar: NavBar,
    },
  },
  {
    path: '/mapa',
    name: 'Map',
    components: {
      default: MapAnimal,
      navbar: NavBar,
    },
    children: [
      {
        name: 'ListFound',
        path: 'encontrado',
        component: AnimalFound,
      },
      {
        name: 'ListLost',
        path: 'perdido',
        component: AnimalLost,
      },
    ],
  }],
});
