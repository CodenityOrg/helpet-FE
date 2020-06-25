<template>
    <Dropdown 
        :options="options"
        @selectOption="handleSelectOption"
        :showSelectedOption="false"
    >
        <span style="font-size: 16px;">
            <font-awesome-icon icon="filter" />
            {{$t('publications.filterButton')}}
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
                    label: this.$t('publications.filters.losts'),
                    value: 0
                },
                {
                    label: this.$t('publications.filters.found'),
                    value: 1
                }
            ]
        }
    },
    methods: {
        handleSelectOption(option) {
            this.$store.commit("RESET_POSTS");
            this.$store.commit("SET_FILTERS", {
                ...this.filters,
                types: option.value
            });
        }
    },
    computed: {
        ...mapState({
            filters: state => state.pet.filters
        }),
        types() {
            return this.filters && this.filters.types;
        }
    }
}
</script>