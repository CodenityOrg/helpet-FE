<template>
    <mapbox
        :access-token="accessToken"
        :map-options="{
            style: 'mapbox://styles/mapbox/streets-v10',
            center: location,
            zoom: 11,
            localIdeographFontFamily: false
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
        props: {
            location: {
                type: Array,
                default: () => [0, 0]
            }
        },
        data() {
            return {
                accessToken: "pk.eyJ1IjoiYW5nZWxyb2Rybzk1IiwiYSI6ImNqODljcTJrdDAxaWIyd21rNTZubHQwamMifQ.6ghwymwGfrRC15-iKOxcww"
            }
        }
    }
</script>
