<template>
  <Modal class="NotificationModal">
    <a class="NotificationModal__closeBtn" @click="close">
      <font-awesome-icon icon="times" />
    </a>
    <NotificationList style="height: 100%" :notifications="notifications" />
  </Modal>
</template>
<script>
import { mapState, mapActions } from "vuex"
import NotificationList from "../notifications/NotificationsList.vue"
import Modal from "../common/Modal.vue"

export default {
  components: {
    NotificationList,
    Modal
  },
  created() {
    this.getNotifications()
  },
  computed: {
    ...mapState({
      notifications: (state) => state.user.notifications
    })
  },
  methods: {
    ...mapActions({
      getNotifications: "getNotifications"
    }),
    close() {
      this.$bus.$emit("hideNotificationModal")
    }
  }
}
</script>
<style lang="scss">
.NotificationModal {
  &__closeBtn {
    position: absolute;
    top: 0;
    right: 0;
    margin: 15px;
    cursor: pointer;
    z-index: 999999999;
  }
}
</style>
