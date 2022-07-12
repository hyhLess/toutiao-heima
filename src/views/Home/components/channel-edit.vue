<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        class="edit-btn"
        type="danger"
        plain
        round
        size="mini"
        @click="isEdit = !isEdit"
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in myChannels"
        :key="index"
        @click="onMyChannelClick(channel, index)"
      >
        <!--
          v-bind:class 语法
          一个对象，对象中的 key 表示要作用的 CSS 类名
                    对象中的 value 要计算出布尔值
                      true，则作用该类名
                      false，不作用类名
         -->

        <van-icon v-show="isEdit" slot="icon" name="clear"></van-icon>
        <span class="text" :class="{ active: index === active }" slot="text">{{
          channel.name
        }}</span>
      </van-grid-item>
    </van-grid>
    <van-cell title="频道推荐" :border="false"></van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="channel-item"
        v-for="item in recommendChannels"
        :key="item.id"
        :text="item.name"
        @click="onAddChannel(item)"
      />
    </van-grid>
  </div>
</template>

<script>
import {
  addUserChannel,
  reqAllChannels,
  reqDeteleChannel,
} from "@/api/channels";
import { getItem, setItem } from "@/utils/storage";
export default {
  name: "ChannelEdit",
  props: {
    myChannels: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
    isChennelEditShow: {
      type: Boolean,
      require: true,
    },
  },
  data() {
    return {
      allChannels: [], // 所有频道
      isEdit: false, // 控制编辑状态的显示
      fiexdChannels: [0], // 固定频道，不允许删除
    };
  },
  computed: {
    recommendChannels() {
      return this.allChannels.filter((item1) => {
        return (
          this.myChannels.findIndex((item2) => item2.id === item1.id) === -1
        );
      });
    },
  },
  watch: {},
  created() {
    this.getAllChannels();
  },
  mounted() {},
  methods: {
    async getAllChannels() {
      const res = await reqAllChannels();
      this.allChannels = res.data.channels;
    },
    onMyChannelClick(channel, index) {
      if (this.isEdit) {
        this.myChannels.splice(index, 1);
        if (index < this.active) {
          this.$emit("update-active", this.active - 1, true);
        }
        this.deteleChannel(channel);
      } else {
        // 非编辑状态，执行切换频道
        this.$emit("update-active", index, false);
      }
    },
    // 添加频道
    async onAddChannel(channel) {
      this.myChannels.push(channel);
      // 判断是否登录
      const user = getItem("user");
      if (user) {
        await addUserChannel({
          channels: {
            id: channel.id,
            seq: this.myChannels.length,
          },
        });
      } else {
        setItem("channels", this.myChannels);
      }
    },
    // 删除
    async deteleChannel(channel) {
      // 判断是否登录
      const user = getItem("user");
      if (user) {
        // 已登录，则将数据更新到线上
        await reqDeteleChannel(channel.id);
      } else {
        // 未登录，将数据更新到本地
        setItem("channels", this.myChannels);
      }
    },
    close() {
      this.$emit("update-active", this.active, false);
    },
  },
};
</script>

<style scoped lang="less">
.channel-edit {
  .title-text {
    font-size: 32px;
    color: #333333;
  }

  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }

  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }

  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }

  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
