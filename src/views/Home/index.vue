<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar">
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        to="/search"
        >搜索</van-button
      >
    </van-nav-bar>
    <van-tabs class="channel-tabs" v-model="active" animated swipeable="">
      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
      >
        <!-- 文章列表 -->
        <article-list ref="article-list" :channel="channel" />
        <!-- 文章列表 -->
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div
        slot="nav-right"
        class="hamburger-btn"
        @click="isChennelEditShow = true"
      >
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 频道编辑弹出层 -->
    <van-popup
      v-model="isChennelEditShow"
      class="edit-channel-popup"
      closeable
      close-icon="close"
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
      ><channel-edit
        :my-channels="channels"
        :active="active"
        @update-active="onUpdateActive"
        :isChennelEditShow="isChennelEditShow"
      ></channel-edit
    ></van-popup>
  </div>
</template>

<script>
import { getItem } from "@/utils/storage";
import { mapActions, mapMutations, mapState } from "vuex";
import ArticleList from "./components/article-list";
import ChannelEdit from "./components/channel-edit.vue";
export default {
  name: "Home",
  props: {},
  data() {
    return {
      active: 0,
      isChennelEditShow: false,
    };
  },
  computed: {
    ...mapState("user", ["channels"]),
  },
  watch: {},
  created() {
    // 判断是否登录
    const user = getItem("user");
    if (user) {
      this.getUserChannels();
    } else {
      // 未登录判断本地是否有频道
      const localChannel = getItem("channels");
      if (localChannel) {
        this.GETUSERCHANNELS(localChannel);
      } else {
        this.getUserChannels();
      }
    }
  },
  mounted() {},
  methods: {
    ...mapActions("user", ["getUserChannels"]),
    ...mapMutations("user", ["GETUSERCHANNELS"]),
    onUpdateActive(index, isChennelEditShow = true) {
      // 更新激活的频道项
      this.active = index;
      // 关闭编辑频道弹层
      this.isChennelEditShow = isChennelEditShow;
    },
  },
  components: { ArticleList, ChannelEdit },
};
</script>

<style scoped lang="less">
.home-container {
  .van-nav-bar__title {
    max-width: unset;
  }
  .van-button__icon {
    color: #fff !important;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    color: #fff !important;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  /deep/ .van-tab {
    min-width: 200px;
    border-right: 1px solid #edeff3;
    font-size: 30px;
    color: #777;
  }
  .van-tab-active {
    color: #333;
  }
  .van-tabs__nav {
    padding-bottom: 0;
  }
  .van-tabs__line {
    width: 31px !important;
    height: 6px;
    background-color: #3296fa;
    bottom: 8px;
    z-index: 999;
  }
  .placeholder {
    flex-shrink: 0;
    width: 66px;
    height: 82px;
  }
  .hamburger-btn {
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 66px;
    height: 82px;
    background-color: #fff;
    opacity: 0.9;
    i.toutiao {
      font-size: 33px;
    }
    &&::before {
      content: "";
      display: block;
      position: absolute;
      left: 0;
      width: 2px;
      height: 58px;
      background-image: url(@/assets/gradient-gray-line.png);
      background-size: contain;
    }
  }
  .edit-channel-popup {
    padding-top: 100px;
    box-sizing: border-box;
    // background-color: #9d9c9c;
  }
}
</style>
