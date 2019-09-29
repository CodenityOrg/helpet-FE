<template>
  <div id="app">
      <nav-bar
        @onShowLogin="showLogin=true"
      ></nav-bar>
      <login-user
        v-if="showLogin"
        @onCloseLogin="showLogin=false"
      ></login-user>
      <info-user
        v-show="showInfoUser"
        :userId="userId"
      />
      <router-view @onShowUserInfo="showUserInfo"/>
  </div>
</template>

<script>
  import NavBar from './components/common/includes/NavBar.vue';
  import LoginUser from './components/users/LoginUser.vue';
  import InfoUser from './components/users/InfoUser.vue';

  export default {
      components: {
          NavBar,
          LoginUser,
          InfoUser
      },
      name: 'app',
      data() {
        return {
          showInfoUser: false,
          showLogin: false,
          userId: {},
        };
      },
      created() {
        this.$bus.$on("showUserInfo", this.showUserInfo);
        this.$bus.$on("onCloseInfoUser", this.closeUserInfo);
      },
      methods: {
        showUserInfo(userId) {
          this.userId = userId;
          this.showInfoUser = true;
        },
        closeUserInfo() {
          this.showInfoUser = false;
        }
      }
  };
</script>

<style>
    @import url("https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css");
    @import "assets/css/componentes.css";
    @import "assets/css/estilos.css";
    @import url("https://api.tiles.mapbox.com/mapbox-gl-js/v0.50.0/mapbox-gl.css");
    @import "assets/css/bootstrap.css";
    @import "assets/css/bootstrap-vue.css";
    @import "assets/css/login.css";
    @import "assets/css/base.css";
</style>
