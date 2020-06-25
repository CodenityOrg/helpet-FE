<template>
    <div>
        <div class="Notification" :class="{ 'Notification--unread': !notification.read }" @click="openPost">
            <div class="Notification__Profile">
                <img
                    :src="this.sender.profile" alt="">
            </div>
            <div class="Notification__Info">
                <span class="Notification__InfoText"> <strong>{{senderFullName}}</strong> ha encontrado una mascota parecida a la tuya! Haz click para ver!</span>
                <span class="Notification__InfoDate"><strong>{{formattedDate}}</strong> </span>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
import { formatDate } from "../utils";

export default {
    name: "Notification",
    props: {
        notification: {
            type: Object
        }
    },
    methods:{
        ...mapActions({
            readNotification: "readNotification"
        }),
        openPost() {
            this.$bus.$emit("showPost", this.notification.post);
            if (!this.notification.read) {
                this.readNotification(this.notification._id);
                this.$store.commit("DECREASE_NOTIFICATIONS_UNREAD");
            }
            this.$bus.$emit("hideNotificationModal");
        }
    },
    computed: {
        sender() {
            return this.notification.sender;
        },
        senderFullName() {
            return `${this.sender.firstName} ${this.sender.lastName}`;
        },
        formattedDate() {
            return formatDate(this.notification.createdAt);
        }
    }
}
</script>
<style lang="scss">
    .Notification{
        color: black;
        display: flex;
        padding: 10px;
        cursor: pointer;

        &__Profile {
            img {
                width: 50px;
                height: 50px;
                margin: 20px 15px;
                border-radius: 50%;
            }
        }

        &__Info{
            display: flex;
            flex-direction: column;

            &Text{
                font-size: 14px;
                margin: 5px;

            }

            &Date {
                font-size: 10px;
                margin: 5px;
            }
        }

        &--unread {
            background: #68cf80;
        }
    }

    // .Notification:hover{
    //     opacity: 0.3;
    // }
</style>
