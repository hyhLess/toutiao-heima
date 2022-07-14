<template>
  <div class="my-container">
    <!-- 已登录：用户信息 -->
    <div v-if="$store.state.user.user" class="user-info-wrap">
      <!-- 头像及资料 -->
      <div class="data-box">
        <div class="head-box" @click="toUserInfo">
          <img :src="userInfo.photo" />
          <span>{{ userInfo.name }}</span>
        </div>
        <div class="change-data">
          <van-button
            size="small"
            class="change-btn"
            round
            type="default"
            to="/user/profile"
            >编辑资料</van-button
          >
        </div>
      </div>
      <!-- 关注及粉丝 -->
      <div class="content-box">
        <div class="box-item">
          <span>{{ userInfo.art_count }}</span>
          <span>头条</span>
        </div>
        <div class="box-item">
          <span>{{ userInfo.follow_count }}</span>
          <span>关注</span>
        </div>
        <div class="box-item">
          <span>{{ userInfo.fans_count }}</span>
          <span>粉丝</span>
        </div>
        <div class="box-item">
          <span>{{ userInfo.like_count }}</span>
          <span>获赞</span>
        </div>
      </div>
    </div>
    <!-- 未登录 -->
    <div v-else class="not-login" @click="$router.push('/login')">
      <img src="@/assets/mobile.png" />
      <span>点击登录</span>
    </div>
    <div class="grid-nav"></div>
    <van-cell title="消息通知" is-link url="" />
    <van-cell title="实名认证" is-link url="" />
    <van-cell title="用户反馈" is-link url="" />
    <van-cell title="小智同学" is-link url="" />
    <van-cell title="系统设置" is-link url="" />
    <!-- 退出 -->
    <van-cell-group v-if="$store.state.user.user" @click="onLogout"
      >退出登录</van-cell-group
    >
    <!-- /退出 -->
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  name: "My",
  components: {},
  props: {},
  data() {
    return {
      // userInfo: {},
    };
  },
  computed: {
    ...mapState("user", ["userInfo"]),
  },
  watch: {},
  created() {},
  mounted() {
    if (this.$store.state.user.user) {
      this.getUerInfo();
    }
  },
  methods: {
    ...mapMutations("user", ["saveUser"]),
    ...mapActions("user", ["getUerInfo"]),
    onLogout() {
      // 退出提示
      // 在组件中需要使用 this.$dialog 来调用弹框组件
      this.$dialog
        .confirm({
          title: "确认退出吗？",
        })
        .then(() => {
          // on confirm
          // 确认退出：清除登录状态（容器中的 user + 本地存储中的 user）

          this.saveUser(null);
        })
        .catch(() => {
          // on cancel
          console.log("取消执行这里");
        });
    },
    // async getUerInfo() {
    //   const res = await reqGetUserInfo();
    //   this.userInfo = res.data;
    // },
    toUserInfo() {
      this.$bus.$emit("userInfo", this.userInfo);
      this.$router.push({
        name: "user",
      });
    },
  },
};
</script>

<style scoped lang="less">
.not-login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 361px;
  background: url("@/assets/banner.png") no-repeat;
  background-size: cover;
  span {
    margin-top: 20px;
    font-size: 30px;
    color: #fff;
  }
  img {
    width: 132px;
    height: 132px;
  }
}
.user-info-wrap {
  height: 361px;
  background: url("@/assets/banner.png") no-repeat;
  background-size: cover;
  color: #fff;
  font-size: 35px;
  display: flex;
  flex-direction: column;
  .data-box {
    flex: 3;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .head-box {
      width: 375px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      img {
        margin-left: 30px;
        display: block;
        border-radius: 100%;
        width: 132px;
        height: 132px;
      }
    }
    .change-data {
      width: 375px;

      position: relative;
      .van-button {
        position: absolute;
        right: 30px;
        transform: translateY(-30px);
      }
    }
  }
  .content-box {
    flex: 2;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .box-item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}
.grid-nav {
  margin-bottom: 20px;
}
.van-cell-group {
  margin-top: 20px;
  text-align: center;
  height: 88px;
  line-height: 88px;
  font-size: 30px;
}
</style>
