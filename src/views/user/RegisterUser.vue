<template>
    <div class="register">
        <section class="cont cont--register">
            <ul class="register">
                <h3>REGISTRATE</h3>
                <div>
                    <form class="form" id="register-form">
                        <div class="form-input">
                            <input type="text" v-model="user.name" name="name" placeholder="Nombres" >
                        </div>
                        <div class="form-input">
                            <input type="text" v-model="user.lastname" name="lastname"  placeholder="Apellidos" >
                        </div>
                        <div class="form-input">
                            <input type="phone" v-model="user.phone" name="phone" placeholder="Telefono (Opcional)">
                        </div>
                        <div class="form-input">
                            <input type="email" v-model="user.email" name="email" placeholder="Correo">
                        </div>
                        <div class="form-input">
                            <input type="password" v-model="user.password" name="password" placeholder="Contraseña">
                        </div>
                        <div class="form-submit">
                            <button class="btn btn-regular" @click="register" >Aceptar</button>
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

    export default {
        name: "RegisterUser",
        data() {
            return {
                user: {}
            }
        },
        methods: {
            ...mapActions({
                registerUser: "registerUser"
            }),
            async register() {
                debugger

                event.preventDefault();
                event.stopPropagation();
                const user = this.user;
                await this.registerUser(user);
            }
        }
    };
</script>

<style>
    @import "../../assets/css/register.css";
</style>
