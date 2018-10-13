<template>
    <div 
        class="tarjeta tarjeta--perrrito-perdido" 
        :id="item.id">
        <div class="tarjeta__titulo">
            <img :src="item.user.profile" alt="foto de perfil">
            <span>{{fullName}}</span>
        </div>
        <div class="tarjeta__imagen">
            <img :src="item.photos[0].thumbnailPath" alt="perrito encontrado">
        </div>
        <div class="tarjeta__descripcion">
            <p class="descripcion"> {{item.description}} </p>
            <p class="direccion"> {{item.address}} </p>
            <div class="caracteristicas">
                <p><b> Características </b> </p>
                <span class="caracteristica"></span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "ItemFound",
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
