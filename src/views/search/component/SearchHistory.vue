<template>
  <div class="search-history">
    <van-cell title="索索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('updataSearch')">全部删除 </span>
        <span @click="isDeleteShow = false"> 完成</span>
      </div>
      <van-icon v-else name="delete" @click="isDeleteShow = true"></van-icon>
    </van-cell>
    <van-cell :title="item" v-for="(item, index) in SearchHistorys" :key="index" @click="onSerrchItemClick(item,index)">
      <van-icon name="close" v-if="isDeleteShow"></van-icon>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "SearchHistory",
  props: {
    SearchHistorys: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isDeleteShow: false,
    };
  },
  methods: {
    onSerrchItemClick(item, index) {
      if(this,this.isDeleteShow) {
        this.SearchHistorys.splice(index,1)
      }else {
        this.$emit('search', item)
      }
    }
  }
};
</script>

<style lang="less" scoped>
</style>