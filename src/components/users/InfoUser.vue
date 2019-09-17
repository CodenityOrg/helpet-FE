<template>
    <b-modal :cancel-disabled="true" v-model="showInfo">
        <b-row>
            <b-col md="6" class="img-promo">
                <img width="200" height="200" style="margin-bottom: 0px;" :src="user.profile">
            </b-col>
            <b-col md="6">
                <b-row>
                    <b-col md="6">
                        <p> Nombre: </p>
                    </b-col>
                    <b-col md="6">
                        <p>{{ user.firstName }} {{ user.lastName }}</p>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col md="6">
                        <p>Teléfono:</p>
                    </b-col>
                    <b-col md="6">
                        <p>{{ user.phone }}</p>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-modal>
</template>

<script>
    import {mapActions} from "vuex";
    export default {
        name: "InfoUser",
        data() {
            return {
                user: {},
                showInfo: false,
                userId: ""
            }
        },

        watch: {
            async userId(val) {
                this.user = await this.getOne(val);
            }
        },
        methods: {
            ...mapActions({
                getOne: "getOne",
            }),
        },
        created() {
            this.$bus.$on("showUserInfo", (id) => {
                this.userId = id;
                this.showInfo = true;
            });
        }
    };
</script>