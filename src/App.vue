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
		<post-modal v-if="showPostModal" :post="post" />
		<router-view @onShowUserInfo="showUserInfo"/>
	</div>
</template>

<script>
	import NavBar from './components/common/includes/NewNavBar.vue';
	import LoginUser from './components/users/LoginUser.vue';
	import InfoUser from './components/users/InfoUser.vue';
	import PostModal from './components/posts/PostModal';
	import {mapActions, mapState} from "vuex";

	export default {
		components: {
			NavBar,
			LoginUser,
			InfoUser,
			PostModal
		},
		name: 'app',
		created() {
			this.requestNotificationPermission();
		},
		data() {
			return {
				flagLogin: false,
				showPostModal: false,
				crntUser: {},
				post: {}
			};
		},
		mounted() {

			this.$bus.$on("showPost", (post) => {
				this.post = post;
				this.showPostModal = true;
			});

			this.$bus.$on("hidePost", () => {
				this.showPostModal = false;
			});
		},
		computed: {
			...mapState({
                isAuthenticated: state => state.auth.authenticated
            }),
		},
		methods: {
			...mapActions({
                updateToken: "updateToken"
            }),
			showUserInfo(user) {
				this.crntUser = user;
				this.flagInfoUser = true;
			},
			requestNotificationPermission() {
				Notification.requestPermission().then((permission) => {
					if (permission === 'granted') {
						console.log('Notification permission granted.');
						// TODO(developer): Retrieve an Instance ID token for use with FCM.
						// ...
					} else {
						console.log('Unable to get permission to notify.');
					}
				});
			}
		},
		watch: {
			isAuthenticated(val) {
				if (val) {
					const id = this.$socket.id;
					this.updateToken(id);
				}
			}
		},
		sockets: {
			reconnect() {
				if (this.isAuthenticated) {
					const id = this.$socket.id;
					this.updateToken(id);
				}
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
