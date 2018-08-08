const DevBaseUrl = 'http://127.0.0.1:8080'
const ProdBashUrl = 'http://api.tianlinyong.cn'

export const BASE_URL =
  process.env.NODE_ENV !== 'production' ? DevBaseUrl : ProdBashUrl

export const TOKEN_PREFIX = 'User'
export const OK = '000000'

// 高德Key
export const GDMAP_KEY = '03e1feeb40597ff85d42b83eacf74406'

// 七牛云存储前缀
export const QINIU_PREFIX = 'p2pblz7ar.bkt.clouddn.com'
