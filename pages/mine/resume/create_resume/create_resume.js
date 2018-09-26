// pages/mine/resume/create_resume/create_resume.js
import wecache from "../../../../utils/wecache.js"
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gender: "",
    old: "",
    birth: "",
    search: "",
    time: "",
    school: "",
    professional: "",
    edubg: "",
    workexp: "",
    myresume: null,
    is_edit: "no",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this
    that.setData({
      myInfo: wecache.get("myInfo"),
      myresume: wecache.get("myresume", null)
    })
    if (that.data.myresume != null) {
      that.setData({
        is_edit: "yes"
      })
      setTimeout(function () {
        that.setData({
          gender: that.data.myresume.gender,
          old: that.data.myresume.old,
          birth: that.data.myresume.birth,
          search: that.data.myresume.search,
          time: that.data.myresume.time,
          school: that.data.myresume.school,
          professional: that.data.myresume.professional,
          edubg: that.data.myresume.edubg,
          workexp: that.data.myresume.workexp
        })
      }, 500)
    }
    
  },
  create: function() {
    var myresume = {}
    myresume.wx_headimg = that.data.myInfo.wx_headimg
    myresume.wx_nickname = that.data.myInfo.wx_nickname
    myresume.username = that.data.myInfo.username
    myresume.gender = that.data.gender
    myresume.old = that.data.old
    myresume.birth = that.data.birth
    myresume.search = that.data.search
    myresume.time = that.data.time
    myresume.school = that.data.school
    myresume.professional = that.data.professional
    myresume.edubg = that.data.edubg
    myresume.workexp = that.data.workexp
    console.log(myresume)
    wecache.put("myresume", myresume)
    wx.navigateBack({
      delta: 1,
      success: function(e) {
        var page = getCurrentPages().pop();
        page.onShow();
      }
    })
  },
  input: function(event) {
    var type = event.currentTarget.dataset.type
    if (type == 'gender') {
      that.setData({
        gender: event.detail.value
      })
    } else if (type == 'old') {
      that.setData({
        old: event.detail.value
      })
    } else if (type == 'birth') {
      that.setData({
        birth: event.detail.value
      })
    } else if (type == 'search') {
      that.setData({
        search: event.detail.value
      })
    } else if (type == 'time') {
      that.setData({
        time: event.detail.value
      })
    } else if (type == 'school') {
      that.setData({
        school: event.detail.value
      })
    } else if (type == 'professional') {
      that.setData({
        professional: event.detail.value
      })
    } else if (type == 'edubg') {
      that.setData({
        edubg: event.detail.value
      })
    } else if (type == 'workexp') {
      that.setData({
        workexp: event.detail.value
      })
    }
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