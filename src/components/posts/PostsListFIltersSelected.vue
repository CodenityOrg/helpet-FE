<template>
    <div class="PostListFiltersSelected">
        <ul class="PostListFiltersSelected__List">
            <li
                class="PostListFiltersSelected__ListItem"
                :key="index"
                v-for="(filter, index) in flattenedFilters"
            >
                {{filter.label}}
                <a
                    v-if="filter.isDeletable" 
                    style="color: white; margin: 0 5px;"
                    @click="removeFilter(filter)"
                    href="#"
                >
                    X
                </a>
            </li>
        </ul>
    </div>
</template>

<script>

import {mapState} from "vuex";
import {forEach, cloneDeep} from "lodash";
export default {
    computed:{
        ...mapState({
            filters: state => state.pet.filters
        }),
        flattenedFilters() {
            const flattenedFilters = [];
            forEach(this.filters, (value, key) => {
                if (key === "order") {
                    if (value === "asc") {
                        flattenedFilters.push({
                            label: this.$t('publications.filters.old'),
                            value,
                            type: key
                        });         
                    } else if (value === "desc") {
                        flattenedFilters.push({
                            label: this.$t('publications.filters.recent'),
                            value,
                            type: key
                        });
                    }
                }

                if (key === "types") {
                    if (value === 1) {
                        flattenedFilters.push({
                            label: this.$t('publications.filters.found'),
                            value,
                            type: key
                        });
                    }

                    if (value === 0) {
                        flattenedFilters.push({
                            label: this.$t('publications.filters.losts'),
                            value,
                            type: key
                        });
                    }
                }
            });
            return flattenedFilters;
        }
    },
    methods: {
        removeFilter(filterToRemove) {
            const filters = cloneDeep(this.filters);
            this.$store.commit("RESET_POSTS");
            if (filterToRemove.type === "order") {
                this.$store.commit("SET_FILTERS", {
                    ...this.filters,
                    order: ""
                })
            } 

            if (filterToRemove.type === "types") {
                const idx = filters.types.findIndex(type => type === filterToRemove.value);
                filters.types.splice(idx, 1);
                this.$store.commit("SET_FILTERS", {
                    ...this.filters,
                    types: filters.types
                });
            }
        }
    }
}
</script>

<style lang="scss">
    .PostListFiltersSelected {
        &__List{
            display: flex;
            &Item{
                background: green;
                color: white;
                padding: 5px 20px;
                border-radius: 10px;
                margin: 0 5px;
                font-size: 16px;
            }
        }
    }
</style>