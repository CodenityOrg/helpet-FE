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
    children: [
      {
        path: 'registro',
        name: 'RegisterUser',
        component: RegisterUser,
      }, {
        path: 'ingresar',
        name: 'LoginUser',
        component: LoginUser,
      },
    ],
  }],
});
