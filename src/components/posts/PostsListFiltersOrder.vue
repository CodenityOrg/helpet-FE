<template>
    <Dropdown 
        :options="options"
        @selectOption="handleSelectOption"
        :showSelectedOption="false"
    >
        <span style="font-size: 16px;">
            <font-awesome-icon icon="sort" />
            {{$t('publications.orderButton')}}
        </span>
    </Dropdown>
</template>
<script>
import Dropdown from "../common/Dropdown.vue";
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
                    label: this.$t('publications.filters.recent'),
                    value: "desc"
                },
                {
                    label: this.$t('publications.filters.old'),
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