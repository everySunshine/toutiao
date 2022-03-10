<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        class="search-btn"
        to="/search"
      >
        搜索
      </van-button>
    </van-nav-bar>
    <van-tabs v-model="active" animated swipeable class="channel-tabs">
      <van-tab
        :title="channel.name"
        v-for="(channel,index) in mychannel"
        :key="index"
      >
        <article-list :channels="channel"></article-list>
      </van-tab>
      <div
        slot="nav-right"
        class="hamburger-btn"
        @click="isChennelEditShow = true"
      >
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <van-popup
      v-model="isChennelEditShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '90%' }"
    >
      <channel-edit
        :channels="recommendChannel"
        :mychannel="mychannel"
        :currindex="active"
        @addchennel="alartmychann"
        @changehomechannel="onchange"
        @delmychannel="delchannel"
      ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import {
  getUserchannel,
  getmychannels,
  addmychannels,
  delmychannels,
} from "../../api/user";
import { setItem, getItem } from "../../utils/storage";
import { mapState } from "vuex";
import ArticleList from "./components/article-list.vue";
import ChannelEdit from "./components/chennel-edit.vue";
export default {
  name: "HomeIndex",
  components: {
    ArticleList,
    ChannelEdit,
  },
  data() {
    return {
      active: 0,
      channels: [],
      isChennelEditShow: false,
      mychannel: [],
    };
  },
  created() {
    this.loadChannel();
    this.loadMyChannel();
  },
  methods: {
    async loadChannel() {
      const { data } = await getUserchannel();
      this.channels = data.data.channels;
    },
    async loadMyChannel() {
      try {
      if(this.user) {
        const { data } = await getmychannels();
        this.mychannel = data.data.channels;
      }else {
        const loadChannel = getItem('TOUTIAO_CHANNELS')
        console.log('获取load');
        if(loadChannel) {
          console.log('yes');
          this.mychannel = loadChannel
        }else {
          console.log('no');
          const { data } = await getUserchannel();
          this.mychannel = data.data.channels;
        }
       }
      } catch (error) {
        this.$toast("获取频道列表失败");
      }
    },
    async alartmychann(value) {
      this.mychannel.push(value);
      if (this.user) {
        try {
          const req = await addmychannels({
            id: value.id,
            seq: this.mychannel.length,
          });
          console.log(req);
        } catch (error) {
          this.$toast("保存失败");
        }
      } else {
        setItem("TOUTIAO_CHANNELS", this.mychannel);
      }
    },
    onchange(index, isChennelEditShow = true) {
      this.active = index;
      this.isChennelEditShow = isChennelEditShow;
    },
    async delchannel(index, value) {
      this.mychannel.splice(index, 1);
      try {
        if (this.user) {
          await delmychannels(value.id);
        } else {
          setItem("TOUTIAO_CHANNELS", this.mychannel);
        }
      } catch (error) {
        this.$toast('操作失败')
      }
    },
  },
  computed: {
    recommendChannel() {
      const channels = [];
      this.channels.forEach((channel) => {
        const ret = this.mychannel.find((mychannel) => {
          return mychannel.id === channel.id;
        });
        if (!ret) {
          channels.push(channel);
        }
      });
      return channels;
    },
    ...mapState("user", ["user"]),
  },
};
</script>

<style lang="less" scoped>
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  /deep/ .page-nav-bar {
    background-color: #3296fa;
    .van-nav-bar__title {
      max-width: unset;
    }
    .search-btn {
      width: 555px;
      height: 64px;
      background-color: #5babfb;
    }
  }
  /deep/ .channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
    }
    .van-tab {
      min-width: 200px;
      border-right: 1px solid #dedff3;
      font-size: 30px;
      color: #777777;
    }
    .van-tab--active {
      color: #333333;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tabs__line {
      bottom: 8px;
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
    }
  }
  .hamburger-btn {
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 66px;
    height: 80px;
    background-color: #fff;
    opacity: 0.5;
    i.toutiao {
      font-size: 33px;
    }
  }
}
</style>