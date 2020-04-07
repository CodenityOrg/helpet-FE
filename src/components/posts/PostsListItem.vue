<template>
    <div class="PostItem"
        :id="post._id">
        <div class="PostItem__card">
            <div class="PostItem__cardPhoto">
                <carousel
                    v-if="post.photos && post.photos.length"
                    :perPageCustom="[[1024, 1], [300, 1]]"
                >
                    <slide
                        :key="photo._id"
                        v-for="photo in post.photos" >
                        <div
                            class="PostItem__cardPhotoItem"
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
                    <h2>{{post.title}}</h2>
                    <div class="PostItem__cardContentInfo">
                        <div class="PostItem__cardContentInfoUser">
                            <div class="PostItem__cardContentInfoUserImage">
                                <img :src="post.user.profile" >
                                <span>{{fullName}}</span>
                            </div>
                        </div>
                        <div class="PostItem__cardContentInfoDate">
                            <font-awesome-icon icon="calendar-alt" />
                            {{formattedDate}}
                        </div>
                        <div class="PostItem__cardContentInfoType">
                            {{post.type === 0? "Perdido" : "Encontrado"}}
                        </div>
                    </div>
                    <div class="PostItem__cardContentDescription">
                        <span > <font-awesome-icon icon="comments" style="margin-right: 5px;" /> {{$t('publications.post.descriptionLabel')}}</span>
                        <div
                            ref="descriptionPost"
                            class="PostItem__cardContentDescriptionText"
                            :class="showMore? 'PostItem__cardContentDescriptionText--full-text' : ''"
                            > {{post.description}}
                        </div>
                        <a
                            class="PostItem__cardContentDescriptionLink"
                            v-show="isDescriptionHigher && !showMore"
                            @click="showMoreContent"
                            href="#"
                        >
                            {{$t('publications.post.showMore')}}
                        </a>
                    </div>
                    <div class="PostItem__cardContentAddress">
                        <span><font-awesome-icon icon="map" style="margin-right: 5px;" />{{$t('publications.post.addressLabel')}}</span>
                        <p> {{post.address}}  </p>
                    </div>
                    <div class="PostItem__cardContentTags">
                        <span style="font-size: 12px; color: #8e8e8e; margin-right: 5px;"><font-awesome-icon icon="tags" /> {{$t('publications.post.characteristic')}} </span>
                        <div class="PostItem__cardContentTagsContainer">
                            <span
                                class="PostItem__cardContentTagsItem"
                                :key="tag._id"
                                v-for="tag in post.tags">
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
                        {{$t('publications.post.contactButton')}}
                    </BasicButton>
                    <a
                        class="PostItem__cardContactMap"
                        :href="'https://www.google.com/maps/search/?api=1&query='+ post.latitude + ',' + post.longitude">
                        <BasicButton
                            style="width: 100%;"
                        >
                            <font-awesome-icon icon="map" />
                            Ver mapa
                        </BasicButton>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    // TODO: Remove default values for title and date after add theses fields in post model

    import { Carousel, Slide } from "vue-carousel";
    import { mapActions, mapState } from "vuex";
    import BasicButton from "../basics/BasicButton";
    import {formatDate} from "../utils";
    import moment from "moment";

    export default {
        name: "PostItem",
        components: {
            BasicButton,
            Carousel,
            Slide
        },
        props: {
            post: {
                type: Object
            },
            type: {
                type: String
            }
        },
        data() {
            return {
                showMore: false,
                descriptionEl: {}
            }
        },
        methods: {
            ...mapActions({
                getOne: "getOne"
            }),
            async showUserInfo() {
                if (!this.isAuthenticated) {
                    alert("Quieres comenzar a ayudar, por favor regístrate :)");
                    return;
                }

                this.$bus.$emit("showUserInfo", this.post.user._id);
                this.$emit("close");
            },
            styles(url) {
                return {
                    'background-image': `url(${url})`,
                }
            },
            showMoreContent() {
                this.showMore = true;
            }
        },
        mounted() {
            this.descriptionEl = this.$refs.descriptionPost;
        },
        computed: {
            ...mapState({
                isAuthenticated: state => state.auth.authenticated
            }),
            fullName() {
                return this.post.user.firstName +  " " + this.post.user.lastName
            },
            isDescriptionHigher() {
                return this.descriptionEl && (this.descriptionEl.scrollHeight - 1) > 90;
            },
            formattedDate(){
                return moment(this.post.createdAt).format('D MMM, kk:mm');
            }
        }
    }
</script>
<style lang="scss" >

    .PostItem {
        background: white;
        max-width: 100%;
        border: 1px solid #c5c5c5;
        width: 100%;
        max-width: 700px;
        margin-bottom: 2em;
        border-radius: 2px;
        p {
            margin: 0;
        }

        &__card{
            display: flex;
            min-height: 420px;

            &Photo {
                width: 230px;
                flex: 1;

                img {
                    width: 100%;
                    height: 100%;
                }

                &Item{
                    background-position: center;
                    width: 100%;
                    min-height: 420px;
                    background-size: cover;
                    height: 100%;
                }
            }

            &Content {
                width: 330px;
                margin: 0px;
                position: relative;
                padding-bottom: 35px;

                h2 {
                    word-break: break-word;
                }

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
                        background: #009900;
                        border: none;
                        padding: 15px;
                        color: white;
                        border-radius: 5px;
                        height: 20px;
                        max-width: 90px;
                        line-height: 0px;
                    }
                }

                &Description {
                    font-size: 15px;
                    margin-top: 10px;
                    &Text {
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

                    &Link{
                        color: #009900;
                    }

                    &Link:hover{
                        text-decoration-line: none;
                    }

                    &Text--full-text {
                        -webkit-line-clamp: inherit;
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

                &Map{
                    display: none;
                }
            }
        }
    }

    @media (max-width: 650px) {
        .PostItem__card{
            flex-direction: column;

            &Photo{
                width: 100%;
                flex: 1;
                height: 250px;
            }

            &Content{
                width: 100%;
                flex: 1;
                padding-bottom: 40px;
            }

            &PhotoItem{
                height: 250px;
            }

            &Contact {
                position: absolute;
                bottom: 0;
                width: 100%;
                display: flex;

                &Button {
                    flex: 1;
                }

                &Map{
                    display:inherit;
                    flex: 1;

                    a {
                        margin: 0 auto;
                        color: white;
                        text-decoration: none;
                    }
                }
            }
        }
    }

    .VueCarousel-pagination {
        position: absolute;
        bottom: 0;
    }

    .VueCarousel, .VueCarousel-wrapper, .VueCarousel-inner {
        height: 100%;
    }
</style>