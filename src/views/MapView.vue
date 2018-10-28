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
                <info-user
                    v-if="flagInfoUser"
                    @onCloseInfoUser="flagInfoUser=false"
                ></info-user>
                <router-view @onShowInfoUser="flagInfoUser=true"></router-view>
            </div>
        </div>
        <div class="cont--mapa">
           <googlemaps-map
                :center="mapOptions.center"
                :zoom="mapOptions.zoom"
                :options="mapOptions">
                <googlemaps-marker
                    v-for="marker of markers"
                    :key="marker.id"
                    :label="marker.label"
                    :position="marker.position"
                />
            </googlemaps-map>
        </div>
    </div>
</template>

<script>
    import InfoUser from './user/InfoUser.vue';
    /* eslint-disable */
    import { mapGetters, mapState } from "vuex";
    import {random} from "lodash";

    export default {
        components: {
            InfoUser,
        },
        name: "Map",
        data() {
            return {
                mapOptions: {
                    zoom: 14,
                    center: new google.maps.LatLng(-18.013611, -70.252769),
                },
                flagInfoUser: false,
            }
        },
        watch: {
            positions() {
                this.setMapOnAll(null);
            }
        },
        methods: {
            setMapOnAll(map) {
                for (const marker of this.markers) {
                    if (marker.setMap) {
                        marker.setMap(map);
                    }
                }
            }
        },
        computed: {
            ...mapGetters({
                positions: "getCurrentPositions"
            }),
            markers() {
                return this.positions.map(position => {
                    return {
                        id: position.id,
                        position: new google.maps.LatLng(position.latitude, position.longitude),
                        label: {
                            fontFamily: 'Material Icons',
                            fontSize: '20px',
                            text: "marker"
                        }
                    }
                })
            }
        }
    };

</script>

<style>
    @import "../assets/css/componentes.css";
</style>
