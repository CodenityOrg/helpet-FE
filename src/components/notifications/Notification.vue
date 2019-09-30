<template>
    <div>
        <a :href="notification.postId">
            <p>{{notification.text}}</p>
            <p>{{notification.createdAt}}</p>
        </a>
    </div>
</template>
<script>
export default {
    name: "Notification",
    props: {
        notification: {
            type: Object
        }
    }
}
</script>