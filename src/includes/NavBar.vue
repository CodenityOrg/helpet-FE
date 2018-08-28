<template>
    <nav class="navbar">
    <div class="navbar__logo">
        <a href="/"><img src="../assets/img/ico-logo.png" alt="logo helpet"></a>
    </div>
    <ul class="navbar__menu">
        <li>
            <router-link :to="{name : 'LoginUser'}">Ingresa</router-link>
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
    .navbar {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: white;
        padding-top: 4em;
        padding-bottom: 0;
        padding-left: 4.5em;
        padding-right: 4.5em;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 500;
        transition: all .3s;
    }
    .navbar__logo {
        max-width: 10em;
        display: flex;
        align-items: center;
    }

    .navbar__logo img {
        max-width: 100%;
    }
    .navbar__menu {
        list-style: none;
        max-width: 50%;
    }

    .navbar__menu li {
        display: inline-block;
    }

    .navbar__menu li a,
    .navbar__menu li button {
        display: block;
        color: inherit;
        font-family: "open sans";
        font-weight: 300;
        font-size: 1.2em;
        text-decoration: none;
        margin-right: 1em;
        transition: all .3s;
        outline: none;
        border: none;
        background: none;
    }
</style>
