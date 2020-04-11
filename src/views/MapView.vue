<template>
    <div class="MapView cont cont--start">
        <div class="MapView__PostList cont--cards">
            <router-link v-if="isAuthenticated" :to="{name : 'RegisterPostPet'}">
                <BasicButton
                    class="MapView__PostListCreateButton"
                >
                    {{$t('publications.newPost')}}
                </BasicButton>
            </router-link>
            <PostsListFilters />
            <PostListSelected />
            <PostsList
                :filters="filters"
            />
        </div>
        <div class="MapView__PostMap cont--map">
            <Map
                @init="mapInitialized"
                :location="currentLocation"
            />
        </div>
        <notifications
            style="margin-top: 80px;"
            group="foo"
            position='top center'
        />
    </div>
</template>

<script>
    /* eslint-disable */
    import { mapGetters, mapState } from "vuex";
    import mapMixin from "./mixins/map";
    import Map from "../components/common/Map";
    import PostsList from "../components/posts/PostsList";
    import PostsListFilters from "../components/posts/PostsListFilters";
    import PostListSelected from "../components/posts/PostsListFIltersSelected";
    import BasicButton from "../components/basics/BasicButton";
    import store from 'store';

    export default {
        name: "MapView",
        mixins: [mapMixin],
        components: {
            Map,
            PostsList,
            PostsListFilters,
            PostListSelected,
            BasicButton
        },
        mounted() {
            const self = this;
            if (window.innerWidth > 650) {
                self.showDetectLocationAlert();
            }
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
                    title: this.$t('publications.mapAlert'),
                });
            }
        },
        computed: {
            ...mapState({
                filters: state => state.pet.filters,
                isAuthenticated: state => state.auth.authenticated
            }),
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
            },
            currentLocation() {
                const {longitude = 0, latitude = 0} = store.get('location') || {};
                return [longitude, latitude];
            }
        }
    };

</script>
<style lang="scss">
    @import url("https://api.tiles.mapbox.com/mapbox-gl-js/v1.9.1/mapbox-gl.css");

    .MapView {
        display: flex;

        &__PostList{
            &CreateButton{
                width: 250px;
                color: white;
                text-decoration: none;

                a:link{
                    color: white;
                }

                a:visited{
                    color: white;
                }
            }
        }

        &__PostMap{
            flex: 1;
        }
    }
</style>
