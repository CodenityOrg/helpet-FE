import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '../views/home/HomePage.vue';
import RegisterUser from '../views/user/RegisterUser.vue';
import MapView from '../views/MapView';
import PetFound from '../views/pet/PetFound.vue';
import PetLost from '../views/pet/PetLost.vue';
import PostPet from '../views/pet/publication/Post.vue'

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
      path: '/publicacion',
      name: 'RegisterPostPet',
      component: PostPet
    },
    {
      path: '/mapa',
      name: 'Map',
      component: MapView,
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