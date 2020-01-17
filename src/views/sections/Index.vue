<template>
    <section class="filtro section">
        <div class="cont--slogan">
            <ul class="slogan__elemt">
                <div class="slogan">
                    <h3 class="slogan__title">
                        Encuentra a tu <span class="slogan__title--bold">mascota</span>
                        <br>
                        perdida o ayuda a una a encontrar su hogar
                    </h3>
                    <span class="slogan__subtitle">Porque las mascotas son los mejores amigos</span>
                    <div style="display: flex;">
                        <router-link :to="{name : 'MapView'}">Comienza</router-link>
                        <a style="margin-left: 10px; color: #21b16a;" @click="$emit('toHelp')" >Aprende como</a>
                    </div>
                </div>
                <div class="logo">
                    <img src="../../assets/img/img-A.png" alt="logo helpet">
                </div>
            </ul>
        </div>
    </section>
</template>