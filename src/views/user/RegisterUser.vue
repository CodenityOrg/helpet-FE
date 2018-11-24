<template>
    <div class="register">
        <loading :active.sync="isLoading"
                 :is-full-page="fullPage"></loading>
        <section class="cont cont--register">
            <ul class="register">
                <h3>REGISTRATE</h3>
                <div>
                    <form class="form" id="register-form">
                        <div class="form-input">
                            <input 
                                type="text" 
                                v-model="user.firstName" 
                                name="name" 
                                placeholder="Nombres" />
                        </div>
                        <div class="form-input">
                            <input 
                                type="text" 
                                v-model="user.lastName" 
                                name="lastname"  
                                placeholder="Apellidos" />
                        </div>
                        <div class="form-input">
                            <input 
                                type="phone" 
                                v-model="user.phone" 
                                name="phone" 
                                placeholder="Telefono (Opcional)"/>
                        </div>
                        <div class="form-input">
                            <input 
                                type="email" 
                                v-model="user.email" 
                                name="email" 
                                placeholder="Correo" />
                        </div>
                        <div class="form-input">
                            <input 
                                type="password" 
                                v-model="user.password" 
                                name="password" 
                                placeholder="Contraseña" />
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
            </ul>
            <div class="redes">
                <figure class="figure">
                    <img src="../../assets/img/icon-register.png" alt="icono-register">
                </figure>
                <div class="iconos">
                    <a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a>
                    <a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a>
                    <a href="#"><i class="fa fa-instagram" aria-hidden="true"></i></a>
                </div>
            </div>
        </section>
    </div>
</template>

<script>

    import {mapActions} from "vuex";
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
        methods: {
            ...mapActions({
                registerUser: "registerUser"
            }),
            async register() {
                event.preventDefault();
                event.stopPropagation();
                if (!this.isVerified) {
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
            }
        }
    };
</script>

<style>
    @import "../../assets/css/register.css";
</style>
