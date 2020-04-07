<template>
    <div>
        <notifications group="top" position='center right' />
        <section class="container">
            <b-row class="mt-5 mb-5">
                <b-col lg="8">
                    <b-card class="p-4 rounded-lg">
                        <h4 class="font-weight-bold">{{$t('contact.title')}}</h4>
                        <p>{{$t('contact.message')}}</p>
                        <div class="contact-form">
                            <input
                                name="fullName"
                                class="form-input"
                                :class="{ 'invalid': !isFullNameValid }"
                                v-model="form.fullName"
                                v-validate="'required'"
                                :placeholder="$t('contact.placeholders.fullname')"
                                type="text"
                            >
                            <input
                                name="email"
                                class="form-input"
                                :class="{ 'invalid': !isEmailValid }"
                                v-model="form.email"
                                v-validate="'required|email'"
                                :placeholder="$t('contact.placeholders.email')"
                                type="email"
                            >
                            <textarea
                                name="message"
                                class="form-textarea"
                                :class="{ 'invalid': !isMessageValid }"
                                v-validate="'required'"
                                v-model="form.message"
                                :placeholder="$t('contact.placeholders.message')"
                                cols="30"
                                rows="10"
                            ></textarea>
                            <FormErrors v-show="!areAllInputsValid">
                                <ErrorMessage
                                    v-show="!isFullNameValid"
                                    :message="$t('contact.errors.fullname')"/>
                                <ErrorMessage
                                    v-show="!isMessageValid"
                                    :message="$t('contact.errors.email')"/>
                                <ErrorMessage
                                    v-show="!isEmailValid"
                                    :message="$t('contact.errors.message')"/>
                            </FormErrors>
                            <button type="submit" class="btn btn-primary mt-3" @click="validateAndSave">{{$t('contact.sendButton')}}</button>
                        </div>
                    </b-card>
                </b-col>
                <b-col lg="4" class="mt-4 mt-lg-0">
                    <b-row>
                        <b-col md="6" lg="12">
                            <b-card class="rounded-lg mb-4 text-center">
                                <h5 class="mt-4">{{$t('contact.developedBy')}}</h5>
                                <a rel="noopener noreferrer" target="_blank" href="https://www.codenity.org/"><img class="w-100 py-3 px-4" alt="Codenity" src="../../src/assets/codenity-logo.png" /></a>
                            </b-card>
                        </b-col>
                        <b-col md="6" lg="12">
                            <b-card class="rounded-lg text-center">
                                <div class="d-flex justify-content-around">
                                    <a rel="noopener noreferrer" title="Ir a la página de Facebook de Codenity" class="social-button social-button--facebook rounded-circle m-2 color-white" target="_blank" href="https://www.facebook.com/codenity19/">
                                        <div class="rounded-circle w-100 h-100 d-flex justify-content-center align-items-center">f</div>
                                    </a>
                                    <a rel="noopener noreferrer" title="Ir al perfil de LinkedIn de Codenity" class="social-button social-button--linkedin rounded-circle m-2 color-white" target="_blank" href="https://www.linkedin.com/company/codenity-org/">
                                        <div class="rounded-circle w-100 h-100 d-flex justify-content-center align-items-center">in</div>
                                    </a>
                                    <a rel="noopener noreferrer" title="Ir al canal de YouTube de Codenity" class="social-button social-button--youtube rounded-circle m-2 color-white" target="_blank" href="https://www.youtube.com/channel/UC2DadiWRoeRgPGgzRGZ0g4g">
                                        <div class="rounded-circle w-100 h-100 d-flex justify-content-center align-items-center">
                                            <BIconPlayFill font-scale="1.5" style="left:2px; position: relative" />
                                        </div>
                                    </a>
                                </div>
                            </b-card>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </section>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import FormErrors from "../components/basics/FormErrors";
import ErrorMessage from "../components/basics/ErrorMessage";
import { BIconPlayFill } from 'bootstrap-vue'

export default {
    name: "Contact",
    data() {
        return {
            form: {
                fullName: "",
                email: "",
                message: ""
            }
        }
    },
    components: {
        FormErrors,
        ErrorMessage,
        BIconPlayFill
    },
    computed: {
        isFullNameValid() {
            return !this.errors.has('fullname');
        },
        isMessageValid() {
            return !this.errors.has('message');
        },
        isEmailValid() {
            return !this.errors.has('email');
        },
        areAllInputsValid() {
            return this.isFullNameValid && this.isMessageValid && this.isEmailValid;
        }
    },
    methods: {
        ...mapActions([
            "submitContactForm"
        ]),
        async validateAndSave(e) {
            e.preventDefault();
            const allValid = await this.$validator.validateAll();
            if (!allValid) {
                return;
            }
            this.submitForm();
        },
        resetForm() {
            this.form = {
                fullName: "",
                email: "",
                message: ""
            };
        },
        async submitForm () {
            status = await this.submitContactForm(this.form);
            this.resetForm();
            this.$validator.reset();
            if (!status) {
                this.$notify({
                    group: "top",
                    type: "error",
                    title: "MENSAJE NO ENVIADO",
                    text: "Lamentablemente no se pudo enviar su mensaje'</b>",
                });
            } else {
                this.$notify({
                    group: "top",
                    type: "info",
                    title: "MENSAJE ENVIADO",
                    text: "Se ha enviado su mensaje exitosamente'</b>",
                });
            }
        }
    }
}
</script>
<style>
    .contact-form .form-input {
        background: none;
        border: 1px solid #c0c0c0;
        border-radius: 10px;
        color: #c0c0c0;
        margin: 5px 0;
        padding: 10px;
        width: 100%;
    }

    .contact-form .form-textarea {
        background: none;
        border: 1px solid #c0c0c0;
        height: 220px;
        border-radius: 10px;
        width: 100%;
        margin: 5px 0;
        color: #c0c0c0;
        padding: 10px;
        outline: none;
    }

    .contact-form .invalid {
        border-color: red;
    }

    .contact-form .form-input:focus {
        border: 1px solid #c0c0c0;
        outline: none;
    }

    .form-input::placeholder, .form-textarea::placeholder {
        color: #c0c0c0;
    }

    .social-button {
        width: 5rem;
        height: 5rem;
        color: white !important;
        font-size: 3em;
        font-weight: bold;
        transition: background-color .3s ease;
    }
    .social-button--facebook {
        background-color: #4267b2;
    }
    .social-button--facebook:hover {
        background-color: #5e86d8;
    }
    .social-button--linkedin {
        background-color: #0077b5;
    }
    .social-button--linkedin:hover {
        background-color: #0892da;
    }
    .social-button--youtube {
        background-color: #f00;
    }
    .social-button--youtube:hover {
        background-color: #ff3535;
    }
</style>