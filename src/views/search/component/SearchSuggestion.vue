<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(text, index) in suggests"
      :key="index"
      icon="search"
      @click="$emit('search', text)"
    >
      <div slot="title" v-html="highlight(text)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from "../../../api/search";
import { debounce } from "lodash";
export default {
  name: "SearchSuggestion",
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      suggests: [],
    };
  },
  watch: {
    searchText: {
      handler: debounce(function (value) {
        this.loadSearchSuggestion(value);
      }, 200),
      immediate: true,
    },
  },
  methods: {
    async loadSearchSuggestion(q) {
      try {
        const { data } = await getSearchSuggestion(q);
        this.suggests = data.data.options;
      } catch (error) {
        this.$toast("数据获取失败");
      }
    },
    highlight(text) {
      const highlightStr = `<span class="active">${this.searchText}</span>`
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg,highlightStr)
    }
  },
};
</script>

<style lang="less" scoped>
  .search-suggestion{
    /deep/ span.active {
      color: #3296fa !important;
    }
  }
</style>