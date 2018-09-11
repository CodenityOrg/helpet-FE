import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '../views/home/HomePage.vue';
import RegisterUser from '../views/user/RegisterUser.vue';
import LoginUser from '../views/user/LoginUser.vue';
import MapAnimal from '../views/animal/MapAnimal.vue';
import AnimalFound from '../views/animal/AnimalFound.vue';
import AnimalLost from '../views/animal/AnimalLost.vue';

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/registro',
      name: 'RegisterUser',
      component: RegisterUser
    },
    {
      path: '/ingresar',
      name: 'LoginUser',
      component: LoginUser
    },
    {
      path: '/mapa',
      name: 'Map',
      component: MapAnimal,
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
    }
  ],
});
