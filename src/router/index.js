import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '../home/HomePage.vue';
import NavBar from '../includes/NavBar.vue';
import RegisterUser from '../user/RegisterUser.vue';
import LoginUser from '../user/LoginUser.vue';

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
  }],
});
