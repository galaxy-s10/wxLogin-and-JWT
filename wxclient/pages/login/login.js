// pages/login/login.js
import {
  login,
  getdata,
  verifytoken
} from '../../server/login.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {},
  handelGetUserInfo(e) {
    // wx.request({
    //   url: 'https://www.zhengbeining.com/api/article/page?ordername=date&orderby=desc&nowpage=1&pagesize=10',
    //   success: (res) => {
    //     console.log(res)
    //   }
    // })
    if (e.detail.errMsg == 'getUserInfo:ok') {
      const {
        rawData,
      } = e.detail
      const {
        nickName,
        gender,
        country,
        avatarUrl
      } = JSON.parse(rawData)
      // 弹出授权框,判断用户是否授权，授权了才进行登录或注册功能
      wx.getSetting({
        success: res => {
          // 判断用户是否授权
          if (res.authSetting['scope.userInfo'] == true) {
            wx.login({
              success: (res) => {
                let code = res.code
                const userinfo = {
                  nickName,
                  gender,
                  country,
                  avatarUrl,
                  code
                }
                login(userinfo).then(res => {
                  if (res.statusCode == 200) {
                    // 获取用户信息(必须是在用户已经授权的情况下调用)
                    wx.getSetting({
                      success: ress => {
                        // 判断用户是否授权
                        if (ress.authSetting['scope.userInfo']) {
                          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                          wx.getUserInfo({
                            success: ress => {
                              console.log(res)
                              wx.setStorage({
                                key: 'token',
                                data: res.data.token
                              })
                              // 可以将 ress 发送给后台解码出 unionId
                              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                              // 所以此处加入 callback 以防止这种情况
                              if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(ress)
                              }
                            }
                          })
                        }
                      }
                    })
                  }
                })
              }
            })
          } else {
            console.log('用户拒绝授权');
          }
        },
        fail: err => {
          console.log('??????????????')
          console.log(err)
        }
      })
    } else {
      // 用户拒绝授权
      console.log(e.detail.errMsg)
    }
  },
  getdata() {
    getdata().then(res => {
      console.log(res.data)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})