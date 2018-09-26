import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from "./store/index";
import VueCookie from "vue-cookie";
import VueGoogleMaps from 'vue-googlemaps'
import axios from "axios";

axios.defaults.headers.common['authorization'] = VueCookie.get("helpet_auth");

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

Vue.use(VueCookie);
Vue.config.productionTip = false;

const authRoutes = ["PostCreate", "Profile"];
const userRoutes = ["LoginUser", "RegisterUser"];

router.beforeEach(async ({name}, from, next) => {
  const authorization = VueCookie.get("helpet_auth");
  if (authorization) {
    const hasAuthorization = await store.dispatch("validateAuthorization");

    if (userRoutes.includes(name)) {
      next({
        path: "/mapa/perdidos"
      });
      return;
    }

    if (authRoutes.includes(name)) {
      if (!hasAuthorization) {
        next({
          path: "/"
        });
      }
    }
  }
  next();
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
