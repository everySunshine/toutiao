<template>
  <div class="updata-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="onConfirm"
      @cancel="$emit('close')"
    />
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { updataUserprofile } from '../.././../api/user'
export default {
  name: "updataBirthday",
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value),
    };
  },
  methods: {
    async onConfirm() {
       this.$toast.loading({
        message: '保存中...',
        forbidClick:true,
        duration: 0
      })
      try {
        const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
        console.log(currentDate);
        const {data} = await updataUserprofile({
          birthday:currentDate
        })
        //更新视图
        this.$emit('input', currentDate)
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

<style>
</style>