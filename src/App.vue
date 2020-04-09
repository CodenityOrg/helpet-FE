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
		<app-footer />
	</div>
</template>

<script>
	import NavBar from './components/common/includes/NewNavBar.vue';
	import AppFooter from './components/common/includes/AppFooter.vue';
	import LoginUser from './components/users/LoginUser.vue';
	import InfoUser from './components/users/InfoUser.vue';
	import PostModal from './components/posts/PostModal';
	import NotificationModal from './components/notifications/NotificationModal';
	import CookieLaw from 'vue-cookie-law';

	import {mapActions, mapState} from "vuex";


	export default {
		components: {
			NavBar,
			LoginUser,
			InfoUser,
			PostModal,
			AppFooter,
			CookieLaw,
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
    @import "assets/css/components.css";
    @import "assets/css/styles.css";
    @import "assets/css/bootstrap.css";
    @import "assets/css/bootstrap-vue.css";
    @import "assets/css/login.css";
    @import "assets/css/base.css";
</style>
