import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from "./store/index";
import VueCookie from "vue-cookie";


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
