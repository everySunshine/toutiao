<template>
  <div class="comment-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error="error"
      error_text="加载失败，请重新点击"
      :immediate-check="false"
      @load="onLoad"
    >
    <ArticleComment v-for="(item,index) in list" :key="index" :comment="item" @reply-click="$emit('reply-clicks', $event)"></ArticleComment>

    </van-list>

  </div>
</template>

<script>
import { getarticleComment } from "../../../api/comment";
import ArticleComment from "./comment-item.vue"
export default {
  name: "commentList",
  components: {
    ArticleComment
  },
  props: {
    sourse: {
      type: [Number, String, Object],
      required: true,
    },
    list: {
      type: [Object, Array],
      default: function() {
        return {}
      }
    },
    type: {
      type: String,
      validator (value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  created() {
    //当手动开启的时候 他不会自动打开初始的loading
    this.loading = true
    this.onLoad()
  },
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      error: false
    };
  },
  methods: {
    async onLoad() {
      try {
        //1请求获取哦数据
        const { data } = await getarticleComment({
          type: this.type,
          source: this.sourse,
          offset: this.offset,
          limit: this.limit,
        });
        if(this.type === 'c'){
          console.log(data);
        }
        //2将请求添加到列表中
        const { results} = data.data;
        this.list.push(...results);

        this.$emit('onload_success',data.data )
        //3将loading设置为false
        this.loading = false;
        //4判断是否还有数据
        //4有就更新获取下一页，没有就finish变为false
        if (results.length) {
          this.offset = data.data.last_id;
        } else {
          this.finished = true;
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }
    },
  },
};
</script>

<style lang="less" scoped>
</style>