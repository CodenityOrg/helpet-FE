<template>
    <section class="filter section">
        <div class="cont--slogan">
            <ul class="slogan__elemt">
                <div class="slogan">
                    <h3 class="slogan__title">
                        <div v-html="$t('home.introMessage')" ></div>
                    </h3>
                    <span class="slogan__subtitle">{{$t('home.sloganMessage')}}</span>
                    <div style="display: flex;">
                        <router-link :to="{name : 'MapView'}">{{$t('home.startButton')}}</router-link>
                        <a style="margin-left: 10px; color: #21b16a;" @click="$emit('toHelp')" >{{$t('home.learnButton')}}</a>
                    </div>
                </div>
                <div class="logo">
                    <img :src="imageSource" width="233px" height="300px" alt=" ">
                </div>
            </ul>
        </div>
    </section>
</template>

<script>
    const imageSource = require("../../assets/img/img-A.webp");

    export default {
        data() {
            return {
                imageSource
            }
        }
    };
</script>