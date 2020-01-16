<template>
    <div class="register">
        <loading :active.sync="isLoading"
            :is-full-page="true" />
        <div class="cont cont--register cont--profile">
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
    import {mapActions, mapState} from "vuex";
    import FormErrors from "../components/basics/FormErrors";
    import ErrorMessage from "../components/basics/ErrorMessage";

    const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
                if (!this.user.firstName) {
                    return false;
                }
                return !!this.user.firstName.trim();
            },
            isLastNameValid() {
                if (!this.user.lastName) {
                    return false;
                }
                return !!this.user.lastName.trim();
            },
            isEmailValid() {
                return this.user.email && emailRegExp.test(this.user.email.trim());
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
            validateAndSave() {
                if (!this.areAllInputsValid) {
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
