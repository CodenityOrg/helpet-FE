<template>
    <div class="register container--bg-white">
        <div class="wrapper">
            <h1>Información personal</h1>
            <p>Nota: Es importante registrar tus datos para que las personas puedan contactarte rápidamente :)</p>
            <loading :active.sync="isLoading" :is-full-page="true" />
            <div class="card mt-4">
                <div class="card-body p-0 d-flex justify-content-center align-items-center">
                    <div class="picture align-self-stretch border-right justify-content-center align-items-center d-none d-lg-flex">
                        <img alt="" src="../assets/img/profile-placeholder.png" />
                    </div>
                    <div class="flex-grow-1">
                        <form class="form-inline-label" action="">
                            <div class="form-input">
                                <label for="nombre">Nombres</label>
                                <input
                                    name="nombre"
                                    id="nombre"
                                    :class="{ 'invalid': !isFirstNameValid }"
                                    v-validate="'required'"
                                    v-model="user.firstName" type="text">
                            </div>
                            <div class="form-input">
                                <label for="apellidos">Apellidos</label>
                                <input
                                    name="apellidos"
                                    id="apellidos"
                                    :class="{ 'invalid': !isLastNameValid }"
                                    v-validate="'required'"
                                    v-model="user.lastName" type="text">
                            </div>
                            <div class="form-input">
                                <label for="email">Email</label>
                                <input readonly disabled id="email" name="email" :value="user.email" type="email">
                            </div>
                            <div class="form-input">
                                <label for="telefono">Teléfono</label>
                                <input id="telefono" v-model="user.phone" type="phone">
                            </div>
                            <div class="form-input form-input--no-margin">
                                <label for="facebook">Facebook</label>
                                <input id="facebook" v-model="user.facebook" type="text">
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <FormErrors style="max-width: 900px; margin: 1rem auto;" v-if="userLoaded" v-show="!areAllInputsValid">
                <ErrorMessage
                    v-show="!isFirstNameValid"
                    message="* Nombre requerido"/>
                <ErrorMessage
                    v-show="!isLastNameValid"
                    message="* Apellido requerido"/>
            </FormErrors>
        </div>
    </div>
</template>
<script>
    import {debounce, omit} from "lodash";
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
            isLoading: true
        }),
        watch: {
            user: {
                handler(value, oldValue) {
                    if (!oldValue._id || !this.userLoaded) {
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
            areAllInputsValid() {
                if (!this.userLoaded) {
                    return true;
                }
                return this.isFirstNameValid && this.isLastNameValid;
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
                const user = omit(this.user, ["email"]);
                await this.updateUser(user);
                this.validateAuthorization();
                this.isLoading = false;
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
            this.validateAndSaveDebounced = debounce(this.validateAndSave, 1000);
            this.user = await this.getProfile();
            this.isLoading = false;
            this.userLoaded = true;
        }
    }
</script>
