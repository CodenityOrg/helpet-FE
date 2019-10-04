<template>
    <Modal>
        <PostListItem
            :post="post"
        />
    </Modal>
</template>
<script>
    import PostListItem from "./PostsListItem";
    import Modal from "../common/Modal";
    export default {
        name: "PostListItemModal",
        components: {
            PostListItem,
            Modal
        },
        props: ["post"]
    }
</script>