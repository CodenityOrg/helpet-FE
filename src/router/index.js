import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '../views/home/HomePage.vue';
import RegisterUser from '../views/user/RegisterUser.vue';
import LoginUser from '../views/user/LoginUser.vue';
import MapPet from '../views/pet/map/Map.vue';
import FoundPet from '../views/pet/list/Found.vue';
import LostPet from '../views/pet/list/Lost.vue';
import PostPet from '../views/pet/publication/Post.vue'
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
      path: '/publicacion',
      name: 'RegisterPostPet',
      component: PostPet
    },
    {
      path: '/mapa',
      name: 'Map',
      component: MapPet,
      children: [
        {
          name: 'ListFound',
          path: 'encontrados',
          component: FoundPet,
        },
        {
          name: 'ListLost',
          path: 'perdidos',
          component: LostPet,
        },
      ],
    }
  ],
});
