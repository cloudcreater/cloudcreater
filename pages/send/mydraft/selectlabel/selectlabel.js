// pages/send/sendmain/is_mine/selectlebal/selectlabel.
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    project_classify: "",

    symbols: [
      { tid: "", task: "" },
      { cid: "", captial: "" },
      { inid: "", industry: "" },
      { teid: "", team: "" },
      { sid: "", status: "" },
    ],

    task: "",
    tid: "",

    captial: "",
    cid: "",

    industry: "",
    inid: "",

    team: "",
    teid: "",

    status: "",
    sid: 5,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    symbols: ""
    that = this
    that.setData({
      project_classify: options.project_classify
    })
    console.log(that.data.project_classify)
  },
  choose_task: function (event) {
    var task = event.currentTarget.dataset.task
    var tid = event.currentTarget.dataset.tid
    that.setData({
      tid: tid,
      task: task,
      'symbols[0].tid': tid,
      'symbols[0].task': task,
    })
  },
  choose_team: function (event) {
    var team = event.currentTarget.dataset.team
    var teid = event.currentTarget.dataset.teid
    that.setData({
      teid: teid,
      team: team,
      'symbols[3].teid': teid,
      'symbols[3].team': team,
    })
  },
  choose_captial: function (event) {
    var captial = event.currentTarget.dataset.captial
    var cid = event.currentTarget.dataset.cid
    that.setData({
      cid: cid,
      captial: captial,
      'symbols[1].cid': cid,
      'symbols[1].captial': captial,
    })
  },
  choose_industry: function (event) {
    var industry = event.currentTarget.dataset.industry
    var inid = event.currentTarget.dataset.inid
    that.setData({
      inid: inid,
      industry: industry,
      'symbols[2].inid': inid,
      'symbols[2].industry': industry,
    })
  },
  choose_status: function (event) {
    var status = event.currentTarget.dataset.status
    var sid = event.currentTarget.dataset.sid
    that.setData({
      sid: sid,
      status: status,
      'symbols[4].sid': sid,
      'symbols[4].status': status,
    })
  },
  confirm: function () {
    if (that.data.project_classify == "创业") {
      if (that.data.task && that.data.captial && that.data.industry && that.data.team && that.data.status) {
        var pages = getCurrentPages()
        var prevPage = pages[pages.length - 1]  //当前界面
        var prevPage = pages[pages.length - 2]  //上一个页面
        prevPage.setData({
          symbols: that.data.symbols
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 500)
      } else {
        wx.showModal({
          title: '重要',
          content: '请选完每一个项目！',
        })
      }
    } else if (that.data.project_classify == "创意") {
      if (that.data.task && that.data.industry && that.data.status) {
        var pages = getCurrentPages()
        var prevPage = pages[pages.length - 1]  //当前界面
        var prevPage = pages[pages.length - 2]  //上一个页面
        prevPage.setData({
          symbols: that.data.symbols
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 500)
      } else {
        wx.showModal({
          title: '重要',
          content: '请选完每一个项目！',
        })
      }
    } else if (that.data.project_classify == "活动") {
      if (that.data.task && that.data.industry && that.data.status && that.data.captial) {
        var pages = getCurrentPages()
        var prevPage = pages[pages.length - 1]  //当前界面
        var prevPage = pages[pages.length - 2]  //上一个页面
        prevPage.setData({
          symbols: that.data.symbols
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 500)
      } else {
        wx.showModal({
          title: '重要',
          content: '请选完每一个项目！',
        })
      }
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