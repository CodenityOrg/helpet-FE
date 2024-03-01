<template>
  <div ref="mapContainer" class="map-container"></div>
<!--  <mapbox
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
    }" />-->
</template>
<script>
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

import store from "store"


export default {
  name: "PostMap",
  mounted() {
    const map = new mapboxgl.Map({
      container: this.$refs.mapContainer,
      style: "mapbox://styles/mapbox/streets-v10", // Replace with your preferred map style
      center: this.currentLocation,
      zoom: 11,
      controls: true
    });

    map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true,
          showUserHeading: true
        })
    );

    map.addControl(new mapboxgl.NavigationControl());
    map.on('click', (e) => {
      this.$emit('clicked', map, e);
    });

    this.$emit('init', map);

    this.map = map;
  },
  computed: {
    currentLocation() {
      const { longitude = 0, latitude = 0 } = store.get("location") || {}
      return [longitude, latitude]
    }
  },
  unmounted() {
    this.map.remove();
    this.map = null;
  }
}
</script>
<style>
.map-container {
  flex: 1;
}
</style>
