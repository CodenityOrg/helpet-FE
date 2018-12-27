<template>
    <notify-me
          :event-bus="bus">
        <template slot="content" scope="{data}">
            <div style="width: 100%; word-break: break-all; text-align: left">
                <h4><b>{{data.title}}</b></h4>
                <p style="margin: 0">{{data.text}}</p>
            </div>
        </template>
    </notify-me>
</template>
<script>

    import {mapActions, mapState} from "vuex";
    import Notify from 'vue-notify-me'

    export default {
        name: "UserProfile",
        components: {
          'notify-me': Notify
        }
        data() {

        },
        methods: {

    }
</script>
