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
                @map-init="mapInitialized"
                :fullscreen-control="{
                    show: true,
                    position: 'top-left'
                }"
            />
           
        </div>
    </div>
</template>

<script>
    /* eslint-disable */
    import { mapGetters, mapState } from "vuex";
    import {random} from "lodash";
    import Mapbox from 'mapbox-gl-vue';
    export default {
        name: "Map",
        data() {
            return {
                mapOptions: {
                    zoom: 14,
                    center: new google.maps.LatLng(-18.013611, -70.252769),
                }
            }
        },
        components: {
            Mapbox
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
            },
            mapInitialized(map) {

                for (const markers of this.markers) {
                    let marker = new mapboxgl.Marker(this.genLayoutMarker(marker), {
                        offset: [-marker.properties.iconSize[0] / 2, -marker.properties.iconSize[1] / 2]
                    })
                    .setLngLat(marker.geometry.coordinates)
                    .addTo(map);
                }
    
                
            },
            genLayoutMarker(data) {
                const el = document.createElement("div");
                el.className = (data.type == 1) ? "marker marker--encontrado" : "marker marker--perdido";
                if (data.photo) {
                    el.style.backgroundImage = `url(${data.photo})`;
                }
                el.style.width = data.properties.iconSize[0] ? (data.properties.iconSize[0] + 'px') : '48px';
                el.style.height = data.properties.iconSize[1] ? (data.properties.iconSize[1] + 'px') : '48px';
                return el;
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
                        photo: position.photo,
                        properties: {
                            iconSize: [48, 48]
                        },
                        type: position.type,
                        geometry: {
                            type: "Point",
                            coordinates: [position.longitude, position.latitude]
                        }
                    }
                })
            }
        }
    };

</script>

