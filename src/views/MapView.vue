<template>
    <b-row style="margin: 0;" class="cont cont--inicio">
        <b-col md="4" sm="12" class="cont--tarjetas">
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
                <router-view @onShowInfoUser="showUser"></router-view>
            </div>
        </b-col>
        <b-col md="8" sm="12" class="cont--mapa">
            <Map
                @init="mapInitialized"
            />
        </b-col>
        <notifications
            style="margin-top: 80px;"
            group="foo" 
            position='top center' 
        />
    </b-row>
</template>

<script>
    /* eslint-disable */
    import { mapGetters, mapState } from "vuex";
    import {random} from "lodash";
    import mapMixin from "./mixins/map";
    import Map from "../components/common/Map";

    export default {
        name: "MapView",
        mixins: [mapMixin],
        components: {
            Map
        },
        mounted() {
            this.showDetectLocationAlert();
        },
        data() {
            return {
                flagInfoUser: false,
                crntUser: {},
                map: {},
                mbMarkers: [],
                customStyles: {}
            }
        },
        watch: {
            markers() {
                this.clearMap();
                this.createMarkers();
            }
        },
        methods: {
            showUser(user) {
                this.$emit("onShowUserInfo", user);
            },
            clearMap() {
                for (const mbMarker of this.mbMarkers) {
                    mbMarker.remove();
                }
                this.mbMarkers = [];
            },
            createMarkers() {
                for (const marker of this.markers) {
                    const mbMarker = new mapboxgl.Marker(this.genLayoutMarker(marker), {
                            offset: [-marker.properties.iconSize[0] / 2, -marker.properties.iconSize[1] / 2]
                        })
                        .setLngLat(marker.geometry.coordinates)
                        .addTo(this.map);
                    this.mbMarkers.push(mbMarker);
                }
            },
            showDetectLocationAlert() {
                this.$notify({
                    group: 'foo',
                    type: 'warn',
                    duration: 4500,
                    title: 'Estamos ubicandote, espere un momento',
                });
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
<style>
    @import "../assets/css/componentes.css";
</style>
