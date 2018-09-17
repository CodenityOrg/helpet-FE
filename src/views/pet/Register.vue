<template>
    <form action="">
        <div>
            <label for="">Descripcion</label>
            <input type="text" v-model="post.description">
        </div>
        <div>
            <label for="">Direccion</label>
            <input type="text" v-model="post.address">
        </div>
    </form>
</template>
<script>
export default {
    name: "PostRegister",
    data() {
        return {
            post: {
                description: "",
                address: "",
                features: []
            }
        }
    }
}
</script>
