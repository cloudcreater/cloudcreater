// pages/community/create_community/selectlebal/selectlebal.js
var that 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    symbols: [
      { tid: "", type: "" },
      { iid: "", intype: "" },
    ],

    type: "",
    tid: "",

    intype: "",
    iid: "",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    symbols: ""
    that = this
  },
  choose_type: function (event) {
    var type = event.currentTarget.dataset.type
    var tid = event.currentTarget.dataset.tid
    that.setData({
      tid: tid,
      type: type,
      'symbols[0].tid': tid,
      'symbols[0].type': type,
    })
  },
  choose_intype: function (event) {
    var intype = event.currentTarget.dataset.intype
    var iid = event.currentTarget.dataset.iid
    that.setData({
      iid: iid,
      intype: intype,
      'symbols[1].iid': iid,
      'symbols[1].intype': intype,
    })
  },
  confirm: function () {
    if (that.data.intype && that.data.type) {
        var pages = getCurrentPages()
        var prevPage = pages[pages.length - 1]  //当前界面
        var prevPage = pages[pages.length - 2]  //上一个页面
        prevPage.setData({
          symbols: that.data.symbols
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 500)
      } else {
        wx.showModal({
          title: '重要',
          content: '请选完每一个项目！',
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