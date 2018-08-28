<template>
  <div id="app">
      <div id="snackbar"></div>
      <router-view name="navbar" />
      <router-view />
  </div>
</template>

<script>

export default {
  name: 'app',
};
</script>

<style>
    .cont {
        width: 100%;
        min-height: 100vh;
    }
    .filtro {
        margin: 0;
        padding: 0;
        background: url("./assets/img/background-puppy.jpg");
        background-position: center;
        background-size: cover;
        height: 100vh;
    }
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Open Sans', sans-serif;
    }
    *::after, *::before {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    button {
        cursor: pointer;
    }

    body {
        --bg-color-transparente: rgba(33, 177, 106, .53);
        --color-logo-verde: rgba(33, 177, 106, 1);
        --color-gris: #f2f2f2;
        min-height: 100vh;
        position: relative;
    }

    .slogan__elemt{
        display: flex;
        align-items: center;

    }
    .cont--slogan {
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--bg-color-transparente);
        height: 100%;
    }

    .cont--slogan .slogan, .cont--slogan .logo {
        flex-basis: 50%;
    }

    .cont--slogan .slogan {
        font-weight: 300;
        color: white;
    }

    .slogan__title {
        color: inherit;
        font-weight: 300;
        font-size: 2.5em;
    }
    .slogan__title--bold {
        color: inherit;
        font-weight: 900;
    }
    .slogan__subtitle {
        color: inherit;
        font-weight: 300;
        font-size: 1em;
    }

    .cont--slogan .logo img {
        display: block;
        margin: auto auto;
        max-width: 11em;
    }

    .cont--slogan .slogan a {
        display: block;
        padding: 1em;
        margin-top: 1.6em;
        color: var(--color-logo-verde);
        background: white;
        text-decoration: none;
        text-align: center;
        font-weight: 700;
        max-width: 10em;
    }
    .cont--slogan .slogan a:hover{
        background: rgb(211, 210, 210);
    }
    .modal--inicio-sesion .modal-body .img-promo .slogan {
        display: block;
        font-size: 1em;
        text-align: center;
    }
    .slogan__title--bold {
        color: inherit;
        font-weight: 900;
    }
    .slogan__subtitle {
        color: inherit;
        font-weight: 300;
        font-size: 1em;
    }
</style>
