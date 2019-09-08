<template>
    <Dropdown 
        :options="options"
        @selectOption="handleSelectOption"
        :showSelectedOption="false"
    >
        <span style="font-size: 16px;">
            <font-awesome-icon icon="sort" />
            Ordenar por...
        </span>
    </Dropdown>
</template>
<script>
import Dropdown from "../common/Dropdown";
import {mapState} from "vuex";

export default {
    name: "TypeFilters",
    components: {
        Dropdown
    },
    data() {
        return {
            options: [
                {
                    label: "Mas recientes",
                    value: "desc"
                },
                {
                    label: "Antiguos",
                    value: "asc"
                }
            ]
        }
    },
    methods: {
        handleSelectOption(option) {
            this.$store.commit("RESET_POSTS");
            this.$store.commit("SET_FILTERS", {
                ...this.filters,
                order: option.value
            })
        }
    },
    computed: {
        ...mapState({
            filters: state => state.pet.filters
        })
    }
}
</script>