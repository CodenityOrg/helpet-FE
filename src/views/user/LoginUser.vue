<template>
    <div class="register">
        <section class="cont cont--register">
            <ul class="register">
                <h3>Ingresar</h3>
                <div>
                    <form class="form" id="login-form">
                        <div class="form-input">
                            <input 
                                v-model="credentials.email"
                                type="email" 
                                name="email" 
                                placeholder="Correo"
                            />
                        </div>
                        <div class="form-input">
                            <input 
                                v-model="credentials.password"
                                type="password" 
                                name="password" 
                                placeholder="Contraseña"
                            />
                        </div>
                        <div>
                            <button class="btn btn-regular" @click="signUp">Iniciar sesion</button>
                        </div>
                    </form>
                </div>
            </ul>
        </section>
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
                await this.login(credentials);
                this.$router.push("/mapa/encontrados")
            }
        }
    };
</script>

<style scoped>
    @import "../../assets/css/register.css";
</style>
