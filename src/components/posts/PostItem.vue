<template>
    <div class="PostItem"
        :id="item._id">
        <div class="PostItem__card">
            <div class="PostItem__cardPhoto">
                <img
                    src="https://saveapetil.org/wp-content/themes/saveapet/images/dog-placeholder.jpg"
                    alt="perrito encontrado">
            </div>
            <div class="PostItem__cardContent">
                <div style="padding: 0 20px;">
                    <h2>Title</h2>
                    <div class="PostItem__cardContentInfo">
                        <div class="PostItem__cardContentInfoUser">
                            <div class="PostItem__cardContentInfoUserImage">
                                <img :src="item.user.profile" >
                                <span>{{fullName}}</span>
                            </div>
                        </div>
                        <div class="PostItem__cardContentInfoDate">
                            Jun 7, 2018
                        </div>
                        <div class="PostItem__cardContentInfoType">
                            PERDIDO
                        </div>
                    </div>
                    <div class="PostItem__cardContentDescription">
                        <span >Descripcion</span>
                        <p> {{item.description}} </p>
                    </div>
                    <div class="PostItem__cardContentAddress">
                        <span>Ultimo lugar visto</span>
                        <p> {{item.address}} </p>
                    </div>
                    <div class="PostItem__cardContentTags">
                        <span style="font-size: 12px; color: #8e8e8e;"> Características </span>
                        <br>
                        <span
                            style="background: green; margin: 0 5px; padding: 0 10px; font-size: 12px; color: white; border-radius: 3px;"
                            :key="tag._id"
                            v-for="tag in item.tags"
                            class="caracteristica">
                            {{tag.value}}
                        </span>
                        <br/>
                    </div>
                </div>
                <div>
                    <BasicButton
                        class="PostItem__cardContactButton"
                        @click.native="showUserInfo"
                    >
                        Contactar
                    </BasicButton>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { Carousel, Slide } from 'vue-carousel';
    import { mapActions, mapState } from "vuex";
    import BasicButton from "../basics/BasicButton";

    export default {
        name: "PostItem",
        components: {
            Carousel,
            Slide,
            BasicButton
        },
        props: {
            item: {
                type: Object
            }
        },
        methods: {
            ...mapActions({
                getOne: "getOne"
            }),
            async showUserInfo() {
                if (!this.isAuthenticated) {
                    alert("Quiere comenzar a ayudar, por favor registrate :)");
                    return;
                }

                this.$bus.$emit("showUserInfo", this.item.user._id);
            },
            styles(url) {
                return {
                    'background': `url(${url}) no-repeat center center`,
                    'background-size': '100% 100%;',
                    width: "400px",
                    height: "200px",
                    'background-position': 'center',
                    'background-size': 'contain'
                }
            }
        },
        computed: {
            ...mapState({
                isAuthenticated: state => state.auth.authenticated
            }),
            fullName() {
                return this.item.user.firstName +  " " + this.item.user.lastName
            }
        }
    }
</script>
<style lang="scss" >

    .PostItem {
        background: white;
        max-width: 100%;
        width: 568px;
        margin-bottom: 2em;
        border-radius: 2px;

        p {
            margin: 0;
        }

        &__card{
            display: flex;

            &Photo {
                width: 230px;
                flex: 1;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            &Content {
                width: 330px;
                margin: 0px;

                &Info{
                    display: flex;
                    font-size: 11px;

                    &User{
                        padding: 0.5em 1em;
                        display: -webkit-box;
                        display: -ms-flexbox;
                        display: flex;
                        -webkit-box-orient: horizontal;
                        -webkit-box-direction: normal;
                        -ms-flex-direction: row;
                        flex-direction: row;
                        -webkit-box-align: center;
                        -ms-flex-align: center;
                        align-items: center;
                        -webkit-box-pack: justify;
                        -ms-flex-pack: justify;
                        justify-content: space-between;

                        img {
                            width: 2em;
                            height: 2em;
                            border-radius: 50%;
                        }

                        &Image {
                            display: -webkit-box;
                            display: -ms-flexbox;
                            display: flex;
                            -webkit-box-orient: horizontal;
                            -webkit-box-direction: normal;
                            -ms-flex-direction: row;
                            flex-direction: row;
                            -webkit-box-align: center;
                            -ms-flex-align: center;
                            align-items: center;
                        }
                    }


                    &Type{
                        background: #009900;
                        border: none;
                        padding: 10px 15px;
                        color: white;
                        border-radius: 5px;
                    }
                }

                &Description {
                    font-size: 15px;

                    span {
                        font-size: 12px;
                        color: #8e8e8e;
                    }
                }

                &Address{
                    font-size: 15px;
                    span {
                        font-size: 12px;
                        color: #8e8e8e;
                    }
                }
            }

            &ContactButton {
                width: 100%;
            }
        }
    }
</style>