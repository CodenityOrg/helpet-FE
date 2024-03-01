import * as firebase from "firebase"
import Vue from "vue"

firebase.initializeApp({
  apiKey: "AIzaSyA08tldZT-ikHrU1UovZFTGLZpu9wCrBIo",
  projectId: "helpet-df2b6",
  messagingSenderId: "480288695199"
})

export default {
  startMessaging: function () {
    const messaging = firebase.messaging()
    messaging.usePublicVapidKey(
      "BAR8oO0PKTSbi1XorpGjLUjpKRaiCL6QKJHcp9GgRSPwm8J87EDLGuNGQl8ZZz55IU_to5vOot7kN96g9xgGL8M"
    )
    Vue.prototype.$messaging = messaging
  }
}
