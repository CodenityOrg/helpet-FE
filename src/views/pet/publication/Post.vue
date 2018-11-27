<template>
    <div>
        <loading :active.sync="isLoading" />
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
                                <input type="file" name="photo">
                                <figure class="avatar">
                                    <img height="128" width="128" :src='preview'>
                                    <div class="file is-centered">
                                        <label class="file-label">
                                        <input class="file-input" type="file" name="photo" @change="processFile($event)">
                                        <span class="file-cta">
                                            <span class="file-icon">
                                            <i class="fas fa-upload"></i>
                                            </span>
                                            <span class="file-label">
                                            Choose a file…
                                            </span>
                                        </span>
                                        </label>
                                    </div>
                                </figure>
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
                                    v-model="post.tags" 
                                    :settings="settings">
                                    <option 
                                        :key="tag._id"
                                        v-for="tag in tags" 
                                        :value="tag.value">
                                        {{tag.value}}
                                    </option>
                                </selectize>
                            </div>
                            <div class="form-input">
                                <div class="cleck--flex">
                                    <label class="cleck--flex">
                                        <div class="field--input">
                                            <input v-model.number="post.type" checked="checked" name="type" type="radio" value=0>
                                        </div>
                                            <span>Perdido</span>
                                    </label>
                                    <label class="cleck--flex">
                                        <div class="field--input">
                                            <input v-model.number="post.type" name="type" type="radio" value=1>
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
                    @map-click="mapClicked"
                />
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
    import Mapbox from 'mapbox-gl-vue';

    export default {
        name: 'PostForm',
        components: {
            Selectize,
            vueDropzone: vue2Dropzone,
            Mapbox
        },
        computed: {
            ...mapState({
                tags: state => state.pet.tags
            })
        },
        created() {
            this.getTags();    
        },
        methods: {
            ...mapActions({
                getTags: "getTags",
                createPost: "createPost"
            }),
            fileAdded(file) {
                console.log(this.$refs.myVueDropzone)
            },
            processFile (e) {
                this.post.photo = e.target.files[0];
                this.preview = URL.createObjectURL(e.target.files[0]);
            },
            async newPost(e) {
                e.preventDefault();
                this.isLoading = true;
                if (this.marker && this.marker._lngLat) {
                    const post = {
                        ...this.post,
                        photos: this.$refs.myVueDropzone.getAcceptedFiles(),
                        latitude: this.marker._lngLat.lat,
                        longitude: this.marker._lngLat.lng
                    }
                    post.tags = JSON.stringify(post.tags);
                    const formData = new FormData();
                    for (const prop in post) {
                        formData.append(prop, post[prop]);
                    }
                    await this.createPost(formData);
                    this.$router.push("/mapa/perdidos");
                } else {
                    alert("Necesitas seleccionar una posicion en el mapa");
                }
                this.isLoading = false;
            },
            mapInitialized() {

            },
            mapClicked(map, {lngLat: {lng, lat}}) {
                if (this.marker && this.marker.remove) {
                    this.marker.remove();
                    this.marker = null;
                } 
                this.marker = new mapboxgl.Marker(this.genLayoutMarker(), {
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
            genLayoutMarker(){
                let el = document.createElement("div");
                el.className = "marker marker--encontrado";
                el.style.width = '48px';
                el.style.height = '48px';
                return el;
            }
        },
        data() {
            return {
                isLoading: false,
                post: {
                    description: "",
                    address: "",
                    tags: [],
                    photo: "",
                    type: 0
                },
                preview: 'https://st2.depositphotos.com/1798678/5498/v/950/depositphotos_54982011-stock-illustration-dog-silhouette-vector.jpg',
                settings: {
                    mode: "multi",
                    maxItems: 20
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