// pages/mine/card/create_card/create_card.js
import wecache from "../../../../utils/wecache.js"
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myInfo:"",
    school:"",
    job:"",
    address:"",
    skill:"",
    need:"",
    mycard: null,
    is_edit:"no",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    that.setData({
      myInfo: wecache.get("myInfo"),
      mycard: wecache.get("mycard",null)
    })
    if (that.data.mycard!=null){
      that.setData({
        is_edit:"yes"
      })
      setTimeout(function () {
        that.setData({
          school: that.data.mycard.school,
          job: that.data.mycard.job,
          address: that.data.mycard.address,
          skill: that.data.mycard.skill,
          need: that.data.mycard.need,
        })
      }, 500)
    }
  },
  create:function(){
    var mycard = {}
    mycard.wx_headimg = that.data.myInfo.wx_headimg
    mycard.wx_nickname = that.data.myInfo.wx_nickname
    mycard.username = that.data.myInfo.username
    mycard.school = that.data.school
    mycard.job = that.data.job
    mycard.address = that.data.address
    mycard.skill = that.data.skill
    mycard.need = that.data.need
    console.log(mycard)
    wecache.put("mycard", mycard)
    wx.navigateBack({
      delta:1,
      success: function (e) {
        var page = getCurrentPages().pop();
        page.onShow();
      } 
    })
  },
  input:function(event){
    var type = event.currentTarget.dataset.type
    if(type=='school'){
      that.setData({
        school: event.detail.value
      })
    } else if (type == 'job'){
      that.setData({
        job: event.detail.value
      })
    } else if (type == 'address') {
      that.setData({
        address: event.detail.value
      })
    } else if (type == 'skill') {
      that.setData({
        skill: event.detail.value
      })
    } else if (type == 'need') {
      that.setData({
        need: event.detail.value
      })
    }
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