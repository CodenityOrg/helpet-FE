<template>
    <nav class="navbar navbar--inicio">
    <div class="navbar__logo">
        <a href="/"><img src="../assets/img/ico-logov.png" alt="logo helpet"></a>
    </div>
    <ul class="navbar__menu">
        <li>
            <router-link :to="{name : 'LoginUser'}">Inicia</router-link>
        </li>
        <li>
            <router-link :to="{name : 'RegisterUser'}">Regístrate</router-link>
        </li>
        <li>
            <router-link :to="{name : 'ListLost'}">Mapa</router-link>
        </li>
    </ul>
    </nav>
</template>

<script>
export default {
  name: 'NavBar',
};
</script>

<style scoped>
</style>
