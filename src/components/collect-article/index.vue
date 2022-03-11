<template>
  <van-icon
    color="#777"
    :class="{ collected: value }"
    :name="value ? 'star' : 'star-o'"
    @click="onCollect"
    :loading="loading"
  />
</template>

<script>
import { addcollection, delcollection } from "../../api/crticle";
export default {
  name: "collectArticle",
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    articleId: {
      type: [Object, String, Number],
      required: true
    }
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async onCollect() {
      this.loading = true
      try {
        if(this.value){
          const {data} = await delcollection(this.articleId)
          console.log(data);
        }else{
          const {data} = await addcollection(this.articleId)
          console.log(data);
        }
        this.$emit('input', !this.value)
      } catch (error) {
        this.$toast.fail('操作失败')
      }

      this.loading = false
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .collected {
  .van-icon-star-o {
    color: #ffa500;
  }
}
</style>