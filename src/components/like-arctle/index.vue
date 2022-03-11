<template>
  <van-icon
    color="#777"
    :class="{ like: value === 1 }"
    :name="value === 1 ? 'good-job' : 'good-job-o'"
    @click="onCollect"
    :loading="loading"
  />
</template>

<script>
import {addlikeArticle, dellikeArticle} from '../../api/crticle'
export default {
  name: "LikeArtcle",
  props: {
    value: {
      type: Number,
      required: true,
    },
    articleId: {
      type: [Object, String, Number],
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async onCollect() {
      this.loading = true;
      try {
        let status = -1
        if (this.value == 1) {
          const { data } = await dellikeArticle(this.articleId);
          console.log(data);
        } else {
          const { data } = await addlikeArticle(this.articleId);
          status = 1
        }
        this.$emit("input",status);
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
      } catch (error) {
        this.$toast.fail("操作失败");
      }

      this.loading = false;
    },
  },
};
</script>

<style lang="less" scoped>
</style>