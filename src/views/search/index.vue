<template>
  <div class="search-container">
    <form class="search-form" action="/">
      <van-search
        v-model="searchText"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultSh = false"
      />
    </form>
    <search-result v-if="isResultSh" :searchText="searchText"></search-result>
    <search-suggestion
      v-else-if="searchText"
      :searchText="searchText"
      @search="onSearch"
    >
    </search-suggestion>
    <search-history
      v-else
      :SearchHistorys="SearchHistory"
      @updataSearch="SearchHistory = []"
      @search="onSearch"
    ></search-history>
  </div>
</template>

<script>
import{setItem, getItem} from '../../utils/storage'
import SearchHistory from "./component/SearchHistory.vue";
import SearchSuggestion from "./component/SearchSuggestion.vue";
import SearchResult from "./component/SearchResult.vue";
export default {
  name: "searchContainer",
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult,
  },
  data() {
    return {
      searchText: "",
      isResultSh: false,
      SearchHistory: getItem('TOUTIAO_SEARCH_HISTORIES') || [],
    };
  },
  watch: {
    SearchHistory(value) {
      setItem('TOUTIAO_SEARCH_HISTORIES', value)
    }
  },
  methods: {
    onSearch(val) {
      this.searchText = val;

      const index = this.SearchHistory.indexOf(val);
      if (index !== -1) {
        this.SearchHistory.splice(index, 1);
      }
      this.SearchHistory.unshift(val);

      this.isResultSh = true;
    },
    onCancel() {
      this.$router.back();
    },
  },
};
</script>

<style lang="less" scoped>
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>