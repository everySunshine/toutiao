<template>
  <div class="updata-photo">
    <img :src="img" class="img" ref="img" />
    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confime" @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
import "cropperjs/dist/cropper.css";
import {updataUserphoto} from '../../../api/user'
import Cropper from "cropperjs";
export default {
  name: "updataPhoto",
  props: {
    img: {
      type: [String, Object],
      required: true,
    },
  },
  mounted() {
    const image = this.$refs.img;
    this.cropper = new Cropper(image, {
      aspectRatio: 16 / 9,
      viewMode: 1,
      dragMode: "move",
      aspectRatio: 1,
      // autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      // movable: true,
    });
  },
  methods: {
    onConfirm() {
      // console.log(this.cropper.getDate);
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
       const formData = new FormData()
       formData.append('photo', blob)
       const{data} = await updataUserphoto(formData)
       console.log(data);
       this.$emit('close')
       this.$emit('updata-photo', data.data.photo)
      })
    }
  }
};
</script>

<style lang="less" scoped>
.updata-photo {
  background-color: #000;
  height: 100%;
  .toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .cancel,
    .confime {
      width: 90px;
      height: 90px;
      font-size: 30px;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
  .img {
    display: block;
    max-width: 100%;
  }
}
</style>