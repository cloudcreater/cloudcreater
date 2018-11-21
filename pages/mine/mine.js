// pages/mine/mine.js
import wecache from "../../utils/wecache.js"
const app = getApp()
var shop_type = app.globalData.shop_type
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    phoneNo: null,
    sms_code: null,
    schoolname: "",
    info: "",
    myInfo: null,
    shop_type: shop_type,
  },

  handleContact(e) {
    //console.log('handleContact path:', e.path, ' query:', e.query)
    //console.log(e.query)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this
    that.setData({
      userInfo: app.globalData.userInfo,
      myInfo: wecache.get("myInfo", "0"),
      getinfo: wecache.get("getinfo", "0")
    })
  },
  ToUser_Info: function() {
    wx.navigateTo({
      url: 'user_info/user_info',
    })
  },
  ToUser_Confirm: function() {
    wx.navigateTo({
      url: 'user_confirm/user_confirm',
    })
  },
  ToUser_Card: function() {
    wx.navigateTo({
      url: 'card/card',
    })
  },
  ToUser_Resume: function() {
    wx.navigateTo({
      url: 'resume/resume',
    })
  },
  phoneNoInput: function(event) {
    this.setData({
      phoneNo: event.detail.value
    })
  },
  SmscodeInput: function(event) {
    this.setData({
      sms_code: event.detail.value
    })
  },
  schoolInput: function(event) {
    this.setData({
      schoolname: event.detail.value
    })
  },
  getSmscode: function() {
    var that = this
    var shop_type = that.data.shop_type
    wx.request({
      url: 'https://czw.saleii.com/api/web/user/login/login_sms_send',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'Accept': 'application/json'
      },
      data: {
        phoneNo: this.data.phoneNo,
        shop_type: shop_type
      },
      success: function(res) {
        if (res.data.info) {
          that.setData({
            info: res.data.info
          })
        } else {
          that.setData({
            info: "获取成功"
          })
        }
      }
    })
  },
  tipsClear: function() {
    var that = this
    that.setData({
      info: ""
    })
  },
  dologin: function() {
    if (wecache.get("hasUserInfo") != "has") {
      wx.showModal({
        title: '重要',
        content: '您还没有获取微信权限！请重新进入本页面获取',
      })
    } else {
      var that = this
      var shop_type = that.data.shop_type
      var openid = wx.getStorageSync('openid')
      wx.request({
        url: 'https://czw.saleii.com/api/web/user/login/user_xcx_login',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded', // 默认值
          'Accept': 'application/json'
        },
        data: {
          username: this.data.phoneNo,
          smscode: this.data.sms_code,
          wx_nickname: app.globalData.userInfo.nickName,
          wx_headimg: app.globalData.userInfo.avatarUrl,
          openid: openid,
          biz_area: that.data.schoolname,
          shop_type: shop_type,
        },
        success: function(res) {
          if (res.data.status == "n") {
            that.setData({
              info: res.data.info
            })
          } else {
            wx.setStorageSync('token', res.data.result['token'])
            wx.setStorageSync('username', res.data.result['username'])
            wx.setStorageSync('m_id', res.data.result['m_id'])
            wx.setStorageSync('user_type', res.data.result['user_type'])
            wecache.put("myInfo", res.data.result)
            var myInfo = wecache.get("myInfo")
            setTimeout(function() {
              that.setData({
                // token: res.data.result.token,
                // myInfo: res.data.result
                myInfo: myInfo
              })
              app.globalData.myInfo = myInfo
              app.globalData.token = myInfo.token
              setTimeout(function() {
                wx.request({
                  url: 'https://czw.saleii.com/api/client/get_name',
                  method: 'POST',
                  header: {
                    'content-type': 'application/x-www-form-urlencoded', // 默认值
                    'Accept': 'application/json'
                  },
                  data: {
                    username: that.data.phoneNo,
                    access_token: app.globalData.token
                  },
                  success: function(res) {
                    wecache.put("getinfo", res.data.result)
                    setTimeout(function() {
                      that.setData({
                        getinfo: wecache.get("getinfo")
                      })
                    }, 500)
                  }
                })
              }, 500)

            }, 500)
          }
        }
      })
    }
  },
  toMy_cia: function() {
    wx.navigateTo({
      url: 'my_cia/mycia',
    })
  },
  toMy_activity: function() {
    wx.navigateTo({
      url: 'my_activity/my_activity',
    })
  },
  toMy_idea: function() {
    wx.navigateTo({
      url: 'my_idea/myidea',
    })
  },
  toOpration: function() {
    wx.navigateTo({
      url: 'oprations/oprations',
    })
  },
  tofeedback: function() {
    wx.navigateTo({
      url: 'feedback/feedback',
    })
  },
  clear: function() {
    wecache.put("myresume", null)
    wecache.put("mycard", null)
    wx.switchTab({
      url: '../index/index',
    })
  },
  search: function() {
    wx.navigateTo({
      url: '../out/out',
    })
  },
  to_match: function() {
    wx.navigateTo({
      url: '../match/match',
    })
  },
  getUserInfo: function(event) {
    app.globalData.userInfo = event.detail.userInfo
    this.setData({
      userInfo: event.detail.userInfo,
    })
    wecache.put("hasUserInfo", "has")
    that.onShow()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    that.setData({
      hasUserInfo: wecache.get("hasUserInfo","no")
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})