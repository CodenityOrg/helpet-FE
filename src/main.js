import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from "./store/index";
import VueCookie from "vue-cookie";
import axios from "axios";
import VeeValidate, { Validator } from 'vee-validate';
import BootstrapVue from "bootstrap-vue";
import VueBus from 'vue-bus';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCalendarAlt, faComments, faMap, faTags, faPhoneAlt, faFilter, faSort, faTimes, faBell, faBars, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueSocketIO from 'vue-socket.io';

import es from "vee-validate/dist/locale/es";

Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add([faCalendarAlt, faComments, faMap, faTags, faPhoneAlt, faFilter, faSort, faTimes, faBell, faBars, faHome]);


Vue.use(VueBus);
Vue.use(BootstrapVue);
Validator.localize({ es })
Vue.use(VeeValidate, { locale: "es" });

axios.defaults.headers.common['authorization'] = VueCookie.get("helpet_auth");
import loadingMixin from './components/common/includes/loading-mixin';

Vue.mixin(loadingMixin)
Vue.use(VueCookie);
Vue.config.productionTip = false;

const socketHost = process.env.VUE_APP_SOCKET_HOST || 'http://localhost:3000';

Vue.use(new VueSocketIO({
    debug: true,
    connection: socketHost,
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    } //Optional options
}))
router.beforeEach(async ({meta, path}, from, next) => {

	document.title = meta.title;
	const hasAuth = await store.dispatch("validateAuthorization");


	if (hasAuth) {
		if (meta.user) {
			return next({
				path: "/publicaciones"
			});
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
