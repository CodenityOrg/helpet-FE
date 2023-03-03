import VeeValidate, { Validator } from 'vee-validate';
import { faBars, faBell, faCalendarAlt, faComments, faFilter, faHome, faMap, faPhoneAlt, faSort, faTags, faTimes } from "@fortawesome/free-solid-svg-icons";

import App from '@/App.vue';
import BootstrapVue from "bootstrap-vue";
import FBLoginInstall from "@/installs/fb-login";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Vue from 'vue';
import VueBus from 'vue-bus';
import VueCookie from "vue-cookie";
import VueGtm from 'vue-gtm';
import VueI18n from 'vue-i18n';
import VueSocketIO from 'vue-socket.io';
import axios from "axios";
import dictionary from "@/localization";
import es from "vee-validate/dist/locale/es";
import { library } from "@fortawesome/fontawesome-svg-core";
import loadingMixin from './components/common/includes/loading-mixin';
import router from '@/router';
import store from "@/store/index";

Vue.use(VueI18n);

const i18n = new VueI18n({
	locale: navigator.language.split('-')[0],
	fallbackLocale: "en",
	messages: dictionary,
});

FBLoginInstall();

//TODO: Move ga key to .env
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

Vue.mixin(loadingMixin)
Vue.use(VueCookie);
Vue.config.productionTip = false;

const socketHost = import.meta.env.VITE_SOCKET_HOST || 'http://localhost:3000';

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
