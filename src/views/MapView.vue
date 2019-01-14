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
        </b-col>
        <notifications group="foo" position='bottom right' />

    </b-row>
</template>

<script>
    /* eslint-disable */
    import { mapGetters, mapState } from "vuex";
    import { random } from "lodash";
    import Mapbox from 'mapbox-gl-vue';
    export default {
        name: "Map",
        data() {
            return {
                mapOptions: {
                    zoom: 14,
                    center: new google.maps.LatLng(-18.013611, -70.252769),
                },
                flagInfoUser: false,
                crntUser: {},
                map: {},
                mbMarkers: [],
                customStyles: {}
            }
        },
        components: {
            Mapbox
        },
        watch: {
            markers() {
                this.clearMap();
                this.createMarkers();
            }
        },
        beforeDestroy() {
            this.map.remove();
        },
        methods: {
            showUser(user) {
                this.$emit('onShowUserInfo', user);
            },
            clearMap() {
                for (const mbMarker of this.mbMarkers) {
                    mbMarker.remove();
                }
                this.mbMarkers = [];
            },
            mapInitialized(map) {
                this.map = map;
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
            genLayoutMarker(data) {
                const el = document.createElement("div");
                el.className = (data.type == 1) ? "marker marker--encontrado" : "xmarker marker--perdido";
                if (data.photo) {
                    el.style.backgroundImage = `url(${data.photo})`;
                }
                el.dataset.idPet = data.id;
                el.style.width = data.properties.iconSize[0] ? (data.properties.iconSize[0] + 'px') : '48px';
                el.style.height = data.properties.iconSize[1] ? (data.properties.iconSize[1] + 'px') : '48px';
                el.addEventListener("click",function(e){
                  const { target: { dataset: { idPet }}} = e;
                  const divPet = document.getElementById(idPet);
                  const tabLost = document.getElementById('tab-perdidos') || document.getElementById('tab-encontrados');
                  tabLost.scrollTop = divPet.offsetTop;
                });
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
<style>
    @import "../assets/css/componentes.css";
</style>
