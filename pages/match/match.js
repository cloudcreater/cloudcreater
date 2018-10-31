// pages/match/match.js
var that
const app = getApp()
var appid = app.globalData.appid
var appsecret = app.globalData.appsecret
var shop_type = app.globalData.shop_type
var openid = app.globalData.openid
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    name: '',
    phone: '',
    school: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this
  },
  input: function(event) {
    var name = event.currentTarget.dataset.name
    switch (name) {
      case 'title':
        that.setData({
          title: event.detail.value
        })
        break;
      case 'name':
        that.setData({
          name: event.detail.value
        })
        break;
      case 'phone':
        that.setData({
          phone: event.detail.value
        })
        break;
      case 'school':
        that.setData({
          school: event.detail.value
        })
        break;
    }
  },
  sub: function(event) {
    var that = this
    var formID = event.detail.formId;
    that.setData({
      formID: formID,
    })
    if (that.data.title && that.data.name && that.data.phone && that.data.school) {
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
          
          title: that.data.title,
          type: 3,
          shop_type: 5,
          project_tag: "报名表",
          project_desc: "报名表",
          project_location: "报名表",
          project_industry: "报名表",
          project_classify: "报名表",
          project_task: "报名表",
          project_captial: "报名表",
          project_status: "报名表",
          project_team: "报名表",
          desc: "项目名称：" + that.data.title + ",\n创始人名称：" + that.data.name + ",\n手机号码：" + that.data.phone + ",\n创始人高校或公司：" + that.data.school,
        },
        success: function(res) {
          console.log(res)
          if (res.data.status == "n") {
            wx.showToast({
              title: res.data.info,
              duration: 1500,
            })
          } else {
            wx.showModal({
              title: '重要',
              content: '报名成功',
              success(res){
                if(res.confirm){
                  that.remindMessage() //微信通知
                  wx.switchTab({
                    url: '../../index',
                  })
                }else if(res.cancel){
                  wx.switchTab({
                    url: '../../index',
                  })
                }
              }
            })
          }
        }
      })
    } else {
      wx.showModal({
        title: '重要',
        content: '输入有误！',
      })
      if(that.data.title==""){
        that.setData({
          placeholder_title:"不能为空"
        })
      }
      if (that.data.name == "") {
        that.setData({
          placeholder_name: "不能为空"
        })
      }
      if (that.data.phone == "") {
        that.setData({
          placeholder_phone: "不能为空"
        })
      }
      if (that.data.school == "") {
        that.setData({
          placeholder_school: "不能为空"
        })
      }
    }
  },

  clear: function() {
    that.setData({
      placeholder_title: "",
      placeholder_name: "",
      placeholder_phone: "",
      placeholder_school: "",
    })
  },
  to_detail:function(){
    wx.navigateTo({
      url: '../out/to_detail/to_detail',
    })
  },

  /**
* 触发微信提醒
*/
  remindMessage: function () {
    var that = this
    var project_m_id = 3991  //默认邵包威用户id
    var formID = that.data.formID
    var title = that.data.title
    var name = that.data.name
    var phone = that.data.phone
    var school = that.data.school
    var openid = wx.getStorageSync('openid')
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
        title: title,
        name: name,
        phone: phone,
        school: school,
        appid: appid,
        appsecret: appsecret,
        shop_type: shop_type,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
      },
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