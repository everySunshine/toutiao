<template>
  <div class="user-profile">
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <input type="file" hidden ref="file" @change="onFileChange" />
    <van-cell title="头像" is-link  @click="$refs.file.click()">
      <van-image
        class="avatar"
        round
        :src="user.photo"
      />
    </van-cell>
    <van-cell title="昵称" is-link :value="user.name" @click="isUpdataNameShow = true" />
    <van-cell title="性别" is-link :value="user.gender === 1 ? '女': '男'" @click="isUpdataSexShow = true" />
    <van-cell title="生日" is-link :value="user.birthday" @click="isUpdataBirthdayShow = true"/>
    <van-popup v-model="isUpdataNameShow" position="bottom" :style="{ height: '60%' }">
      <updataName v-if="isUpdataNameShow" @close="isUpdataNameShow = false" v-model="user.name"></updataName>
    </van-popup>
    <van-popup v-model="isUpdataSexShow" position="bottom">
      <updataSex v-if="isUpdataSexShow" @close="isUpdataSexShow = false" v-model="user.gender"></updataSex>
    </van-popup>
    <van-popup v-model="isUpdataBirthdayShow" position="bottom">
      <updataBirthday v-if="isUpdataBirthdayShow" @close="isUpdataBirthdayShow = false" v-model="user.birthday"></updataBirthday>
    </van-popup>
    <van-popup v-model="isUpdataPhotoShow" position="top" :style="{ height: '100%' }">
      <updataPhoto v-if="isUpdataPhotoShow" @close="isUpdataPhotoShow = false" :img="img" @updata-photo="user.photo = $event"></updataPhoto>
    </van-popup>
  </div>
</template>

<script>
import updataName from './component/updata-name.vue'
import updataSex from './component/updta-sex.vue'
import updataBirthday from './component/updata-birthday.vue'
import updataPhoto from './component/updata-photo.vue'
import {getUserprofile} from '../../api/user'
export default {
  name: "userProfile",
  components: {
    updataName,
    updataSex,
    updataBirthday,
    updataPhoto
  },
  data() {
    return {
      isUpdataNameShow: false,
      isUpdataSexShow: false,
      isUpdataBirthdayShow:false,
      isUpdataPhotoShow: false,
      user:{},
      img:null
    }
  },
  created() {
    this.loaduserfile()
  },
  methods: {
    async loaduserfile() {
      const {data} =  await getUserprofile()
      this.user = data.data
    },
    onFileChange() {
      //获取文件对象
      const file = this.$refs.file.files[0]
      const data = window.URL.createObjectURL(file)
      this.img = data
      console.log(data);
      this.isUpdataPhotoShow = true
      this.$refs.file.values = ''
    }
  }
};
</script>

<style lang="less" scoped>
.user-profile {
  /deep/ .page-nav-bar {
    background-color: rgb(52, 124, 240);
    .van-nav-bar__title {
      color: white;
    }
    .van-nav-bar__arrow {
      color: white;
    }
  }
  .avatar {
    width: 60px;
    height: 60px;
  }
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>