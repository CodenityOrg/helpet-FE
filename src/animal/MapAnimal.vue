<template>
    <div class="cont cont--inicio">
        <div class="cont--tarjetas">
            <div class="content">
                <div class="tab-links">
                    <router-link :to="{name : 'ListLost'}" exact>
                        <button type="button" class="tab-link posts-tab">
                            Perdidos
                        </button>
                    </router-link>
                    <router-link :to="{name : 'ListFound'}" exact>
                        <button type="button" class="tab-link posts-tab">Encontrados</button>
                    </router-link>
                </div>
                <router-view></router-view>
            </div>
        </div>
        <div class="cont--mapa">
            <div id='map'></div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */

  export default {
  name: 'Map',
  mounted() {
    const element = document.getElementById('map');
    const options = {
      zoom: 14,
      center: new google.maps.LatLng(-18.013611, -70.252769),
    };
    const map = new google.maps.Map(element, options);
  },
};
</script>

<style>
    @import "../assets/css/perdidos.css";
    .router-link-active button{
        border-bottom-color:green
    }
</style>
