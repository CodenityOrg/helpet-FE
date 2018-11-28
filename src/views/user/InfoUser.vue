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
                <p>{{ currentUser.user.firstName }} {{ currentUser.user.lastName }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from "vuex";
    export default {
        name: 'InfoUser',
        props: ['currentUser'],
        data() {
            return {
                user: {},
            }
        },
        // methods: {
        //     ...mapActions({
        //         getProfile: "getProfile",
        //         updateUser: "updateUser",
        //         validateAuthorization: "validateAuthorization"
        //     })
        // },
        // async created() {
        //     // this.isLoading = true;
        //     this.user = await this.getProfile();
        //     console.log('user', this.user);
        //     // this.isLoading = false;
        // }
    };
</script>