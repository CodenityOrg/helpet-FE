<template>
    <div>
        <Notification
            :key="notification.id"
            v-for="notification in notifications"
        />
    </div>
</template>
<script>
import Notification from "./Notification";

export default {
    props: {
        notifications: {
            type: Array
        }
    }
}
</script>