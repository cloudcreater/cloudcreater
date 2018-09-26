// pages/other_user/other_user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentProject: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let object = JSON.parse(options.project)
    this.setData({
      currentProject: object
    })
    console.log(object)
  },
  to_other_info:function(){
    wx.navigateTo({
      url: 'other_user_info/other_user_info?project='+ JSON.stringify(this.data.currentProject),
    })
  },
  to_remark:function(){
    wx.navigateTo({
      url: 'other_user_remark/other_user_remark',
    })
  },
  to_report:function(){
    wx.navigateTo({
      url: 'user_report/user_report',
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