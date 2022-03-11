<template>
  <div class="updata-name">
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="omUpdtaName"
    />
    <div class="field-wrap">
      <van-field
        v-model.trim="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updataUserprofile } from '../.././../api/user'
export default {
  name: "updataName",
  props: {
    value: {
      type:String,
      required: true
    }
  },
  data() {
    return {
      localName: this.value,
    };
  },
  methods: {
    async omUpdtaName() {
      this.$toast.loading({
        message: '保存中...',
        forbidClick:true,
        duration: 0
      })
      try {
        const localName = this.localName
        if(!localName.length){
          this.$toast('昵称不能为空')
          return
        }
        const {data} = await updataUserprofile({
          name:localName
        })
        //更新视图
        this.$emit('input', localName)
        //关闭弹窗
        this.$emit('close')

        this.$toast.success('更新成功')
      } catch (error) {
        this.$toast.fail('更新失败')
      }
    }
  }
};
</script>

<style lang="less" scoped>
  .updata-name {
    .field-wrap {
      padding-top: 20px;
    }
  }
</style>