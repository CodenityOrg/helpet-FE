import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '../home/HomePage.vue';
import NavBar from '../includes/NavBar.vue';

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: 'Home',
    components: {
      default: HomePage,
      navbar: NavBar,
    },
  }],
});
