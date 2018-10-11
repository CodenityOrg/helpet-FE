export default {
    methods: {
        async scrollEnd() {
            this.isLoading = true;
            await this.getItems({ limit: this.limit, skip: this.skip });
            this.skip = this.skip + this.limit;
            this.isLoading = false;
        }
    },
    data() {
        return {
            skip: 0,
            limit: 5,
            isLoading: false
        }
    }
}