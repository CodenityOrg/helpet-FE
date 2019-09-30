<template>
    <b-navbar
        class="navbar hp-navbar"
        :class="{ 'navbar-home': isHomePage }"
        toggleable="md"
        type="dark">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand class="navbar__logo" href="#"><router-link :to="{ name: 'Home' }" ><img src="../../../assets/img/ico-logo.png" alt="logo helpet"></router-link> </b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav class="ml-auto navbar__menu">
                <template v-if="!isAuthenticated">
                    <b-nav-item>
                        <a href="" @click="clickLogin">Inicia</a>
                    </b-nav-item>
                    <b-nav-item >
                        <router-link :to="{name : 'RegisterUser'}">Regístrate</router-link>
                    </b-nav-item>
                </template>
                <template v-else>
                    <b-nav-item>
                        <router-link :to="{name : 'Profile'}"> {{fullName}} </router-link>
                    </b-nav-item>
                </template>
                <b-nav-item>
                    <router-link :to="{name : 'MapView'}">Mapa</router-link>
                </b-nav-item>
                <b-nav-item v-if="isAuthenticated">
                    <button @click="doLogout">Cerrar sesión</button>
                </b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
    import {mapState, mapActions} from "vuex";
    import VueCookie from "vue-cookie";

    export default {
        name: "NavBar",
        computed: {
            ...mapState({
                user: state => state.auth.user,
                isAuthenticated: state => state.auth.authenticated
            }),
            fullName() {
                return this.user.firstName + " " + this.user.lastName;
            },
            isHomePage() {
                return this.$route.fullPath === "/";
            }
        },
        methods: {
            ...mapActions({
                logout: "logout"
            }),
            doLogout() {
                this.logout();
                this.$router.go();
            },
            clickLogin(event) {
                event.preventDefault();
                this.$emit('onShowLogin');
            }
        }

    };
</script>

<style scoped>
</style>
