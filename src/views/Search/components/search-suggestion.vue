<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(text, index) in suggestions"
      :key="index"
      @click="$emit('search', text)"
    >
      <div slot="title" v-html="highlight(text)"></div>
    </van-cell>
  </div>
</template>

<script>
import { debounce } from "lodash";
import { reqLoadSearchSuggestion } from "@/api/search";
export default {
  name: "SearchSuggestion",
  components: {},
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      suggestions: [],
    };
  },
  computed: {},
  watch: {
    searchText: {
      handler: debounce(function (value) {
        this.loadSearchSuggestion(value);
      }, 200),
      // handler (value) {
      //   this.loadSearchSuggestions(value)
      // },
      immediate: true,
    },
  },
  created() {},
  mounted() {},
  methods: {
    async loadSearchSuggestion(value) {
      try {
        const res = await reqLoadSearchSuggestion({
          q: value,
        });
        res.data.options = this.suggestions;
      } catch (error) {
        this.$toast("数据获取失败，请稍后重试");
      }
    },
    highlight(text) {
      const highlightStr = `<span class="active">${this.searchText}</span>`;
      const reg = new RegExp(this.searchText, "gi");
      return text.replace(reg, highlightStr);
    },
  },
};
</script>

<style scoped lang="less">
.search-suggestion {
  /deep/ span.active {
    color: red;
  }
}
</style>
