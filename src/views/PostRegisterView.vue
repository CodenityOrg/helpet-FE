<template>
  <div class="PostView cont cont--start">
    <loading :active.sync="isLoading" />
    <div class="PostView__Form">
      <PostForm @toggleLoading="toggleLoading" :marker="marker" />
    </div>
    <div class="PostView__Map">
      <PostMap @init="mapInitialized" @clicked="mapClicked" />
    </div>
  </div>
</template>
<script>
import mapboxgl from "mapbox-gl";

import mapMixin from "./mixins/map"
import PostForm from "../components/posts/PostForm.vue"
import PostMap from "../components/common/Map.vue"

export default {
  name: "PostView",
  mixins: [mapMixin],
  components: {
    PostForm,
    PostMap
  },
  data: () => ({
    marker: {}
  }),
  methods: {
    mapClicked(map, { lngLat: { lng, lat } }) {
      if (this.marker && this.marker.remove) {
        this.marker.remove()
        this.marker = null
      }
      const emptyMarker = this.genEmptyMarker()
      this.marker = new mapboxgl.Marker(emptyMarker, {
        offset: [-24, -24]
      })
        .setLngLat([lng, lat])
        .addTo(map)
    },
    genEmptyMarker() {
      const el = document.createElement("div")
      el.className = "marker marker--empty"
      el.style.width = "48px"
      el.style.height = "48px"
      return el
    },
    toggleLoading() {
      this.isLoading = !this.isLoading
    }
  }
}
</script>

<style lang="scss">
.PostView {
  display: flex;
  &__Form {
    padding-top: 0;
    background-color: var(--color-gray);
    width: 600px;
    height: 100%;
    overflow-y: auto;
  }

  &__Map {
    flex: 1;
    width: 100%;
  }
}

@media (max-width: 650px) {
  .PostView {
    flex-direction: column;

    &__Form {
      width: 100%;
      flex: 2;
      order: 2;
    }

    &__Map {
      flex: 3;
      order: 1;
      min-height: 300px;
    }
  }
}

.mapboxgl-map,
.vue-google-map {
  height: 100%;
}
</style>
