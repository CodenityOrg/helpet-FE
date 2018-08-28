<template>
    <div class="register">
        <!-- INICIO del menu -->
        <!-- FIN del menu -->
        <!-- INICIO cuerpo -->
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
        <!-- FIN del cuerpo -->
    </div>
</template>

<script>
export default {
  name: 'LoginUser',
};
</script>

<style scoped>
    .register h3{
        margin:  0 0 1em 0;
        font-size: 1.7em;
    }
    .cont--register{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
    }
    .cont-register .cont-df {
        /*display: flex;*/
        /*justify-content: center;*/
        /*align-content: center;*/
    }
    .register{
        color: white;
        margin: 0;
        text-align: center;
        position: absolute;
        top: 0px;
        right: 0px;
        width: 30%;
        height: auto;
        border: 3px solid #73AD21;
        /*display: inline-block;*/
        /*width: 40%;*/
    }
</style>
