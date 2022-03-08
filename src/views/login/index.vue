<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录">
      <van-icon name="cross" slot="left" @click="$router.back()"></van-icon>
    </van-nav-bar>
    <van-form ref="loginForm" @submit="onSubmit">
      <van-field
        name="手机号"
        placeholder="请输入手机号"
        v-model="user.mobile"
        :rules="userFormRules.mobile"
        type="number"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>

      <!-- 登录表单 -->
      <van-field
        name="验证码"
        placeholder="请输入验证码"
        v-model="user.code"
        :rules="userFormRules.code"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down
            :time="1000 * 60"
            format="ss s"
            v-if="isCountDownShow"
            @finish="isCountDownShow = false"
          />
          <van-button
            class="send-sms-btn"
            round
            size="small"
            type="default"
            native-type="button"
            @click="sendcode"
            v-else
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">
          登录
        </van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, getcode } from "../../api/user";
export default {
  name: "Login",
  data() {
    return {
      user: {
        mobile: "",
        code: "",
      },
      userFormRules: {
        mobile: [
          { required: true, message: "请填写手机号" },
          { pattern: /1[3|4|5|7|8]\d{9}/, message: "手机号格式错误" },
        ],
        code: [
          { required: true, message: "请填写验证码" },
          { pattern: /\d{6}/, message: "验证码错误" },
        ],
      },
      isCountDownShow: false,
      token: ''
    };
  },
  methods: {
    //获取表单数据
    async onSubmit() {
      const user = this.user;

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
      try {
        const { data } = await login(user);
        this.$store.commit('user/setUser',data.data)
        this.$toast.success("登录成功");
        this.$router.back()
        console.log(res);
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail("手机号或验证码错误");
        } else {
          this.$toast.fail("登录失败");
        }
      }
    },
    //获取验证码
    async sendcode() {
      try {
        //通过ref来获取标签到标签然后使用vant的validate来单独验证手机框是否合法
        await this.$refs.loginForm.validate("手机号");
        this.isCountDownShow = true
      } catch (error) {
        return console.log("验证失败", error);
      }

      try {
        const mobile = this.user.mobile
        const res = await getcode(mobile)
        console.log(res);
      } catch (error) {
        this.isCountDownShow = false
        if(error.response.status === 429) {
          this.$toast('发送太频繁了')
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.login-container {
  .page-nav-bar {
    background-color: #3296fa;
    .van-icon {
      color: white;
    }
    
  }
  .toutiao {
    font-size: 37px;
  }

  .send-sms-btn {
    background-color: #ededed;
  }
}
</style>>
