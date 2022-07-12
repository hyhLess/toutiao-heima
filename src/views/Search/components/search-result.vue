<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="加载失败，请点击重试"
      @load="onLoad"
    >
      <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from "@/api/search";

export default {
  name: "SearchResult",
  components: {},
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
      error: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      try {
        const res = await getSearchResult({
          q: this.searchText,
          page: this.page,
          per_page: this.perPage,
        });
        this.list.push(...res.data.results);
        this.loading = false;
        if (res.data.results.length) {
          this.page++;
        } else {
          this.finished = true;
        }
      } catch (error) {
        this.$toast.fail("搜索接口暂时无法使用");
        this.finished = true;
        this.$router.replace("/");
      }
    },
  },
};
</script>

<style scoped lang="less"></style>
