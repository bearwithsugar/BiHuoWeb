import { fetch } from 'src/lib/fetch.js'
export default {
  // 图片上传
  imgUpload (params) {
    return fetch('/file/upload/uploadImg', params)
  },
  // 音乐上传
  musicUpload (params) {
    return fetch('/file/upload/uploadFile', params)
  }
}
