// pages/community/create_community/create_community.js
var that
import citydata from "../../../../citydata/citydata.js"
var list = []
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    symbols: [],

    img:"",
    upimg_url:"",
    name:"",
    pass_code:"",
    id:"",

    multiIndex: [0, 0],
    multiArray: [
      ['全部', '北京', '安徽', "福建", "甘肃", "广东", "广西", "贵州", "海南", "河北", "河南", "黑龙江", "湖北", "湖南", "吉林", "江苏", "江西", "辽宁", "内蒙古", "宁夏", "青海", "山东", "山西", "陕西", "上海", "四川", "天津", "西藏", "新疆", "云南", "浙江", "重庆", "香港", "澳门", "台湾", "全部"],
      ['全部']
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this
    let community = JSON.parse(options.community)
    that.setData({
      id: community.id,
      img: community.logo,
      name: community.name,
      pass_code: community.pass_code,
    })
  },
  bindMultiPickerChange: function(e) {
    that.setData({
      "multiIndex[0]": e.detail.value[0],
      "multiIndex[1]": e.detail.value[1],
      dis: 4,
      changepage: 0
    })
    console.log('picker发送选择改变，携带值为', that.data.multiArray[1][that.data.multiIndex[1]])
  },
  bindMultiPickerColumnChange: function(e) {
    var that = this
    that.setData({
      dis: 4
    })
    switch (e.detail.column) {
      case 0:
        list = []
        for (var i = 0; i < citydata.objectMultiArray.length; i++) {
          if (citydata.objectMultiArray[i].parid == citydata.objectMultiArray[e.detail.value].regid) {
            list.push(citydata.objectMultiArray[i].regname)
          }
        }
        that.setData({
          "multiArray[1]": list,
          "multiIndex[0]": e.detail.value,
          "multiIndex[1]": 0,
        })
    }
  },
  select: function() {
    wx.navigateTo({
      url: 'selectlebal/selectlebal',
    })
  },
  uploadimg: function() {
    that.setData({
      img:""
    })
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      success: function(res) {
        that.setData({
          img: that.data.img.concat(res.tempFilePaths), //res.tempFilePaths 本地文件地址 img_arr数组最多放5张图片 
        })
      },
    })
  },
  nameInput:function(event){
    that.setData({
      name: event.detail.value
    })
  },
  pass_code: function (event){
    that.setData({
      pass_code: event.detail.value
    })
  },
  create:function(){
    if (that.data.symbols[0] == null) {
      wx.showModal({
        title: '重要',
        content: '请先选好标签！',
      })
    } else {
    wx.uploadFile({
      url: 'https://czw.saleii.com/api/upload/index4',
      filePath: that.data.img,
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
    setTimeout(function(){
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
          status: 0,
          group_id: that.data.id,
          group_name: that.data.name,
          group_type: that.data.symbols[0].type,
          industry_type: that.data.symbols[1].intype,
          logo: that.data.upimg_url,
          pass_code: that.data.pass_code,
          group_city: that.data.multiArray[1][that.data.multiIndex[1]],
          
        },
        success:function(res){
          console.log(res)
          wx.switchTab({
            url: '../../community',
          })
        }
      })
    }, 500)
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