<template>
    <div
        class="NotificationMenu"
        v-click-outside="close"
    >
        <div class="NotificationMenu__button">
            <span v-if="countUnreadNotifications > 0" style="color: white; margin-right: 10px;">{{countUnreadNotifications}}</span>
            <a href="#" @click="show = !show" style="color: white;" ><font-awesome-icon icon="bell" style="margin-right: 5px;" /></a>
            <div class="NotificationMenu__buttonItem">
                Notificaciones
            </div>
        </div>
        <div v-show="show" class="NotificationMenu__list">
            <NotificationList
                :notifications="notifications"
            />
        </div>
    </div>
</template>
<script>
import NotificationList from "./NotificationsList";
import {mapActions, mapState} from "vuex";
import Push from "push.js";

export default {
    name: "NotificationMenu",
    components: {
        NotificationList
    },
    created() {
        this.getNotifications();
    },
    data() {
        return {
            show: false
        }
    },
    computed: {
        ...mapState({
            notifications: state => state.user.notifications,
            countUnreadNotifications: state => state.user.countUnreadNotifications
        })
    },
    methods: {
        ...mapActions({
            getNotifications: "getNotifications",
            readNotification: "readNotification"
        }),
        close() {
            this.show = false;
        }
    },
    sockets: {
        newNotification(data) {
            const self = this;
            Push.create("Nueva notificacion", {
                body: data.message,
                icon: '/icon.png',
                timeout: 4000,
                onClick: function () {
                    self.$bus.$emit("showPost", data.postId);
                    self.readNotification(data.id);
                    this.close();
                }
            });
        },
    }
}
</script>
<style lang="scss">
    .NotificationMenu {
        &__list {
            width: 350px;
            height: 400px;
            background-color: white;
            position: absolute;
            z-index: 10;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        }

        &__button {
            display: flex;

            &Item{
                display: none;
            }
            @media (max-width: 650px) {
                &Item{
                    display: block;
                }
            }

        }
    }

</style>