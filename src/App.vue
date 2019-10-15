<template>
	<div id="app">
		<nav-bar
			@onShowLogin="showLogin=true"
		/>
		<login-user
			v-if="showLogin"
			@close="showLogin=false"
		/>
		<post-modal v-if="showPostModal" :post="post" />
		<info-user
			v-show="showUserModal"
			:userId="userId"
		/>
		<notification-modal v-if="showNotificationModal"/>
		<router-view />
	</div>
</template>

<script>
	import NavBar from './components/common/includes/NewNavBar.vue';
	import LoginUser from './components/users/LoginUser.vue';
	import InfoUser from './components/users/InfoUser.vue';
	import PostModal from './components/posts/PostModal';
	import NotificationModal from './components/notifications/NotificationModal';

	import {mapActions, mapState} from "vuex";


	export default {
		components: {
			NavBar,
			LoginUser,
			InfoUser,
			PostModal,
			NotificationModal
		},
		name: 'app',
		created() {
			this.requestNotificationPermission();
			this.$bus.$on("showUserInfo", this.showUserInfo);
			this.$bus.$on("onCloseInfoUser", this.closeUserInfo);
			this.$bus.$on("showPost", this.showPost);
			this.$bus.$on("hidePost", this.hidePost);
			this.$bus.$on("showNotificationModal", this.showNotifications);
			this.$bus.$on("hideNotificationModal", this.hideNotifications);
		},
		data() {
			return {
				showLogin: false,
				showPostModal: false,
				showUserModal: false,
				showNotificationModal: false,
				userId: undefined,
				post: {}
			};
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
			showUserInfo(id) {
				this.showUserModal = true;
				this.userId = id;
			},
			requestNotificationPermission() {
				Notification.requestPermission().then((permission) => {
					if (permission === 'granted') {
						console.log('Notification permission granted.');
					} else {
						console.log('Unable to get permission to notify.');
					}
				});
			},
			closeUserInfo() {
				this.showUserModal = false;
			},
			showPost(post) {
				this.post = post;
				this.showPostModal = true;
			},
			hidePost() {
				this.showPostModal = false;
			},
			showNotifications() {
				this.showNotificationModal = true;
			},
			hideNotifications() {
				this.showNotificationModal = false;
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
