<template>
    <div class="register">
        <loading :active.sync="isLoading"
            :is-full-page="true" />
        <div class="cont cont--register">
            <form action="">
                <div class="form-input">
                    <input placeholder="Nombres" v-model="user.firstName" type="text">
                </div>
                <div class="form-input">
                    <input placeholder="Apellidos" v-model="user.lastName" type="text">
                </div>
                <div class="form-input">
                    <input placeholder="Email" v-model="user.email" type="email">
                </div>
                <div class="form-input">
                    <input placeholder="Telefono" v-model="user.phone" type="phone">
                </div>
                <div class="form-input">
                    <input placeholder="Facebook" v-model="user.facebook" type="text">
                </div>
                <div>
                    <button
                        class="btn btn-regular"
                        @click.prevent="updateProfile" 
                        type="submit">
                        Aceptar
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>

    import {mapActions, mapState} from "vuex";

    export default {
        name: "UserProfile",
        data: () => ({
            user: {},
            isLoading: false
        }),
        methods: {
            ...mapActions({
                getProfile: "getProfile",
                updateUser: "updateUser",
                validateAuthorization: "validateAuthorization"
            }),
            async updateProfile() {
                this.isLoading = true;
                const user = this.user;
                await this.updateUser(user);
                this.isLoading = false;
                this.validateAuthorization();
            }
        },
        async created() {
            this.isLoading = true;
            this.user = await this.getProfile();
            this.isLoading = false;
        }
    }
</script>
