<template>
    <div class="modal">
        <div class="modal__box modal--inicio-sesion">
            <div class="modal-header">
                <h3 class="titulo"></h3>
                <button type="button" class="btnCerrarModal" @click="$emit('onCloseInfoUser')">
                    X
                </button>
            </div>
            <div class="modal-body">
                <div class="col-6 img-promo">
                    <img style="margin-bottom: 0px;" :src="currentUser.profile">
                </div>
                <div class="col-6">
                    <div style="display:flex;">
                        <div class="col-6" style="padding: 0 1em;">
                            <p>Nombre:</p>
                        </div>
                        <div class="col-6" style="padding: 0 1em;">
                            <p>{{ currentUser.firstName }} {{ currentUser.lastName }}</p>
                        </div>
                    </div>
                    <div style="display:flex;">
                        <div class="col-6" style="padding: 0 1em;">
                            <p>Teléfono:</p>
                        </div>
                        <div class="col-6" style="padding: 0 1em;">
                            <p>051-234234</p>
                        </div>
                    </div>
                    <div style="display:flex;">
                        <div class="col-6" style="padding: 0 1em;">
                            <p>Facebook:</p>
                        </div>
                        <div class="col-6" style="padding: 0 1em;">
                            <p><a href="https://www.facebook.com/VuejsNews/">/VuejsNews</a></p>
                        </div>
                    </div>
                    
                    
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'InfoUser',
        props: ['currentUser'],
        data() {
            return {
                user: {},
            }
        },
    };
</script>