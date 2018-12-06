<template>
  <div id="app">
      <div id="snackbar"></div>
      <nav-bar
        @onShowLogin="flagLogin=true"
      ></nav-bar>
      <login-user
        v-if="flagLogin"
        @onCloseLogin="flagLogin=false"
      ></login-user>
      <info-user
          v-if="flagInfoUser"
          :currentUser="crntUser"
          @onCloseInfoUser="flagInfoUser=false"
      ></info-user>
      <router-view @onShowUserInfo="showUserInfo"/>
  </div>
</template>

<script>
import NavBar from './views/includes/NavBar.vue';
import LoginUser from './views/user/LoginUser.vue';
import InfoUser from './views/user/InfoUser.vue';

export default {
  components: {
    NavBar,
    LoginUser,
    InfoUser
  },
  name: 'app',
  data() {
    return {
      flagLogin: false,
      flagInfoUser: false,
      crntUser: {},
    };
  },
  methods: {
    showUserInfo(user) {
      this.crntUser = user;
      this.flagInfoUser = true;
    }
  }
};
</script>

<style>
    @import "assets/css/base.css";
    @import "assets/css/componentes.css";
    @import "assets/css/estilos.css";
    @import url("https://api.tiles.mapbox.com/mapbox-gl-js/v0.50.0/mapbox-gl.css");
</style>
