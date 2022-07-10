<template>
  <div class="login-container">
    <!--    导航栏 -->
    <van-nav-bar
      @click-left="$router.back()"
      left-text="返回"
      class="page-nav-bar"
      title="登录"
    >
    </van-nav-bar>
    <!-- 表单 -->
    <van-form @submit="onSubmit" ref="formRef">
      <van-cell-group>
        <van-field
          v-model="user.mobile"
          required
          name="mobile"
          :rules="rules.mobile"
          placeholder="请输入手机号"
        >
          <i slot="left-icon" class="icon-shouji" style="font-size: 22px"> </i>
        </van-field>
        <!-- :rules="[{ required: true, message: '请填写用户名' }]" -->
        <van-field
          v-model="user.code"
          required
          name="code"
          :rules="rules.code"
          placeholder="请输入验证码"
          ><i
            slot="left-icon"
            class="icon-yanzhengma"
            style="font-size: 22px"
          ></i>
          <template #button>
            <van-count-down
              v-if="isCountDownShow"
              slot="button"
              :time="1000 * 5"
              format="ss s"
              @finish="isCountDownShow = false"
            />
            <van-button
              size="small"
              class="send-sms-btn"
              native-type="button"
              round
              v-else
              type="default"
              @click="onSendCode"
              >发送验证码</van-button
            >
          </template>
        </van-field>
      </van-cell-group>
      <div style="margin: 16px" class="login-btn-wrap">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendCode } from "@/api/user";
import { mapMutations } from "vuex";
// import store from "@/store";
export default {
  name: "Login",
  data() {
    return {
      user: {
        mobile: "",
        code: "",
      },
      rules: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: "手机号格式错误",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式错误",
          },
        ],
      },
      // 倒计时
      isCountDownShow: false,
    };
  },
  methods: {
    // 登录
    ...mapMutations("user", ["saveUser"]),
    async onSubmit() {
      this.$toast.loading({
        message: "登录中...",
        forbidClick: true,
        duration: 0,
      });
      try {
        const res = await login(this.user);
        // this.$store.commit("saveUser", res.data.data);
        // console.log(res);
        this.saveUser(res.data);
        this.$toast.success("登录成功！");
        this.$router.replace("/my");
      } catch (error) {
        if (err.response.status === 400) {
          this.$toast.fail("手机号或验证码错误");
        } else {
          this.$toast.fail("登录失败，请稍后重试");
        }
      }
    },
    // 发送验证码
    async onSendCode() {
      try {
        await this.$refs.formRef.validate("moblie");
      } catch (error) {}
      this.isCountDownShow = true;
      try {
        await sendCode(this.user.mobile);
        this.$toast("发送成功");
      } catch (error) {
        this.isCountDownShow = false;
        if (error.response.status === 429) {
          this.$toast("发送太频繁了，请稍后重试");
        } else {
          this.$toast("发送失败，请稍后重试");
        }
      }
    },
  },
};
</script>

<style lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 180px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .van-button--info {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>