<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from "../../../api/search";
export default {
  name: "SearchResult",
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
    };
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      try {
        const { data } = await getSearchResult({
          page: this.page,
          per_page: this.perPage,
          q: this.searchText,
        });
        console.log(data);
        const { results } = data.data;
        this.list.push(...results);
        this.loading = false;
        // 加载状态结束
        if (results.length) {
          this.page++;
        } else {
          this.finished = true;
        }
        // 数据全部加载完成
      } catch (error) {
        this.$toast("数据加载失败");
      }
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    },
  },
};
</script>

<style lang="less" scoped>
</style>