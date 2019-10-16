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
                                    :class="{ 'invalid': errors.has('Nombres') }"
                                    v-validate="'required'"
                                    type="text"
                                    v-model="user.firstName"
                                    name="Nombres"
                                    placeholder="Nombres" />
                            </div>
                            <div class="form-input">
                                <input
                                    :class="{ 'invalid': errors.has('Apellidos') }"
                                    v-validate="'required'"
                                    type="text"
                                    v-model="user.lastName"
                                    name="Apellidos"
                                    placeholder="Apellidos" />
                            </div>
                            <div class="form-input">
                                <input
                                    :class="{ 'invalid': errors.has('Telefono') }"
                                    v-validate="'numeric'"
                                    type="phone"
                                    v-model="user.phone"
                                    name="Telefono"
                                    placeholder="Telefono (Opcional)"/>
                            </div>
                            <div class="form-input">
                                <input
                                    type="email"
                                    :class="{ 'invalid': errors.has('email') || !this.validateEmail.validate }"
                                    v-validate="'required|email'"
                                    v-model="user.email"
                                    name="email"
                                    @keyup="changeValidate"
                                    placeholder="Correo" />
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
                                <button v-if="isVerified && this.validateEmail.validate" class="btn btn-regular" @click="register" >Aceptar</button>
                            </div>
                        </form>
                    </div>
                </b-col>
                <b-col class="img-register" md="4">
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
                validateEmail: state => state.user.validate,
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
                const isValidateAll = await this.$validator.validateAll();
                if (isValidateAll && this.isVerified && this.validateEmail.validate) {
                    const user = this.user;
                    this.isLoading = true;
                    await this.registerUser(user);
                    this.isLoading = false;
                    this.$router.push("/publicaciones")
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
    @media (max-width: 650px) {
        .img-register {
            display: none;
        }
    }
</style>
