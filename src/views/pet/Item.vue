<template>
    <div 
        class="tarjeta tarjeta--perrrito-perdido" 
        :id="item.id">
        <div class="tarjeta__titulo">
            <img :src="item.user.profile" alt="foto de perfil">
            <span>{{fullName}}</span>
        </div>
        <div class="tarjeta__imagen">
            <carousel
                v-if="item.photos && item.photos.length"
                :perPageCustom="[[1024, 1]]"
            >
                <slide
                    :key="photo._id"
                    v-for="photo in item.photos"
                >
                    <img :src="photo.thumbnailPath" alt="perrito encontrado">
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
                    :key="feature._id"
                    v-for="feature in item.features"
                    class="caracteristica">
                    {{feature.value}}
                </span>
            </div>
        </div>
    </div>
</template>
<script>
import { Carousel, Slide } from 'vue-carousel';

export default {
    name: "ItemFound",
    components: {
         Carousel,
        Slide
    },
    props: {
        item: {
            type: Object
        }
    },
    computed: {
        fullName() {
            return this.item.user.firstName +  " " + this.item.user.lastName
        }
    }
}
</script>
