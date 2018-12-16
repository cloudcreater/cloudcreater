// pages/send/sendblank/sendblank.js
var that
const app = getApp()
import wecache from "../../../utils/wecache.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    draft: "",
    tid: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this
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
    app.globalData.group_id = ""
    wx.getStorage({
      key: 'has_draft',
      success: function(res) {
        that.setData({
          draft: res.data
        })
      },
    })
    if (wecache.get("myInfo", "0") == 0) {
      wx.showModal({
        title: '重要',
        content: '请先登陆！',
        success: function(res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../../mine/mine',
            })
          } else if (res.cancel) {
            wx.switchTab({
              url: '../../index/index',
            })
          }
        }
      })
    } else {
      var systemtype
      wx.getSystemInfo({
        success: function(res) {
          systemtype = res.system
        }
      })
      if (systemtype.substring(0, 7) != "Android") {
        wx.showActionSheet({
          itemList: ['我的创业', /*'我的创意'*/, '我的活动', '我的草稿'],
          success: function(res) {
            if (res.tapIndex == 0) {
              wx.navigateTo({
                url: '../sendmain/is_mine/is_mine?type=创业',
              })
            }
            //  else if (res.tapIndex == 1) {
            //   wx.navigateTo({
            //     url: '../sendmain/is_mine/is_mine?type=创意',
            //   })
            // } 
            else if (res.tapIndex == 1) {
              wx.navigateTo({
                url: '../sendmain/is_mine/is_mine?type=活动',
              })
            } else if (res.tapIndex == 2) {
              console.log(that.data.draft)
              if (that.data.draft != "has") {
                wx.showModal({
                  title: '重要',
                  content: '无草稿',
                  success: function(res) {
                    if (res.confirm) {
                      that.onShow()
                    } else if (res.cancel) {
                      that.onShow()
                    }
                  }
                })
              } else {
                wx.navigateTo({
                  url: '../mydraft/mydraft',
                })
              }
            }
          },
          fail: function(res) {
            console.log(res.errMsg)
            wx.switchTab({
              url: '../../index/index',
            })
          }
        })
      } else {
        wx.showActionSheet({
          itemList: ['我的创业', /*'我的创意'*/, '我的活动', '我的草稿', '取消'],
          success: function(res) {
            if (res.tapIndex == 0) {
              wx.navigateTo({
                url: '../sendmain/is_mine/is_mine?type=创业',
              })
            }
            //  else if (res.tapIndex == 1) {
            //   wx.navigateTo({
            //     url: '../sendmain/is_mine/is_mine?type=创意',
            //   })
            // } 
            else if (res.tapIndex == 1) {
              wx.navigateTo({
                url: '../sendmain/is_mine/is_mine?type=活动',
              })
            } else if (res.tapIndex == 2) {
              console.log(that.data.draft)
              if (that.data.draft != "has") {
                wx.showModal({
                  title: '重要',
                  content: '无草稿',
                  success: function(res) {
                    if (res.confirm) {
                      that.onShow()
                    } else if (res.cancel) {
                      that.onShow()
                    }
                  }
                })
              } else {
                wx.navigateTo({
                  url: '../mydraft/mydraft',
                })
              }
            } else if (res.tapIndex == 3) {
              wx.switchTab({
                url: '../../index/index',
              })
            }
          },
          fail: function(res) {
            console.log(res.errMsg)
            wx.switchTab({
              url: '../../index/index',
            })
          }
        })
      }
    }
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