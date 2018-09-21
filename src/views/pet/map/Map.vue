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
    import { mapGetters } from 'vuex';

    export default {
        name: 'Map',
        mounted() {
            const element = document.getElementById('map');
            const options = {
                zoom: 14,
                center: new google.maps.LatLng(-18.013611, -70.252769),
            };
            this.map = new google.maps.Map(element, options);
        },
        data() {
            return {
                map: {}
            }
        },
        computed: {
            ...mapGetters({
                positions: "getCurrentPositions"
            }),
            markers() {
                return positions.map((position) => {
                    const latLng = new google.maps.LatLng(position.latitude, position.longitude);
                    const marker = new google.maps.Marker({
                        position: latLng,
                        title:"Hello World!"
                    });
                    marker.setMap(this.map);
                });
            }
        }
    };
</script>

<style>
    @import "../../../assets/css/perdidos.css";
    .router-link-active button{
        border-bottom-color:green
    }
</style>
