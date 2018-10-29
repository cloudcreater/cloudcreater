// pages/community/community_main/community_main.js
const app = getApp()
import dateApi from "../../../utils/utils.js"
import wecache from "../../../utils/wecache.js"

var list = []
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    community: "",
    group_id: "",

    items: "",
    dis: 4,
    bottom_line: 1,
    project_type: "is_create",

    dates: "",
    dateArr: [],

    pagesize: 10,
    changepage: 0,

    lebal_num: 1,

    myInfo: null,
    userInfo: null,
    getinfo: null,

    msgs: "",
    bottom_line_msg: 1,
    msg_status: 0,
    info_msg:null,
    status: "全部",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this
    let object = JSON.parse(options.community)
    that.setData({
      community: object
    })
    if (that.data.community.group_id > 0) {
      that.setData({
        group_id: that.data.community.group_id
      })
    } else {
      that.setData({
        group_id: that.data.community.id
      })
    }

    that.setData({
      userInfo: app.globalData.userInfo,
      myInfo: wecache.get("myInfo", "0"),
      getinfo: wecache.get("getinfo", "0")
    })

    wx.setNavigationBarTitle({
      title: that.data.community.name
    })

    if (that.data.community.flag == 2) {
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
          project_industry: "全部",
          project_type: "is_create",
          project_status: "全部",
          shop_type: 5,
          group_type: 1,
          group_id: that.data.group_id,
          is_del: 0
        },
        success(res) {
          console.log(res)
          if (res.data.status == "y") {
            that.setData({
              items: res.data.result,
              info: null,
              dateArr: []
            })
            for (var i = 0; i < res.data.result.length; i++) {
              that.setData({
                dateArr: that.data.dateArr.concat(dateApi.getDateDiff(res.data.result[i].addtime_str + "000"))
              })
            }
          } else {
            that.setData({
              info: "无该类项目"
            })
          }
        }
      })
    } else if (that.data.community.flag == 1) {
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
          project_industry: "全部",
          project_type: "is_create",
          project_status: "全部",
          shop_type: 5,
          group_type: 2,
          group_id: that.data.group_id,
          is_del: 0
        },
        success(res) {
          console.log(res)
          if (res.data.status == "y") {
            that.setData({
              items: res.data.result,
              info: null,
              dateArr: []
            })
            for (var i = 0; i < res.data.result.length; i++) {
              that.setData({
                dateArr: that.data.dateArr.concat(dateApi.getDateDiff(res.data.result[i].addtime_str + "000"))
              })
            }
          } else {
            that.setData({
              info: "无该类项目"
            })
          }
        }
      })
    }
  },
  change: function(event) {
    var name = event.currentTarget.dataset.name;
    that.setData({
      project_type: name,
      changepage: 1
    })
    if (that.data.community.flag == 2) {
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
          project_industry: "全部",
          project_status: "全部",
          project_type: name,
          shop_type: 5,
          group_type: 1,
          group_id: that.data.group_id,
          is_del: 0
        },
        success(res) {
          if (res.data.status == "y") {
            that.setData({
              items: res.data.result,
              info: null,
              dateArr: []
            })
            for (var i = 0; i < res.data.result.length; i++) {
              that.setData({
                dateArr: that.data.dateArr.concat(dateApi.getDateDiff(res.data.result[i].addtime_str + "000"))
              })
            }
          } else {
            that.setData({
              info: "无该类项目"
            })
          }
        },
        complete: function() {
          if (name == "is_create") {
            that.setData({
              bottom_line: 1
            })
          } else if (name == "is_idea") {
            that.setData({
              bottom_line: 2
            })
          } else if (name == "is_active") {
            that.setData({
              bottom_line: 3
            })
          }
          that.setData({
            pagesize: 10,
          })
        }
      })
    } else if (that.data.community.flag == 1) {
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
          project_industry: "全部",
          project_status: "全部",
          project_type: name,
          shop_type: 5,
          group_type: 2,
          group_id: that.data.group_id,
          is_del: 0
        },
        success(res) {
          if (res.data.status == "y") {
            that.setData({
              items: res.data.result,
              info: null,
              dateArr: []
            })
            for (var i = 0; i < res.data.result.length; i++) {
              that.setData({
                dateArr: that.data.dateArr.concat(dateApi.getDateDiff(res.data.result[i].addtime_str + "000"))
              })
            }
          } else {
            that.setData({
              info: "无该类项目"
            })
          }
        },
        complete: function() {
          if (name == "is_create") {
            that.setData({
              bottom_line: 1
            })
          } else if (name == "is_idea") {
            that.setData({
              bottom_line: 2
            })
          } else if (name == "is_active") {
            that.setData({
              bottom_line: 3
            })
          }
          that.setData({
            pagesize: 10,
          })
        }
      })
    }
  },

  toindex_details: function(event) {
    console.log("获取项目详细信息:")
    console.log(event.currentTarget.dataset.item);
    wx.navigateTo({
      url: '../../index/index_details/index_details?project=' + JSON.stringify(event.currentTarget.dataset.item),
    })
  },

  ToUser_Info: function() {
    wx.navigateTo({
      url: '../../mine/user_info/user_info',
    })
  },
  toMy_cia: function() {
    wx.navigateTo({
      url: '../../mine/my_cia/mycia',
    })
  },
  toMy_activity: function() {
    wx.navigateTo({
      url: '../../mine/my_activity/my_activity',
    })
  },
  toMy_idea: function() {
    wx.navigateTo({
      url: '../../mine/my_idea/myidea',
    })
  },




  change_lebal: function(event) {
    var id = event.currentTarget.dataset.id
    that.setData({
      lebal_num: id
    })
    if (id==2){
      var systemtype
      wx.getSystemInfo({
        success: function (res) {
          systemtype = res.system
        }
      })
      app.globalData.group_id = ""
      if (systemtype.substring(0, 7) != "Android") {
        wx.showActionSheet({
          itemList: ['我的创业', '我的创意', '我的活动'],
          success: function (res) {
            app.globalData.group_id = that.data.group_id
            if (res.tapIndex == 0) {
              wx.navigateTo({
                url: '../../send/sendmain/is_mine/is_mine?type=创业',
              })
            } else if (res.tapIndex == 1) {
              wx.navigateTo({
                url: '../../send/sendmain/is_mine/is_mine?type=创意',
              })
            } else if (res.tapIndex == 2) {
              wx.navigateTo({
                url: '../../send/sendmain/is_mine/is_mine?type=活动',
              })
            }
          },
          fail: function (res) {
            console.log(res.errMsg)
            that.setData({
              lebal_num: 1
            })
          }
        })
      } else {
        wx.showActionSheet({
          itemList: ['我的创业', '我的创意', '我的活动', '取消'],
          success: function (res) {
            app.globalData.group_id = that.data.group_id
            if (res.tapIndex == 0) {
              wx.navigateTo({
                url: '../../send/sendmain/is_mine/is_mine?type=创业',
              })
            } else if (res.tapIndex == 1) {
              wx.navigateTo({
                url: '../../send/sendmain/is_mine/is_mine?type=创意',
              })
            } else if (res.tapIndex == 2) {
              wx.navigateTo({
                url: '../../send/sendmain/is_mine/is_mine?type=活动',
              })
            } else if (res.tapIndex == 3) {
              that.setData({
                lebal_num: 1
              })
            }
          },
          fail: function (res) {
            console.log(res.errMsg)
            that.setData({
              lebal_num: 1
            })
          }
        })
      }
    }
  },




  quit: function() {
    if (that.data.community.flag == 2) {
      wx.request({
        url: 'https://czw.saleii.com/api/client/join_member_group',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded', // 默认值
          'Accept': 'application/json'
        },
        data: {
          username: app.globalData.myInfo.username,
          access_token: app.globalData.myInfo.token,
          shop_type: 5,
          type: 1,
          group_id: that.data.group_id
        },
        success(res) {
          console.log(res)
          wx.showModal({
            title: '提示',
            content: '退出成功',
            success(res) {
              if (res.confirm) {
                wx.switchTab({
                  url: '../community',
                })
              } else {
                wx.switchTab({
                  url: '../community',
                })
              }
            }
          })

        }
      })
    } else {
      var community = that.data.community
      wx.request({
        url: 'https://czw.saleii.com/api/client/save_member_group',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded', // 默认值
          'Accept': 'application/json'
        },
        data: {
          username: app.globalData.myInfo.username,
          access_token: app.globalData.myInfo.token,
          shop_type: 5,
          group_id: community.id,
          status: 1,
          group_name: community.name,
          group_type: community.type,
          industry_type: community.industry_type,
          logo: community.logo,
          pass_code: community.pass_code,
          group_city: community.city_str,
        },
        success: function(res) {
          console.log(res)
          wx.showModal({
            title: '提示',
            content: '删除成功',
            success(res) {
              if (res.confirm) {
                wx.switchTab({
                  url: '../community',
                })
              } else {
                wx.switchTab({
                  url: '../community',
                })
              }
            }
          })
        }
      })
    }
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
            bottom_line_msg: 1,
            dateArr: [],
            msg_status: 0,
            info_msg: null
          })
          for (var i = 0; i < res.data.result.length; i++) {
            that.setData({
              dateArr: that.data.dateArr.concat(dateApi.getDateDiff(res.data.result[i].create_time + "000"))
            })
          }
        } else {
          that.setData({
            info_msg: "暂无此类项目",
            bottom_line_msg: 1,
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
            bottom_line_msg: 2,
            dateArr: [],
            msg_status: 1,
            info_msg: null
          })
          for (var i = 0; i < res.data.result.length; i++) {
            that.setData({
              dateArr: that.data.dateArr.concat(dateApi.getDateDiff(res.data.result[i].create_time + "000"))
            })
          }
        } else {
          that.setData({
            info_msg: "暂无此类项目",
            bottom_line_msg: 2,
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
                      bottom_line_msg: 1,
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
                if (res.data.status == "y") {
                  var project = res.data.result[0]
                  console.log(project)
                  wx.navigateTo({
                    url: '../index/index_details/index_details?project=' + JSON.stringify(project),
                  })
                } else {
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (that.data.community.flag == 2) {
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
          project_industry: "全部",
          project_type: "is_create",
          project_status: "全部",
          shop_type: 5,
          group_type: 1,
          group_id: that.data.group_id,
          is_del: 0
        },
        success(res) {
          console.log(res)
          if (res.data.status == "y") {
            that.setData({
              items: res.data.result,
              info: null,
              dateArr: []
            })
            for (var i = 0; i < res.data.result.length; i++) {
              that.setData({
                dateArr: that.data.dateArr.concat(dateApi.getDateDiff(res.data.result[i].addtime_str + "000"))
              })
            }
          } else {
            that.setData({
              info: "无该类项目"
            })
          }
        }
      })
    } else if (that.data.community.flag == 1) {
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
          project_industry: "全部",
          project_type: "is_create",
          project_status: "全部",
          shop_type: 5,
          group_type: 2,
          group_id: that.data.group_id,
          is_del: 0
        },
        success(res) {
          console.log(res)
          if (res.data.status == "y") {
            that.setData({
              items: res.data.result,
              info: null,
              dateArr: []
            })
            for (var i = 0; i < res.data.result.length; i++) {
              that.setData({
                dateArr: that.data.dateArr.concat(dateApi.getDateDiff(res.data.result[i].addtime_str + "000"))
              })
            }
          } else {
            that.setData({
              info: "无该类项目"
            })
          }
        }
      })
    }

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
            bottom_line_msg: that.data.bottom_line,
            dateArr: [],
            info_msg: null
          })
          for (var i = 0; i < res.data.result.length; i++) {
            that.setData({
              dateArr: that.data.dateArr.concat(dateApi.getDateDiff(res.data.result[i].create_time + "000"))
            })
          }
        } else {
          that.setData({
            info_msg: "暂无此类项目"
          })
        }
      }
    })
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
  onShareAppMessage: function() {

  }
})