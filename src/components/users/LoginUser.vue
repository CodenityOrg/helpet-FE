<template>
    <div class="modal-hp">
        <div class="modal__box modal--inicio-sesion">
            <div class="modal-body login-modal-body" >
                <div class="img-slogan">
                    <div class="img-promo">
                        <img src="../../assets/img/img-dog.png" alt="helpet inicio de sesion">
                        <span class="slogan">Inicia sesion y ayuda a una mascota a regresar a su hogar</span>
                    </div>
                </div>
                <div class="login-form">
                    <form id="login-form">
                        <div class="social-buttons">
                            <a href="#">
                                <fb-signin-button
                                    @success="onSignInFacebookSuccess"
                                    @error="onSignInFacebookError"
                                    :params="fbSignInParams">
                                    Iniciar sesion con Facebook
                                </fb-signin-button>
                            </a>
                            <a href="#">
                                <g-signin-button
                                    :params="googleSignInParams"
                                    @success="onSignInSuccess"
                                    @error="onSignInError">
                                    Iniciar sesion con Google
                                </g-signin-button>
                            </a>
                        </div>
                        <p class="info-message">O usa tu email | <a href="#">Olvidaste tu contraseña?</a> </p>    
                        <div class="form-input font-size-10px" >
                            <input
                                class="login-input"
                                :class="{'error-input': errors.first('email')}"
                                v-validate="'required|email'"
                                v-model="credentials.email"
                                type="email"
                                name="email"
                                placeholder="Email"
                            />
                        </div>
                        <div class="form-input font-size-10px">
                            <input
                                class="login-input"
                                :class="{'error-input': errors.first('password') }"
                                v-validate="'required'"
                                v-model="credentials.password"
                                type="password"
                                name="password"
                                placeholder="Contraseña"
                            />
                        </div>
                        <div class="info-message">
                            <p>No tienes cuenta ? <a href="">Crea una cuenta aqui</a> </p> 
                        </div>
                        <div class="form-submit">
                            <button class="frm--btm login-btn" type="submit" @click="signUp">Iniciar sesion</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import FBSignInButton from "vue-facebook-signin-button";
    import GSignInButton from 'vue-google-signin-button'

    import Vue from "vue";
    import {mapActions,mapState} from "vuex";

    Vue.use(FBSignInButton);
    Vue.use(GSignInButton);
    //client-secret: J1pcDCnmFLWq0M9c7jEMCG0G
    export default {
        name: "LoginUser",
        data() {
            return {
                credentials: {
                    email: "",
                    password: ""
                },
                fbSignInParams: {
                    scope: 'email,user_likes',
                    return_scopes: true
                },
                googleSignInParams: {
                    client_id: '1076081297271-he3s2qr0ob61s4cpbgl0cnj2s5ajpqu7.apps.googleusercontent.com'
                }
            }
        },
        computed: {
            ...mapState({
                isAuthenticated: state => state.auth.authenticated,
            }),
        },
        methods: {
            ...mapActions({
                login: "login",
            }),
            async signUp(event) {
                event.preventDefault();
                event.stopPropagation();
                const credentials = this.credentials;
                this.isLoading = true;
                await this.login(credentials);
                if (!this.isAuthenticated) {
                    this.$notify({
                        group: "foo",
                        type: "error",
                        title: "INICIO DE SESION",
                        text: "Tu usuario o contraseña son incorrectos  <br> <b>   'Por favor intentelo nuevamente'</b>",
                    });
                } else {
                    this.isLoading = false;
                    this.$emit("onCloseLogin");
                    this.$router.push("/mapa/encontrados")
                }
            },
            closeLogin() {
                this.$emit("onCloseLogin");
            },
            onSignInSuccess (googleUser) {
                // `googleUser` is the GoogleUser object that represents the just-signed-in user.
                // See https://developers.google.com/identity/sign-in/web/reference#users
                const profile = googleUser.getBasicProfile() // etc etc
            },
            onSignInError (error) {
                // `error` contains any error occurred.
                console.log('OH NOES', error)
            },
            onSignInFacebookSuccess (response) {
                FB.api('/me', dude => {
                    console.log(`Good to see you, ${dude.name}.`)
                })
            },
            onSignInFacebookError (error) {
                console.log('OH NOES', error)
            }
        }
    };
</script>
<style>
    .fb-signin-button {
        /* This is where you control how the button looks. Be creative! */
        display: inline-block;
        padding: 4px 8px;
        border-radius: 3px;
        background-color: #4267b2;
        color: #fff;
        width: 100%;
        text-align: center;
        margin-top: 10px;
    }

    .g-signin-button {
        /* This is where you control how the button looks. Be creative! */
        display: inline-block;
        padding: 4px 8px;
        border-radius: 3px;
        background-color: #3c82f7;
        color: #fff;
        box-shadow: 0 3px 0 #0f69ff;
        text-align: center;
        width: 100%;
        margin-top: 10px;
    }
</style>

