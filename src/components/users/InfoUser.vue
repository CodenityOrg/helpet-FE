<template>
    <div class="InfoUser modal-hp">
        <loading :active.sync="isLoading"
            />
        <div class="InfoUser__Content modal__box modal--inicio-sesion">
            <div class="InfoUser__ContentHeader">
                <h3 class="titulo"></h3>
                <a class="btnCerrarModal" @click="closeInfoUser">
                    <font-awesome-icon icon="times" />
                </a>
            </div>
            <div class="InfoUser__ContentBody">
                <div class="InfoUser__ContentBodyImg">
                    <img
                        alt=""
                        style=""
                        :src="user.profile">
                </div>
                <div class="InfoUser__ContentBodyUser">
                    <div class="InfoUser__ContentBodyUserName">
                        <p style="font-weight: bold;">Nombre:</p>
                        <p>{{ user.firstName }} {{ user.lastName }}</p>
                    </div>
                    <div>
                        <p style="font-weight: bold;">Teléfono:</p>
                        <p>{{ user.phone }}</p>
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
                isLoading: false
            }
        },
        props: ["userId"],
        watch: {
            async userId(val) {
                this.user = {};
                this.isLoading = true;
                this.user = await this.getOne(val);
                this.isLoading = false;
            }
        },
        methods: {
            ...mapActions({
                getOne: "getOne",
            }),
            closeInfoUser() {
                this.$bus.$emit("onCloseInfoUser")
            }
        },
    };
</script>
<style lang="scss">
    .InfoUser{

        &__Content{

            &Header{
                height: 40px;

                a{
                    float: right;
                    margin: 10px 20px;
                    cursor: pointer;
                }
            }

            &Body{
                display: flex;

                &Img{
                    flex: 1;
                    text-align: center;

                    img{
                        margin-bottom: 0px;
                        width: 200px;
                        height: 200px;
                    }
                }

                &User{
                    flex: 1;
                }
            }
        }


    }
    @media (max-width: 650px) {
        .InfoUser__ContentBody{
            &Img{
                flex: 1;
                text-align: center;
                img{
                    width: 100px;
                    height: 100px;
                }
            }

            &User{
                flex: 1;
            }
        }
    }

</style>