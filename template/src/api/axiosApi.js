import axios from 'axios'
import { BASE_URL, OK } from './config'
import qs from 'qs'
import { Indicator, Toast } from 'mint-ui'

// 自定义判断元素类型JS
function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull (o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}
/**
 * 自定义错误类型
 * type 为1是后台接口返回的错误信息，否则是response返回的错误信息
 */
class ApiError extends Error {
  constructor(code, message, type) {
    super(message)
    this.name = 'ApiError'
    this.code = code
    this.type = type
  }
}

/**
 * 通用的Api处理方法
 * 如有特殊情况的请求方式，请另外写
 * @param {String} method GET、PUT、POST、DELETE
 * @param {String} url URL地址，域名等通用字段已配置
 * @param {Object} params 参数对象
 */
function apiAxios (method, url, params) {
  // 过滤为空的参数
  if (params) {
    params = filterNull(params)
  }
  let baseURL = BASE_URL
  if (url.indexOf('http') > 0) {
    baseURL = ''
  }
  Indicator.open('加载中...')
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: url,
      data: method === 'POST' || method === 'PUT' ? qs.stringify(params) : null,
      params: method === 'GET' || method === 'DELETE' ? params : null,
      baseURL: baseURL,
      withCredentials: false,
      timeout: 20000
    }).then(function (res) {
      if (res.data.code === OK) {
        resolve({
          data: res.data.data,
          total: res.data.total,
          message: res.data.message
        })
      } else {
        reject(new ApiError(res.data.code, res.data.message, 1))
        console.error('api error: ' + res.data.message)
      }
    }).catch(function (err) {
      let errMsg = ''
      if (err && err.response) {
        switch (err.response.status) {
          case 400:
            errMsg = '客户端请求的语法错误'
            break
          case 401:
            errMsg = '未授权，请重新登录'
            break
          case 403:
            errMsg = '拒绝访问'
            break
          case 404:
            errMsg = '您所请求的资源无法找到'
            break
          case 408:
            errMsg = '客户端发送的请求时间超时'
            break
          case 500:
            errMsg = '服务器错误'
            break
          case 501:
            errMsg = '服务未实现'
            break
          case 502:
            errMsg = '网络错误'
            break
          case 503:
            errMsg = '服务不可用'
            break
          case 504:
            errMsg = '网络超时'
            break
          case 505:
            errMsg = 'HTTP版本不受支持'
            break
          default:
            errMsg = '连接服务器失败，错误码：' + err.response.status
        }
      } else {
        // axios超时处理
        if (err.message.indexOf('timeout') > -1) {
          errMsg = '网络请求超时'
        } else {
          errMsg = '网络请求错误! 详细信息:' + err.message.substring(0, 155)
        }
      }
      if (err && err.response) {
        reject(new ApiError(err.response.status, errMsg))
      } else {
        reject(new ApiError('axios', errMsg))
      }
      Toast(errMsg)
      if (err) {
        console.error('api error: ' + errMsg)
      }
    }).finally(() => {
      Indicator.close()
    })
  })
}

export default {
  get: function (url, params) {
    return apiAxios('GET', url, params)
  },
  post: function (url, params) {
    return apiAxios('POST', url, params)
  },
  put: function (url, params, success) {
    return apiAxios('PUT', url, params)
  },
  delete: function (url, params) {
    return apiAxios('DELETE', url, params)
  }
}
