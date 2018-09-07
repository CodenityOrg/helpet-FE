<template>
    <div class="register">
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

                    </form>
                </div>
            </ul>
        </section>
    </div>
</template>

<script>
export default {
  name: 'RegisterUser',
};
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
        font-family: 'Open Sans', sans-serif;
    }
    a{
        text-decoration: none;
    }
    li{
        list-style: none;
    }
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
    .input--register{
        display: flex;
    }
    .input--register input{
        width: 49%;
    }
    #inputApellido{
        margin:  0 0.4em 0 0;
    }
    figure{
        width: 15em;
        height: 17em;
    }
    figure img{
        width: 100%;
    }
    .form-submit{
        text-align: center;
    }

    .iconos{
        color: white;
    }
    .iconos .fa{
        font-size:  1.5em;
        color: white;
    }
</style>
