import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../views/HomeView.vue';
import RegisterUser from '../views/RegisterView.vue';
import PostPet from '../views/PostView.vue'
import Profile from "../views/ProfileView";
import MapView from '../views/MapView';

import PetFound from '../components/posts/PetFound.vue';
import PetLost from '../components/posts/PetLost.vue';

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage,
      meta: {
        title: "Helpet - Ayuda a las mascotas a encontrar su hogar"
      }
    },
    {
      path: '/registro',
      name: 'RegisterUser',
      component: RegisterUser,
      meta: {
        title: "Registro de usuario",
        user: true
      }
    },
    {
      path: '/perfil',
      name: 'Profile',
      component: Profile,
      meta: {
        title: "Perfil del usuario",
        auth: true
      }
    },
    {
      path: '/publicacion',
      name: 'RegisterPostPet',
      auth: true,
      component: PostPet,
      meta: {
        title: "Nueva publicacion",
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
          meta: {
            title: "Mascotas encontradas"
          }
        },
        {
          name: 'ListLost',
          path: 'perdidos',
          component: PetLost,
          meta: {
            title: "Mascotas perdidas"
          }
        },
      ],

    },
    {
      path: '*',
      name:'Home',
      component: HomePage
    }
  ],
});

export default router;
