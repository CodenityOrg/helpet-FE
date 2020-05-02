<template>
    <div class="register">
        <loading :active.sync="isLoading"
            :is-full-page="fullPage"></loading>
        <section class="cont cont--register">
            <b-row>
                <b-col md="8">
                    <div class="register">
                        <h3>{{$t('register.title')}}</h3>

                        <SocialButtons
                            @onSuccess="onSuccess"
                        >
                            {{$t('register.fbButton')}}
                        </SocialButtons>
                        <p style="margin: 10px;">{{$t('register.otherOptionText')}}</p>
                        <form class="form" id="register-form">
                            <div class="form-input">
                                <input
                                    :class="{ 'invalid': errors.has('Nombres') }"
                                    type="text"
                                    v-model="user.firstName"
                                    name="first-name"
                                    :placeholder="$t('register.placeholders.name')" />
                            </div>
                            <div class="form-input">
                                <input
                                    :class="{ 'invalid': errors.has('Apellidos') }"
                                    type="text"
                                    v-model="user.lastName"
                                    name="last-name"
                                    :placeholder="$t('register.placeholders.lastName')" />
                            </div>
                            <div class="form-input">
                                <input
                                    :class="{ 'invalid': errors.has('Telefono') }"
                                    v-validate="'numeric'"
                                    type="phone"
                                    v-model="user.phone"
                                    name="phone"
                                    :placeholder="$t('register.placeholders.phone')"/>
                            </div>
                            <div class="form-input">
                                <input
                                    type="email"
                                    :class="{ 'invalid': errors.has('email') || !this.validateEmail.validate }"
                                    v-validate="'required|email'"
                                    v-model="user.email"
                                    name="mail"
                                    :placeholder="$t('register.placeholders.email')" />
                            </div>
                            <div class="form-input">
                                <input
                                    type="password"
                                    v-model="user.password"
                                    name="password"
                                    :placeholder="$t('register.placeholders.password')" />
                                <span>{{ errors.first('password') }}</span>
                            </div>
                            <div>
                                <!-- TODO: Move API Key to .env file -->
                                <vue-recaptcha
                                    @verify="verify"
                                    sitekey="6Ld2lDMUAAAAAAANVdV6YEsvi8xehx9NmXK8Ce8a">
                                </vue-recaptcha>
                            </div>
                            <div class="mt-2 mb-2">
                                <b-form-checkbox
                                    id="terms"
                                    v-model="acceptedTerms"
                                    name="terms"
                                >
                                    {{$t('terms.beforeContent')}} <router-link :to="{ name: 'Terms' }">{{$t('terms.afterContent')}}</router-link>
                                </b-form-checkbox>
                            </div>
                            <div class="form-submit">
                                <button v-if="isVerified && acceptedTerms && this.validateEmail.validate" class="btn btn-regular" @click="register" >Aceptar</button>
                            </div>
                        </form>
                    </div>
                </b-col>
                <b-col class="img-register" md="4">
                    <div class="net">
                        <figure class="figure">
                            <img src="../assets/img/icon-register.png" width="240px" height="240px" alt="icono-register">
                        </figure>
                        <div class="icons">
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
    import SocialButtons from "../components/common/SocialButtons";
    import {debounce} from 'lodash';
    import userAPI from '../api/user';

    export default {
        name: "RegisterUser",
        data() {
            return {
                user: {},
                isVerified: false,
                acceptedTerms: false,
            }
        },
        mounted() {
            const recaptchaScript = document.createElement('script')
            recaptchaScript.setAttribute('src', 'https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit')
            document.head.appendChild(recaptchaScript)
        },
        components: {
            VueRecaptcha,
            SocialButtons
        },
        computed: {
            ...mapState({
                validateEmail: state => state.user.validate,
            })
        },
        watch: {
            'user.email': {
                handler(value, oldValue) {
                    this.validateDebounced();
                },
                deep: true,
            }
        },
        methods: {
            ...mapActions({
                registerUser: "registerUser",
                updateToken: "updateToken"
            }),
            async register(event) {
                event.preventDefault();
                event.stopPropagation();
                const isValidateAll = await this.$validator.validateAll();
                if (this.user.firstName && this.user.lastName && isValidateAll && this.isVerified && this.validateEmail.validate) {
                    const user = this.user;
                    this.isLoading = true;
                    await this.registerUser(user);
                    const id = await this.$socket.id;
                    await this.updateToken(id);
                    this.isLoading = false;
                    this.$router.push("/publicaciones")
                } else {
                    alert("Completa los datos antes de continuar :)");
                }
            },
            async onSuccess() {
                const id = await this.$socket.id;
                await this.updateToken(id);
                this.$router.push("/publicaciones")
            },
            verify(response) {
                this.isVerified = !!response;
            },
            expired() {
                this.isVerified = false;
            },
            async validate(email) {
                const { status, data: user} = await userAPI.validate(email);
                if (status === 200) {
                    this.$store.commit("VALIDATE", user);
                }
            }
        },
        created() {
            this.validateDebounced = debounce(() => this.validate(this.user.email), 200);
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
