<template>
  <div class="updata-sex">
    <van-picker
      title="标题"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onChange"
      :default-index="value"
    />
  </div>
</template>

<script>
import { updataUserprofile } from '../.././../api/user'
export default {
  name: "updataSex",
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      columns: ["男", "女"],
      localGender: this.value
    };
  },
  methods: {
    async onConfirm(value, index) {
       this.$toast.loading({
        message: '保存中...',
        forbidClick:true,
        duration: 0
      })
      try {
        const localGender = this.localGender
        const {data} = await updataUserprofile({
          gender:localGender
        })
        //更新视图
        this.$emit('input', localGender)
        //关闭弹窗
        this.$emit('close')

        this.$toast.success('更新成功')
      } catch (error) {
        this.$toast.fail('更新失败')
      }
    },
    onChange(picker, value, index) {
      // Toast(`当前值：${value}, 当前索引：${index}`);
      this.localGender = index
      
    },
  },
};
</script>

<style>
</style>