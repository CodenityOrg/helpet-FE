<template>
    <div>
        <div style="width: 100%; height: 100%;">
            <div style="float:left; width: 60%;">
                <notifications group="top" position='center right' />
                <div style="margin: 100px;">
                    <h4 style="color: white;">Enviar mensaje</h4>
                    <div class="contact-form">
                        <input
                            name="fullName"
                            class="form-input"
                            :class="{ 'invalid': !isFullNameValid }"
                            v-model="form.fullName"
                            v-validate="'required'"
                            placeholder="Nombre completo"
                            type="text"
                        >
                        <input
                            name="email"
                            class="form-input"
                            :class="{ 'invalid': !isEmailValid }"
                            v-model="form.email"
                            v-validate="'required|email'"
                            placeholder="Correo"
                            type="email"
                        >
                        <textarea
                            name="message"
                            class="form-textarea"
                            :class="{ 'invalid': !isMessageValid }"
                            v-validate="'required'"
                            v-model="form.message"
                            placeholder="Mensaje"
                            cols="30"
                            rows="10"
                        ></textarea>
                        <FormErrors v-show="!areAllInputsValid">
                            <ErrorMessage
                                v-show="!isFullNameValid"
                                message="* Nombre requerido"/>
                            <ErrorMessage
                                v-show="!isMessageValid"
                                message="* Mensaje requerido"/>
                            <ErrorMessage
                                v-show="!isEmailValid"
                                message="* Ingrese un email válido"/>
                        </FormErrors>
                        <input style="background: none; width: 200px; height: 50px; border: 1px solid white; color: white; border-radius: 10px; " type="button" v-on:click="validateAndSave()" value="Enviar">
                    </div>
                </div>
            </div>
            <div class="info">
                <div class="panel">  
                    <h1>Contactanos</h1>
                    <p> Telefono:  </p>
                    <p> Direccion: </p>
                    <p> Info: </p>
                    <div class="mapouter">
                        <div class="gmap_canvas">
                            <iframe
                                title="contact-map"
                                height="234"
                                id="gmap_canvas"
                                src="https://maps.google.com/maps?q=peru&t=&z=13&ie=UTF8&iwloc=&output=embed"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div style="width: 100%; background: #404040; height: 40px; position: absolute; bottom: 0;">
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import FormErrors from "../components/basics/FormErrors";
import ErrorMessage from "../components/basics/ErrorMessage";

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
        async validateAndSave() {
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

    .info {
        float:right; 
        width: 40%; 
        min-width: 300px; 
        background: white; 
        display:block; 
        height: 100%;
        background-image: url('../assets/img/map-sample.png');
    }

    .info .panel {
        border: 1px solid #c7c4c4;
        margin: 60px;
        padding: 40px;
        height: calc(100% - 140px);
        color: black;
        box-shadow: 8px 4px #ccc5c578;
        background: white;
    }

    .info h1 {
        margin-bottom: 30px;
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

    .mapouter{position:relative;text-align:right;height:234px;width:100%;}.gmap_canvas {overflow:hidden;background:none!important;height:234px;width:100%;}
</style>