<template>
    <div class="register">
        <loading :active.sync="isLoading"
            :is-full-page="fullPage"></loading>
        <section class="cont cont--register">
            <b-row>
                <b-col md="8">
                    <div class="register">
                        <h3>REGISTRATE</h3>
                        <form class="form" id="register-form">
                            <div class="form-input">
                                <input
                                    v-validate="'required|alpha'"
                                    type="text"
                                    v-model="user.firstName"
                                    name="name"
                                    placeholder="Nombres" />
                                <span>{{ errors.first('name') }}</span>
                            </div>
                            <div class="form-input">
                                <input
                                    v-validate="'required|alpha'"
                                    type="text"
                                    v-model="user.lastName"
                                    name="lastname"
                                    placeholder="Apellidos" />
                                <span>{{ errors.first('lastname') }}</span>
                            </div>
                            <div class="form-input">
                                <input
                                    v-validate="'required|numeric'"
                                    type="phone"
                                    v-model="user.phone"
                                    name="phone"
                                    placeholder="Telefono (Opcional)"/>
                                <span>{{ errors.first('phone') }}</span>
                            </div>
                            <div class="form-input">
                                <input type="email"
                                    v-validate="'required|email'"

                                    v-model="user.email"
                                    name="email"
                                    @keyup="changeValidate"
                                    placeholder="Correo" />
                                    <div class="validate" :v-if="validate">{{ this.validateEmail.validate.message }}</div>
                            </div>
                            <div class="form-input">
                                <input
                                    type="password"
                                    v-model="user.password"
                                    name="password"
                                    placeholder="Contraseña" />
                                <span>{{ errors.first('password') }}</span>
                            </div>
                            <div>
                                <vue-recaptcha
                                    @verify="verify"
                                    sitekey="6Ld2lDMUAAAAAAANVdV6YEsvi8xehx9NmXK8Ce8a">
                                </vue-recaptcha>
                            </div>
                            <div class="form-submit">
                                <button v-if="isVerified" class="btn btn-regular" @click="register" >Aceptar</button>
                            </div>
                        </form>
                    </div>
                </b-col>
                <b-col md="4">
                    <div class="redes">
                        <figure class="figure">
                            <img src="../assets/img/icon-register.png" alt="icono-register">
                        </figure>
                        <div class="iconos">
                            <a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a>
                            <a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a>
                            <a href="#"><i class="fa fa-instagram" aria-hidden="true"></i></a>
                        </div>
                    </div>
                </b-col>
            </b-row>
        </section>
        <notifications group="foo" position='bottom right' />

    </div>
</template>

<script>

    import { mapActions, mapState } from "vuex";
    import VueRecaptcha from 'vue-recaptcha';

    export default {
        name: "RegisterUser",
        data() {
            return {
                user: {},
                isVerified: false
            }
        },
        mounted() {
            const recaptchaScript = document.createElement('script')
            recaptchaScript.setAttribute('src', 'https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit')
            document.head.appendChild(recaptchaScript)
        },
        components: { VueRecaptcha },
        computed: {
            ...mapState({
                validateEmail: state => state.user,
            }),
        },
        methods: {
            ...mapActions({
                registerUser: "registerUser",
                validate: "validate",
            }),
            async register(event) {
                event.preventDefault();
                event.stopPropagation();
                if (this.isVerified) {
                    const user = this.user;
                    this.isLoading = true;
                    await this.registerUser(user);
                    this.isLoading = false;
                    this.$router.push("/mapa/encontrados")
                }
            },
            verify(response) {
                this.isVerified = !!response;
            },
            expired() {
                this.isVerified = false;
            },
            changeValidate(){
              this.validate({ email: this.user.email });
            },
        }
    };
</script>

<style>
    @import "../assets/css/register.css";
</style>
