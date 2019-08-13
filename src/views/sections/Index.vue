<template functional>
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
                    <router-link :to="{name : 'ListLost'}">Comienza</router-link>
                </div>
                <div class="logo">
                    <img src="../../assets/img/img-A.png" alt="logo helpet">
                </div>
            </ul>
        </div>
    </section>
</template>