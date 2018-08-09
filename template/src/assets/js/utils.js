import moment from 'moment'

moment.locale('zh-cn')

/**
 * 拟人化时间格式化
 * @param time(格式化字符串、Date对象、时间搓)
 * @param short(是否短字符形式)
 * @param isTimestamp(是否为时间戳)
 */
export function personifyTime(time, short, isTimestamp) {
  if (isTimestamp) {
    time = moment.unix(time)
  } else {
    time = moment(time)
  }
  let str = short
    ? time.format('YYYY-MM-DD')
    : time.format('YYYY-MM-DD HH:mm:ss')
  const tmp = time.format('YYYY-MM-DD')
  const diffMinu = moment().diff(time, 'minutes')
  const diffDay = moment().diff(tmp, 'days')
  if (diffMinu < 2) {
    str = '刚刚'
  } else if (diffMinu / 60 < 12) {
    str = time.fromNow()
  } else if (diffDay < 1) {
    str = '今天 ' + time.format('HH:mm')
  } else if (diffDay < 2) {
    str = '昨天 ' + time.format('HH:mm')
  } else if (diffDay <= 30) {
    str = time.fromNow()
  } else if (diffDay <= 90) {
    str = time.format('MM月DD日 HH:mm')
  }
  return str
}

/**
 * Date时间格式化
 * @param {Date} date date对象
 * @param {String} format 如YYYY-MM-DD
 */
export function formatDate(date, format) {
  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds()
  }
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return format
}

/**
 * 随机字符串
 * @param {*} randomFlag 随机标志，非(false, 0, null, undefine)
 * @param {Integer} min 最小长度
 * @param {Integer} max 最大长度
 */
export function randomWord(randomFlag, min, max) {
  let str = ''
  let range = min
  let arr = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
  ]

  // 随机产生
  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min
  }
  for (var i = 0; i < range; i++) {
    const pos = Math.round(Math.random() * (arr.length - 1))
    str += arr[pos]
  }
  return str
}

/**
 * img的base64转Blob数据类型(二进制)
 * @param {String} dataurl 数据源
 */
export function dataURLtoBlob(dataurl) {
  let arr = dataurl.split(',')
  let mime = arr[0].match(/:(.*?);/)[1]
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

/**
 * img的base64转File对象，并不是文件
 * @param {String} dataurl 数据源
 * @param {String} filename 保存的File对象名
 */
export function dataURLtoFile(dataurl, filename) {
  let arr = dataurl.split(',')
  let mime = arr[0].match(/:(.*?);/)[1]
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}
