<template>
  <div
    ref="container"
    style="height: 500px; overflow-y: scroll;"
    @scroll="scrollHandler"
  >
    <slot/>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: 'InfiniteList',
    created () {
      //this.getMoreItems();
    },
    methods: {
      /* async getMoreItems() {
        let items;
        const {limit, fnFetch} = this.options;
        if (!this.fnFetch) {
          const { url } = this.options;
          items = await axios.get(url + "?skip="+ this.skip + "&limit=" + limit).then(resp => resp.data);
        } else {
          items = await fnFetch({ skip: this.skip, limit })
        }

        this.skip += limit;
        this.$emit("newItems", items);
      }, */
      // TODO: Add verification if scroll reach container bottom 
      async scrollHandler() {
        if (this.isAtTheBottom()) {
            this.$emit("scrollEnd");
        }
      },
      isAtTheBottom() {
        const container = this.$refs.container;
        return (container.scrollHeight - container.scrollTop ) === (container.clientHeight );
      }
    },
    data() {
      return {
        skip: 0,
        onContainerBottom: true
      }
    },
    props: {
      options: {
        type: Object,
      }
    }
  }
</script>

