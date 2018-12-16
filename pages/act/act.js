// pages/act/act.js
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { value: '设计' },
      { value: '运营' },
      { value: '巴西' },
      { value: '产品经理' },
      { value: '前端开发' },
      { value: '市场推广' },
      { value: '策划' },
      { value: '教育' },
    ],
    name:"", //名称 
    phone:"", //电话
    time:"", //时间
    people:"", //用人或求职
    tech:"", //技术
    job:"", //雇佣方式
    salary:"", //薪酬结算
    work_type:"", //工作方式
    time_limit:"" //到岗或发包
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
  },
  input: function (event) {
    var name = event.currentTarget.dataset.name
    switch (name) {
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
      case 'time':
        that.setData({
          time: event.detail.value
        })
        break;
    }
  },
  radioChange: function (e) {
    that.setData({
      people: event.detail.value
    })
  },
  radioChange1: function (e) {
    that.setData({
      time_limit: event.detail.value
    })
  },
  checkboxChange: function (e) {
    that.setData({
      tech: event.detail.value
    })
  },
  checkboxChange1: function (e) {
    that.setData({
      job: event.detail.value
    })
  },
  checkboxChange2: function (e) {
    that.setData({
      salary: event.detail.value
    })
  },
  checkboxChange3: function (e) {
    that.setData({
      work_type: event.detail.value
    })
  },
  to_detail: function () {
    wx.navigateTo({
      url: '../out/to_act/to_act',
    })
  },
  sub: function (event) {
    var that = this
    var formID = event.detail.formId;
    that.setData({
      formID: formID,
    })
    if (that.data.time && that.data.name && that.data.phone && that.data.work_type && that.data.job && that.data.tech && that.data.people && that.data.salary && that.data.time_limit) {
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
          desc: "名称：" + that.data.name + ",\n手机：" + that.data.phone + ",\n雇佣方式：" + that.data.job + ",\n求职或用人：" + that.data.people + ",\n技术：" + that.data.tech + ",\n薪水结算：" + that.data.salary + ",\n人才到岗或发包：" + that.data.time_limit + ",\n工作方式：" + that.data.work_type,
          //that.data.time && that.data.name && that.data.phone && that.data.work_type && that.data.job && that.data.tech && that.data.people && that.data.salary
        },
        success: function (res) {
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
              success(res) {
                if (res.confirm) {
                  that.remindMessage() //微信通知
                  wx.switchTab({
                    url: '../index/index',
                  })
                } else if (res.cancel) {
                  wx.switchTab({
                    url: '../index/index',
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