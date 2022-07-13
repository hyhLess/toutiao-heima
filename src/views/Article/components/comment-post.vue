<template>
  <div class="post-comment">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="优质评论将会被优先展示"
      show-word-limit
    />
    <van-button
      type="primary"
      @click="onPost"
      :disabled="!message.length"
      size="small"
      >发布</van-button
    >
  </div>
</template>

<script>
import { addComment } from "@/api/comment";
export default {
  name: "PostComment",
  components: {},
  props: {
    target: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      message: "",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onPost() {
      // 非空校验
      if (!this.message) {
        return;
      }
      this.$toast({
        message: "发表中",
        forbidClick: true,
        duration: 0,
      });
      try {
        const res = await addComment({
          target: this.target, // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
          content: this.message,
          art_id: null,
        });
        this.$bus.$emit("getCommont", res.data.new_obj);
        this.$emit("post-success");
        this.message = "";
        this.$toast.success("发表成功！");
      } catch (error) {
        this.$toast.fail("发布失败");
      }
    },
  },
};
</script>

<style scoped lang="less">
.post-comment {
  display: flex;
  padding: 15px;
  align-items: flex-end;
  .post-field {
    background: #f5f7f9;
    margin-right: 15px;
  }
}
</style>
