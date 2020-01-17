<template>
    <div class="Modal">
        <div class="Modal__foreshadownBg" @click="$emit('close')"></div>
        <div class="Modal__content">
<!--             <slot name="header" class="Modal__contentHeader"></slot>
 -->
            <div class="Modal__contentBody">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: ""
}
// export default {
//     mounted () {
//         const bgDivEl = document.createElement("div");
//         bgDivEl.className = "Modal__foreshadownBg";
//         bgDivEl.onclick = () => this.$emit("close");
//         document.body.append(bgDivEl);
//     },
//     beforeDestroy() {
//         document.body.querySelector(".Modal__foreshadownBg").remove();
//     }
// }
</script>
<style lang="scss">
    .Modal{
        &__foreshadownBg {
            background: rgba(0, 0, 0, .7);
            width: 100%;
            height: 100vh;
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1000;
            color: #2a2a2a;
            /* display: none; */
        }

        &__content {
            width: 535px;
            height: 297px;
            background: white;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 9999;
            &Header{
                position: absolute;
                width: 100%;
            }

            &Body{
                display: flex;
                align-items: center;
                height: 100%;
                padding: 0;
            }
        }
    }

    @media (max-width: 650px) {
        .Modal__content{
            width: 100%;
        }
    }

</style>