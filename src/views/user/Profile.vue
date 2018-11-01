<template>
    <div>
        <loading :active.sync="isLoading"
            :is-full-page="true" />
        <form action="">
            <div>
                <label for="">Nombres</label>
                <input v-model="user.firstName" type="text">
            </div>
            <div>
                <label for="">Apellidos</label>
                <input v-model="user.lastName" type="text">
            </div>
            <div>
                <label for="">Email</label>
                <input v-model="user.email" type="email">
            </div>
            <div>
                <label for="">Telefono</label>
                <input v-model="user.phone" type="phone">
            </div>
            <div>
                <label for="">Facebook</label>
                <input v-model="user.facebook" type="text">
            </div>
            <div>
                <button
                    @click.prevent="updateProfile" 
                    type="submit">
                    Aceptar
                </button>
            </div>
        </form>
    </div>
</template>
<script>

    import {mapActions, mapState} from "vuex";

    export default {
        name: "UserProfile",
        data() {
            return {
                user: {},
                isLoading: false
            }
        },
        methods: {
            ...mapActions({
                getProfile: "getProfile",
                updateUser: "updateUser"
            }),
            async updateProfile() {
                this.isLoading = true;
                const user = this.user;
                await this.updateUser(user);
                this.isLoading = false;
            }
        },
        async created() {
            this.isLoading = true;
            this.user = await this.getProfile();
            this.isLoading = false;
        }
    }
</script>
