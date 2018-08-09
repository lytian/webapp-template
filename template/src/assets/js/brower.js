const ua = navigator.userAgent

export const isAndroid = () => {
  return ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1
}

export const isIOS = () => {
  return !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  // return !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) && (screen.height === 812 && screen.width === 375)
}

export function isIphoneX () {
  return /iphone/gi.test(navigator.userAgent) && (screen.height === 812 && screen.width === 375)
}

export const isWeixin = () => {
  /* eslint-disable */
  return ua.match(/MicroMessenger/i) == 'micromessenger'
  /* eslint-enable */
}

export const isQQ = () => {
  return ua.indexOf(' qq/') > -1
}
