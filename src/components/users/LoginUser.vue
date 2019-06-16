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
                            <fb-signin-button
                                :params="fbSignInParams">
                                Iniciar sesion con Facebook
                            </fb-signin-button>
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
    import Vue from "vue";
    import {mapActions,mapState} from "vuex";

    Vue.use(FBSignInButton);

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
    }
</style>

