<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        type="danger"
        round
        size="small"
        plain
        class="edit-btn"
        @click="isEdit = !isEdit"
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item
        v-for="(value, index) in mychannel"
        :key="index"
        class="grid-item"
        @click="clickMychannel(value, index)"
      >
        <van-icon name="clear" slot="icon" v-show="isEdit"></van-icon>
        <span
          class="text"
          slot="text"
          :class="{ active: currindex == index }"
          >{{ value.name }}</span
        >
      </van-grid-item>
    </van-grid>
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item
        v-for="(value,index) in channels"
        :key="index"
        icon="plus"
        :text="value.name"
        class="grid-item"
        @click="addchannels(value)"
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
      required: true,
    },
    mychannel: {
      type: Array,
      required: true,
    },
    currindex: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isEdit: false,
    };
  },
  methods: {
    addchannels(value) {
      console.log(value);
      this.$emit("addchennel", value);
    },
    clickMychannel(value,index) {
      if(this.isEdit){
        if(index <= this.currindex){
          this.$emit('changehomechannel',this.currindex-1, true)
        }
        this.$emit('delmychannel',index, value)
      }else{
        this.$emit('changehomechannel',index, false)
      }
    }
  },
};
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333;
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
      }
      .active {
        color: #f85959;
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
        .van-grid-item__text {
          margin-top: 0;
        }
      }
    }
  }
}
</style>>