


<template functional>
    <button
        :class="data.staticClass"
        v-on="listeners"
        class="ButtonBasic">
        <slot />
    </button>
</template>
<style scoped>
    .ButtonBasic {
        background: #009900;
        border: none;
        padding: 10px 15px;
        color: white;
        font-size: 1em;
    }

    .ButtonBasic:hover {
        background: #039603;
    }
</style>>
