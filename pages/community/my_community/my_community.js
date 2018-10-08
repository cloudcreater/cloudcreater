// pages/community/my_community/my_community.js
var that
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    communities: "",
    bottom_line:1,
    info:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
  },

  mine:function(){
    wx.request({
      url: 'https://czw.saleii.com/api/client/get_member_group',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'Accept': 'application/json'
      },
      data: {
        username: app.globalData.myInfo.username,
        access_token: app.globalData.myInfo.token,
        page: 1,
        pagesize: 10,
        shop_type: 5,
        type: 0,	//0查我建立的朋友圈 1查我加入的朋友圈  2查询所有朋友圈 默认0,	
      },
      success(res) {
        if (res.data.all_rows != 0) {
          that.setData({
            communities: res.data.result,
            bottom_line: 1,
            info: null
          })
        } else {
          that.setData({
            info: "暂无此类项目",
            bottom_line: 1,
          })
        }
      }
    })
  },

  not:function(){
    wx.request({
      url: 'https://czw.saleii.com/api/client/get_member_group',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'Accept': 'application/json'
      },
      data: {
        username: app.globalData.myInfo.username,
        access_token: app.globalData.myInfo.token,
        page: 1,
        pagesize: 10,
        shop_type: 5,
        type: 1,	//0查我建立的朋友圈 1查我加入的朋友圈  2查询所有朋友圈 默认0,	
      },
      success(res) {
        console.log(res)
        if (res.data.all_rows != 0) {
          that.setData({
            communities: res.data.result,
            bottom_line: 2,
            info: null
          })
        } else {
          that.setData({
            info: "暂无此类项目",
            bottom_line: 2,
          })
        }
      }
    })
  },
  tomain: function (event) {
    var community = event.currentTarget.dataset.item
    wx.switchTab({
      url: '../community',
    })
    app.globalData.other_to_main = 'yes'
    app.globalData.community = community
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
    wx.request({
      url: 'https://czw.saleii.com/api/client/get_member_group',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'Accept': 'application/json'
      },
      data:{
        username: app.globalData.myInfo.username,
        access_token: app.globalData.myInfo.token,
        page: 1,
        pagesize: 10,
        shop_type: 5,
        type: 0,	//0查我建立的朋友圈 1查我加入的朋友圈  2查询所有朋友圈 默认0,	
      },
      success(res){
        console.log(res)
        if (res.data.all_rows != 0){
          that.setData({
            communities: res.data.result,
            bottom_line: 1,
            info: null
          })
        }else{
          that.setData({
            info: "暂无此类项目",
            bottom_line: 1,
          })
        }
      }
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