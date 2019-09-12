<template>
    <div class="modal-hp">
        <div class="modal__box modal--inicio-sesion">
            <div class="modal-body login-modal-body" >
                <div class="LoginUser__sectionImg">
                    <div class="LoginUser__sectionImgCont">
                        <img src="../../assets/img/img-dog.png" alt="helpet inicio de sesion">
                        <span class="LoginUser__sectionImgContSlogan">Inicia sesion y ayuda a una mascota a regresar a su hogar</span>
                    </div>
                </div>
                <div class="LoginUser__sectionLogin">
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
                            <!-- <a href="#">
                                <g-signin-button
                                    :params="googleSignInParams"
                                    @success="onSignInSuccess"
                                    @error="onSignInError">
                                    Iniciar sesion con Google
                                </g-signin-button>
                            </a> -->
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
                            <p>No tienes cuenta ? <router-link to="/registro">Crea una cuenta aqui</router-link></p> 
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
    import GSignInButton from "vue-google-signin-button";


    import Vue from "vue";
    import {mapActions, mapState} from "vuex";

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
                    scope: 'email',
                    return_scopes: true,
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
                oauthLogin: "oauthLogin"
            }),
            async signUp(event) {
                event.preventDefault();
                event.stopPropagation();
                const credentials = this.credentials;
                this.isLoading = true;
                await this.login(credentials);
                this.redirectToMapOrFail();
            },
            closeLogin() {
                this.$emit("onCloseLogin");
            },
/*             onSignInSuccess (googleUser) {
                // `googleUser` is the GoogleUser object that represents the just-signed-in user.
                // See https://developers.google.com/identity/sign-in/web/reference#users
                const profile = googleUser.getBasicProfile() // etc etc
            },
            onSignInError (error) {
                // `error` contains any error occurred.
                console.log('OH NOES', error)
            }, */
            async onSignInFacebookSuccess (response) {
                const info = await new Promise( (resolve, reject) => {
                    FB.api('/me', { fields: 'first_name, last_name, email' },  resolve)
                });
                info.accessToken = response.authResponse.accessToken;
                await this.oauthLogin(info);
                this.redirectToMapOrFail();
            },
            redirectToMapOrFail() {
                if (!this.isAuthenticated) {
                    this.showFailMessage();
                } else {
                    this.isLoading = false;
                    this.$emit("onCloseLogin");
                    this.$router.push("/mapa/encontrados")
                }
            },
            onSignInFacebookError (error) {
                this.showFailMessage();
            },
            showFailMessage() {
                this.$notify({
                    group: "foo",
                    type: "error",
                    title: "INICIO DE SESION",
                    text: "Tu usuario o contraseña son incorrectos  <br> <b>   'Por favor intentelo nuevamente'</b>",
                });
            }
        }
    };
</script>
<style lang="scss">
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

    .LoginUser {
        &__sectionImg {
            width: 40%;
            height: 100%;
            padding: 0;
            background: #009900;

            &Cont{
                border-right: 2px solid var(--color-logo-verde);
                height: 100%;
                padding-top: 60px;

                img {
                    display: block;
                    margin-left: auto;
                    margin-right: auto;
                    width: 55%;
                }

                &Slogan{
                    display: block;
                    font-size: 16px;
                    text-align: center;
                    color: white;
                    padding: 10px;
                }
            }
        }

        &__sectionLogin {
            width: 60%;
            padding: 30px;
        }
    }
</style>