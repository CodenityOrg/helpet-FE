<template>
  <div id="app">
      <div>
          <div id="snackbar"></div>
          <NavBar></NavBar>
          <div class="filtro cont">
              <section class="cont--slogan">
                  <ul class="slogan__elemt">
                      <div class="slogan">
                          <h3 class="slogan__title">
                              Encuentra a tu <span class="slogan__title--bold">mascota</span>
                              <br>
                              perdida o ayuda a una a encontrar su hogar
                          </h3>
                          <span class="slogan__subtitle">
                            Porque las mascotas son los mejores amigos</span>
                          <a href="/registro">Regístrate</a>
                      </div>
                      <div class="logo">
                          <img src="img/img-A.png" alt="logo helpet">
                      </div>
                  </ul>
              </section>
          </div>
          <HomePage></HomePage>
      </div>
  </div>
</template>

<script>
import HomePage from './home/HomePage.vue';
import NavBar from './includes/NavBar.vue';

export default {
  name: 'app',
  components: {
    HomePage,
    NavBar,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
