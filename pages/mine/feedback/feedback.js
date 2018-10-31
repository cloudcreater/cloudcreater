// pages/mine/feefback/feedback.js
var that
const app = getApp()
var appid = app.globalData.appid
var appsecret = app.globalData.appsecret
var shop_type = app.globalData.shop_type
var openid = app.globalData.openid
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this
  },
  textinput:function(event){
    that.setData({
      content:event.detail.value
    })
  },  
  sub: function (event){
    var formID = event.detail.formId;
    that.setData({
      formID: formID,
    })
    console.log('feedback sub formID:', formID)
    that.remindMessage()
    wx.showModal({
      title: '提示',
      content: '提交完毕，感谢您的意见！',
      success(res){
        if(res.confirm){
          wx.switchTab({
            url: '../../index/index',
          })
        } else if (res.cancel){
          wx.switchTab({
            url: '../../index/index',
          })
        }
      }
    })
  },
  remindMessage: function () {
    var project_m_id = 3964  //   这里改成是我的id    hmc！！！
    var formID = that.data.formID
    var content = that.data.content
    var openid = wx.getStorageSync('openid')   
    var msg_type = 2  //for feedback
    wx.request({
      url: 'https://czw.saleii.com/api/WXPay/sendMessage2Openid',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'Accept': 'application/json'
      },
      data: {
        m_id: project_m_id,
        openid: openid,
        from_username: app.globalData.myInfo.username,
        access_token: app.globalData.token,
        formid: formID,
        content: content,
        appid: appid,
        appsecret: appsecret,
        shop_type: shop_type,
        msg_type: msg_type,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
      },
    })
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