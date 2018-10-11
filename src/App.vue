<template>
  <div id="app">
      <div id="snackbar"></div>
      <app-nav-bar
        @onShowLogin="flagLogin=true"
      ></app-nav-bar>
      <login-user
        v-if="flagLogin"
        @onCloseLogin="flagLogin=false"
      ></login-user>
      <router-view />
  </div>
</template>

<script>
import NavBar from './views/includes/NavBar.vue';
import LoginUser from './views/user/LoginUser.vue';

export default {
  components: {
    'app-nav-bar': NavBar,
    'login-user': LoginUser,
  },
  name: 'app',
  data() {
    return {
      flagLogin: false,
    };
  }
};
</script>

<style>
    @import "assets/css/base.css";
    @import "assets/css/componentes.css";
    @import "assets/css/estilos.css";
</style>
