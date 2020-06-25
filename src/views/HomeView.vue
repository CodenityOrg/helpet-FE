<template>
    <div class="cont">
        <router-link :to="{name : 'Home'}">
            <full-page ref="fullpage" :options="options">
                <IndexSection @toHelp="$refs.fullpage.api.moveTo(2)" />
                <section id="help" class="cont--slogan section">
                    <h2 style="color: white; text-align: center; margin-top: 100px; margin-bottom: 30px;">{{$t('home.howToMessage')}}</h2>
                    <div style="display: flex;">
                        <iframe style="width: 80%; height: 400px; margin: auto; " width="560" height="315" src="https://www.youtube.com/embed/7H5ZJUjMMQY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
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
    import IndexSection from "./sections/Index";

    Vue.use(VueFullPage);
    export default {
        name: 'HomePage',
        components: {
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
