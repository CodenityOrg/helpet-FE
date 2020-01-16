<template>
    <div class="register">
        <loading :active.sync="isLoading"
            :is-full-page="true" />
        <div class="cont cont--register cont--profile">
            <form action="">
                <div class="form-input">
                    <input
                        name="nombre"
                        :class="{ 'invalid': !isFirstNameValid }"
                        v-validate="'required'"
                        placeholder="Nombres" v-model="user.firstName" type="text">
                </div>
                <div class="form-input">
                    <input
                        name="apellidos"
                        :class="{ 'invalid': !isLastNameValid }"
                        v-validate="'required'"
                        placeholder="Apellidos" v-model="user.lastName" type="text">
                </div>
                <div class="form-input">
                    <input
                        :class="{ 'invalid': !isEmailValid }"
                        v-validate="'required|email'"
                        name="email"
                        placeholder="Email" v-model="user.email" type="email">
                </div>
                <div class="form-input">
                    <input placeholder="Telefono" v-model="user.phone" type="phone">
                </div>
                <div class="form-input form-input--no-margin">
                    <input placeholder="Facebook" v-model="user.facebook" type="text">
                </div>
                <FormErrors v-if="userLoaded" v-show="!areAllInputsValid">
                    <ErrorMessage
                        v-show="!isFirstNameValid"
                        message="* Nombre requerido"/>
                    <ErrorMessage
                        v-show="!isLastNameValid"
                        message="* Apellido requerido"/>
                    <ErrorMessage
                        v-show="!isEmailValid"
                        message="* Ingrese un email válido"/>
                </FormErrors>
            </form>
        </div>
    </div>
</template>
<script>
    import {debounce} from "lodash";
    import {mapActions} from "vuex";
    import FormErrors from "../components/basics/FormErrors";
    import ErrorMessage from "../components/basics/ErrorMessage";

    export default {
        name: "UserProfile",
        components: {
            FormErrors,
            ErrorMessage,
        },
        data: () => ({
            user: {},
            userLoaded: false,
            isLoading: false
        }),
        watch: {
            user: {
                handler() {
                    if (!this.userLoaded) {
                        return;
                    }
                    this.validateAndSaveDebounced();
                },
                deep: true,
            }
        },
        computed: {
            isFirstNameValid() {
                return !this.errors.has('nombre');
            },
            isLastNameValid() {
                return !this.errors.has('apellidos');
            },
            isEmailValid() {
                return !this.errors.has('email');
            },
            areAllInputsValid() {
                if (!this.userLoaded) {
                    return true;
                }
                return this.isFirstNameValid && this.isLastNameValid && this.isEmailValid;
            }
        },
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
            },
            async validateAndSave() {
                const allValid = await this.$validator.validateAll();
                if (!allValid) {
                    return;
                }
                this.updateProfile();
            }
        },
        async created() {
            this.isLoading = true;
            this.user = await this.getProfile();
            this.isLoading = false;
            this.userLoaded = true;
            this.validateAndSaveDebounced = debounce(this.validateAndSave, 1000);
        }
    }
</script>
