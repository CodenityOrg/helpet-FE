<template>
    <div class="InfoUser modal-hp">
        <div class="InfoUser__Content modal__box modal--inicio-sesion">
            <div class="InfoUser__ContentHeader">
                <h3 class="titulo"></h3>
                <button type="button" class="btnCerrarModal" @click="$emit('onCloseInfoUser')">
                    X
                </button>
            </div>
            <div class="InfoUser__ContentBody">
                <div class="InfoUser__ContentBodyImg">
                    <img
                        style="margin-bottom: 0px;"
                        :src="user.profile">
                </div>
                <div class="InfoUser__ContentBodyUser">
                    <div class="InfoUser__ContentBodyUserName" style="display:flex;">
                        <div class="col-6" style="padding: 0 1em;">
                            <p>Nombre:</p>
                        </div>
                        <div class="col-6" style="padding: 0 1em;">
                            <p>{{ user.firstName }} {{ user.lastName }}</p>
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
                </div>
            </div>
        </div>
    </div>
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
<style lang="scss">
    .InfoUser{
        display: flex;

        &__Content{

            &Body{
                &Img{
                    flex: 1;
                }

                &User{
                    flex: 1;
                }
            }
        }
    }
</style>