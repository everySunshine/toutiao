<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list :finished="finished" finished-text="没有更多了">
      <van-cell>
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px"
          :src="comment.aut_photo"
        />
        <span style="color: #466b9d" slot="title">{{ comment.aut_name }}</span>
        <div slot="label">
          <p style="color: #363636">{{ comment.content }}</p>
          <p>
            <span style="margin-right: 10px">{{
              comment.pubdate | relativeTime
            }}</span>
            <van-button
              size="mini"
              type="default"
              @click="$emit('reply-click', comment)"
              >回复{{ comment.reply_count }}</van-button
            >
          </p>
        </div>
        <van-icon
          slot="right-icon"
          :name="comment.is_liking ? 'like-o' : 'like'"
          @click="onCommentLike"
          :loading="commentloading"
        />
      </van-cell>
    </van-list>
    <!-- 评论列表 -->

  </div>
</template>

<script>
import { addCommentlike, delCommentlike } from "../../../api/comment";
export default {
  name: "ArticleComment",
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      commentloading: false,
    };
  },

  methods: {
    async onCommentLike() {
      this.commentloading = true;
      try {
        if (this.comment.is_liking) {
          const { data } = await delCommentlike(this.comment.com_id);
          this.comment.like_count--;
        } else {
          const { data } = await addCommentlike(this.comment.com_id);
          this.comment.like_count++;
        }
        this.comment.is_liking = !this.comment.is_liking;
      } catch (error) {}
    },
  },
};
</script>

<style scoped lang="less">
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>