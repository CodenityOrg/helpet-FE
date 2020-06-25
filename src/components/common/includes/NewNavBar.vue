<template>

    <nav class="Navbar"
        v-click-outside="close"
        :class="{ 'Navbar--block': !isHomePage }"
    >
        <div class="Navbar__logo">
            <router-link :to="{ name: 'Home' }" >
                <img
                    sizes="(max-width: 300px) 100vw, 300px"
                    :srcset="`${logosSrcSet['ico-logo_scale_sm']} 200w, ${logosSrcSet['ico-logo_scale_m']} 300w`"
                    :src="logoSrc"
                    alt="Helpet Logo">
            </router-link>
        </div>
        <div class="Navbar__triggerButton" :class="{ 'Navbar__triggerButton--left': showMenu }">
            <div @click="toggleMenu"><font-awesome-icon icon="bars" style="cursor: pointer; margin: 15px; color: white; font-size: 20px;" /></div>
        </div>
        <div @click="close" class="Navbar__menu" :class="{ 'Navbar__menu--show': showMenu }">
            <div class="Navbar__menuLogo">
                <router-link :to="{ name: 'Home' }" >
                    <img
                    sizes="(max-width: 300px) 100vw, 300px"
                    :srcset="`${logosSrcSet['ico-logo_scale_sm']} 200w, ${logosSrcSet['ico-logo_scale_m']} 300w`"
                    :src="logoSrc"
                    alt="Helpet Logo">
                </router-link>
            </div>
            <template v-if="!isAuthenticated">
                <div class="Navbar__menuItem">
                    <a href="" @click="clickLogin">
                        {{$t('navigation.button.login')}}
                    </a>
                </div>
                <div class="Navbar__menuItem">
                    <router-link :to="{name : 'RegisterUser'}">{{$t('navigation.button.register')}}</router-link>
                </div>
            </template>
            <template v-else>
                <div class="Navbar__menuItem">
                    <NotificationMenu />
                </div>
                <div class="Navbar__menuItem">
                    <router-link :to="{name : 'Profile'}"> {{fullName}} </router-link>
                </div>
            </template>
            <div class="Navbar__menuItem">
                <router-link :to="{name : 'MapView'}">{{$t('navigation.button.posts')}}</router-link>
            </div>
            <div class="Navbar__menuItem">
                <router-link :to="{name : 'Contact'}">{{$t('navigation.button.contact')}}</router-link>
            </div>
            <div class="Navbar__menuItem" v-if="isAuthenticated">
                <a href="" @click="doLogout">{{$t('navigation.button.logout')}}</a>
            </div>
        </div>
    </nav>
</template>
<script>
    import {mapState, mapActions} from "vuex";
    import vClickOutside from "v-click-outside";
    import Vue from "vue";
    import { isSafari } from '../../utils';
    Vue.use(vClickOutside);
    
    export default {
        components: {
            NotificationMenu: () => import(/* webpackPrefetch: true */ "../../notifications/NotificationMenu"),
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
            const logosSrcSet = isSafari ?
            {
                "ico-logo_scale_sm": require("../../../assets/img/ico-logo_iiqlh8_c_scale,w_200.png"),
                "ico-logo_scale_m": require("../../../assets/img/ico-logo_iiqlh8_c_scale,w_300.png")
            } :
            {
                "ico-logo_scale_sm": require("../../../assets/img/ico-logo_ahzu9s_c_scale,w_200.webp"),
                "ico-logo_scale_m": require("../../../assets/img/ico-logo_ahzu9s_c_scale,w_300.webp")
            };
            const logoSrc = isSafari ?
                require('../../../assets/img/ico-logo_iiqlh8_c_scale,w_300.png')
                : require('../../../assets/img/ico-logo_ahzu9s_c_scale,w_300.webp');
            return {
                showNotifications: false,
                showMenu: false,
                logosSrcSet,
                logoSrc
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

        &__triggerButton {
            display: none;
        }

        @media (max-width: 600px) {
            & {
                min-height: 55px;
                padding: 0;
            }
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