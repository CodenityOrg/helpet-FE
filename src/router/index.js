import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '../views/home/HomePage.vue';
import RegisterUser from '../views/user/RegisterUser.vue';
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
