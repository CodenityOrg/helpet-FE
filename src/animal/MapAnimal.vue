<template>
    <div class="cont cont--inicio">
        <div class="cont--tarjetas">
            <div class="content">
                <div class="tab-links">
                    <router-link :to="{name : 'ListLost'}">
                        <button type="button" class="tab-link active posts-tab">
                            Perdidos
                        </button>
                    </router-link>
                    <router-link :to="{name : 'ListFound'}">
                        <button type="button" class="tab-link posts-tab">Encontrados</button>
                    </router-link>
                </div>
                <router-view></router-view>
            </div>
        </div>
        <div class="cont--mapa">
            <div id='map'></div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Map',
};
</script>

<style scoped>
    .navbar--inicio {
        background: white;
        color: var(--color-logo-verde);
        padding-top: 1.5em;
        padding-bottom: 1.5em;
    }
    @import "../assets/css/perdidos.css";
</style>
