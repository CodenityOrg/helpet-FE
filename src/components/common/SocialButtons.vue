<template>
    <div >
        <a href="#">
            <fb-signin-button
                @success="onSignInFacebookSuccess"
                @error="onSignInFacebookError"
                :params="fbSignInParams">
                <slot></slot>
            </fb-signin-button>
        </a>
        <!-- <a href="#">
            <g-signin-button
                :params="googleSignInParams"
                @success="onSignInSuccess"
                @error="onSignInError">
                Iniciar sesion con Google
            </g-signin-button>
        </a> -->
    </div>
</template>
<script>
    import FBSignInButton from "vue-facebook-signin-button";
    import GSignInButton from "vue-google-signin-button";
    import {mapActions} from "vuex";
    import Vue from "vue";

    Vue.use(FBSignInButton);
    Vue.use(GSignInButton);

    export default {
        data() {
            return {
                fbSignInParams: {
                    scope: 'email',
                    return_scopes: true,
                },
                googleSignInParams: {
                    client_id: '1076081297271-he3s2qr0ob61s4cpbgl0cnj2s5ajpqu7.apps.googleusercontent.com'
                }
            }
        },
        methods: {
            ...mapActions({
                oauthLogin: "oauthLogin",
            }),
            async onSignInFacebookSuccess (response) {
                const info = await new Promise( (resolve, reject) => {
                    FB.api('/me', { fields: 'first_name, last_name, email' },  resolve)
                });
                info.accessToken = response.authResponse.accessToken;
                await this.oauthLogin(info);
                this.$emit("onSuccess");
            },
            onSignInFacebookError (error) {
                this.$emit("onFailure");
            },
            /*             onSignInSuccess (googleUser) {
                // `googleUser` is the GoogleUser object that represents the just-signed-in user.
                // See https://developers.google.com/identity/sign-in/web/reference#users
                const profile = googleUser.getBasicProfile() // etc etc
            },
            onSignInError (error) {
                // `error` contains any error occurred.
                console.log('OH NOES', error)
            }, */
        }
    }
</script>