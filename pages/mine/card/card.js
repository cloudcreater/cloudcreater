// pages/mine/card/card.js
import wecache from "../../../utils/wecache.js"
const app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myInfo: "",
    which_bar: "my_card",
    is_has: "no",
    mycard: {},
    cardList: [],
    avatarUrl: "",
    shareImgPath: "",
    info: "no",
    canvasHidden:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this

    that.setData({
      myInfo: wecache.get("myInfo")
    })
    if (!wecache.get('mycard', false)) {
      that.setData({
        is_has: 'no'
      })
    } else {
      that.setData({
        mycard: wecache.get('mycard'),
        is_has: 'has'
      })
    }
  },
  to_createCard: function() {
    wx.navigateTo({
      url: 'create_card/create_card',
    })
  },
  change: function(event) {
    var name = event.currentTarget.dataset.bar_name;
    if (name == "mine") {
      that.setData({
        which_bar: 'my_card'
      })
    } else if (name = "collect") {
      that.setData({
        which_bar: 'my_collect'
      })
    }
  },
  op: function() {
    wx.navigateTo({
      url: 'create_card/create_card',
    })
  },
  //分享按钮函数
  onShareAppMessage: function(ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: '我的小程序',
      path: '/pages/mine/card/share_card/share_card?mycard=' + JSON.stringify(that.data.mycard),
      success: function(res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function(res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },
  saveImageToPhotosAlbum: function() {
    wx.showLoading({
      title: '生成中...',
    })
    that.setData({
      canvasHidden: false
    })
    var wunit = wx.getSystemInfoSync().windowWidth / 100
    var hunit = wx.getSystemInfoSync().windowHeight / 100
    var nickname = that.data.mycard.wx_nickname
    var avatarUrl = that.data.avatarUrl
    console.log("头像" + avatarUrl)
    var job = that.data.mycard.job
    var school = that.data.mycard.school
    var username = that.data.mycard.username
    var need = that.data.mycard.need

    var context = wx.createCanvasContext('shareCanvas')

    context.setFillStyle('rgba(0,0,0,0.8)')
    context.fillRect(0, 0, wunit * 100, hunit * 100)

    context.setStrokeStyle()
    context.setFillStyle('white')
    context.strokeRect(wunit * 5, hunit * 15, wunit * 90, hunit * 35)
    context.fillRect(wunit * 5, hunit * 15, wunit * 90, hunit * 35)

    context.setFontSize(8 * wunit)
    context.setFillStyle('black')
    context.fillText(nickname, wunit * 11, hunit * 22)
    context.setFontSize(4 * wunit)
    context.fillText(job, wunit * 11, hunit * 26)
    context.setFontSize(5 * wunit)
    context.fillText("公司(学校): " + school, wunit * 11, hunit * 35)
    context.fillText("电话: " + username, wunit * 11, hunit * 40)
    context.fillText("需求: " + need, wunit * 11, hunit * 45)
    context.setFillStyle('white')
    context.fillText("照片已经生成在您的相册啦~ ", wunit * 20, hunit * 55)
    // context.fillText("电话: ", wunit * 25, hunit * 58)

    context.save()
    context.beginPath()
    context.arc(wunit * 78, hunit * 23, hunit * 6, 0, 2 * Math.PI)
    context.fill()
    context.clip()
    context.drawImage(avatarUrl, wunit * 68, hunit * 17, hunit * 14, hunit * 14)
    context.restore()
    // context.draw()

    context.draw(false, function() {
      setTimeout(function() {
        wx.canvasToTempFilePath({
          x: wunit * 5,
          y: hunit * 15,
          width: wunit * 90,
          height: hunit * 35,
          destWidth: 1296,
          destHeight: 740,
          canvasId: 'shareCanvas',
          success: function(res) {
            that.setData({
              shareImgPath: res.tempFilePath
            })
            if (!res.tempFilePath) {
              wx.showModal({
                title: '提示',
                content: '图片绘制中，请稍后重试',
                showCancel: false
              })
            }
            console.log(that.data.shareImgPath)
            //画板路径保存成功后，调用方法吧图片保存到用户相册
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              //保存成功失败之后，都要隐藏画板，否则影响界面显示。
              success: (res) => {
                console.log(res)
                wx.hideLoading()
                wx.showLoading({
                  title: '完成...稍后关闭此页...',
                })
              },
              fail: (err) => {
                console.log(err)
                wx.hideLoading()
                wx.showLoading({
                  title: '失败...稍后关闭此页...',
                })
              },
              complete() {
                setTimeout(function() {
                  that.setData({
                    canvasHidden: true
                  })
                  wx.hideLoading()
                }, 2000)
              }
            })
          }
        })
      },500)
    });

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

    that.setData({
      cardList: wecache.get("cardList", null),
      mycard: wecache.get('mycard'),
    })
    console.log(that.data.cardList)
    if (that.data.cardList == null) {
      that.setData({
        info: "no"
      })
    } else {
      that.setData({
        info: "has"
      })
    }

    if (that.data.mycard == null) {
      that.setData({
        is_has: "no"
      })
    } else {
      that.setData({
        is_has: "has"
      })
    }

    wx.downloadFile({
      url: that.data.mycard.wx_headimg,
      success: function(sres) {
        console.log(sres);
        that.data.avatarUrl = sres.tempFilePath
      },
      fail: function(fres) {

      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  // onUnload: function() {

  // },

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
  // onShareAppMessage: function() {

  // }
})