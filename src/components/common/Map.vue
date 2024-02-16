<template>
    <mapbox
        :access-token="accessToken"
        :map-options="{
            style: 'mapbox://styles/mapbox/streets-v10',
            center: currentLocation,
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
    import store from 'store';

    const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN

    export default {
        name: "PostMap",
        components: {
            Mapbox
        },
        data() {
            return {
                accessToken: MAPBOX_ACCESS_TOKEN
            }
        },
        computed: {
            currentLocation() {
                const {longitude = 0, latitude = 0} = store.get('location') || {};
                return [longitude, latitude];
            }
        }
    }
</script>
