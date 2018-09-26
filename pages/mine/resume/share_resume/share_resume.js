// pages/mine/resume/share_resume/share_resume.js
import wecache from "../../../../utils/wecache.js"
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myresume: {},
    is_collected: "no"    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    let object = JSON.parse(options.myresume)
    that.setData({
      myresume: object
    })
  },
  collect: function () {
    var List = wecache.get("resumeList", null)
    if (List == null) {
      var resumeList = [{}]
      resumeList[0] = that.data.myresume
      wecache.put("resumeList", resumeList)
      wx.showModal({
        title: '提示',
        content: '已收藏',
      })
      setTimeout(function () {
        that.onShow()
      }, 1000)
    } else {
      var resumeList = wecache.get("resumeList")
      var length = resumeList.length
      resumeList[length] = that.data.myresume
      wecache.put("resumeList", resumeList)
      wx.showModal({
        title: '提示',
        content: '已收藏',
      })
      setTimeout(function () {
        that.onShow()
      }, 1000)
    }

  },
  back: function () {
    wx.navigateTo({
      url: '../resume',
    })
  },
  to_detail: function () {
    wx.navigateTo({
      url: '../share_detail/share_detail?myresume=' + JSON.stringify(that.data.myresume),
    })
  },
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var List = wecache.get("resumeList", null)
    console.log(List)
    if (List != null) {
      console.log(List)
      for (var i = 0; i < List.length; i++) {
        if (that.data.myresume.username == List[i].username) {
          that.setData({
            is_collected: "yes"
          })
        }
        break;
      }
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