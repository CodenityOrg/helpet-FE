<template>
    <div>
        <div class="NotificationList">
            <template v-if="notifications.length">
                <Notification
                    :key="notification.id"
                    :notification="notification"
                    v-for="notification in notifications"
                />
            </template>
            <template v-else>
                <div class="NotificationList__emptyList">
                    <p class="NotificationList__emptyListMessage" >No tienes notificaciones pendientes</p>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
import Notification from "./Notification";
import Modal from "../common/Modal";

export default {
    props: ["notifications", "modal"],
    components: {
        Notification,
        Modal
    }
}
</script>
<style lang="scss">
    .NotificationList {
        display: flex;
        width: 100%;
        height: 400px;
        z-index: 9999999;
        flex-direction: column;
        overflow: auto;
        &__emptyList{
            display: flex;
            width: 100%;
            margin: auto;
            &Message{
                color: gray;
                margin: auto;
            }
        }
    }
</style>