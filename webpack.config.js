// module.exports = {
//   //...
//   devServer: {
//     proxy: {
//       '/api': {
//         target: 'http://toutiao.itheima.net',
//         pathRewrite: {'^/api' : ''},
//         changeOrigin: true,     // target是域名的话，需要这个参数，
//         secure: false,          // 设置支持https协议的代理
//       },
//     }
//   }
// };