import { debug, info, warn, error } from '@/api/environment.js'

export default {
  /**
   * 
   * @param {Object} app  createApp()에서 생성된 App 객체 
   * @param {Object} options 사용자가 전달한 옵션 
   */
  install: (app, options) => {
    app.provide('debug', debug)
    app.provide('info', info)
    app.provide('warn', warn)
    app.provide('error', error)
  }
}