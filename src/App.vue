<template>
	<div id="app">
		<nav-bar
			@onShowLogin="flagLogin=true"
		/>
		<login-user
			v-if="flagLogin"
			@close="flagLogin=false"
		/>
		<info-user />
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
				flagLogin: false,
				crntUser: {},
			};
		},
		methods: {
			showUserInfo(user) {
				this.crntUser = user;
				this.flagInfoUser = true;
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
