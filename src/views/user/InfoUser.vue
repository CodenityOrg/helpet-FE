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
                <p>Modal user info</p>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from "vuex";
    export default {
        name: 'InfoUser',
        data() {
            return {
                credentials: {
                    email: "",
                    password: ""
                }
            }
        },
    };
</script>