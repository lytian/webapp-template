import axios from 'axios'

/**
 * 上传文件
 * @param {*} files form的File对象集
 */
export default function uploadFile(files) {
  axios.defaults.timeout = 30000

  let config = {
    processData: false, // *重要,确认为false
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  let param = new FormData()
  for (let i = 0; i < files.length; i++) {
    if (files[i].filename) {
      param.append('file', files[i])
    } else {
      param.append('file', files[i], 'image.png')
    }
  }

  return new Promise((resolve, reject) => {
    axios.post('http://120.79.17.68:9001/apiAttachment/uploadAttachment', param, config).then(res => {
      if (res.data.code === 0) {
        resolve(res.data.data)
      } else {
        reject(res.data)
        console.error('upload file error: ' + res.data.message)
      }
    }).catch(e => {
      reject('上传文件失败')
      if (e) {
        console.error('upload file error, HTTP CODE: ' + e.message)
      }
    })
  })
}
