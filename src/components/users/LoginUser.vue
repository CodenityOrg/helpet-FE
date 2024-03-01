<template>
  <Modal @close="$emit('close')">
    <div class="LoginUser__sectionImg">
      <div class="LoginUser__sectionImgCont">
        <img :src="dogImg" alt="helpet inicio de sesión" />
        <span class="LoginUser__sectionImgContSlogan">{{
          $t("login.sloganMessage")
        }}</span>
      </div>
    </div>
    <div class="LoginUser__sectionLogin">
      <span @click="$emit('close')" style="float: right; cursor: pointer">
        <font-awesome-icon icon="times" />
      </span>
      <form id="login-form">
        <SocialButtons
          class="social-buttons"
          @onSuccess="successOauth"
          @onFailure="failureOauth">
          {{ $t("login.fbLoginButton") }}
        </SocialButtons>
        <p class="info-message">
          {{ $t("login.emailText") }} |
          <a href="#">{{ $t("login.forgotPasswordText") }}</a>
        </p>
        <div class="form-input font-size-10px">
          <input
            class="login-input"
            :class="{ 'error-input': errors.first('email') }"
            v-validate="'required|email'"
            v-model="credentials.email"
            type="email"
            name="email"
            :placeholder="$t('login.placeholders.email')" />
        </div>
        <div class="form-input font-size-10px">
          <input
            class="login-input"
            :class="{ 'error-input': errors.first('password') }"
            v-validate="'required'"
            v-model="credentials.password"
            type="password"
            name="password"
            :placeholder="$t('login.placeholders.password')" />
        </div>
        <div class="info-message">
          <p>
            {{ $t("login.notAccountText") }}
            <router-link to="/registro"
              ><span @click="$emit('close')">{{
                $t("login.createAccountText")
              }}</span></router-link
            >
          </p>
        </div>
        <div class="form-submit">
          <BasicButton
            class="frm--btm login-btn"
            type="submit"
            @click="signUp"
            >{{ $t("login.loginButton") }}</BasicButton
          >
        </div>
      </form>
    </div>
  </Modal>
</template>

<script>
import Modal from "@/components/common/Modal.vue"
import SocialButtons from "@/components/common/SocialButtons.vue"
import BasicButton from "@/components/basics/BasicButton.vue"
import { isSafari } from "../utils"

import { mapActions, mapState } from "vuex"

//client-secret: J1pcDCnmFLWq0M9c7jEMCG0G
export default {
  name: "LoginUser",
  components: {
    Modal,
    BasicButton,
    SocialButtons
  },
  data() {
    const dogImg = require("../../assets/img/img-dog.webp")
    return {
      credentials: {
        email: "",
        password: ""
      },
      fbSignInParams: {
        scope: "email",
        return_scopes: true
      },
      googleSignInParams: {
        client_id:
          "1076081297271-he3s2qr0ob61s4cpbgl0cnj2s5ajpqu7.apps.googleusercontent.com"
      },
      dogImg
    }
  },
  computed: {
    ...mapState({
      isAuthenticated: (state) => state.auth.authenticated
    })
  },
  methods: {
    ...mapActions({
      login: "login",
      updateToken: "updateToken"
    }),
    async signUp(event) {
      event.preventDefault()
      event.stopPropagation()
      const credentials = this.credentials
      this.isLoading = true
      await this.login(credentials)
      this.redirectToMapOrFail()
    },
    closeLogin() {
      this.$emit("close")
    },
    successOauth() {
      this.redirectToMapOrFail()
    },
    failureOauth() {
      this.showFailMessage()
    },
    async redirectToMapOrFail() {
      if (!this.isAuthenticated) {
        this.showFailMessage()
      } else {
        this.isLoading = false
        this.$emit("close")
        const id = await this.$socket.id
        await this.updateToken(id)
        this.$router.push("/publicaciones")
      }
    },
    showFailMessage() {
      this.$notify({
        group: "top",
        type: "error",
        title: "INICIO DE SESIÓN",
        text: this.$t("login.incorrectLogin")
      })
    }
  }
}
</script>
<style lang="scss">
.fb-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #4267b2;
  color: #fff;
  width: 100%;
  text-align: center;
  margin-top: 10px;
}

.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
  text-align: center;
  width: 100%;
  margin-top: 10px;
}

.LoginUser {
  &__sectionImg {
    width: 40%;
    height: 100%;
    padding: 0;
    background: #009900;

    &Cont {
      border-right: 2px solid var(--color-logo-green);
      height: 100%;
      padding-top: 60px;

      img {
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 55%;
      }

      &Slogan {
        display: block;
        font-size: 16px;
        text-align: center;
        color: white;
        padding: 10px;
      }
    }
  }

  &__sectionLogin {
    width: 60%;
    padding: 30px;
  }
}

@media all and (max-width: 500px) {
  .LoginUser__sectionLogin {
    padding: 10px;
  }
}
</style>
