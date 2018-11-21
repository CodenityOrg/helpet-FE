import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from "./store/index";
import VueCookie from "vue-cookie";
import VueGoogleMaps from 'vue-googlemaps'
import axios from "axios";

axios.defaults.headers.common['authorization'] = VueCookie.get("helpet_auth");
import loadingMixin from './views/includes/loading-mixin';

Vue.use(VueGoogleMaps, {
  load: {
    // Google API key
    apiKey: 'AIzaSyAI4d1AC5Em1oDSYkowZKVOq53O-700GOA',
    // Enable more Google Maps libraries here
    libraries: ['places'],
    // Use new renderer
    useBetaRenderer: false,
  },
})
Vue.mixin(loadingMixin)
Vue.use(VueCookie);
Vue.config.productionTip = false;

const redirectToMap = next => {
  next({
    path: "/mapa/perdidos"
  });
}

router.beforeEach(async ({meta, path}, from, next) => {

  document.title = meta.title;
  const hasAuth = await store.dispatch("validateAuthorization");
  if (path === "/mapa") {
    return redirectToMap(next);
  }

  if (hasAuth) {
    if (meta.user) {
      return redirectToMap(next);
    }
    return next();
  } 

  if (meta.auth) {
    return next({
      path: "/"
    });
  }

  next();
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
