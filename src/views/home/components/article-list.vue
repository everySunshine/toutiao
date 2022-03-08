<template>
  <div class="article-list">
    <!-- 下面的组件实现滚动注意要将滚动区域包起来 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
      <article-item v-for="(article, index) in list" :key="index" :article="article">

      </article-item>
        <!-- <van-cell v-for="(article, index) in list" :key="index" :title="article.title" ></van-cell> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getarticlelist } from "../../../api/crticle";
import ArticleItem from "../../../components/article-item/index.vue"
export default {
  name: "ArticleList",
  components: {
    ArticleItem
  },
  props: {
    channels: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      isLoading: false
    };
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      try {
        const { data } = await getarticlelist({
          channel_id: this.channels.id,
          timestamp: this.timestamp || Date.now()
        });
        const { results } = data.data;
        this.list.push(...results);
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if(results.length) {
          this.timestamp = data.data.pre_timestamp
       }else{
         this.finished = true
       }
       } catch (error) {
          this.error = true
          this.loading = false
       }
    },
    async onRefresh() {
      try {
         const { data } = await getarticlelist({
          channel_id: this.channels.id,
          timestamp: Date.now()
        });
        this.list.unshift(...data.data.results)
        this.isLoading = false
      } catch (error) {
        console.log('请求失败');
      }
    }
  },
};
</script>

<style scoped lang='less'>
.article-list{
  height: 85vh;
  overflow-y: auto;
}
</style>