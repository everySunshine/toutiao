<template>
  <div class="my-container">
    <div v-if="user" class="header user-info">
      <div class="base-info">
        <div class="left">
          <!-- 使用vant自带image组件这个有图片懒加载的功能 -->
          <van-image
            round
            fit="cover"
            class="avater"
            :src="userinfo.photo"
          />
          <span class="name">{{userinfo.name}}</span>
        </div>
        <div class="right">
          <van-button size="mini" round to="/user/profile">编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{userinfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{userinfo.like_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{userinfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{userinfo.follow_count}}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <div v-else class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="../../assets/mobile.png" />
        <span class="text">登录/注册</span>
      </div>
    </div>
    <van-grid class="grid-nav" :column-num="2" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link class="md9" />
      <van-cell
        v-if="user"
        title="退出登录"
        class="lgout-cell"
        @click="onlginout"
      />
    </van-cell-group>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {getUserInfo} from '../../api/user'
export default {
  name: "MyIndex",
  created() {
    if(this.user){
      this.loadUserInfo()
    }
  },
  data() {
    return {
      userinfo: {}
    }
  },
  computed: {
    ...mapState("user", ["user"]),
  },
  methods: {
    onlginout() {
      this.$dialog.confirm({
        title: "确认退出吗?",
      })
        .then(() => {
          // on confirm
          this.$store.commit('user/setUser', null)
          console.log('确认执行这里');
        })
        .catch(() => {
          // on cancel
          console.log('取消这里的代码');
        })
    },
    async loadUserInfo() {
      try {
        const {data} = await getUserInfo()
        console.log(data.data);
        this.userinfo = data.data
      } catch (error) {
        this.$toast('获取数据失败请稍后重试')
      }
    }
  },
};
</script>

<style lang="less" scoped>
.my-container {
  .header {
    height: 361px;
    background: url("../../assets/banner.png");
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .user-info {
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      //不加这个的话在原来的基础上加上padding和边框(盒子模型)
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avater {
          widows: 132px;
          height: 132px;
          margin-right: 23px;
          border: 1px solid white;
        }
        .name {
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .data-stats {
      display: flex;
      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  .grid-nav {
    .grid-item {
      height: 141px;
      i.toutiao {
        font-size: 45px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
      }
    }
  }
  .lgout-cell {
    text-align: center;
    color: #eb5253;
  }
  .md9 {
    margin-bottom: 9px;
  }
}
</style>