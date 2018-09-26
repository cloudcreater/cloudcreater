// pages/mine/user_info/user_info.js
import wecache from "../../../utils/wecache.js"
const app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:"",
    myInfo: "",
    getinfo: "",
    Wxnumber:"",
    hiddenmodalput: true,  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this
    that.setData({
      userInfo: app.globalData.userInfo,
      myInfo: wecache.get("myInfo", "0"),
      getinfo: wecache.get("getinfo", "0"),
    })
  },
  edit_Wxnumber:function(){
    console.log(that.data.getinfo)
    that.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })  
  },
  cancel: function () {
    that.setData({
      hiddenmodalput: true
    })
  },
  //确认  
  confirm: function () {
    wx.request({
      url: 'https://czw.saleii.com/api/client/update_name',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'Accept': 'application/json'
      },
      data:{
        username: app.globalData.myInfo.username,
        access_token: app.globalData.myInfo.token,
        shop_type:5,
        note: that.data.Wxnumber,
      },
      success:function(res){
        wx.request({
          url: 'https://czw.saleii.com/api/client/get_name',
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded', // 默认值
            'Accept': 'application/json'
          },
          data: {
            username: app.globalData.myInfo.username,
            access_token: app.globalData.token
          },
          success: function (res) {
            console.log(res)
            wecache.put("getinfo", res.data.result)
            setTimeout(function () {
              that.setData({
                getinfo: wecache.get("getinfo")
              })
            }, 500)
          }
        })
        console.log(res)
        that.setData({
          hiddenmodalput: true,
          Wxnumber:""
        })
        that.onLoad()
      }
    })
  },
  Wxnumber_input: function (event){
    that.setData({
      Wxnumber: event.detail.value
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
    that.setData({
      hiddenmodalput: true,
      Wxnumber: ""
    })
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