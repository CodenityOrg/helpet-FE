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
import VueGtm from 'vue-gtm';

import es from "vee-validate/dist/locale/es";
import dictionary from "./dictionary";

import FBLoginInstall from "./installs/fb-login";

import VueI18n from 'vue-i18n';

Vue.directive('t', () => {});

VueI18n.prototype._initVM = function _initVM (data) {
	var silent = Vue.config.silent;
	Vue.config.silent = true;
	this._vm = new Vue({ data: data });
	Vue.config.silent = silent;
};

const i18n = new VueI18n({
	locale: 'es',
	fallbackLocale: "es",
	messages: {
		es: {
			message: {
				hello: 'Hola Mundo!'
			}
		},
		en: {
			message: {
			  	hello: 'Hello World!'
			}
		}
	},
});

Vue.use(i18n);

FBLoginInstall();

Vue.use(VueGtm, {
	id: 'GTM-MWR6DP8',
	debug: true,
	loadScript: true,
	vueRouter: router
	//ignoredViews: ['homepage']
});

Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add([faCalendarAlt, faComments, faMap, faTags, faPhoneAlt, faFilter, faSort, faTimes, faBell, faBars, faHome]);

Vue.use(VueBus);
Vue.use(BootstrapVue);
Validator.localize({ es })
Vue.use(VeeValidate, { locale: "es", dictionary });

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
	i18n,
	router,
	store
}).$mount('#app');
