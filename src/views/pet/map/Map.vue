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
           <googlemaps-map
                :center="mapOptions.center"
                :zoom="mapOptions.zoom"
                :options="mapOptions">
                <googlemaps-marker
                    v-for="marker of markers"
                    :key="marker.id"
                    :label="{
                        fontFamily: 'Material Icons',
                        fontSize: '20px',
                    }"
                    :position="marker.position"
                />
            </googlemaps-map>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
    import { mapGetters, mapState } from 'vuex';
    import {random} from "lodash";

    export default {
        name: 'Map',
        data() {
            return {
                mapOptions: {
                    zoom: 14,
                    center: new google.maps.LatLng(-18.013611, -70.252769),
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
                        position: new google.maps.LatLng(position.latitude, position.longitude)
                    }
                })
            }
        }
    };


</script>

