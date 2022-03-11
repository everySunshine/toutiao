<template>
      <van-button
      v-if="isfollowed"
      class="follow-btn"
      type="info"
      color="#3296fa"
      round
      size="small"
      icon="plus"
      :loading="Loading"
      @click="onFollow"
      >关注</van-button
    >
    <van-button
      v-else
      class="follow-btn"
      round
      size="small"
      @click="onFollow"
      :loading="Loading"
      >已关注</van-button
    >
</template>

<script>
import { addFollow, delFollow } from "../../api/user";
export default {
  name: "followed",
  props: {
    isfollowed: {
      type: Boolean,
      required:true
    },
    userId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      Loading: false
    }
  },
  methods: {
    async onFollow() {
      this.Loading = true
      try {
        if (this.isfollowed) {
          const { data } = await delFollow(this.userId);
          this.$emit('updata-is_followed', !this.isfollowed)
        } else {
          const { data } = await addFollow(this.userId);
          this.$emit('updata-is_followed', !this.isfollowed)
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          this.$toast("操作失败，你不能关注你自己");
        } else {
          this.$toast("操作失败，请重试");
        }
      }
      this.Loading = false
    },
  }
};
</script>

<style>
</style>