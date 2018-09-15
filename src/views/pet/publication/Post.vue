<template>
    <div class="register">
        <section class="cont cont--register">
            <ul class="register">
                <h2>Informacion de la mascota</h2>
                <div>
                    <form class="form" id="register-form">

                        <div class="form-input">
                            <h3>Foto de la mascota</h3>
                            <img id="preview" src="img/perro1.jpg" alt="">
                            <input type="file" name="photo" placeholder="Foto de la mascota">
                        </div>

                        <div class="form-input">
                            <h4>Caracteristicas</h4>
                            <div class="form-input">
                                <input type="text" name="feature" placeholder="caracteristicas">

                            </div>
                            <div class="form-input">
                                <input type="text" name="latitude" placeholder="latitude">
                            </div>
                            <div class="form-input">
                                <input type="text" name="longitude" placeholder="longitude">

                            </div>
                            <div class="form-input">
                                <input type="text" name="distance" placeholder="distancia">
                            </div>
                        </div>

                        <div class="form-submit">
                            <button class="btn btn-regular">Aceptar</button>
                        </div>
                    </form>
                </div>
            </ul>

        </section>
    </div>
</template>

<script>
  export default {
    name: 'Post',
  };
</script>

<style scoped>

</style>