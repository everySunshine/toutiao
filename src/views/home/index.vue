<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button slot="title" type='info' size="small" round icon="search" class="search-btn">
          搜索
      </van-button>
    </van-nav-bar>
    <van-tabs v-model="active" animated swipeable class="channel-tabs">
      <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id">
        <article-list :channels="channel"></article-list>
      </van-tab>
      <div slot="nav-right" class="hamburger-btn" @click="isChennelEditShow = true">
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
      <channel-edit :channels='channels' :mychannel="mychannel"></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import {getUserchannel, getmychannels} from '../../api/user'
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/chennel-edit.vue'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  data() {
    return {
      active: 0,
      channels: [],
      isChennelEditShow: false,
      mychannel:[]
    }
  },
  created() {
    this.loadChannel()
    this.loadMyChannel()
  },
  methods: {
    async loadChannel() {
      try {
        const {data} = await getUserchannel()
        this.channels = data.data.channels
      } catch (error) {
        this.$toast('获取频道列表失败')
      }
    },
    async loadMyChannel() {
      const {data} = await getmychannels()
      this.mychannel = data.data.channels
    }
  }
}
</script>

<style lang="less" scoped>
  .home-container{
    padding-top: 174px;
    padding-bottom: 100px;
   /deep/ .page-nav-bar {
      background-color: #3296fa;
      .van-nav-bar__title {
        max-width: unset;
      }
      .search-btn{
        width: 555px;
        height: 64px;
        background-color: #5babfb;
      }
    }
    /deep/ .channel-tabs {
      .van-tabs__wrap{
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
      .van-tab--active{
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