<template>
    <div>
        <loading :active.sync="isLoading" />
        <b-row>
                <!-- inicio de formulario -->
            <b-col md="4" class="cont cont--inicio">
                <div class="cont--formulario">
                    <form id="post-form">
                        <h3 align="center">Informacion de la mascota</h3>
                        <div>
                            <form class="form" id="register-form">
                                <div class="form-input">
                                    <div class="grid-container">
                                        <div 
                                            :key="idx"
                                            v-for="(image, idx) in preview">
                                            <div class="grid-item">
                                                <img width="50px" height="50px" :src="image" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-input">
                                    <span class="btn btn-default btn-file">
                                        Seleccionar Imagen 
                                        <input
                                            class="frm--btm"
                                            type="file"
                                            multiple="multiple"
                                            v-on:change="filePreview" hidden/>
                                    </span>
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
    import Vue from 'vue'
    import Selectize from 'vue2-selectize'
    import { mapActions, mapState } from 'vuex';
    import _ from "lodash";
    import mapMixin from "./common/map";

    export default {
        name: 'PostForm',
        mixins: [mapMixin],
        components: {
            Selectize
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
                createPost: "createPost",
                previewPhotos: "previewPhotos",
            }),
            filePreview(e) {
              this.photos = [];
              const img = e.target.files;
              for (var i=0; i < img.length; i++){
                  this.photos.push(img[i]);
              }
              for (var i=0; i<this.photos.length; i++){
                  let reader = new FileReader();
                  reader.addEventListener('load', () => {
                    this.preview.push(reader.result);
                  });
                  reader.readAsDataURL(this.photos[i]);
              }
            },
            fileAdded(file) {
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
                marker: {},
                map: {},
                preview: [],
                photos: []
            }
        }
    };
</script>

<style scoped>
@import "~selectize/dist/css/selectize.default.css";
@import "~selectize/dist/css/selectize.bootstrap3.css";
.btn-file {
    position: relative;
    overflow: hidden;
    border: none;
    border-radius: 2px;
    color: white;
    cursor: pointer;
    padding: 0.5em 2em;
    font-size: 0.8em;
    line-height: 2em;
    margin-top: 2em;
    margin-bottom: 2em;
    margin-left: auto;
    margin-right: auto;
    display: block;
    text-align: center;
    background: var(--color-logo-verde);
}
.btn-file input[type=file] {
    position: absolute;
    top: 0;
    right: 0;
    min-width: 100%;
    min-height: 100%;
    font-size: 100px;
    text-align: right;
    filter: alpha(opacity=0);
    opacity: 0;
    outline: none;
    background: white;
    cursor: inherit;
    display: block;
}
.grid-container {
    display: grid;
    grid-template-columns: auto auto auto auto auto;
}
.grid-item {

}
</style>
