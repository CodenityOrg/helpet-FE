<template>
    <div class="modal-hp">
        <div class="modal__box modal--inicio-sesion">
            <div class="modal-header">
                <h3 class="titulo"></h3>
                <button 
                    type="button" 
                    class="btnCerrarModal" 
                    @click="closeLogin">
                    X
                </button>
            </div>
            <div class="modal-body">
                <div class="col-6 img-promo">
                    <img src="../../assets/img/img-dog.png" alt="helpet inicio de sesion">
                    <span class="slogan">Ayudalo a ser encontrado y encuentra a tu mascota</span>
                </div>
                <form id="login-form" class="col-6" action="">
                    <h3 class="titulo">INICIAR</h3>
                    <div class="form-input">
                        <label for="inputEmail">Correo</label>
                        <input
                            v-validate="'required|email'"
                            v-model="credentials.email"
                            type="email"
                            name="email"
                            placeholder="Correo"
                        />
                        <span>{{ errors.first('email') }}</span>
                    </div>

                    <div class="form-input">
                        <label for="inputPassword">Contraseña</label>
                        <input
                            v-validate="'required'"
                            v-model="credentials.password"
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                        />
                        <span>{{ errors.first('password') }}</span>
                    </div>
                    <div class="form-submit">
                        <button class="frm--btm" type="submit" @click="signUp">Iniciar sesion</button>
                    </div>
                </form>

            </div>
        </div>


    </div>
</template>

<script>
    import {mapActions,mapState} from "vuex";
    export default {
        name: 'LoginUser',
        data() {
            return {
                credentials: {
                    email: "",
                    password: ""
                }
            }
        },
        computed: {
          ...mapState({
              isAuthenticated: state => state.auth.authenticated
          }),
        },
        methods: {
            ...mapActions({
                login: "login"
            }),
            async signUp() {
                event.preventDefault();
                event.stopPropagation();
                const credentials = this.credentials;
                this.isLoading = true;
                let result = await this.login(credentials);
                if (!this.isAuthenticated) {
                  this.$notify({
                     group: 'foo',
                     type: 'error',
                     title: 'INICIO DE SESION',
                     text: 'Tu usuario o contraseña son incorrectos  <br> <b>   "Por favor intentelo nuevamente"</b>',
                  });
                } else {
                  this.isLoading = false;
                  this.closeLogin();    
                  this.$router.push("/mapa/encontrados")
                }
            },
            closeLogin() {
                this.$emit('onCloseLogin');
            }
        }
    };
</script>
