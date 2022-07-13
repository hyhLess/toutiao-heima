<template>
  <van-button
    class="follow-btn"
    round
    v-if="value"
    size="small"
    @click="onFollow"
    >已关注</van-button
  >
  <van-button
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    v-else
    size="small"
    icon="plus"
    @click="onFollow"
    >关注</van-button
  >
</template>

<script>
import { addFollow, deleteFollow } from "@/api/article";
export default {
  name: "FollowUser",
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    userId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  methods: {
    async onFollow() {
      return this.$toast.fail("关注功能暂时无法使用");
      this.followLoading = true;
      try {
        // 如果已关注，则取消关注
        const authorId = this.userId;
        if (this.value) {
          await deleteFollow(authorId);
        } else {
          // 否则添加关注
          await addFollow(authorId);
        }

        // 更新视图
        // this.article.is_followed = !this.article.is_followed;
        this.$emit("input", !this.value);
      } catch (err) {
        console.log(err);
        this.$toast.fail("操作失败");
      }

      // 关闭按钮的 loading 状态
      this.followLoading = false;
    },
  },
};
</script>

<style>
</style>