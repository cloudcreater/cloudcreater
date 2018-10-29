// pages/community/search_community/search_community.js
var that
import citydata from "../../../citydata/citydata.js"
var list = []
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_search:"no",
    communities:"",
    search:"",
    info:"",
    hiddenmodalput: true,
    community:"",

    multiIndex: [0, 0],
    multiArray: [
      ['全部', '北京', '安徽', "福建", "甘肃", "广东", "广西", "贵州", "海南", "河北", "河南", "黑龙江", "湖北", "湖南", "吉林", "江苏", "江西", "辽宁", "内蒙古", "宁夏", "青海", "山东", "山西", "陕西", "上海", "四川", "天津", "西藏", "新疆", "云南", "浙江", "重庆", "香港", "澳门", "台湾", "全部"],
      ['全部']
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this
  },
  bindMultiPickerChange: function (e) {
    that.setData({
      "multiIndex[0]": e.detail.value[0],
      "multiIndex[1]": e.detail.value[1],
      dis: 4,
      changepage: 0
    })
    console.log('picker发送选择改变，携带值为', that.data.multiArray[1][that.data.multiIndex[1]])
  },
  bindMultiPickerColumnChange: function (e) {
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
  searchInput:function(event){
    that.setData({
      search: event.detail.value
    })
  },
  dosearch:function(){
    wx.request({
      url: 'https://czw.saleii.com/api/client/get_member_group',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'Accept': 'application/json'
      },
      data:{
        username: app.globalData.myInfo.username,
        access_token: app.globalData.myInfo.token,
        page: 1,
        pagesize: 10,
        shop_type: 5,
        type: 2,
        city_str: that.data.multiArray[1][that.data.multiIndex[1]],
        group_name: that.data.search
      },
      success(res){
        console.log(res)
        if (res.data.all_rows != 0) {
          that.setData({
            communities: res.data.result,
            info: "",
            is_search: "yes"
          })
        } else {
          that.setData({
            info: "暂无此类项目",
            is_search: "yes"
          })
        }
      }
    })
  },
  doshow:function(){
    wx.request({
      url: 'https://czw.saleii.com/api/client/get_member_group',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'Accept': 'application/json'
      },
      data: {
        username: app.globalData.myInfo.username,
        access_token: app.globalData.myInfo.token,
        page: 1,
        pagesize: 10,
        shop_type: 5,
        type: 2
      },
      success(res) {
        if (res.data.all_rows != 0) {
          that.setData({
            communities: res.data.result,
            info: "",
            is_search: "no"
          })
        } else {
          that.setData({
            info: "暂无此类项目",
            is_search: "no"
          })
        }
      }
    })
  },
  join: function (event) {
    var community = event.currentTarget.dataset.item

    that.setData({
      community: community,
      passcode: ""
    })
    
    if (community.pass_code != "") {
      that.setData({
        hiddenmodalput: !this.data.hiddenmodalput
      })
    } else {
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
          type: 0,
          group_id: that.data.community.id
        },
        success(res) {
          that.setData({
            hiddenmodalput: true
          })
          wx.showModal({
            title: '提示',
            content: '加入成功',
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../my_community/my_community',
                })
              }
            }
          })
        }
      })
    }
  },
  cancel: function () {
    that.setData({
      hiddenmodalput: true
    })
  },
  confirm: function () {
    if (that.data.community.pass_code != that.data.passcode) {
      wx.showModal({
        title: '重要',
        content: '邀请码不匹配！',
      })
    } else {
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
          type: 0,
          group_id: that.data.community.id
        },
        success(res) {
          that.setData({
            hiddenmodalput: true
          })
          wx.showModal({
            title: '提示',
            content: '加入成功',
            success(res){
              if(res.confirm){
                wx.navigateTo({
                  url: '../my_community/my_community',
                })
              }
            }
          })
          
        }
      })
    }
  },
  passcode_input: function (event) {
    that.setData({
      passcode: event.detail.value
    })
  },
  tomain: function (event) {
    var community = event.currentTarget.dataset.item
    if (community.flag != 0) {
      wx.navigateTo({
        url: '../community_main/community_main?community=' + JSON.stringify(event.currentTarget.dataset.item),
      })
    } else {
      wx.showModal({
        title: '重要',
        content: '请先加入该社区才能进入查看！',
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
    that.setData({
      is_search:"no"
    })
    wx.request({
      url: 'https://czw.saleii.com/api/client/get_member_group',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'Accept': 'application/json'
      },
      data: {
        username: app.globalData.myInfo.username,
        access_token: app.globalData.myInfo.token,
        page: 1,
        pagesize: 10,
        shop_type: 5,
        type:2
      },
      success(res) {
        that.setData({
          communities: res.data.result
        })
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