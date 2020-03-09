
const isBlank = (text) => {
  if (text == null) {
    return true
  }
  if (text === '') {
    return true
  }
  if (text.length === 0) {
    return true
  }
  if (text === undefined) {
    return true
  }
  return false
}
// 校验字符串是否不为空
const isNotBlank = (text) => {
  return !(this.isBlank(text))
}

const dateFormat = (date, format = 'yyyy-MM-dd HH:mm:ss') => {
  date = new Date(date)
  let zeroPadding = (i) => {
    return (i < 10 ? '0' : '') + i
  }
  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, (item) => {
    switch (item) {
      case 'yyyy':
        return zeroPadding(date.getFullYear())
      case 'MM':
        return zeroPadding(date.getMonth() + 1)
      case 'dd':
        return zeroPadding(date.getDate())
      case 'HH':
        return zeroPadding(date.getHours())
      case 'mm':
        return zeroPadding(date.getMinutes())
      case 'ss':
        return zeroPadding(date.getSeconds())
    }
  })
}

export {
  isBlank, isNotBlank,
  dateFormat
}