import { MIMEType, ajax } from '@/api/common/http.js'

export default {
  
  /**
   * 
   * @param {Object} app  createApp()에서 생성된 App 객체 
   * @param {Object} options 사용자가 전달한 옵션 
   */
  install: (app, options) => {
    app.provide('MIMEType', MIMEType)
    app.provide('ajax', ajax)
  }
}