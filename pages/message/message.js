// pages/message/message.js
import dateApi from "../../utils/utils.js"
import wecache from "../../utils/wecache.js"
const app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msgs: "",
    bottom_line: 1,
    dateArr: [],
    msg_status: 0,
    pagesize: 10,
    info:null,
    status:"全部",
    username:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this
    that.setData({
      username: app.globalData.myInfo.username
    })
  },
  not_read: function() {
    wx.request({
      url: 'https://czw.saleii.com/api/client/get_member_messages',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'Accept': 'application/json'
      },
      data: {
        username: app.globalData.myInfo.username,
        access_token: app.globalData.myInfo.token,
        msg_status: 0,
        pagesize: that.data.pagesize,
      },
      success: function(res) {
        console.log(res.data.result)
        if (res.data.status == "y") {
          that.setData({
            msgs: res.data.result,
            bottom_line: 1,
            dateArr: [],
            msg_status: 0,
            info: null
          })
          for (var i = 0; i < res.data.result.length; i++) {
            that.setData({
              dateArr: that.data.dateArr.concat(dateApi.getDateDiff(res.data.result[i].create_time + "000"))
            })
          }
        } else {
          that.setData({
            info: "暂无此类项目",
            bottom_line: 1,
          })
        }
      },
      complete: function() {
        that.setData({
          pagesize: 10,
        })
      }
    })
  },
  is_read: function() {
    wx.request({
      url: 'https://czw.saleii.com/api/client/get_member_messages',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'Accept': 'application/json'
      },
      data: {
        username: app.globalData.myInfo.username,
        access_token: app.globalData.myInfo.token,
        msg_status: 1,
        pagesize: that.data.pagesize,
      },
      success: function(res) {
        console.log(res.data.result)
        if (res.data.status == "y") {
          that.setData({
            msgs: res.data.result,
            bottom_line: 2,
            dateArr: [],
            msg_status: 1,
            info: null
          })
          for (var i = 0; i < res.data.result.length; i++) {
            that.setData({
              dateArr: that.data.dateArr.concat(dateApi.getDateDiff(res.data.result[i].create_time + "000"))
            })
          }
        } else {
          that.setData({
            info: "暂无此类项目",
            bottom_line: 2,
          })
        }
      },
      complete: function() {
        that.setData({
          pagesize: 10,
        })
      }
    })
  },
  oprations: function(event) {
    var id = event.currentTarget.dataset.id
    var msg_type = event.currentTarget.dataset.msg_type
    var msg_status = event.currentTarget.dataset.msg_status
    var pid = event.currentTarget.dataset.project_id
    if ((msg_type == 1 || msg_type == 2 || msg_type == 3) && msg_status == 0) {
      wx.showActionSheet({
        itemList: ['设为已读', '查看详情'],
        success: function(res) {
          if (res.tapIndex == 0) {
            wx.request({
              url: 'https://czw.saleii.com/api/client/update_member_messages',
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded', // 默认值
                'Accept': 'application/json'
              },
              data: {
                username: app.globalData.myInfo.username,
                access_token: app.globalData.myInfo.token,
                shop_type: 5,
                message_id: id
              },
              success: function() {
                wx.request({
                  url: 'https://czw.saleii.com/api/client/get_member_messages',
                  method: 'POST',
                  header: {
                    'content-type': 'application/x-www-form-urlencoded', // 默认值
                    'Accept': 'application/json'
                  },
                  data: {
                    username: app.globalData.myInfo.username,
                    access_token: app.globalData.myInfo.token,
                    msg_status: 0
                  },
                  success: function(res) {
                    console.log(res.data.result)
                    that.setData({
                      msgs: res.data.result,
                      bottom_line: 1,
                      dateArr: []
                    })
                    for (var i = 0; i < res.data.result.length; i++) {
                      that.setData({
                        dateArr: that.data.dateArr.concat(dateApi.getDateDiff(res.data.result[i].create_time + "000"))
                      })
                    }
                  }
                })
              }
            })
          } else if (res.tapIndex == 1) {
            wx.request({
              url: 'https://czw.saleii.com/api/client/get_project_list',
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded', // 默认值
                'Accept': 'application/json'
              },
              data: {
                username: app.globalData.myInfo.username,
                access_token: app.globalData.myInfo.token,
                project_status: that.data.status,
                project_id: pid
              },
              success: function(res) {
                if(res.data.status == "y"){
                  var project = res.data.result[0]
                  console.log(project)
                  wx.navigateTo({
                    url: '../index/index_details/index_details?project=' + JSON.stringify(project),
                  })
                }else{
                  wx.showModal({
                    title: '重要',
                    content: '该项目已被删除！',
                  })
                }
              }
            })
          }
        }
      })
      // } else if (msg_type == 4 && msg_status == 0){
      //   wx.showActionSheet({
      //     itemList: ['设为已读', '回复消息'],
      //     success: function (res) {
      //       if (res.tapIndex == 0) {
      //         wx.request({
      //           url: 'https://czw.saleii.com/api/client/update_member_messages',
      //           method: 'POST',
      //           header: {
      //             'content-type': 'application/x-www-form-urlencoded', // 默认值
      //             'Accept': 'application/json'
      //           },
      //           data: {
      //             username: app.globalData.myInfo.username,
      //             access_token: app.globalData.myInfo.token,
      //             shop_type: 5,
      //             message_id: id
      //           },
      //           success: function () {
      //             wx.request({
      //               url: 'https://czw.saleii.com/api/client/get_member_messages',
      //               method: 'POST',
      //               header: {
      //                 'content-type': 'application/x-www-form-urlencoded', // 默认值
      //                 'Accept': 'application/json'
      //               },
      //               data: {
      //                 username: app.globalData.myInfo.username,
      //                 access_token: app.globalData.myInfo.token,
      //                 msg_status: 0
      //               },
      //               success: function (res) {
      //                 console.log(res.data.result)
      //                 that.setData({
      //                   msgs: res.data.result,
      //                   bottom_line: 1,
      //                   dateArr: []
      //                 })
      //                 for (var i = 0; i < res.data.result.length; i++) {
      //                   that.setData({
      //                     dateArr: that.data.dateArr.concat(dateApi.getDateDiff(res.data.result[i].create_time + "000"))
      //                   })
      //                 }
      //               }
      //             })
      //           }
      //         })
      //       } else if (res.tapIndex == 1) {

      //       }
      //     }
      //   })
      // } 
    } else if (msg_status == 1) {
      wx.showActionSheet({
        itemList: ['查看详情'],
        success: function(res) {
          if (res.tapIndex == 0) {
            var pid = event.currentTarget.dataset.project_id
            wx.request({
              url: 'https://czw.saleii.com/api/client/get_project_list',
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded', // 默认值
                'Accept': 'application/json'
              },
              data: {
                username: app.globalData.myInfo.username,
                access_token: app.globalData.myInfo.token,
                project_id: pid
              },
              success: function(res) {
                var project = res.data.result[0]
                console.log(project)
                wx.navigateTo({
                  url: '../index/index_details/index_details?project=' + JSON.stringify(project),
                })
              }
            })
          }
        }
      })
    }
  },
  toOther_user: function(event) {
    wx.navigateTo({
      url: 'messagemain/messagemain?msg=' + JSON.stringify(event.currentTarget.dataset.msg),
    })
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
    if (wecache.get("myInfo", "0") == 0) {
      wx.showModal({
        title: '重要',
        content: '请先登陆！',
        success: function(res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../mine/mine',
            })
          } else if (res.cancel) {
            wx.switchTab({
              url: '../index/index',
            })
          }
        }
      })
    } else {
      wx.request({
        url: 'https://czw.saleii.com/api/client/get_member_messages',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded', // 默认值
          'Accept': 'application/json'
        },
        data: {
          username: app.globalData.myInfo.username,
          access_token: app.globalData.myInfo.token,
          msg_status: that.data.msg_status,
          pagesize: that.data.pagesize,
        },
        success: function(res) {

          console.log(res.data.result)
          if (res.data.status == "y") {
            that.setData({
              msgs: res.data.result,
              bottom_line: that.data.bottom_line,
              dateArr: [],
              info:null
            })
            for (var i = 0; i < res.data.result.length; i++) {
              that.setData({
                dateArr: that.data.dateArr.concat(dateApi.getDateDiff(res.data.result[i].create_time + "000"))
              })
            }
          } else {
            that.setData({
              info: "暂无此类项目"
            })
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    var that = this
    that.setData({
      pagesize: 10
    })
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
    var that = this
    that.setData({
      pagesize: that.data.pagesize + 5,
    })
    console.log(that.data.pagesize)
    that.onShow()
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function() {

  // }
})