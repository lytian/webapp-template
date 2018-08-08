const USER = '_user'

const SEARCH_KEY = '_search_'
const SEARCH_MAX_LENGTH = 12
const SEARCH_TYPE = ['mall', 'address', 'strategy']

export const localUser = {
  get: (key) => {
    if (key == null) {
      let user = null
      for (let k in localStorage) {
        if (k.indexOf(USER + '_') === 0) {
          if (user === null) {
            user = {}
          }
          user[k.split(USER + '_')[1]] = localStorage.getItem(k)
        }
      }
      return user
    } else {
      return localStorage.getItem(USER + '_' + key)
    }
  },
  set: (user) => {
    if (typeof user !== 'object') {
      console.error('local: user must is Object')
      return
    }
    for (let key in user) {
      localStorage.setItem(USER + '_' + key, user[key])
    }
  },
  setItem: (key, value) => {
    if (typeof key !== 'string') {
      console.error('local: user`s key must is String')
      return
    }
    if (typeof value !== 'string' && typeof value !== 'number') {
      console.error('local: user`s value must is String or Number')
      return
    }
    localStorage.setItem(USER + '_' + key, value)
  },
  remove: () => {
    const user = this.get()
    for (let key in user) {
      localStorage.removeItem(USER + '_' + key)
    }
  },
  removeItem: (key) => {
    if (typeof key !== 'string') {
      console.error('local: user`s key must is String')
      return
    }
    if (typeof value !== 'string' && typeof value !== 'number') {
      console.error('local: user`s value must is String or Number')
      return
    }
    localStorage.removeItem(USER + '_' + key)
  }
}

export const localSearch = {
  set: (type, query) => {
    if (SEARCH_TYPE.find(o => o === type) == null) {
      console.error('local: 保存搜索记录失败，没有找到对应的类型')
      return
    }
    const searchStr = localStorage.getItem(SEARCH_KEY + type)
    let searchs = []
    if (searchStr != null) {
      searchs = JSON.parse(searchStr)
    }
    const index = searchs.findIndex(o => o === query)
    if (index === 0) {
      return
    }
    if (index > 0) {
      searchs.splice(index, 1)
    }
    searchs.unshift(query) // 插入到数组最前
    if (searchs.length > SEARCH_MAX_LENGTH) {
      searchs.pop() // 删除末位元素
    }
    localStorage.setItem(SEARCH_KEY + type, JSON.stringify(searchs))
  },
  get: (type) => {
    if (SEARCH_TYPE.find(o => o === type) == null) {
      console.error('local: 获取搜索记录失败，没有找到对应的类型')
      return
    }
    const searchStr = localStorage.getItem(SEARCH_KEY + type)
    let searchs = []
    if (searchStr != null) {
      searchs = JSON.parse(searchStr)
    }
    return searchs
  },
  /**
   * 传入query。只删除这一项，不传删除该type的全部
   */
  remove: (type, query) => {
    if (SEARCH_TYPE.find(o => o === type) == null) {
      console.error('local: 获取搜索记录失败，没有找到对应的类型')
      return
    }
    if (query) {
      const searchStr = localStorage.getItem(SEARCH_KEY + type)
      let searchs = []
      if (searchStr != null) {
        searchs = JSON.parse(searchStr)
      }
      const findIndex = searchs.findIndex(o => o === query)
      if (findIndex > -1) {
        searchs.splice(findIndex, 1)
        localStorage.setItem(SEARCH_KEY + type, searchs)
      }
    } else {
      localStorage.removeItem(SEARCH_KEY + type)
    }
  }
}
