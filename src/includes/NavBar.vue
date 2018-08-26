<template>
    <nav class="navbar">
    <div class="navbar__logo">
        <a href="/"><img src="../assets/img/ico-logo.png" alt="logo helpet"></a>
    </div>
    <ul class="navbar__menu">
        <li>
            <button type="button">Inicia</button>
        </li>
        <li>
            <!--<a href="/registro">Regístrate</a>-->
            <router-link :to="{name : 'RegisterUser'}">Regístrate</router-link>
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
