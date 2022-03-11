<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="post-btn"
      @click="onpostComment"
    >发布</van-button>
  </div>
</template>

<script>
import {pushComment} from '../../../api/comment'
export default {
  name: 'CommentPost',
  components: {},
  inject: {
    articleId: {
      type: [Number, Object, String],
      default: null
    }
  },
  props: {
    target: {
      type: [Number,Object,String],
      required: true
    }
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onpostComment() {
      this.$toast.loading({
        message: '发布中',
        forbidClick: true,
        duration: 0
      })
      try {
        const {data} = await pushComment({
          target: this.target,
          content: this.message,
          art_id: this.articleId ? this.articleId.toString() : this.articleId
        })
        this.message = ''
        this.$emit('post-success',data.data)
        this.$toast.success('发布成功')
        console.log(data);
      } catch (error) {
        this.$toast.fail('发布失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
