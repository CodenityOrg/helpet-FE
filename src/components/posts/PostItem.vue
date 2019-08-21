<template>
    <div class="tarjeta tarjeta--perrrito-perdido" 
        :id="item._id">
        <b-row>
            <b-col md="4">
                <div class="tarjeta__imagen">
                    <img
                        src="https://saveapetil.org/wp-content/themes/saveapet/images/dog-placeholder.jpg"
                        alt="perrito encontrado">
                </div>
            </b-col>
            <b-col md="8">
                <div class="tarjeta__titulo">
                    <div class="image__name">
                        <img :src="item.user.profile" alt="foto de perfil">
                        <span>{{fullName}}</span>
                    </div>
                    <button class="btn--show__info" @click="showUserInfo">Ver info</button>
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
            </b-col>
        </b-row>
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
