/**
 * 原生的一些方法封装
 */
import { isIOS } from './brower'
import { Toast } from 'mint-ui'

export default {
  // 打开引导页面
  showGuidePage: function() {
    if (isIOS() && window.webkit) {
      window.webkit.messageHandlers.NativeMethod.postMessage({
        methodName: 'showGuidePage'
      })
    }
  },
  // 获取定位信息
  getLocation: function(success, faiture) {
    window._Native_location = function(locationJson, regeocodeJson, code) {
      if (code === 0) {
        success(locationJson, regeocodeJson)
      } else {
        if (faiture) {
          faiture(code)
        } else {
          Toast('定位失败')
        }
      }
    }
    if (isIOS() && window.webkit) {
      window.webkit.messageHandlers.NativeMethod.postMessage({
        methodName: 'location'
      })
    }
  },
  // 获取版本号
  getAppVersion: function(callback) {
    window._Native_appVersion = function(appVersion) {
      callback(appVersion)
    }
    if (isIOS() && window.webkit) {
      window.webkit.messageHandlers.NativeMethod.postMessage({
        methodName: 'appVersion'
      })
    }
  },
  // 语音读取
  speechVoice: function(str, success) {
    window._Native_speechComplete = success
    if (isIOS()) {
      window.webkit.messageHandlers.NativeMethod.postMessage({
        methodName: 'iflySpeech',
        speechContent: str
      })
    } else {
      window.android.speechSynthesizerVoice(str)
    }
  },
  // 停止语音播放
  stopSpeechVoice: function() {
    if (isIOS()) {
      window.webkit.messageHandlers.NativeMethod.postMessage({
        methodName: 'stopSpeechSynthesizerVoice'
      })
    } else {
      window.android.stopSpeechSynthesizerVoice()
    }
  },
  // 停止语音播放
  pauseSpeechVoice: function() {
    if (isIOS()) {
      window.webkit.messageHandlers.NativeMethod.postMessage({
        methodName: 'pauseSpeechSynthesizerVoice'
      })
    } else {
      window.android.pauseSpeechSynthesizerVoice()
    }
  },
  // 语音识别
  recognizerVoice: function(resultCallback, volumeListener) {
    window._Native_recognizerResult = resultCallback
    window._Native_recognizerVolume = volumeListener
    if (isIOS()) {
      window.webkit.messageHandlers.NativeMethod.postMessage({
        methodName: 'startIflyRecognizer'
      })
    } else {
      window.android.speechRecognizerVoice()
    }
  },
  // 取消语音识别
  cancelRecognizerVoice: function() {
    if (isIOS()) {
      window.webkit.messageHandlers.NativeMethod.postMessage({
        methodName: 'cancelIflyRecognizer'
      })
    } else {
      window.android.cancelSpeechRecognizerVoice()
    }
  },
  // 结束语音识别
  stopRecognizerVoice: function() {
    if (isIOS()) {
      window.webkit.messageHandlers.NativeMethod.postMessage({
        methodName: 'stopIflyRecognizer'
      })
    } else {
      window.android.stopSpeechRecognizerVoice()
    }
  }
}
