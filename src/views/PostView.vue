<template>
    <div>
        <loading :active.sync="isLoading" />
        <b-row>
            <b-col md="4" class="cont cont--inicio">
                <PostForm
                    @toggleLoading="toggleLoading"
                    :marker="marker"
                />

            </b-col>
            <b-col md="8">
                <PostMap
                    @init="mapInitialized"
                    @clicked="mapClicked"
                />
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import mapMixin from "./mixins/map";
    import PostForm from "../components/posts/PostForm";

    export default {
        name: "PostView",
        mixins: [mapMixin],
        components: {
            PostForm
        },
        data: () => ({
            marker: {}
        }),
        methods: {
            mapClicked(map, {lngLat: {lng, lat}}) {
                if (this.marker && this.marker.remove) {
                    this.marker.remove();
                    this.marker = null;
                }
                this.marker = new mapboxgl.Marker(this.genEmptyMarker(), {
                    offset: [-24, -24]
                })
                .setLngLat(
                    [
                        lng,
                        lat
                    ]
                )
                .addTo(map);
            },
            genEmptyMarker(){
                const el = document.createElement("div");
                el.className = "marker marker--encontrado";
                el.style.width = '48px';
                el.style.height = '48px';
                return el;
            },
            toggleLoading() {
                this.isLoading = !this.isLoading;
            }
        }
    };
</script>

