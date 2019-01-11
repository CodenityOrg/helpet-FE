<template>
    <mapbox 
        access-token="pk.eyJ1IjoiYW5nZWxyb2Rybzk1IiwiYSI6ImNqODljcTJrdDAxaWIyd21rNTZubHQwamMifQ.6ghwymwGfrRC15-iKOxcww"
        :map-options="{
            style: 'mapbox://styles/mapbox/streets-v9',
            center: [-70.221799, -18.0031498],
            zoom: 15
        }"
        :geolocate-control="{
            show: true,
            position: 'top-left'
        }"
        :nav-control="{
            show: true, 
            position: 'top-left'
        }"
        @map-init="$emit('init', $event)"
        @map-click="(map, position) => $emit('clicked', map, position)"
        :fullscreen-control="{
            show: true,
            position: 'top-left'
        }"
    />
</template>
<script>
    import Mapbox from 'mapbox-gl-vue';

    export default {
        name: "PostMap",
        components: {
            Mapbox
        },
    }
</script>
