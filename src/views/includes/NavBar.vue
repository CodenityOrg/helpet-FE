<template>
    <nav class="navbar">
        <div class="navbar__logo">
            <a href="/"><img src="../../assets/img/ico-logo.png" alt="logo helpet"></a>
        </div>
        <ul class="navbar__menu">
            <template v-if="!isAuthenticated">
                <li>
                    <a href="" @click="clickLogin()">Inicia</a>
                </li>
                <li >
                    <router-link :to="{name : 'RegisterUser'}">Regístrate</router-link>
                </li>
            </template> 
            <template v-else>
                
                <li>
                    <router-link :to="{name : 'RegisterPostPet'}">Nuevo post</router-link>
                </li>
            </template>
            <li>
                <router-link :to="{name : 'ListLost'}">Mapa</router-link>
            </li>
            <li v-if="isAuthenticated">
                <button @click="doLogout">Cerrar sesión</button>
            </li>
        </ul>
    </nav>
</template>

<script>
    import {mapState, mapActions} from "vuex";
    import VueCookie from "vue-cookie";
    export default {
        name: 'NavBar',
        computed: {
            ...mapState({
                isAuthenticated: state => state.auth.authenticated
            })
        },
        methods: {
            ...mapActions({
                logout: "logout"
            }),
            doLogout() {
                this.logout();
                this.$router.go();
            },
            clickLogin() {
                event.preventDefault();
                this.$emit('onShowLogin');
            }
        }
        
    };
</script>

<style scoped>
</style>
