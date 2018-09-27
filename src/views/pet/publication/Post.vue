<template>
    <div class="register">
        <section class="cont cont--register">
            <ul class="register">
                <h2>Informacion de la mascota</h2>
                <div>
                    <form class="form" id="register-form">

                        <div class="form-input">
                            <h3>Foto de la mascota</h3>
                            <img id="preview" src="img/perro1.jpg" alt="">
                            <input type="file" name="photo" placeholder="Foto de la mascota">
                        </div>
                        <div class="form-input">
                            <h4>Descripcion</h4>
                            <div class="form-input">
                                <textarea v-model="post.description" name="description" id="" cols="30" rows="10"></textarea>
                            </div>
                        </div>
                        <div class="form-input">
                            <h4>Direccion</h4>
                            <div class="form-input">
                                <input v-model="post.address" type="text" name="address" placeholder="caracteristicas">
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
                                        :value="1">
                                        {{feature.value}}
                                    </option>
                                </selectize>
                                <input type="text" name="features" placeholder="caracteristicas">
                            </div>
                        </div>
                        <div class="form-submit">
                            <button class="btn btn-regular">Aceptar</button>
                        </div>
                    </form>
                </div>
            </ul>

        </section>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Selectize from 'vue2-selectize';
    import { mapActions, mapState } from 'vuex';


    export default {
        name: 'Post',
        components: {
            Selectize
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
                getFeatures: "getFeatures"
            })
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
                }
            }
        }
    };
</script>

<style scoped>
@import "~selectize/dist/css/selectize.default.css";
@import "~selectize/dist/css/selectize.bootstrap3.css";

</style>