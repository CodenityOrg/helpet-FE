<template>
    <div class="modal">
        <div class="modal__box modal--inicio-sesion">
            <div class="modal-header">
                <h3 class="titulo"></h3>
                <button type="button" class="btnCerrarModal" @click="$emit('onCloseLogin')">
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
                            v-model="credentials.email"
                            type="email" 
                            name="email" 
                            placeholder="Correo"
                        />
                    </div>

                    <div class="form-input">
                        <label for="inputPassword">Contraseña</label>
                        <input 
                            v-model="credentials.password"
                            type="password" 
                            name="password" 
                            placeholder="Contraseña"
                        />
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
    import {mapActions} from "vuex";
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
        methods: {
            ...mapActions({
                login: "login"
            }),
            async signUp() {
                event.preventDefault();
                event.stopPropagation();
                const credentials = this.credentials;
                this.isLoading = true;
                await this.login(credentials);
                this.isLoading = false;
                debugger
                this.$emit('onCloseLogin');
                this.$router.push("/mapa/encontrados")
            }
        }
    };
</script>