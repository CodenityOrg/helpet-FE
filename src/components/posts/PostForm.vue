<template>
    <div class="PostForm">
        <h3 align="center">Informacion de la mascota</h3>
        <form class="form" id="post-form" >
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
                <input
                    v-validate="'required'"
                    v-model="post.title"
                    type="text"
                    :class="{ 'PostForm__input--invalid': errors.has('titulo') }"
                    name="titulo"
                    placeholder="Titulo"
                />
            </div>
            <div class="form-input">
                <textarea
                    placeholder="Descripcion"
                    style="height: 100px;"
                    v-model="post.description"
                    name="descripcion"
                    id=""
                    cols="30"
                    rows="100"
                />
            </div>
            <div class="form-input">
                <input
                    v-validate="'required'"
                    v-model="post.address"
                    type="text"
                    :class="{ 'PostForm__input--invalid': errors.has('direccion') }"
                    name="direccion"
                    placeholder="Direccion"
                />
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
                <div style="display: flex;">
                    <div class="cleck--flex">
                        <div class="field--input" style="display: flex;">
                            <label>Perdido</label>
                            <input v-validate="'required'" style="margin: 0 15px;" v-model.number="post.type" checked="checked" name="tipo" type="radio" value=0>
                        </div>
                    </div>
                    <div class="cleck--flex">
                        <div class="field--input" style="display: flex;">
                            <label>Encontrado</label>
                            <input v-validate="'required'" style="margin: 0 15px;" v-model.number="post.type" name="tipo" type="radio" value=1>
                        </div>
                    </div>
                    <span>{{ errors.first('tipo') }}</span>
                </div>
            </div>
            <div class="form-submit">
                <BasicButton
                    @click.native="newPost"
                    class="btn btn-regular">
                    Aceptar
                </BasicButton>
            </div>
        </form>
    </div>
</template>
<script>

    import Selectize from "vue2-selectize"
    import { mapActions, mapState } from "vuex";

    import BasicButton from "../basics/BasicButton";
    export default {
        name: "PostForm",
        components: {
            Selectize,
            BasicButton
        },
        created() {
            this.getTags();
        },
        props: {
            marker: {
                type: Object
            }
        },
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
                const isValidateAll = await this.$validator.validateAll();
                debugger
                if (isValidateAll) {
                    this.$emit("toggleLoading");
                    if (this.post.tags.length > 0) {
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
                            this.$router.push("/publicaciones");
                        } else {
                            alert("Necesitas seleccionar una posicion en el mapa");
                        }
                    } else {
                        alert("Necesitas añadir algunas caracteristicas antes de continuar :)")
                    }
                    this.$emit("toggleLoading");
                }
            },
        },
        data: () => ({
            isLoading: false,
            post: {
                title: "",
                description: "",
                address: "",
                tags: [],
                photos: [],
                type: 0
            },
            settings: {
                mode: "multi",
                maxItems: 5,
                create: function(input) {
                    return {
                        value: input,
                        text: input
                    }
                },
                render: {
                    option_create(data, escape) {
                        return '<div style="padding: 10px;" class="create">Añadir <strong>' + escape(data.input) + '</strong>&hellip;</div>';
                    }
                }
            },
            map: {},
            preview: [],
            photos: []
        })
    }
</script>
<style lang="scss">

    .PostForm {
        padding-top: 2em;
        padding-bottom: 2em;
        padding-left: 2em;
        padding-right: 2em;
        flex: 0 0 35%;
        display: flex;
        justify-content: center;
        flex-direction: column;

        form{
            max-width: 400px;
            margin: 0 auto;
            width: 100%;
        }

        input, textarea {
            border: 1px solid #b9b9b9;
            font-size: 14px !important;
        }

        &__input--invalid {
            border-color: #ff4b5c !important;
        }
    }

    @import "~selectize/dist/css/selectize.default.css";

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


</style>
