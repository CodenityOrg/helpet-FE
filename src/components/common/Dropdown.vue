<template>
    <div
        class="Dropdown"
        v-click-outside="close"
    >
        <div
            class="Dropdown__trigger"
            @click="toggleDropdown"
        >
            <span
                v-if="showSelectedOption"
            >
                {{ selectedOption.label }}
            </span>
            <slot 
                v-else />
        </div>
        <ul
            class="Dropdown__list"
            v-show="!isHidden">
            <li
                class="Dropdown__listItem"
                :key="index"
                v-for="(option, index) in options"
                @click="selectOption(option)"
            >
                {{option.label}}
            </li>
        </ul>
    </div>
</template>
<script>
import {head} from "lodash";
import Vue from "vue";
import vClickOutside from "v-click-outside";

Vue.use(vClickOutside);
export default {
    name: "Dropdown",
    props: {
        options: {
            type: Array,
            required: true
        },
        showSelectedOption: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            localSelectedOption: "",
            isHidden: true
        }
    },
    methods: {
        toggleDropdown() {
            this.isHidden = !this.isHidden;
        },
        selectOption(option) {
            this.localSelectedOption = option;
            this.$emit("selectOption", option);
            this.isHidden = true;
        },
        close() {
            this.isHidden = true;
        }
    },
    computed: {
        selectedOption() {
            return this.localSelectedOption || head(this.options);
        }
    }
}
</script>
<style lang="scss">
    .Dropdown {
        position: relative;
        &__trigger{
            background: none;
            cursor: pointer;
        }

        &__list{
            top: 30px;
            position: absolute;
            width: 150px;
            z-index: 9999;
            background: white;
            border: 1px solid #e8e8e8;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
            &Item{
                padding: 10px;
                cursor: pointer;
            }

            &Item:hover{
                background: #e8e8e8;
            }
            
        }
    }
</style>