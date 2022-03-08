<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button type="danger" round size="small" plain class="edit-btn">编辑</van-button>
    </van-cell>
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item
        v-for="value in mychannel"
        :key="value"
        :text="value.name"
        class="grid-item"
        icon="clear"
      />
    </van-grid>
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item
        v-for="value in channels"
        :key="value"
        icon="plus"
        :text="value.name"
        class="grid-item"
      />
    </van-grid>
  </div>
</template>

<script>
export default {
  name: "ChannelEdit",
  props: {
    channels: {
      type: Array,
      required:true
    },
    mychannel: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      
    }
  }
};
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 85px 0;
  .title-text{
    font-size: 32px;
    color: #333;
  }
  .edit-btn{
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/ .grid-item{
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text{
        font-size: 28px;
        color: #222;
      }
    }
  }

  /deep/ .my-grid{
    .grid-item {
      .van-icon-clear{
          position: absolute;
          right: -10px;
          top: -10px;
          font-size: 30px;
          color: #cacaca;
          z-index: 2;
      }
    }
  }

 /deep/ .recommend-grid{
    .grid-item {
      .van-grid-item__content{
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
        .van-grid-item__text{
            margin-top: 0;
        }
      }
    }
  }
}
</style>>