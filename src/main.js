import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from "./store/index";
import VueCookie from "vue-cookie";
import axios from "axios";
import VeeValidate from 'vee-validate';
import BootstrapVue from "bootstrap-vue";
import VueBus from 'vue-bus';
 
Vue.use(VueBus);
Vue.use(BootstrapVue);

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VeeValidate);

axios.defaults.headers.common['authorization'] = VueCookie.get("helpet_auth");
import loadingMixin from './components/common/includes/loading-mixin';

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
