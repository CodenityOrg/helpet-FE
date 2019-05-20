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
                <b-row>
                    <b-col md="6">
                        <p>Facebook:</p>
                    </b-col>
                    <b-col md="6" style="padding: 0 1em;">
                        <p><a href="https://www.facebook.com/VuejsNews/">/VuejsNews</a></p>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-modal>
    <!-- <div class="modal">
        <div class="modal__box modal--inicio-sesion">
            <div class="modal-header">
                <h3 class="titulo"></h3>
                <button type="button" class="btnCerrarModal" @click="$emit('onCloseInfoUser')">
                    X
                </button>
            </div>
            <div class="modal-body">
                <div class="col-6 img-promo">
                    <img style="margin-bottom: 0px;" :src="currentUser.profile">
                </div>
                <div class="col-6">
                    <div style="display:flex;">
                        <div class="col-6" style="padding: 0 1em;">
                            <p>Nombre:</p>
                        </div>
                        <div class="col-6" style="padding: 0 1em;">
                            <p>{{ currentUser.firstName }} {{ currentUser.lastName }}</p>
                        </div>
                    </div>
                    <div style="display:flex;">
                        <div class="col-6" style="padding: 0 1em;">
                            <p>Teléfono:</p>
                        </div>
                        <div class="col-6" style="padding: 0 1em;">
                            <p>051-234234</p>
                        </div>
                    </div>
                    <div style="display:flex;">
                        <div class="col-6" style="padding: 0 1em;">
                            <p>Facebook:</p>
                        </div>
                        <div class="col-6" style="padding: 0 1em;">
                            <p><a href="https://www.facebook.com/VuejsNews/">/VuejsNews</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> -->
</template>

<script>

    import {mapState, mapActions} from "vuex";
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