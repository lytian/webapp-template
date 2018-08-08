/**
 * 添加事件监听
 * on(window, 'touchmove', () => {}) 事件源、事件名称、回调
 */
export const on = (function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * 移除事件监听
 * off(window, 'touchmove', () => {}) 事件源、事件名称、回调
 */
export const off = (function () {
  if (document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * 是否拥有指定class
 * @param {*} el HTMLElement对象
 * @param {*} className 类名
 */
export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

/**
 * 添加class
 * @param {*} el HTMLElement对象
 * @param {*} className 类名
 */
export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }

  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

/**
 * 移除class
 * @param {*} el HTMLElement对象
 * @param {*} className 类名
 */
export function removeClass(el, className) {
  if (!hasClass(el, className)) {
    return
  }

  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g')
  el.className = el.className.replace(reg, ' ')
}

/**
 * 切换class
 * @param {*} el HTMLElement对象
 * @param {*} className 类名
 */
export function toggleClass(el, className) {
  if (hasClass(el, className)) {
    removeClass(el, className)
  } else {
    addClass(el, className)
  }
}

/**
 * 获取/设置H5的data-属性值
 * @param {*} el HTMLElement对象
 * @param {*} name 属性名
 * @param {*} val 值(存在即是设置，不存在即是获取)
 */
export function getData(el, name, val) {
  let prefix = 'data-'
  if (val) {
    return el.setAttribute(prefix + name, val)
  }
  return el.getAttribute(prefix + name)
}

/**
 * 获取元素的边框范围
 * @param {*} el HTMLElement对象
 */
export function getRect(el) {
  if (el instanceof window.SVGElement) {
    let rect = el.getBoundingClientRect()
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    }
  } else {
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight
    }
  }
}
