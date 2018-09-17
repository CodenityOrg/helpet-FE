<template>
    <div id="tab-encontrados" class="tab-content">
        <div class="tarjeta tarjeta--perrrito-perdido" id="<%= post._id%>">
            <div class="tarjeta__titulo">
                <img src="img/placeholder.jpg" alt="foto de perfil">
                <span>Usuario Nombre Completo</span>
            </div>
            <div class="tarjeta__imagen">
                <img src="" alt="perrito encontrado">
            </div>
            <div class="tarjeta__descripcion">
                <p class="descripcion"> Description </p>
                <p class="direccion"> Direccion </p>
                <div class="caracteristicas">
                    <p><b> Características </b> </p>
                    <span class="caracteristica">Caracteristica</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'AnimalFound',
};
</script>

<style scoped>

</style>
