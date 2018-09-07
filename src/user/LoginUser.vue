<template>
    <div class="register">
        <section class="cont cont--register">
            <ul class="register">
                <h3>Ingresar</h3>
                <div>
                    <form class="form" id="login-form">
                        <div class="form-input">
                            <input type="email" name="email" placeholder="Correo">
                        </div>
                        <div class="form-input">
                            <input type="password" name="password" placeholder="Contraseña">
                        </div>
                    </form>
                </div>
            </ul>
        </section>
    </div>
</template>

<script>
export default {
  name: 'LoginUser',
};
</script>

<style scoped>
    @import "../assets/css/register.css";
</style>
