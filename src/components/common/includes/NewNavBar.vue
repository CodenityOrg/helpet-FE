<template>
    <nav class="Navbar"
        v-click-outside="close"
        :class="{ 'Navbar--block': !isHomePage }"
    >
        <div class="Navbar__logo">
            <router-link :to="{ name: 'Home' }" ><img src="../../../assets/img/ico-logo.png" alt="logo helpet"></router-link>
        </div>
        <div class="Navbar__triggerButton" :class="{ 'Navbar__triggerButton--left': showMenu }">
            <div @click="toggleMenu"><font-awesome-icon icon="bars" style="cursor: pointer; margin: 15px; color: white; font-size: 20px;" /></div>
        </div>
        <div @click="close" class="Navbar__menu" :class="{ 'Navbar__menu--show': showMenu }">
            <div class="Navbar__menuLogo">
                <router-link :to="{ name: 'Home' }" ><img src="../../../assets/img/ico-logo.png" alt="logo helpet"></router-link>
            </div>
            <template v-if="!isAuthenticated">
                <div class="Navbar__menuItem">
                    <a href="" @click="clickLogin">
                        Iniciar sesion
                    </a>
                </div>
                <div class="Navbar__menuItem">
                    <router-link :to="{name : 'RegisterUser'}">Regístrate</router-link>
                </div>
            </template>
            <template v-else>
                <div class="Navbar__menuItem">
                    <template v-if="true">
                        <NotificationMenu />
                    </template>
                </div>
                <div class="Navbar__menuItem">
                    <router-link :to="{name : 'Profile'}"> {{fullName}} </router-link>
                </div>
            </template>
            <div class="Navbar__menuItem">
                <router-link :to="{name : 'MapView'}">Publicaciones</router-link>
            </div>
            <div class="Navbar__menuItem">
                <router-link :to="{name : 'Contact'}">Contacto</router-link>
            </div>
            <div class="Navbar__menuItem" v-if="isAuthenticated">
                <a href="" @click="doLogout">Cerrar sesión</a>
            </div>
        </div>
    </nav>
</template>
<script>
    import NotificationMenu from "../../notifications/NotificationMenu";
    import {mapState, mapActions} from "vuex";

    export default {
        components: {
            NotificationMenu
        },
        computed: {
            ...mapState({
                user: state => state.auth.user,
                isAuthenticated: state => state.auth.authenticated,
            }),
            fullName() {
                return this.user.firstName + " " + this.user.lastName;
            },
            isHomePage() {
                return this.$route.fullPath === "/";
            }
        },
        data() {
            return {
                showNotifications: false,
                showMenu: false
            }
        },
        methods: {
            toggleMenu() {
                this.showMenu = !this.showMenu;
            },
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
            },
            close() {
                this.showMenu = false;
            }
        }
    }
</script>
<style lang="scss">
    .Navbar{
        position: fixed;
        display: flex;
        color: white;
        z-index: 10;
        padding: 12px 15px;
        width: 100%;
        min-height: 90px;
        background-color: var(--color-logo-verde);

        &__triggerButton {
            display: none;
        }

        @media (max-width: 600px) {
            &__triggerButton {
                display: block;
            }

            &__triggerButton--left {
                margin-left: 250px;
            }

            &__menu {
                position: absolute;
                background: #13ad7c;
                width: 250px;
                height: 100vh;
                flex-direction: column;
                left: -250px;
                top: 0;
                padding-left: 20px;
                display: flex;
                transition: left 0.3s;
                z-index: 99;
            }

            &__menu--show {
                left: 0;
            }

            &__logo {
                display: none;
            }
        }

        &__logo {
            margin: 10px 15px;
            img {
                width: 200px;
            }
        }

        &__menu{
            display: flex;
            margin-left: auto;
            margin-right: 30px;

            &Logo{
                display: none;
            }

            &Item{
                margin: 20px;

                a, a:hover, a:link, a:active {
                    color: white !important;
                }
            }

            @media (max-width: 600px) {
                &Logo {
                    display: block;
                    margin: 25px 10px;

                    img {
                        width: 150px;
                        margin: auto;
                    }
                }
            }
        }
    }

    .Navbar--block {
        position: inherit;
    }

</style>