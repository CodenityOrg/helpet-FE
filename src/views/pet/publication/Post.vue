<template>
    <div class="register">
        <section class="cont cont--inicio">
        <!-- inicio de formulario -->
            <div class="cont--formulario">
                <form id="post-form">
                    <ul class="register">
                        <h2>Informacion de la mascota</h2>
                        <div>
                            <form class="form" id="register-form">
                                <div class="form-input">
                                    <h3>Foto de la mascota</h3>
                                    <vue-dropzone 
                                        ref="myVueDropzone" 
                                        id="dropzone" 
                                        @vdropzone-file-added="fileAdded"
                                        :options="dropzoneOptions" />
                                </div>
                                <div class="form-input">
                                    <h4>Descripcion</h4>
                                    <div class="form-input">
                                        <textarea
                                            style="height: 100px;"
                                            v-model="post.description" 
                                            name="description" 
                                            id="" 
                                            cols="30" 
                                            rows="100"
                                            ></textarea>
                                    </div>
                                </div>
                                <div class="form-input">
                                    <h4>Direccion</h4>
                                    <div class="form-input">
                                        <input v-model="post.address" type="text" name="address" placeholder="Direccion">
                                    </div>
                                </div>
                                <div class="form-input">
                                    <h4>Caracteristicas</h4>
                                    <div class="form-input">
                                        <selectize 
                                            v-model="post.features" 
                                            :settings="settings">
                                            <option 
                                                :key="feature._id"
                                                v-for="feature in features" 
                                                :value="feature.value">
                                                {{feature.value}}
                                            </option>
                                        </selectize>
                                    </div>
                                </div>
                                <div class="form-submit">
                                    <button @click="newPost" class="btn btn-regular">Aceptar</button>
                                </div>
                            </form>
                        </div>
                    </ul>
                </form>
            </div>
        <!-- Final de formulario -->
        <!-- Inicio del mapa -->
            <div class="cont--mapa">
                <googlemaps-map
                    :center="mapOptions.center"
                    :zoom="mapOptions.zoom"
                    @click="mapClicked"
                    :options="mapOptions" >

                    <googlemaps-marker
                        :label="{
                            fontFamily: 'Material Icons',
                            fontSize: '20px',
                        }"
                        :position="marker.position"
                    />
                </googlemaps-map>

            </div>
        <!-- Final del mapa -->
        </section>

    </div>
</template>

<script>
    import Vue from 'vue'
    import Selectize from 'vue2-selectize'
    import { mapActions, mapState } from 'vuex';
    import vue2Dropzone from 'vue2-dropzone'
    import 'vue2-dropzone/dist/vue2Dropzone.min.css'
    import _ from "lodash";

    export default {
        name: 'Post',
        components: {
            Selectize,
            vueDropzone: vue2Dropzone
        },
        computed: {
            ...mapState({
                features: state => state.pet.features
            })
        },
        created() {
            this.getFeatures();
        },
        methods: {
            ...mapActions({
                getFeatures: "getFeatures",
                createPost: "createPost"
            }),
            fileAdded(file) {
                console.log(this.$refs.myVueDropzone)
            },
            async newPost(e) {
                e.preventDefault();
                
                const post = {
                    ...this.post,
                    photos: this.$refs.myVueDropzone.getAcceptedFiles(),
                    latitude: this.marker.position.lat(),
                    longitude: this.marker.position.lng()
                }
                await this.createPost(post);
            },
            mapClicked(e) {
                const lat = e.latLng.lat();
                const lng = e.latLng.lng();

                this.marker = {
                    position: new google.maps.LatLng(lat, lng)
                };
            }
        },
        data() {
            return {
                post: {
                    description: "",
                    address: "",
                    features: []
                },
                settings: {
                    mode: "multi",
                    maxItems: 5
                },
                dropzoneOptions: {
                    url: 'https://httpbin.org/post',
                    thumbnailWidth: 150,
                    maxFilesize: 0.5,
                    headers: { "My-Awesome-Header": "header value" }
                },
                mapOptions: {
                    zoom: 14,
                    center: new google.maps.LatLng(-18.013611, -70.252769),
                },
                marker: {}
            }
        }
    };
</script>

<style scoped>
@import "~selectize/dist/css/selectize.default.css";
@import "~selectize/dist/css/selectize.bootstrap3.css";

</style>