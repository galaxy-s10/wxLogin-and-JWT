import {
  baseurl
} from './config.js'

export default function(opitons) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseurl + opitons.url,
      method: opitons.method,
      header:opitons.header || {},
      data: opitons.data || {},
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })

}