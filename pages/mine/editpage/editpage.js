// pages/send/sendmain/is_mine/is_mine.js
import citydata from "../../../citydata/citydata.js";
import wecache from "../../../utils/wecache.js"
var list = []
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:"",

    dis: 4,
    project_classify: "",
    symbols:[],

    upimg_url: [],

    title:"",
    desc:"",
    project_desc:"",

    multiIndex: [0, 0],
    multiArray: [['北京', '安徽', "福建", "甘肃", "广东", "广西", "贵州", "海南", "河北", "河南", "黑龙江", "湖北", "湖南", "吉林", "江苏", "江西", "辽宁", "内蒙古", "宁夏", "青海", "山东", "山西", "陕西", "上海", "四川", "天津", "西藏", "新疆", "云南", "浙江", "重庆", "香港", "澳门", "台湾"], ['北京']],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    let object = JSON.parse(options.item)
    that.setData({
      item: object,
      project_classify: object.project_classify,
      title: object.title,
      desc: object.desc,
      project_desc: object.project_desc,
    })
    wx.showModal({
      title: '提示',
      content: '请重新上传图片',
    })
  },
  bindMultiPickerChange: function (e) {
    var that = this
    that.setData({
      "multiIndex[0]": e.detail.value[0],
      "multiIndex[1]": e.detail.value[1]
    })
    console.log('picker发送选择改变，携带值为', that.data.multiArray[1][that.data.multiIndex[1]])
  },
  bindMultiPickerColumnChange: function (e) {
    var that = this
    switch (e.detail.column) {
      case 0:
        list = []
        for (var i = 0; i < that.data.objectMultiArray.length; i++) {
          if (citydata.objectMultiArray[i].parid == citydata.objectMultiArray[e.detail.value].regid) {
            list.push(citydata.objectMultiArray[i].regname)
          }
        }
        that.setData({
          "multiArray[1]": list,
          "multiIndex[0]": e.detail.value,
          "multiIndex[1]": 0
        })
    }
  },
  tophoto: function() {
    var that = this 
    wx.navigateTo({
      url: 'photos/photos?item=' + JSON.stringify(that.data.item),
    })
  },
  select: function(event) {
  // var num = event.currentTarget.dataset.num
    var that = this 
    wx.navigateTo({
      url: 'selectlabel/selectlabel?project_classify=' + that.data.project_classify,
    })
  },
  confirm: function() {
    var that = this
    
  },
  descInput: function (event){
    this.setData({
      desc:event.detail.value
    })
    console.log(event.detail.value)
  },
  project_descInput: function (event) {
    this.setData({
      project_desc: event.detail.value
    })
    console.log(event.detail.value)
  },
  titleInput: function (event) {
    this.setData({
      title: event.detail.value
    })
    console.log(event.detail.value)
    // console.log(app.globalData.myInfo.username, app.globalData.token, app.globalData.myInfo.wx_nickname)
  },
  publish: function() {
    var that = this
    if (that.data.symbols[0]==null){
      wx.showModal({
        title: '重要',
        content: '请先选好标签！',
      })
    }else{
      for (var i = 0; i < app.globalData.edit_img_arr.length; i++) {
        wx.uploadFile({
          url: 'https://czw.saleii.com/api/upload/index4',
          filePath: app.globalData.edit_img_arr[i],
          name: 'wechat_upimg',
          formData: {
            latitude: encodeURI(0.0),
            longitude: encodeURI(0.0),
            restaurant_id: encodeURI(0),
            city: encodeURI('杭州'),
            prov: encodeURI('浙江'),
            name: encodeURI(), // 名称
          },
          success: function (res) {
            var retinfo = JSON.parse(res.data.trim())
            console.log('images upload:' + retinfo['result']['img_url'])
            if (retinfo['status'] == "y") {
              that.setData({
                upimg_url: that.data.upimg_url.concat(retinfo['result']['img_url'])
              })
            }
          }
        })
      }
      setTimeout(function () {
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
            shop_type:5,
            type: 3,
            project_location: that.data.multiArray[1][that.data.multiIndex[1]],
            project_industry: that.data.symbols[2].industry,
            project_classify: that.data.project_classify,
            project_tag: "",
            project_task: that.data.symbols[0].task,
            project_captial: that.data.symbols[1].captial,
            project_status: that.data.symbols[4].sid,
            project_desc: that.data.project_desc,
            project_team: that.data.symbols[3].team,
            desc: that.data.desc,
            project_img1: that.data.upimg_url[0],
            project_img2: that.data.upimg_url[1],
            project_img3: that.data.upimg_url[2],
            project_img4: that.data.upimg_url[3],
            project_img5: that.data.upimg_url[4],
            post_id: that.data.item.id,
          },
          success: function (res) {
            console.log(res)
            if (res.data.status == "n") {
              wx.showToast({
                title: res.data.info,
                duration: 1500,
              })
            } else {
              app.globalData.img_arr = ""
              that.setData({
                upimg_url: ""
              })
              wx.showToast({
                title: '编辑成功',
                duration: 1500,
                complete: function () {
                  wx.switchTab({
                    url: '../../index/index',
                    success: function (e) {
                      var page = getCurrentPages().pop();
                      page.onShow();
                    }
                  })
                }
              })
            }
          }
        })
      }, 1000)
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
    var that = this
    console.log(that.data.symbols)
    
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