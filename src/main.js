import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from "./store/index";
import VueCookie from "vue-cookie";
import axios from "axios";
import VeeValidate from 'vee-validate';
import BootstrapVue from "bootstrap-vue";
import VueBus from 'vue-bus';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCalendarAlt, faComments, faMap, faTags, faPhoneAlt, faFilter, faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add([faCalendarAlt, faComments, faMap, faTags, faPhoneAlt, faFilter, faSort]);

Vue.component('font-awesome-icon', FontAwesomeIcon)


Vue.use(VueBus);
Vue.use(BootstrapVue);

// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VeeValidate);

axios.defaults.headers.common['authorization'] = VueCookie.get("helpet_auth");
import loadingMixin from './components/common/includes/loading-mixin';

Vue.mixin(loadingMixin)
Vue.use(VueCookie);
Vue.config.productionTip = false;


router.beforeEach(async ({meta, path}, from, next) => {

  document.title = meta.title;
  const hasAuth = await store.dispatch("validateAuthorization");


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
