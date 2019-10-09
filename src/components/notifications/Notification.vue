<template>
    <div>
        <div class="Notification" :class="{ 'Notification--unread': !notification.read }" @click="openPost">
            <div class="Notification__Profile">
                <img
                    :src="this.sender.profile" alt="">
            </div>
            <div class="Notification__Info">
                <span class="Notification__InfoText"> <strong>{{senderFullName}}</strong>  ha encontrado una mascota parecida a la tuya! Haz click para ver!</span>
                <span class="Notification__InfoDate"><strong>{{formattedDate}}</strong> </span>
            </div>
        </div>
    </div>
</template>
<script>
import moment from "moment";
import { mapActions } from 'vuex';
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
            this.readNotification(this.notification._id);
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
            return moment(this.notification.createdAt).format('D MMM, kk:mm');
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
