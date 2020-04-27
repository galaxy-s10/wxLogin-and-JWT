import request from './request.js'
var token

function gettoken() {
  token = wx.getStorageSync('token')
}

export function login(params) {
  return request({
    url: "user/login",
    method: 'post',
    data: {
      ...params
    }
  })
}
export function getdata() {
  gettoken()
  return request({
    url: "user/getdata",
    method: 'get',
    header: {
      'Authorization': 'Bearer ' + token
    }
  })
}