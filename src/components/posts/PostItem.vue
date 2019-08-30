<template>
    <div class="PostItem"
        :id="item._id">
        <div class="PostItem__card">
            <div class="PostItem__cardPhoto">
                <carousel
                    v-if="item.photos && item.photos.length"
                    :perPageCustom="[[1024, 1]]"
                >
                    <slide
                        :key="photo._id"
                        v-for="photo in item.photos" >
                        <div
                            :style="styles(photo.thumbnailPath)"
                        >
                        </div>
                    </slide>
                </carousel>
                <img
                    v-else
                    src="https://saveapetil.org/wp-content/themes/saveapet/images/dog-placeholder.jpg"
                    alt="perrito encontrado">
            </div>
            <div class="PostItem__cardContent">
                <div style="padding: 0 20px; margin: 10px 0px;">
                    <h2>Title</h2>
                    <div class="PostItem__cardContentInfo">
                        <div class="PostItem__cardContentInfoUser">
                            <div class="PostItem__cardContentInfoUserImage">
                                <img :src="item.user.profile" >
                                <span>{{fullName}}</span>
                            </div>
                        </div>
                        <div class="PostItem__cardContentInfoDate">
                            <font-awesome-icon icon="calendar-alt" />
                            Jun 7, 19:00
                        </div>
                        <div class="PostItem__cardContentInfoType">
                            PERDIDO
                        </div>
                    </div>
                    <div class="PostItem__cardContentDescription">
                        <span > <font-awesome-icon icon="comments" style="margin-right: 5px;" /> Descripcion</span>
                        <!-- TODO: Check ellipsis compability -->
                        <div> {{item.description}} </div>
                    </div>
                    <div class="PostItem__cardContentAddress">
                        <span><font-awesome-icon icon="map" style="margin-right: 5px;" />Ultimo lugar visto</span>
                        <p> {{item.address}} </p>
                    </div>
                    <div class="PostItem__cardContentTags">
                        <span style="font-size: 12px; color: #8e8e8e; margin-right: 5px;"><font-awesome-icon icon="tags" /> Características </span>
                        <div class="PostItem__cardContentTagsContainer">
                            <span
                                class="PostItem__cardContentTagsItem"
                                :key="tag._id"
                                v-for="tag in item.tags">
                                {{tag.value}}
                            </span>
                        </div>
                    </div>
                </div>
                <div
                    class="PostItem__cardContact"
                >
                    <BasicButton
                        class="PostItem__cardContactButton"
                        @click.native="showUserInfo"
                    >
                        <font-awesome-icon icon="phone-alt" />
                        Contactar
                    </BasicButton>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

    //TODO: Check button efect after hover it
    //TODO:

    import { Carousel, Slide } from "vue-carousel";
    import { mapActions, mapState } from "vuex";
    import BasicButton from "../basics/BasicButton";
    export default {
        name: "PostItem",
        components: {
            BasicButton,
            Carousel,
            Slide
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
                    'background-position': 'center',
                    'width': '100%',
                    'height': '410px'
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
        border: 1px solid #c5c5c5;
        width: 568px;
        margin-bottom: 2em;
        border-radius: 2px;
        height: 410px;
        p {
            margin: 0;
        }

        &__card{
            display: flex;
            height: 410px;
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
                position: relative;

                &Info{
                    display: flex;
                    font-size: 11px;

                    &User{
                        display: -webkit-box;
                        display: -ms-flexbox;
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
                        flex: 1.5;

                        span {
                            margin-left: 5px;
                        }

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

                    &Date{
                        flex: 1;
                        line-height: 30px;
                    }

                    &Type{
                        flex: 1;
                        background: #009900;
                        border: none;
                        padding: 15px;
                        color: white;
                        border-radius: 5px;
                        height: 20px;
                        max-width: 80px;
                        line-height: 0px;
                    }
                }

                &Description {
                    font-size: 15px;
                    margin-top: 10px;
                    div {
                        display: block;
                        display: -webkit-box;
                        max-width: 100%;
                        margin: 0 auto;
                        line-height: 1.2;
                        -webkit-line-clamp: 5;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }

                    span {
                        font-size: 12px;
                        color: #8e8e8e;
                    }
                }

                &Address{
                    font-size: 15px;
                    margin-top: 5px;

                    span {
                        font-size: 12px;
                        color: #8e8e8e;
                    }
                }

                &Tags{
                    margin-top: 10px;
                    &Item{
                        background: green;
                        margin: 5px;
                        padding: 5px 10px;
                        font-size: 12px;
                        color: white;
                        border-radius: 3px;
                        line-height: 30px;
                    }

                    &Container{
                        margin: 10px 0px;
                    }
                }
            }

            &Contact {
                position: absolute;
                bottom: 0;
                width: 100%;

                &Button {
                    width: 100%;
                }
            }
        }
    }
</style>