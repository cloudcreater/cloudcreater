// pages/send/sendmain/is_mine/photos/photos.js
const app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_arr:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    if (app.globalData.img_arr.length>0){
      for (var i = 0; i < app.globalData.edit_img_arr.length; i++) {
        that.setData({
          img_arr: that.data.img_arr.concat(app.globalData.edit_img_arr[i])
        })
      }
    }
  },
  choose:function(){
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      success: function(res) {
        that.setData({
          img_arr: that.data.img_arr.concat(res.tempFilePaths), //res.tempFilePaths 本地文件地址 img_arr数组最多放5张图片 
        })
        app.globalData.edit_img_arr = app.globalData.edit_img_arr.concat(res.tempFilePaths)
      },
    })
  },
  concel:function(event){
    var index = event.currentTarget.dataset.index
    var img_arr = that.data.img_arr
    wx.showModal({
      title: '提示',
      content: '是否取消上传',
      success:function(res){
        if(res.confirm){
          img_arr.splice(index, 1)
          that.setData({
            img_arr: img_arr
          })
          app.globalData.img_arr = that.data.img_arr
          wx.showToast({
            title: '取消成功',
          })
        }
      }
    })
  },
  backandsave:function(){
    wx.navigateBack({
      delta:1
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