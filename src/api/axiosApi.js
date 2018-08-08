import axios from 'axios'
import { BASE_URL, OK, TOKEN_PREFIX } from './config'
import { getToken } from './token'
import qs from 'qs'

// 添加Token
axios.interceptors.request.use(
  config => {
    if (window) {
      let token = getToken()
      if (token) {
        // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.Authorization = TOKEN_PREFIX + ` ${token}`
      }
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

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
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: url,
      data: method === 'POST' || method === 'PUT' ? qs.stringify(params) : null,
      params: method === 'GET' || method === 'DELETE' ? params : null,
      baseURL: baseURL,
      withCredentials: false
    }).then(function (res) {
      if (res.data.code === OK) {
        resolve({
          data: res.data.data,
          total: res.data.total,
          message: res.data.message
        })
      } else {
        reject(res.data.message)
        console.error('api error: ' + res.data.message)
      }
    }).catch(function (err) {
      reject(err.message)
      if (err) {
        console.error('api error, HTTP CODE: ' + err.message)
      }
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
