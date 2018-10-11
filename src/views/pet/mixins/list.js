export default {
    methods: {
        async scrollEnd() {
            this.isListLoading = true;
            await this.getItems({ limit: this.limit, skip: this.skip });
            this.skip = this.skip + this.limit;
            this.isListLoading = false;
        }
    },
    data() {
        return {
            skip: 0,
            limit: 5,
            isListLoading: false
        }
    }
}