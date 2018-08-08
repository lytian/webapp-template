import { TOKEN_PREFIX } from './config'

// 写 cookies
export const setCookie = function(name, value, time) {
  if (time) {
    let strsec = time
    let exp = new Date()
    exp.setTime(exp.getTime() + parseInt(strsec))
    document.cookie =
      name + '=' + escape(value) + ';expires=' + exp.toGMTString()
  } else {
    document.cookie = name + '=' + escape(value)
  }
}

// 读 cookies
export const getCookie = function(name) {
  let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  let arr = document.cookie.match(reg)
  return arr ? unescape(arr[2]) : null
}

// 删 cookies
export const delCookie = function(name) {
  var exp = new Date()
  exp.setTime(exp.getTime() - 1)
  var cval = getCookie(name)
  if (cval != null) {
    document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
  }
}

// 获取Token
export const getToken = function() {
  return getCookie(TOKEN_PREFIX)
  /*
  if (window.sessionStorage && window.sessionStorage[TOKEN_PREFIX]) {
    return window.sessionStorage[TOKEN_PREFIX]
  } else if (window.localStorage && window.localStorage[TOKEN_PREFIX]) {
    return window.localStorage[TOKEN_PREFIX]
  } else if (window.document.cookie) {
    return getCookie(TOKEN_PREFIX)
  }
  */
}

// 设置Token
export let setToken = function (token, rememberTime) {
  if (rememberTime) {
    setCookie(TOKEN_PREFIX, token, rememberTime)
  } else {
    setCookie(TOKEN_PREFIX, token)
  }
  /*
  if (window.sessionStorage) {
    window.sessionStorage[TOKEN_PREFIX] = token
  }

  if ((rememberTime && window.localStorage) || !window.sessionStorage) {
    window.localStorage[TOKEN_PREFIX] = token
  }

  if (
    window.document.cookie &&
    !window.sessionStorage &&
    !window.localStorage
  ) {
    if (rememberTime) {
      setCookie('Bearer', token, rememberTime)
    } else {
      setCookie('Bearer', token)
    }
  }
  */
}

// 删除Token
export let delToken = function() {
  delCookie(TOKEN_PREFIX)
  /*
  if (window.sessionStorage && window.sessionStorage.Bearer) {
    window.sessionStorage.removeItem('Bearer')
  }

  if (window.localStorage && window.localStorage.Bearer) {
    window.localStorage.removeItem('Bearer')
  }

  if (window.document.cookie) {
    delCookie('Bearer')
  }
  */
}
