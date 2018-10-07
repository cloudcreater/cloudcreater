import wecache from "utils/wecache.js"
App({
  globalData: {
    userInfo: null,
    openid: null,
    token: null,
    myInfo: null,
    getinfo: null,
    hasUserInfo: false,
    img_arr: [],
    edit_img_arr:[],
    appid: 'wx4ac7bd3e0bb7e7f3',
    appsecret:'521fabc9fc9e432c1ca2969be953a285',
    weburl:'https://czw.saleii.com',
    shop_type:5,

    other_to_main:"",
    community:"",

  },
  /** 
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function() {
    var myInfo = wecache.get("myInfo", "0")
    var getinfo = wecache.get("getinfo", "0")
    this.globalData.token = myInfo.token
    this.globalData.myInfo = myInfo
    this.globalData.getinfo = getinfo
    var weburl = this.globalData.weburl
    var appid = this.globalData.appid;
    var appsecret = this.globalData.appsecret
    wx.setStorageSync('appid', appid);
    wx.setStorageSync('appsecret', appsecret);

    wx.login({
      success: function (res) {
        if (res.code) {
          console.log('获取用户登录态 code:' + res.code);
          wx.request({
            url:  weburl+'/api/WXPay/getOpenidAction',
            data: {
              js_code: res.code,
              appid: appid,
              appsecret: appsecret,
            },
            method: 'POST',
            header: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json'
            },
            success: function (res) {
              var user = res.data//返回openid
              wx.setStorageSync('openid', user.openid);
              wx.setStorageSync('session_key', user.session_key)
              
              getApp().globalData.openid = res.data.openid
              console.log('获取用户OpenId:', user.openid)
              

            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
    /*
    wx.login({
        success: function(res) {
          var code = res.code
          var APPID = "wxf8b7534b8e96309e"
          var SECRET = "7a11713abdf080ef4990a4c3b61f7e28"
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + APPID + '&secret=' + SECRET + '&js_code=' + code + '&grant_type=authorization_code',
            success: function(res) {
              getApp().globalData.openid = res.data.openid
            }
          })
        }
      }),
      */
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                this.globalData.userInfo = res.userInfo
                this.globalData.hasUserInfo = true
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }
            })
          }
        }
      })
  },





  // /**
  //  * 当小程序启动，或从后台进入前台显示，会触发 onShow
  //  */
  onShow: function(options) {
    var myInfo = wecache.get("myInfo", "0")
    var getinfo = wecache.get("getinfo", "0")
    this.globalData.token = myInfo.token
    this.globalData.myInfo = myInfo
    this.globalData.getinfo = getinfo
  },

  // /**
  //  * 当小程序从前台进入后台，会触发 onHide
  //  */
  // onHide: function () {

  // },

  // /**
  //  * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
  //  */
  // onError: function (msg) {

  // }
})