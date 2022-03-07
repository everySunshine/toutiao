//封装本地储存操作模块

//储存数据

export const setItem = (key, value) => {
  if(typeof value === 'object'){
    value = JSON.stringify(value)
  }
  localStorage.setItem(key, value)
}

//获取数据
export const getItem = key => {
  const data = localStorage.getItem(key)
  //要判断是否为JSON格式的字符串不好判断可以使用异常来处理
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}

//删除数据

export const removeItem = key => {
  localStorage.removeItem(key)
}