<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isRefreshloading"
      :success-duration="1500"
      :success-text="refreshSuccessText"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <ArticleItem
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        />
        <!-- <van-cell
          v-for="(article, index) in list"
          :key="index"
          :title="article.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from "@/api/user";
import ArticleItem from "../../../components/article-item/index.vue";
export default {
  name: "ArticleList",
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      timestamp: null,
      refreshSuccessText: "登录成功",
      isRefreshloading: false,
    };
  },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async onLoad() {
      try {
        const res = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
        });
        const { results } = res.data;
        this.list.push(...results);
        this.loading = false;
        if (results.length) {
          this.timestamp = res.data.pre_timestamp;
        } else {
          this.finished = true;
        }
      } catch (err) {
        this.error = true;
        this.loading = false;
      }
    },
    async onRefresh() {
      try {
        const res = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
        });
        const { results } = res.data;
        this.list.unshift(...results);
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`;
        this.isRefreshloading = false;
      } catch (error) {
        this.refreshSuccessText = "刷新失败";
        this.isRefreshloading = false;
      }
    },
  },
  components: { ArticleItem },
};
</script>

<style lang="less" scoped>
/deep/.article-list {
  position: fixed;
  top: 180px;
  bottom: 100px;
  right: 0;
  left: 0;
  overflow-y: auto;
}
</style>