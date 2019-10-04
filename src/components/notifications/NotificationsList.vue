<template>
    <div>
        <template v-if="notifications.length">
            <Notification
                :key="notification.id"
                :notification="notification"
                v-for="notification in notifications"
            />
        </template>
        <template v-else>
            <p style="color: black;">No tienes notificaciones pendientes</p>
        </template>
    </div>
</template>
<script>
import Notification from "./Notification";

export default {
    props: ["notifications"],
    components: {
        Notification
    }
}
</script>