<template>
    <div class="tarjeta tarjeta--perrrito-perdido" 
        :id="item._id">
        <div class="tarjeta__titulo">
            <div class="image__name">
                <img :src="item.user.profile" alt="foto de perfil">
                <span>{{fullName}}</span>
            </div>
            <button class="btn--show__info" @click="showUserInfo">Ver info</button>
        </div>
        <div style="width: 400px; min-height: 50px; max-height: auto; float: left; " class="tarjeta__imagen">
            <carousel v-if="item.photos && item.photos.length" :perPageCustom="[[1024, 1]]" >
                <slide
                    :key="photo._id"
                    v-for="photo in item.photos" >

                    <div
                        :style="styles(photo.thumbnailPath)"
                    >
                    </div>
                </slide>
            </carousel>
            <img
                v-else
                src="https://saveapetil.org/wp-content/themes/saveapet/images/dog-placeholder.jpg"
                alt="perrito encontrado">
        </div>
        <div class="tarjeta__descripcion">
            <p class="descripcion"> {{item.description}} </p>
            <p class="direccion"> {{item.address}} </p>
            <div class="caracteristicas">
                <p><b> Características </b> </p>
                <span
                    :key="tag._id"
                    v-for="tag in item.tags"
                    class="caracteristica">
                    {{tag.value}}
                </span>
                <br/>
            </div>
        </div>
    </div>
</template>
<script>
import { Carousel, Slide } from 'vue-carousel';
import { mapActions, mapState } from "vuex";

export default {
    name: "PostItem",
    components: {
        Carousel,
        Slide
    },
    
    props: {
        item: {
            type: Object
        }
    },
    methods: {
        ...mapActions({
            getOne: "getOne"
        }),
        async showUserInfo() {
            if (!this.isAuthenticated) {
                alert("Quiere comenzar a ayudar, por favor registrate :)");
                return;
            }

            this.$bus.$emit("showUserInfo", this.item.user._id);
        },
        styles(url) {
            return {
                'background': `url(${url}) no-repeat center center`,
                'background-size': '100% 100%;',
                width: "400px",
                height: "200px",
                'background-position': 'center',
                'background-size': 'contain'
            }
        }
    },
    computed: {
        ...mapState({
            isAuthenticated: state => state.auth.authenticated
        }),
        fullName() {
            return this.item.user.firstName +  " " + this.item.user.lastName
        }
    }
}
</script>
