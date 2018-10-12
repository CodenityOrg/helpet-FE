<template>
    <div>
        <section class="cont cont--inicio">
        <!-- inicio de formulario -->
            <div class="cont--formulario">
                <form id="post-form">
                    <h3 align="center">Informacion de la mascota</h3>
                    <div>
                        <form class="form" id="register-form">
                            <div class="form-input">
                                <vue-dropzone 
                                    ref="myVueDropzone" 
                                    id="dropzone" 
                                    @vdropzone-file-added="fileAdded"
                                    :options="dropzoneOptions">
                                </vue-dropzone>
                            </div>
                            <div class="form-input">
                                <textarea
                                    placeholder="Descripcion"
                                    style="height: 100px;"
                                    v-model="post.description" 
                                    name="description" 
                                    id="" 
                                    cols="30" 
                                    rows="100"
                                    />
                            </div>
                            <div class="form-input">
                                <input v-model="post.address" type="text" name="address" placeholder="Direccion">
                            </div>
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
                            <div class="form-input">
                                <div class="cleck--flex">
                                    <label class="cleck--flex">
                                        <div class="field--input">
                                            <input v-model="post.type" checked name="type" type="radio" value="0">
                                        </div>
                                            <span>Perdido</span>
                                    </label>
                                    <label class="cleck--flex">
                                        <div class="field--input">
                                            <input v-model="post.type" name="type" type="radio" value="1">
                                        </div>
                                            <span>Encontrado</span>
                                    </label>
                                </div>
                            </div>
                            <div class="form-submit">
                                <button 
                                    @click="newPost" 
                                    class="btn btn-regular">
                                    Aceptar
                                </button>
                            </div>
                        </form>
                    </div>
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
        name: 'PostForm',
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

                if (this.marker && this.marker.position) {
                    const post = {
                        ...this.post,
                        photos: this.$refs.myVueDropzone.getAcceptedFiles(),
                        latitude: this.marker.position.lat(),
                        longitude: this.marker.position.lng()
                    }
                    await this.createPost(post);
                    this.$router.push("/mapa/perdidos");
                } else {
                    alert("Necesitas seleccionar una posicion en el mapa");
                }
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
                    features: [],
                    type: ""
                },
                settings: {
                    mode: "multi",
                    maxItems: 5
                },
                dropzoneOptions: {
                    url: 'https://httpbin.org/post',
                    thumbnailWidth: 150,
                    maxFilesize: 0.5,
                    dictDefaultMessage: "Haga click aqui or arrastre un archivo",
                    dictFileTooBig: "La imagen es demasiado grande ({{filesize}}MiB). Tamaño de la imagen maxima: {{maxFilesize}}MiB."
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