<template>
    <div class="cont">
        <router-link :to="{name : 'Home'}">
            <full-page ref="fullpage" :options="options">
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
                                <img src="../assets/img/img-A.png" alt="logo helpet">
                            </div>
                        </ul>
                    </div>
                </section>
                <section class="cont--slogan section">
                    <ul class="slogan__elemt" style="padding-top: 180px;">
                        <div class="img-features"></div>
                        <div class="img-features"></div>
                        <div class="img-features"></div>
                    </ul>
                </section>
                <section class="section">
                    <div style="width: 100%; height: 100%;">
                        <div style="float:left; width: 60%;">
                            <div style="margin: 100px;">
                                <h4 style="color: white;">Enviar mensaje</h4>
                                <form class="contact-form" action="" >
                                    <input class="form-input" placeholder="Nombre completo" type="text">
                                    <input class="form-input" placeholder="Correo" type="text">
                                    <textarea class="form-textarea" placeholder="Mensaje" name="" cols="30" rows="10"></textarea>
                                    <input style="background: none; width: 200px; height: 50px; border: 1px solid white; color: white; border-radius: 10px; " type="submit" value="Enviar">
                                </form>
                            </div>
                        </div>
                        <div style="float:right; width: 40%; min-width: 300px; background: white; display:block; height: 100%;">
                            
                        </div>
                    </div>
                    <div style="width: 100%; background: #404040; height: 90px; position: absolute; bottom: 0;">

                    </div>
                </section>
            </full-page>
        </router-link>
        <router-view></router-view>
        <notifications group="foo" position='bottom right' />
    </div>
</template>

<script>
    import Vue from 'vue'
    import 'fullpage.js/vendors/scrolloverflow'
    import VueFullPage from 'vue-fullpage.js'

    Vue.use(VueFullPage);
    export default {
        name: 'HomePage',
        data() {
            return {
                options: {},
            }
        }
    };
</script>

<style scoped>
    .router-link-active {
        text-decoration: none;
    }

    .img-features {
        background: white; 
        border-radius: 100%; 
        height: 300px; 
        margin: 0 50px;
        width: 300px; 
    }

    .contact-form .form-input {
        background: none; 
        border: 1px solid white; 
        border-radius: 10px; 
        color: white; 
        margin: 5px 0;
        padding: 10px;
        height: 60px; 
        width: 100%; 
    }

    .contact-form .form-textarea {
        background: none; 
        border: 1px solid white; 
        height: 220px; 
        border-radius: 10px; 
        width: 100%; 
        margin: 5px 0; 
        color: white; 
        padding: 10px;
        outline: none;
    }

    .contact-form .form-input:focus {
        border: 1px solid white;
        outline: none;
    }
    
    .form-input::placeholder, .form-textarea::placeholder {
        color: white;
    }


</style>
