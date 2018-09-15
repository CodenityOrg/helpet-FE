<template>
    <div class="container-post">
        <div class="modal-post" id="modal-post">
            <form id="post-form" class="modal-content" action="" method="post">
                <div class="info-dog">

                    <div class="header-dog">
                        <h2>Información</h2>
                        <div class="dog-close" id="close-post">X</div>
                    </div>
                    <div class="body-dog">
                        <div class="photos-dog">
                            <div class="photo1"><img id="preview" src="img/perro1.jpg" alt=""></div>
                            <input id="files" type="file" name="photo" value=""
                                   onchange="">
                        </div>
                        <div class="details-dog">
                            <p>Caracteristicas</p>
                            <input type="text" name="feature" class="selectize-input" placeholder="caracteristicas">
                            <input type="text" name="latitude" placeholder="latitude">
                            <input type="text" name="longitude" placeholder="longitude">
                            <input type="text" name="distance" placeholder="distancia">
                            <div class="caract"></div>
                            <p>Mapa</p>
                            <div id="mapPost" style="height:150px"></div>
                            <div class="btns-check">
                                <input type="checkbox" name="type1" value="1"><label for="">Recompensa</label>
                                <input type="checkbox" name="type2" value="2"><label for="">Perdido</label>
                            </div>
                            <button type="submit" name="button">PUBLICAR</button>

                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'Post',
  };
</script>

<style scoped>

</style>