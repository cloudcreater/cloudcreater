// pages/mine/resume/resume.js
import wecache from "../../../utils/wecache.js"
const app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myInfo: "",
    which_bar: "my_resume",
    is_has: "no",
    myresume: {},
    resumeList: [],
    info: "no",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this

    that.setData({
      myInfo: wecache.get("myInfo")
    })
    if (!wecache.get('myresume', false)) {
      that.setData({
        is_has: 'no'
      })
    } else {
      that.setData({
        myresume: wecache.get('myresume'),
        is_has: 'has'
      })
    }
  },
  to_createResume: function () {
    wx.navigateTo({
      url: 'create_resume/create_resume',
    })
  },
  change: function (event) {
    var name = event.currentTarget.dataset.bar_name;
    if (name == "mine") {
      that.setData({
        which_bar: 'my_resume'
      })
    } else if (name = "collect") {
      that.setData({
        which_bar: 'my_collect'
      })
    }
  },
  op: function () {
    wx.navigateTo({
      url: 'create_resume/create_resume',
    })
  },
  //分享按钮函数
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: '我的小程序',
      path: '/pages/mine/resume/share_resume/share_resume?myresume=' + JSON.stringify(that.data.myresume),
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },
  to_detail:function(){
    wx.navigateTo({
      url: 'index_resume/index_resume',
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
      resumeList: wecache.get("resumeList", null),
      myresume: wecache.get('myresume'),
    })
    console.log(that.data.resumeList)
    if (that.data.resumeList == null) {
      that.setData({
        info: "no"
      })
    } else {
      that.setData({
        info: "has"
      })
    }

    if (that.data.myresume == null) {
      that.setData({
        is_has: "no"
      })
    } else {
      that.setData({
        is_has: "has"
      })
    }
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

})