<template>
    <div class="cont">
        <router-link :to="{name : 'Home'}">
            <full-page ref="fullpage" :options="options">
                <IndexSection />
                <section class="cont--slogan section">
                    <h1 style="color: white; text-align: center; margin-top: 120px;">Descubre como ayudar a las mascotas a regresar a su hogar !</h1>
                    <ul class="slogan__elemt" style="padding-top: 180px;">
                        <div class="img-features"></div>
                        <div class="img-features"></div>
                        <div class="img-features"></div>
                    </ul>
                </section>
                <!-- <ContactSection /> -->
            </full-page>
        </router-link>
        <router-view></router-view>
        <notifications group="foo" position='bottom right' />
    </div>
</template>

<script>
    import Vue from 'vue'
    import 'fullpage.js/vendors/scrolloverflow'
    import VueFullPage from 'vue-fullpage.js'
    import ContactSection from "./sections/Contact";
    import IndexSection from "./sections/Index";

    Vue.use(VueFullPage);
    export default {
        name: 'HomePage',
        components: {
            ContactSection,
            IndexSection
        },
        data() {
            return {
                options: {},
            }
        }
    };
</script>

<style scoped>
    .router-link-active {
        text-decoration: none;
    }

    .img-features {
        background: white;
        border-radius: 100%;
        height: 300px;
        margin: 0 50px;
        width: 300px;
    }
</style>
