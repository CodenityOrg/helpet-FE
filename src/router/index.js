import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '../views/home/HomePage.vue';
import RegisterUser from '../views/user/RegisterUser.vue';
import LoginUser from '../views/user/LoginUser.vue';
import MapView from '../views/MapView';
import PetFound from '../views/pet/PetFound.vue';
import PetLost from '../views/pet/PetLost.vue';
import PostPet from '../views/pet/publication/Post.vue'
import Profile from "../views/user/Profile";

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
      component: RegisterUser,
      meta: {
        user: true
      }
    },
    {
      path: '/perfil',
      name: 'Profile',
      component: Profile,
      meta: {
        auth: true
      }
    },
    {
      path: '/publicacion',
      name: 'RegisterPostPet',
      auth: true,
      component: PostPet,
      meta: {
        auth: true
      }
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