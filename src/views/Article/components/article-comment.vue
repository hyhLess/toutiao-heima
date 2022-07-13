<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="已显示全部评论"
    :error="error"
    error-text="加载失败，请点击重试"
    :immediate-check="false"
    @load="onLoad"
  >
    <comment-item
      v-for="(item, index) in list"
      :key="index"
      :comment="item"
      @reply-click="$emit('reply-click', $event)"
    />
  </van-list>
</template>

<script>
import { getArticleComment } from "@/api/comment";
import commentItem from "./comment-item.vue";
export default {
  components: { commentItem },
  name: "ArticleComment",
  props: {
    source: {
      type: [Number, String, Object],
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null, // 获取下一页数据的标记
      limit: 30,
      error: false,
    };
  },
  created() {
    // 当你手动初始 onLoad 的话，它不会自动开始初始的 loading
    // 所以我们要手动的开启初始 loading
    this.loading = true;
    this.onLoad();
  },
  methods: {
    async onLoad() {
      try {
        const res = await getArticleComment({
          type: this.type,
          source: this.source.toString(),
          offset: this.offset,
          limit: this.limit,
        });
        const { results } = res.data;
        this.list.push(...results);
        this.$emit("onload-success", results);
        this.$bus.$on("getCommont", (data) => {
          this.list.unshift(data);
        });
        this.loading = false;
        this.finished = true;

        if (results.length) {
          this.offset = null;
        } else {
          this.finished = true;
        }
      } catch (err) {
        this.error = true;
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped lang="less">
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>