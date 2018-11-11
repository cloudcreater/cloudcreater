// pages/service/service.js
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lebalList: [
      ["创客空间", "财税代理", "技术支持", "融资服务"],
      ["创业·MBA", "职业·技能", "外语·留学", "学历·考研"],
      ["大公司", "独角兽公司", "初始公司", "工作室"],
      ["政府组织", "商业组织", "高校组织", "社会组织"],
    ],
    lebalitem: [],
    bottom_line: 0,
    currentLebal: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this
    let lebal = options.lebal
    wx.setNavigationBarTitle({
      title: lebal,
    })

    switch (lebal) {
      case "创业服务":
        that.setData({
          lebalitem: that.data.lebalList[0]
        })
        break;
      case "精选课程":
        that.setData({
          lebalitem: that.data.lebalList[1]
        })
        break;
      case "cool公司":
        that.setData({
          lebalitem: that.data.lebalList[2]
        })
        break;
      case "组织机构":
        that.setData({
          lebalitem: that.data.lebalList[3]
        })
        break;
    }

    that.setData({
      currentLebal: that.data.lebalitem[0]
    })
  },
  change_loc: function() {
    wx.showModal({
      title: '提示',
      content: '目前仅在杭州地区开通本服务。',
    })
  },
  changelebal: function(event) {
    var lebal = event.currentTarget.dataset.lebal
    var num = event.currentTarget.dataset.num
    that.setData({
      currentLebal: lebal,
      bottom_line: num
    })
  },
  to_serviceMain:function(){
    // var item = event.currentTarget.dataset.item
    wx.navigateTo({
      url: 'service_main/service_main',
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