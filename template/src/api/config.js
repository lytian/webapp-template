// FIX ME
const DevBaseUrl = '/api' // 代理地址
const ProdBaseUrl = 'http://xxx.cn/api'

export const BASE_URL = process.env.NODE_ENV !== 'production' ? DevBaseUrl : ProdBaseUrl

export const OK = 0
