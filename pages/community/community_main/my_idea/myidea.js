// pages/mine/my_cia/mycia.js
import dateApi from "../../../../utils/utils.js"
const app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: null,
    bottom_line: 1,
    cia_name: "",
    project_name:"",
    is_join_num: 1,
    is_publish_num:0,
    is_focus_num: 0,
    dateArr:[],
    dis: false,
    isSelect: false,
    status:"全部",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    bottom_line: (options.bottom_line == "1")
    that = this
    wx.request({
      url: 'https://czw.saleii.com/api/client/get_project_list',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'Accept': 'application/json'
      },
      data: {
        username: app.globalData.myInfo.username,
        project_industry: "全部",
        access_token: app.globalData.myInfo.token,
        is_join: that.data.is_join_num,
        is_focus: that.data.is_focus_num,
        is_publish: that.data.is_publish_num,
        project_type: "is_idea",
        project_status: that.data.status,
        is_del: 0
      },
      success: function (res) {
        if (res.data.status == "y") {
          that.setData({
            items: res.data.result,
            info: null,
            dateArr:[]
          })
          for (var i = 0; i < res.data.result.length; i++) {
            that.setData({
              dateArr: that.data.dateArr.concat(dateApi.getDateDiff(res.data.result[i].addtime_str + "000"))
            })
          }
        } else {
          that.setData({
            info: "暂无此类项目"
          })
        }
      }
    })
  },
  change: function (event) {
    var name = event.currentTarget.dataset.name;
    that.setData({
      project_name: name
    })
    if (name == "is_join") {
      that.setData({
        is_join_num: 1,
        is_focus_num: 0,
        is_publish_num: 0
      })
    } else if (name == "is_focus") {
      that.setData({
        is_join_num: 0,
        is_focus_num: 1,
        is_publish_num: 0
      })
    } else if (name == "is_publish") {
      that.setData({
        is_join_num: 0,
        is_focus_num: 0,
        is_publish_num: 1
      })
    }
    wx.request({
      url: 'https://czw.saleii.com/api/client/get_project_list',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'Accept': 'application/json'
      },
      data: {
        username: app.globalData.myInfo.username,
        project_industry: "全部",
        access_token: app.globalData.myInfo.token,
        is_join: that.data.is_join_num,
        is_focus: that.data.is_focus_num,
        is_publish: that.data.is_publish_num,
        project_type: "is_idea",
        project_status: that.data.status,
        is_del: 0
      },
      success: function (res) {
        if (res.data.status == "y") {
          that.setData({
            items: res.data.result,
            info: null,
            dateArr:[]
          })
          for (var i = 0; i < res.data.result.length; i++) {
            that.setData({
              dateArr: that.data.dateArr.concat(dateApi.getDateDiff(res.data.result[i].addtime_str + "000"))
            })
          }
        } else {
          that.setData({
            info: "暂无此类项目"
          })
        }
      },
      complete: function () {
        if (name == "is_join") {
          that.setData({
            bottom_line: 1
          })
        } else if (name == "is_focus") {
          that.setData({
            bottom_line: 2
          })
        } else if (name == "is_publish") {
          that.setData({
            bottom_line: 3
          })
        }
      }
    })
  },
  toindex_details: function (event) {
    console.log("获取项目详细信息:")
    console.log(event.currentTarget.dataset.item);
    wx.navigateTo({
      url: '../../index/index_details/index_details?project=' + JSON.stringify(event.currentTarget.dataset.item),
    })
  },
  toOther_user: function (event) {
    console.log("获取项目详细信息:")
    console.log(event.currentTarget.dataset.item);
    wx.navigateTo({
      url: '../../other_user/other_user_info/other_user_info?project=' + JSON.stringify(event.currentTarget.dataset.item),
    })
  },
  do_op: function () {
    that.setData({
      dis: !that.data.dis
    })
  },
  del: function (event) {
    var item = event.currentTarget.dataset.item;
    console.log(item.id)
    wx.showModal({
      title: '重要',
      content: '是否要删除',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: 'https://czw.saleii.com/api/client/save_project_info',
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded', // 默认值
              'Accept': 'application/json'
            },
            data: {
              username: app.globalData.myInfo.username,
              access_token: app.globalData.token,
              nickname: app.globalData.myInfo.wx_nickname,
              title: item.title,
              type: 3,
              project_location: item.project_location,
              project_industry: item.project_industry,
              project_classify: item.project_classify,
              project_tag: "",
              project_task: item.task,
              project_captial: item.project_captial,
              project_status: item.project_status,
              project_desc: item.project_desc,
              project_team: item.project_team,
              desc: item.desc,
              project_img1: item.project_img1,
              project_img2: item.project_img2,
              project_img3: item.project_img3,
              project_img4: item.project_img4,
              project_img5: item.project_img5,
              is_del: 1,
              post_id: item.id
            },
            success(res) {
              console.log(res)
              wx.showModal({
                title: '提示',
                content: '删除成功',
                success(res) {
                  if (res.confirm) {
                    that.onShow()
                  }
                }
              })
            }
          })
        }
      }
    })
  },
  edit: function (event) {
    wx.navigateTo({
      url: '../editpage/editpage?item=' + JSON.stringify(event.currentTarget.dataset.item),
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
    wx.request({
      url: 'https://czw.saleii.com/api/client/get_project_list',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'Accept': 'application/json'
      },
      data: {
        username: app.globalData.myInfo.username,
        project_industry: "全部",
        access_token: app.globalData.myInfo.token,
        is_join: that.data.is_join_num,
        is_focus: that.data.is_focus_num,
        is_publish: that.data.is_publish_num,
        project_type: "is_idea",
        project_status: that.data.status,
        is_del: 0
      },
      success: function (res) {
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
            info: "暂无此类项目"
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