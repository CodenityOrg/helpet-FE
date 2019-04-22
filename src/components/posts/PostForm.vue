<template>
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
                                    <img style="margin: 5px;" width="200px" height="200px" :src="image" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-input">
                        <span @click="openFileSelector" class="btn btn-default btn-file">
                            Seleccionar Imagen 
                        </span>
                        <input
                            class="frm--btm"
                            type="file"
                            accept="image/*"
                            max="3"
                            ref="fileSelector"
                            multiple="multiple"
                            v-on:change="filePreview" hidden/>
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
</template>
<script>

    import Selectize from "vue2-selectize"
    import { mapActions, mapState } from "vuex";
    import _ from "lodash";

    export default {
        name: "PostForm",
        components: {
            Selectize
        },
        created() {
            this.getTags();
        },
        props: ["marker"],
        computed: {
            ...mapState({
                tags: state => state.pet.tags
            })
        },
        methods: {
            ...mapActions({
                getTags: "getTags",
                createPost: "createPost",
                previewPhotos: "previewPhotos",
            }),
            openFileSelector() {
                this.$refs.fileSelector.click();
            },
            filePreview(e) {
                const photos = e.target.files;
                for (const photo of photos) {
                    const reader = new FileReader();
                    reader.addEventListener('load', () => {
                        this.preview.push(reader.result);
                    });
                    reader.readAsDataURL(photo);
                }
                this.photos = photos;
            },
            async newPost(e) {
                e.preventDefault();
                this.$emit("toggleLoading");
                if (this.marker && this.marker._lngLat) {
                    const post = {
                        ...this.post,
                        photo: [...this.photos][0],
                        latitude: this.marker._lngLat.lat,
                        longitude: this.marker._lngLat.lng
                    }
                    post.tags = JSON.stringify(post.tags);
                    const formData = new FormData();
                    for (const prop in post) {
                        formData.append(prop, post[prop]);
                    }
                    try {
                        await this.createPost(formData);
                    } catch (error) {
                        console.log(error);
                        this.$emit("toggleLoading");
                    }
                    this.$router.push("/mapa/perdidos");
                } else {
                    alert("Necesitas seleccionar una posicion en el mapa");
                }
                this.$emit("toggleLoading");
            },
        },
        data: () => ({
            isLoading: false,
            post: {
                description: "",
                address: "",
                tags: [],
                photos: [],
                type: 0
            },
            settings: {
                mode: "multi",
                maxItems: 20
            },
            map: {},
            preview: [],
            photos: []
        })
    }
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
        overflow:auto;
        max-width: 360px;
        max-height: 500px;
    }
    .grid-item {

    }
</style>