<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div v-if="loading" class="loading-wrap">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <!-- 如果有title就代表加载成功 -->
      <div v-else-if="detaildata.title" class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ detaildata.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="detaildata.aut_photo"
          />
          <div slot="title" class="user-name">{{ detaildata.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ detaildata.pubdate | relativeTime }}
          </div>
          <followbtn
            :isfollowed="detaildata.is_followed"
            :userId="detaildata.aut_id"
            @updata-is_followed="detaildata.is_followed = $event"
          ></followbtn>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="detaildata.content"
          ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>
        <commentList
          :sourse="detaildata.art_id"
          @onload_success="totacomment = $event.total_count"
          :list="commentList"
          @reply-clicks="onReplyClick"
        ></commentList>
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="isPostShow = true"
            >写评论</van-button
          >
          <van-icon name="comment-o" :info="totacomment" color="#777" />
          <!-- 注意这个双向绑定的value是绑定到了子组件中 -->
          <CollectArticle
            v-model="detaildata.is_collected"
            :articleId="detaildata.art_id"
          ></CollectArticle>
          <LikeArtcle
            :articleId="detaildata.art_id"
            v-model="detaildata.attitude"
          ></LikeArtcle>
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
        <van-popup v-model="isPostShow" position="bottom">
          <CommentPost :target="detaildata.art_id" @post-success="onPostSuccess"></CommentPost>
        </van-popup>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div v-else-if="this.errStatus === 404" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticle">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->

      <van-popup v-model="isReplyShow" position="bottom" :style="{ height: '80%' }">
        <comment-reply :comment="currntComment"  @close="isReplyShow = false" v-if="isReplyShow"></comment-reply>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { getarticledetail } from "../../api/crticle";
import { ImagePreview } from "vant";
import followbtn from "../../components/follow-user";
import CollectArticle from "../../components/collect-article";
import LikeArtcle from "../../components/like-arctle/index.vue";
import commentList from "./components/comment-list.vue";
import CommentPost from "./components/comment-post.vue";
import CommentReply from './components/comment-reply.vue'
export default {
  name: "ArticleIndex",
  components: {
    followbtn,
    CollectArticle,
    LikeArtcle,
    commentList,
    CommentPost,
    CommentReply
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      detaildata: {},
      loading: true,
      errStatus: 0,
      followLoading: false,
      totacomment: 0,
      isPostShow: false,
      commentList:[],
      isReplyShow: false,
      currntComment:{}
    };
  },
  provide: function () {
    return {
      articleId: this.articleId
    }
  },
  computed: {},
  watch: {},
  created() {
    console.log(1);
    this.loadArticle();
  },
  mounted() {},
  methods: {
    async loadArticle() {
      console.log(2);
      this.loading = true;
      try {
        const { data } = await getarticledetail(this.articleId);
        this.detaildata = data.data;
        this.loading = false;
        setTimeout(() => {
          this.previewImage();
        }, 0);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.errStatus = 404;
        }
        this.loading = false;
        this.$toast("获取用户失败");
      }
    },
    previewImage() {
      const articleContent = this.$refs["article-content"];
      const imgs = articleContent.querySelectorAll("img");
      const images = [];
      imgs.forEach((img, index) => {
        images.push(img.src);
        img.onclick = () => {
          ImagePreview({
            images,
            startPosition: index,
          });
        };
      });
    },
    onPostSuccess(data) {
      this.isPostShow = false
      this.commentList.unshift(data.new_obj)
    },
    onReplyClick(comment) {
      this.currntComment = comment
      this.isReplyShow = true
    }
  },
};
</script>

<style scoped lang="less">
@import "./github-markdown.css";
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
