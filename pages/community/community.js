// pages/community/community.js
const app = getApp()
import dateApi from "../../utils/utils.js"
import citydata from "../../citydata/citydata.js";
import wecache from "../../utils/wecache.js"

var list = []

function setdata(Xago) {
  if (Xago != "all") {
    var timestamp = Date.parse(new Date());
    console.log("当前时间戳为：" + timestamp);
    //减X天的时间戳：  
    var tomorrow_timetamp = timestamp - 24 * 60 * 60 * 1000 * Xago;
    //减天的时间：  
    var tomorrow_date = new Date(tomorrow_timetamp);
    //日
    var D_tomorrow = tomorrow_date.getDate() < 10 ? '0' + tomorrow_date.getDate() : tomorrow_date.getDate();
    //月
    var M_tomorrow = (tomorrow_date.getMonth() + 1 < 10 ? '0' + (tomorrow_date.getMonth() + 1) : tomorrow_date.getMonth() + 1);
    //年
    var Y_tomorrow = tomorrow_date.getFullYear();
    //转换成YYYY-MM-DD格式
    var data = Y_tomorrow + "-" + M_tomorrow + "-" + D_tomorrow;
    //返回
    return data;
  } else {
    return "";
  }

}
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {


    communities: "",
    hiddenmodalput: true,
    community: "",
    community_main: "",
    which_frame: "before",
    passcode: "",


    // 主界面参数
    items: "",
    dis: 4,
    bottom_line: 1,
    project_type: "is_create",
    info: null,
    task: "",
    tid: "",
    captial: "",
    cid: "",
    industry: "全部",
    inid: "",
    team: "",
    teid: "",
    fid: "",
    focus: 0,

    dates: "",
    dateArr: [],

    pagesize: 10,
    changepage: 0,

    x: 10,
    tname: "",
    status: "全部",
    sname: "",

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

  },

  to_search: function() {
    wx.navigateTo({
      url: 'search_community/search_community',
    })
  },
  to_create: function() {
    wx.navigateTo({
      url: 'create_community/create_community',
    })
  },
  to_my: function() {
    wx.navigateTo({
      url: 'my_community/my_community',
    })
  },
  join: function(event) {
    var community = event.currentTarget.dataset.item

    that.setData({
      community: community
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
          })
          that.onShow()
        }
      })
    }
  },
  cancel: function() {
    that.setData({
      hiddenmodalput: true
    })
  },
  confirm: function() {
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
          })
        }
      })
    }
  },
  passcode_input: function(event) {
    that.setData({
      passcode: event.detail.value
    })
  },
  tomain: function(event) {
    var community = event.currentTarget.dataset.item
    if (community.flag != 0) {
      that.setData({
        which_frame: "next",
        community_main: community,
      })

      wx.setNavigationBarTitle({
        title: that.data.community_main.name
      })

      app.globalData.other_to_main = 'yes'
      app.globalData.community = community
      console.log(that.data.community_main.id)

      wx.request({
        url: 'https://czw.saleii.com/api/client/get_project_list',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded', // 默认值
          'Accept': 'application/json'
        },
        data: {
          username: app.globalData.myInfo.username,
          access_token: app.globalData.myInfo.token,
          project_industry: "全部",
          project_type: "is_create",
          project_status: that.data.status,
          project_date: that.data.dates,
          project_location: that.data.multiArray[1][that.data.multiIndex[1]],
          group_type: 1,
          group_id: that.data.community_main.id,
          is_del: 0
        },
        success(res) {
          console.log(res)
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
              info: "无该类项目"
            })
          }
        }
      })

    } else {
      wx.showModal({
        title: '重要',
        content: '请先加入该社区才能进入查看！',
      })
    }
  },


  //主界面函数//主界面函数//主界面函数//主界面函数
  //主界面函数//主界面函数//主界面函数//主界面函数



  select: function(event) {
    var num = event.currentTarget.dataset.num

    if (that.data.dis == num) {
      that.setData({
        dis: 4
      })
    } else {
      that.setData({
        dis: num
      })
    }
  },
  change: function(event) {
    console.log(that.data.community_main)
    var name = event.currentTarget.dataset.name;

    that.setData({
      project_type: name,
      changepage: 1
    })
    wx.request({
      url: 'https://czw.saleii.com/api/client/get_project_list',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'Accept': 'application/json'
      },
      data: {
        username: app.globalData.myInfo.username,
        access_token: app.globalData.myInfo.token,
        project_industry: "全部",
        project_type: name,
        project_status: that.data.status,
        project_date: that.data.dates,
        project_location: that.data.multiArray[1][that.data.multiIndex[1]],
        group_type: 1,
        group_id: that.data.community_main.id,
        is_focus: that.data.focus,
        is_del: 0
      },
      success(res) {
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
            info: "无该类项目"
          })
        }
      },
      complete: function() {
        if (name == "is_create") {
          that.setData({
            bottom_line: 1
          })
        } else if (name == "is_idea") {
          that.setData({
            bottom_line: 2
          })
        } else if (name == "is_active") {
          that.setData({
            bottom_line: 3
          })
        }
        that.setData({
          pagesize: 10,
        })
      }
    })
  },
  // changeTo_focus_user:function(event){
  //   var name = event.currentTarget.dataset.name;
  //    ;
  //   that.setData({
  //     bottom_line: 4
  //   })
  // },
  changeProcess: function(event) {

    var status = event.currentTarget.dataset.status;
    var sname = event.currentTarget.dataset.sname;
    that.setData({
      status: status,
      sname: sname,
      changepage: 0
    })
    wx.request({
      url: 'https://czw.saleii.com/api/client/get_project_list',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'Accept': 'application/json'
      },
      data: {
        username: app.globalData.myInfo.username,
        access_token: app.globalData.myInfo.token,
        project_status: status,
        project_type: that.data.project_type,
        project_date: that.data.dates,
        project_industry: that.data.industry,
        project_task: that.data.task,
        project_captial: that.data.captial,
        project_team: that.data.team,
        project_location: that.data.multiArray[1][that.data.multiIndex[1]],
        group_type: 1,
        group_id: that.data.community_main.id,
        is_focus: that.data.focus,
        is_del: 0
      },
      success(res) {
        if (res.data.status == "y") {
          that.setData({
            items: res.data.result,
            info: null,
            dateArr: [],
            dis: 4,
          })
          for (var i = 0; i < res.data.result.length; i++) {
            that.setData({
              dateArr: that.data.dateArr.concat(dateApi.getDateDiff(res.data.result[i].addtime_str + "000"))
            })
          }
        } else {
          that.setData({
            info: "无该类项目",
            dis: 4
          })
        }
      }
    })
  },
  changetime: function(event) {

    var x = event.currentTarget.dataset.x;
    var tname = event.currentTarget.dataset.tname;
    console.log(that.data.x)
    var dates = setdata(x);
    that.setData({
      x: x,
      tname: tname,
      changepage: 0,
      dates: dates
    })

    wx.request({
      url: 'https://czw.saleii.com/api/client/get_project_list',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'Accept': 'application/json'
      },
      data: {
        username: app.globalData.myInfo.username,
        access_token: app.globalData.myInfo.token,
        project_date: dates,
        project_status: that.data.status,
        project_location: that.data.multiArray[1][that.data.multiIndex[1]],
        project_industry: that.data.industry,
        project_task: that.data.task,
        project_captial: that.data.captial,
        project_team: that.data.team,
        project_type: that.data.project_type,
        group_type: 1,
        group_id: that.data.community_main.id,
        is_focus: that.data.focus,
        is_del: 0
      },
      success(res) {
        if (res.data.status == "y") {
          console.log(res)
          that.setData({
            items: res.data.result,
            info: null,
            dateArr: [],
            dis: 4,
          })
          for (var i = 0; i < res.data.result.length; i++) {
            that.setData({
              dateArr: that.data.dateArr.concat(dateApi.getDateDiff(res.data.result[i].addtime_str + "000"))
            })
          }
        } else {
          that.setData({
            info: "暂无此类项目",
            dis: 4
          })
        }

      }
    })
  },
  bindMultiPickerChange: function(e) {

    that.setData({
      "multiIndex[0]": e.detail.value[0],
      "multiIndex[1]": e.detail.value[1],
      changepage: 0
    })
    console.log('picker发送选择改变，携带值为', that.data.multiArray[1][that.data.multiIndex[1]])
    wx.request({
      url: 'https://czw.saleii.com/api/client/get_project_list',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'Accept': 'application/json'
      },
      data: {
        username: app.globalData.myInfo.username,
        access_token: app.globalData.myInfo.token,
        project_location: that.data.multiArray[1][that.data.multiIndex[1]],
        project_date: that.data.dates,
        project_status: that.data.status,
        project_type: that.data.project_type,
        project_industry: that.data.industry,
        project_task: that.data.task,
        project_captial: that.data.captial,
        project_team: that.data.team,
        group_type: 1,
        group_id: that.data.community_main.id,
        is_focus: that.data.focus,
        is_del: 0
      },
      success(res) {
        if (res.data.status == "y") {
          console.log(res)
          that.setData({
            items: res.data.result,
            info: null,
            dateArr: [],
          })
          for (var i = 0; i < res.data.result.length; i++) {
            that.setData({
              dateArr: that.data.dateArr.concat(dateApi.getDateDiff(res.data.result[i].addtime_str + "000"))
            })
          }
        } else if (res.data.status == "n") {
          that.setData({
            info: "无该类项目"
          })
        }
      }
    })
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
  toindex_details: function(event) {
    console.log("获取项目详细信息:")
    console.log(event.currentTarget.dataset.item);
    wx.navigateTo({
      url: '../index/index_details/index_details?project=' + JSON.stringify(event.currentTarget.dataset.item),
    })
  },
  choose_task: function(event) {

    var task = event.currentTarget.dataset.task
    var tid = event.currentTarget.dataset.tid
    that.setData({
      task: task,
      tid: tid
    })
  },
  choose_team: function(event) {

    var team = event.currentTarget.dataset.team
    var teid = event.currentTarget.dataset.teid
    that.setData({
      team: team,
      teid: teid
    })
  },
  choose_captial: function(event) {

    var captial = event.currentTarget.dataset.captial
    var cid = event.currentTarget.dataset.cid
    that.setData({
      captial: captial,
      cid: cid
    })
  },
  choose_industry: function(event) {

    var industry = event.currentTarget.dataset.industry
    var inid = event.currentTarget.dataset.inid
    that.setData({
      industry: industry,
      inid: inid
    })
  },
  confirm: function() {

    that.setData({
      changepage: 0
    })
    wx.request({
      url: 'https://czw.saleii.com/api/client/get_project_list',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'Accept': 'application/json'
      },
      data: {
        username: app.globalData.myInfo.username,
        access_token: app.globalData.myInfo.token,
        project_industry: that.data.industry,
        project_task: that.data.task,
        project_captial: that.data.captial,
        project_team: that.data.team,
        project_date: that.data.dates,
        project_status: that.data.status,
        project_type: that.data.project_type,
        group_type: 1,
        group_id: that.data.community_main.id,
        is_focus: that.data.focus,
        is_del: 0
      },
      success(res) {
        if (res.data.status == "y") {
          console.log(res)
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
            info: "无该类项目"
          })
        }
      },
      complete: function() {
        that.setData({
          tid: "",
          cid: "",
          inid: "",
          teid: "",
          dis: 4,
        })
      }
    })
  },
  remake: function() {

    that.setData({
      task: "",
      tid: "",
      captial: "",
      cid: "",
      industry: "全部",
      inid: "",
      team: "",
      teid: "",
    })
  },
  do_op: function() {
    that.setData({
      which_frame: "before",
      items: "",
      dis: 4,
      bottom_line: 1,
      project_type: "is_create",
      info: null,
      task: "",
      tid: "",
      captial: "",
      cid: "",
      industry: "全部",
      inid: "",
      team: "",
      teid: "",
      dates: "",
      dateArr: [],
      fid: "",
      focus: 0,

      pagesize: 10,
      changepage: 0,

      x: 10,
      tname: "",
      status: "全部",
      sname: "",
    })
    app.globalData.other_to_main = ""
    app.globalData.community = ""

    wx.setNavigationBarTitle({
      title: "发现社区"
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
        type: 2, //0查我建立的朋友圈 1查我加入的朋友圈  2查询所有朋友圈 默认0,	
      },
      success(res) {
        console.log(res)
        that.setData({
          communities: res.data.result
        })
      }
    })

    //获取globadata
    if (app.globalData.other_to_main != "") {
      var other_to_main = app.globalData.other_to_main
      var community = app.globalData.community
      that.setData({
        which_frame: 'next',
        community_main: community,
      })

      wx.setNavigationBarTitle({
        title: that.data.community_main.name
      })

      wx.request({
        url: 'https://czw.saleii.com/api/client/get_project_list',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded', // 默认值
          'Accept': 'application/json'
        },
        data: {
          username: app.globalData.myInfo.username,
          access_token: app.globalData.myInfo.token,
          project_industry: "全部",
          project_type: "is_create",
          project_status: that.data.status,
          project_date: that.data.dates,
          project_location: that.data.multiArray[1][that.data.multiIndex[1]],
          group_type: 1,
          group_id: that.data.community_main.id,
          is_del: 0
        },
        success(res) {
          console.log(res)
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
              info: "无该类项目"
            })
          }
        }
      })

    }

    if (wecache.get("myInfo", "0") == 0) {
      wx.showModal({
        title: '重要',
        content: '请先登陆！',
        success: function(res) {
          if (res.confirm) {
            console.log("跳转")
            wx.switchTab({
              url: '../mine/mine',
            })
          } else if (res.cancel) {
            wx.switchTab({
              url: '../index/index',
            })
          }
        }
      })
    }
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