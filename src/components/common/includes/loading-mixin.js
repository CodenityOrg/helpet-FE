import Loading from "vue-loading-overlay"
import "vue-loading-overlay/dist/vue-loading.min.css"
export default {
  components: {
    loading: Loading
  },
  data() {
    return {
      isLoading: true,
      fullPage: true
    }
  },
  mounted() {
    if (this.getFoundPosts === undefined) {
      this.isLoading = false
    }
  },
  beforeUpdate() {
    // this.isLoading = true
  }
}
