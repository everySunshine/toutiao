module.exports = {
  plugins: {
    //在vue中已经配置了下面的就会发生冲突就会报出警告
    // 'autoprefixer': {
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    'postcss-pxtorem': {

      rootValue ({ file }){
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      // rootValue: 37.5,
      //表示所有属性都会转换
      propList: ['*']
    }
  }
}