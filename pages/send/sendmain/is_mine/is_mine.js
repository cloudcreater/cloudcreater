// pages/send/sendmain/is_mine/is_mine.js
import citydata from "../../../../citydata/citydata.js";
import wecache from "../../../../utils/wecache.js"
var list = []
const app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['浙江省', '杭州市', '江干区'],
    // dis: 4,
    project_classify: "",
    symbols: [],
    upimg_url: [],

    title: "",
    desc: "",
    project_desc: "",

    multiIndex: [0, 0],
    multiArray: [
      ['全部', '北京', '安徽', "福建", "甘肃", "广东", "广西", "贵州", "海南", "河北", "河南", "黑龙江", "湖北", "湖南", "吉林", "江苏", "江西", "辽宁", "内蒙古", "宁夏", "青海", "山东", "山西", "陕西", "上海", "四川", "天津", "西藏", "新疆", "云南", "浙江", "重庆", "香港", "澳门", "台湾", "全部"],
      ['全部']
    ],

    comLists:[],
    index:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this
    symbols: ""
    console.log(that.data.symbols)
    that.setData({
      project_classify: options.type
    })
    console.log(options.type)
    wx.setNavigationBarTitle({
      title: "发布我的" + options.type + "信息"
    })

    if (app.globalData.group_id != "") {
      that.setData({
        group_id : app.globalData.group_id
      })
    } else {
      that.setData({
        group_id: ""
      })
    }
    var comList = []
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
        type: 0, //0查我建立的朋友圈 1查我加入的朋友圈  2查询所有朋友圈 默认0,	
      },
      success(res) {
        comList.push({id:'x',name:'否'})
        if (res.data.all_rows != 0) {
          var Listitem = {}
          for (var i = 0; i < res.data.result.length; i++) {
            Listitem.id = res.data.result[i].id,
            Listitem.name = res.data.result[i].name
            comList.push(Listitem)
            Listitem = {}
          }
        }
      },
      complete:function(){
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
            type: 1, //0查我建立的朋友圈 1查我加入的朋友圈  2查询所有朋友圈 默认0,	
          },
          success(res) {
            if (res.data.all_rows != 0) {
              var Listitem = {}
              
              for (var i = 0; i < res.data.result.length; i++) {
                Listitem.id = res.data.result[i].group_id,
                Listitem.name = res.data.result[i].name
                comList.push(Listitem)
                that.setData({
                  comLists: comList
                })
                Listitem = {}
              }
            }
            console.log(that.data.comLists)
          }
        })
      }
    })

  },
  bindMultiPickerChange: function(e) {
     
    that.setData({
      "multiIndex[0]": e.detail.value[0],
      "multiIndex[1]": e.detail.value[1]
    })
    console.log('picker发送选择改变，携带值为', that.data.multiArray[1][that.data.multiIndex[1]])
  },
  bindMultiPickerColumnChange: function(e) {
     
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
          "multiIndex[1]": 0
        })
    }
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value + "__" + that.data.comLists[e.detail.value].name)
    if (that.data.comLists[e.detail.value].id!='x'){
      this.setData({
        index: e.detail.value,
        group_id: that.data.comLists[e.detail.value].id
      })
    }else{
      this.setData({
        index: e.detail.value,
        group_id: ""
      })
    }
    
  },
  tophoto: function() {
    wx.navigateTo({
      url: 'photos/photos',
    })
  },
  select: function(event) {
     
    wx.navigateTo({
      url: 'selectlabel/selectlabel?project_classify=' + that.data.project_classify,
    })
    // var num = event.currentTarget.dataset.num
    //  
    // if (that.data.dis == num) {
    //   that.setData({
    //     dis: 4
    //   })
    // } else {
    //   that.setData({
    //     dis: num
    //   })
    // }
  },
  // choose_task: function(event) {
  //    
  //   var task = event.currentTarget.dataset.task
  //   var tid = event.currentTarget.dataset.tid
  //   that.setData({
  //     task: task,
  //     tid: tid
  //   })
  // },
  // choose_team: function(event) {
  //    
  //   var team = event.currentTarget.dataset.team
  //   var teid = event.currentTarget.dataset.teid
  //   that.setData({
  //     team: team,
  //     teid: teid
  //   })
  // },
  // choose_captial: function(event) {
  //    
  //   var captial = event.currentTarget.dataset.captial
  //   var cid = event.currentTarget.dataset.cid
  //   that.setData({
  //     captial: captial,
  //     cid: cid
  //   })
  // },
  // choose_industry: function(event) {
  //    
  //   var industry = event.currentTarget.dataset.industry
  //   var inid = event.currentTarget.dataset.inid
  //   that.setData({
  //     industry: industry,
  //     inid: inid
  //   })
  // },
  // choose_status: function (event) {
  //    
  //   var status = event.currentTarget.dataset.status
  //   var sid = event.currentTarget.dataset.sid
  //   that.setData({
  //     status: status,
  //     sid: sid
  //   })
  // },
  // confirm: function() {
  //    
  //   that.setData({
  //     dis: 4
  //   })
  // },
  descInput: function(event) {
    this.setData({
      desc: event.detail.value
    })
  },
  project_descInput: function(event) {
    this.setData({
      project_desc: event.detail.value
    })
  },
  titleInput: function(event) {
    this.setData({
      title: event.detail.value
    })
    // console.log(app.globalData.myInfo.username, app.globalData.token, app.globalData.myInfo.wx_nickname)
  },
  publish: function() {
     

    if (that.data.symbols[0] == null) {
      wx.showModal({
        title: '重要',
        content: '请先选好标签！',
      })
    } else {
      for (var i = 0; i < app.globalData.img_arr.length; i++) {
        console.log(1)
        wx.uploadFile({
          url: 'https://czw.saleii.com/api/upload/index4',
          filePath: app.globalData.img_arr[i],
          name: 'wechat_upimg',
          formData: {
            latitude: encodeURI(0.0),
            longitude: encodeURI(0.0),
            restaurant_id: encodeURI(0),
            city: encodeURI('杭州'),
            prov: encodeURI('浙江'),
            name: encodeURI(), // 名称
          },
          success: function(res) {
            var retinfo = JSON.parse(res.data.trim())
            console.log('images upload:' + retinfo['result']['img_url'])
            if (retinfo['status'] == "y") {
              that.setData({
                upimg_url: that.data.upimg_url.concat(retinfo['result']['img_url'])
              })
            }
          },
          complete(){
            
          }
        })
      }
      setTimeout(function() {
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
            group_id: that.data.group_id,
          },
          success: function(res) {
            console.log(res)
            app.globalData.img_arr = []
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
                title: '发布成功',
                duration: 1500,
                complete: function() {
                  wx.switchTab({
                    url: '../../../index/index',
                  })
                }
              })
            }
          }
        })
      }, 3000)
    }
  },
  save: function() {
     
    wecache.put("symbols", that.data.symbols)
    //  
    wx.setStorage({
      key: "has_draft",
      data: "has"
    })
    wx.setStorage({
      key: "title",
      data: that.data.title
    })
    wx.setStorage({
      key: "project_location",
      data: that.data.multiArray[1][that.data.multiIndex[1]]
    })
    // wx.setStorage({
    //   key:"project_industry", 
    //   data:that.data.industry
    //  } )
    wx.setStorage({
      key: "project_classify",
      data: that.data.project_classify
    })
    // wx.setStorage({
    //   key:"project_task", 
    //   data:that.data.task
    //  } )
    // wx.setStorage({
    //   key:"project_captial", 
    //   data:that.data.captial
    // })
    // wx.setStorage({
    //   key:"project_status", 
    //   data:that.data.sid 
    //  } )
    wx.setStorage({
      key: "project_desc",
      data: that.data.project_desc
    })
    // wx.setStorage({
    //   key:"project_team", 
    //   data:that.data.team 
    // })
    wx.setStorage({
      key: "desc",
      data: that.data.desc
    })
    // wx.setStorage({
    //   key:"tid", 
    //   data:that.data.tid
    // })
    // wx.setStorage({
    //   key:"cid", 
    //   data:that.data.cid
    //  } )
    // wx.setStorage({
    //   key:"inid", 
    //   data:that.data.inid
    // })
    // wx.setStorage({
    //   key:"teid", 
    //   data:that.data.teid
    //  } )
    // wx.setStorage({
    //   key:"sid", 
    //   data:that.data.sid
    // })
    wx.showModal({
      title: '提示',
      content: '保存成功，是否返回首页？',
      success: function(res) {
        if (res.confirm) {
          wx.switchTab({
            url: '../../../index/index',
          })
        }
      }
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