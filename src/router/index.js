import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '../views/home/HomePage.vue';
import RegisterUser from '../views/user/RegisterUser.vue';
import LoginUser from '../views/user/LoginUser.vue';
import MapAnimal from '../views/pet/MapAnimal.vue';
import PetFound from '../views/pet/PetFound.vue';
import PetLost from '../views/pet/PetLost.vue';

Vue.use(Router);


const router = new Router({
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
          component: PetFound,
        },
        {
          name: 'ListLost',
          path: 'perdidos',
          component: PetLost,
        },
      ],
    }
  ],
});

export default router;