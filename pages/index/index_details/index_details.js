// pages/index/index_details/index_details.js
const app = getApp()
var weburl = app.globalData.weburl;
var appid = app.globalData.appid
var appsecret = app.globalData.appsecret
var openid = app.globalData.openid
var shop_type = app.globalData.shop_type
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentProject:"",
    prize_m_id:"",
    num_prize:"",
    focus_m_id:"",
    join_m_id:"",
    username:"",
    dis:false,
    status:"全部",
    shop_type:shop_type,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(' index_details onLoad options:',options)
    let object = JSON.parse(options.project)
    this.setData({
      currentProject: object,
      prize_m_id: object.prize_m_id,
      num_prize: object.num_prize,
      focus_m_id: object.focus_m_id,
      join_m_id: object.join_m_id,
      username: app.globalData.myInfo.username
    })
    console.log(object.prize_m_id)
    console.log(object.num_prize)
    console.log(this.data.join_m_id)
    var that = this
    var shop_type = that.data.shop_type
    wx.request({
      url: 'https://czw.saleii.com/api/client/get_projectmember_joinlist',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'Accept': 'application/json'
      },
      data: {
        username: app.globalData.myInfo.username,
        access_token: app.globalData.myInfo.token,
        post_id: object.id,
        shop_type:that.data.shop_type,
      },
      success(res) {
        that.setData({
          user_items: res.data.result
        })
      }
    })
    
  },
  tochat:function(){
    wx.navigateTo({
      url: 'chat/chat',
    })
  },
  tophoto:function(){
    wx.navigateTo({
      url: 'project_photoes/project_photoes?project=' + JSON.stringify(this.data.currentProject),
    })
  },
  toOther_user:function(){
    wx.navigateTo({
      url: '../../other_user/other_user_info/other_user_info?project=' + JSON.stringify(this.data.currentProject), 
    })
  },
  //分享按钮函数
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: '我的小程序',
      path: 'pages/index/index',
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
  doprize:function(event){
      var that = this
      var shop_type = that.data.shop_type
      var pid = event.currentTarget.dataset.pid
      console.log(pid)
      wx.request({
        url: 'https://czw.saleii.com/api/client/post_prize',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded', // 默认值
          'Accept': 'application/json'
        },
        data :{
          username: app.globalData.myInfo.username,
          access_token: app.globalData.token,
          post_id: pid,
          shop_type:shop_type
        },
        success:function(res){
         if(res.data.info){
           wx.showToast({
             title: res.data.info,
             duration: 1500,
             icon: "none",
           })
           return
         }else{
           wx.showToast({
             title: '点赞成功',
             duration: 1500,
             icon: "success",
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
              access_token: app.globalData.token,
              project_status: that.data.status,
              project_id: pid,
              shop_type:shop_type,
            },success:function(res){
              that.setData({
                prize_m_id: res.data.result[0].prize_m_id,
                num_prize: res.data.result[0].num_prize
              })
            }
          })
        }
      })
  },
  dojoin: function (event){

    var that = this
    var shop_type = that.data.shop_type
    var pid = event.currentTarget.dataset.pid
    var formID = event.detail.formId;
    that.setData({
      formID: formID,
      project_id:pid,
    })
    console.log('dojoin',pid,' formID:',formID)
    that.remindMessage()

    wx.request({
      url: 'https://czw.saleii.com/api/client/post_join',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'Accept': 'application/json'
      },
      data: {
        username: app.globalData.myInfo.username,
        access_token: app.globalData.token,
        post_id: pid,
        shop_type:shop_type,
      },
      success: function (res) {
        if (res.data.info) {
          wx.showToast({
            title: res.data.info,
            duration: 1500,
            icon: "none",
          })
          return
        } else {
          wx.showToast({
            title: '报名成功',
            duration: 1500,
            icon: "success",
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
            access_token: app.globalData.token,
            project_status: that.data.status,
            project_id: pid,
            shop_type:shop_type,
          }, success: function (res) {
            that.setData({
              join_m_id: res.data.result[0].join_m_id,
            })
          }
        })
        if (pid==35){
          wx.navigateTo({
            url: '../../match/match',
          })
        }
      }
    })
  },
  to_match:function(event){
    var pid = event.currentTarget.dataset.pid
    if (pid == 35) {
      wx.navigateTo({
        url: '../../match/match',
      })
    }
  },
  /**
 * 触发微信提醒
 */
  remindMessage: function () {
    var that = this
    var formID = that.data.formID
    var project_id = that.data.project_id
    var project_m_id = that.data.currentProject.m_id
    var project_title = that.data.currentProject.title
    var openid = wx.getStorageSync('openid')
    var msg_type = 3
    wx.request({
      url: 'https://czw.saleii.com/api/WXPay/sendMessage2Openid',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'Accept': 'application/json'
      },
      data: {
        m_id: project_m_id,
        openid: openid,
        from_username: app.globalData.myInfo.username,
        access_token: app.globalData.token,
        formid: formID,
        project_id: project_id,
        project_title: project_title,
        appid:appid,
        appsecret:appsecret,
        shop_type:shop_type,
        msg_type: msg_type,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
      },
    })
  },

  dofocus: function (event){
    var that = this
    var shop_type = that.data.shop_type
    var pid = event.currentTarget.dataset.pid
    wx.request({
      url: 'https://czw.saleii.com/api/client/post_focus',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'Accept': 'application/json'
      },
      data: {
        username: app.globalData.myInfo.username,
        access_token: app.globalData.token,
        post_id: pid,
        shop_type:shop_type
      },
      success: function (res) {
        if (res.data.info) {
          wx.showToast({
            title: res.data.info,
            duration: 1500,
            icon: "none",
          })
          return
        } else {
          wx.showToast({
            title: '关注成功',
            duration: 1500,
            icon: "success",
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
            access_token: app.globalData.token,
            project_status: that.data.status,
            project_id: pid,
            shop_type:shop_type,
          }, success: function (res) {
            that.setData({
              focus_m_id: res.data.result[0].focus_m_id,
            })
          }
        })
      }
    })
  },
  do_op: function () {
    var that = this
    that.setData({
      dis: !that.data.dis
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      prize_m_id: this.data.currentProject.prize_m_id,
      num_prize: this.data.currentProject.num_prize,
      focus_m_id: this.data.currentProject.focus_m_id,
      join_m_id: this.data.currentProject.join_m_id,
    })
  },
  del: function (event) {
    var item = event.currentTarget.dataset.item;
    var shop_type = this.data.shop_type
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
              shop_type : shop_type,
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
                    wx.switchTab({
                      url: '../index',
                      success: function (e) {
                        var page = getCurrentPages().pop();
                        page.onShow();
                      } 
                    })
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
      url: '../../mine/editpage/editpage?item=' + JSON.stringify(event.currentTarget.dataset.item),
    })
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