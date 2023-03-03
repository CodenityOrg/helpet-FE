<template>
    <Modal
        class="position: relative;"
        @close="closeModal"
    >
        <div @click="closeModal" style="margin: 10px; cursor: pointer; position: absolute; z-index: 999; top: -75px; right: 0;"><font-awesome-icon icon="times" /></div>
        <PostListItem
            :post="post"
            @close="closeModal"
        />
    </Modal>
</template>
<script>
    import PostListItem from "./PostsListItem.vue";
    import Modal from "../common/Modal.vue";
    export default {
        name: "PostListItemModal",
        components: {
            PostListItem,
            Modal
        },
        props: ["post"],
        methods: {
            closeModal() {
                this.$bus.$emit("hidePost");
            }
        }
    }
</script>