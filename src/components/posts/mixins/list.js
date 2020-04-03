import * as _ from "lodash";

export default {
    methods: {
        scrollEnd: _.throttle(async function () {
            this.isLoading = true;
            await this.getItems({ limit: this.limit, skip: this.skip });
            this.skip = this.skip + this.limit;
            this.isLoading = false;
        }, 350)
    },
    data() {
        return {
            skip: 0,
            limit: 5,
            isLoading: false
        }
    }
}