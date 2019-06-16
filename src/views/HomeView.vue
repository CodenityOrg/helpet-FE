<template>
    <div class="filtro cont">
        <router-link :to="{name : 'Home'}">
        <section class="cont--slogan">
            <full-page ref="fullpage" :options="options">
                <ul class="slogan__elemt section">
                    <div class="slogan">
                        <h3 class="slogan__title">
                            Encuentra a tu <span class="slogan__title--bold">mascota</span>
                            <br>
                            perdida o ayuda a una a encontrar su hogar
                        </h3>
                        <span class="slogan__subtitle">Porque las mascotas son los mejores amigos</span>
                        <router-link :to="{name : 'ListLost'}">Comienza</router-link>
                    </div>
                    <div class="logo">
                        <img src="../assets/img/img-A.png" alt="logo helpet">
                    </div>
                </ul>
                <ul class="slogan__elemt section">
                    <div class="slogan">
                        <h3 class="slogan__title">
                            Encuentra a tu <span class="slogan__title--bold">mascota</span>
                            <br>
                            perdida o ayuda a una a encontrar su hogar
                        </h3>
                        <span class="slogan__subtitle">Porque las mascotas son los mejores amigos</span>
                        <router-link :to="{name : 'ListLost'}">Comienza</router-link>
                    </div>
                    <div class="logo">
                        <img src="../assets/img/img-A.png" alt="logo helpet">
                    </div>
                </ul>
            </full-page>
        </section>
        </router-link>
        <router-view></router-view>
        <notifications group="foo" position='bottom right' />
    </div>
</template>

<script>
    import Vue from 'vue'
    import 'fullpage.js/vendors/scrolloverflow'
    import VueFullPage from 'vue-fullpage.js'

    Vue.use(VueFullPage);
    export default {
        name: 'HomePage',
        data() {
            return {
                options: {
                    menu: '#menu',
                    anchors: ['page1', 'page2', 'page3'],
                },
            }
        }
    };
</script>

<style scoped>
    .router-link-active {
        text-decoration: none;
    }
</style>
