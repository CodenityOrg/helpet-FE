<template>
    <Modal style="z-index: 1001" class="InfoUser">
        <loading :active.sync="isLoading"
        />

        <div class="InfoUser__ContentBody">
            <a class="InfoUser__ContentBodyClose"  @click="closeInfoUser">
                <font-awesome-icon icon="times" />
            </a>
            <div class="InfoUser__ContentBodyImg">
                <img :alt="`${user.firstName} ${user.lastName}`" :src="user.profile">
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

    </Modal>
</template>
<script>
    import {mapActions} from "vuex";
    import Modal from "../common/Modal";

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
        components: {
            Modal
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
                width: 100%;

                &Img{
                    flex: 1;
                    text-align: center;
                    margin: 30px;

                    img{
                        margin-bottom: 0px;
                        width: 200px;
                        height: 200px;
                    }
                }

                &User{
                    flex: 1;
                    margin-top: 25px;
                }

                &Close{
                    position: absolute;
                    top: 0; right: 0;
                    margin: 15px;
                    cursor: pointer;
                }
            }
        }


    }
    @media (max-width: 650px) {
        .InfoUser__ContentBody{
            position: relative;
            flex-direction: column;
            padding: 20px;
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