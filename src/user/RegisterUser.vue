<template>
    <div class="register">
        <!-- INICIO del menu -->
        <nav class="navbar">
            <div class="navbar__logo">
                <a href="/">
                    <img src="img/ico-logo.png" alt="logo helpet">
                </a>
            </div>
            <ul class="navbar__menu">
                <li>
                    <button type="button" id="start-login">Inicia</button>
                </li>
                <li>
                    <a href="/registro">Regístrate</a>
                </li>
            </ul>
        </nav>
        <!-- FIN del menu -->
        <!-- INICIO cuerpo -->
        <section class="cont cont--register">
            <ul class="register">
                <h3>REGISTRATE</h3>
                <div>
                    <form class="form" id="register-form">
                        <div class="form-input">
                            <input type="text" name="name" placeholder="Nombres" >
                        </div>
                        <div class="form-input">
                            <input type="text" name="lastname"  placeholder="Apellidos" >
                        </div>
                        <div class="form-input">
                            <input type="phone" name="phone" placeholder="Telefono (Opcional)">
                        </div>
                        <div class="form-input">
                            <input type="email" name="email" placeholder="Correo">
                        </div>
                        <div class="form-input">
                            <input type="password" name="password" placeholder="Contraseña">
                        </div>
                        <div id="recaptcha" class="g-recaptcha"></div>
                        <div class="form-submit">
                            <button class="btn btn-regular" type="submit">Aceptar</button>
                        </div>

                    </form>
                </div>
            </ul>
            <div class="redes">
                <figure class="figure">
                    <img src="../assets/img/icon-register.png" alt="icono-register">
                </figure>
                <div class="iconos">
                    <a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a>
                    <a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a>
                    <a href="#"><i class="fa fa-instagram" aria-hidden="true"></i></a>
                </div>
            </div>
        </section>
        <!-- FIN del cuerpo -->
    </div>
</template>

<script>
export default {
  name: 'RegisterUser',
};
</script>

<style scoped>

</style>
