// pages/mine/resume/index_resume/index_resume.js
import wecache from "../../../../utils/wecache.js"
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gender: "",
    old: "",
    birth: "",
    search: "",
    time: "",
    school: "",
    professional: "",
    edubg: "",
    workexp: "",
    myresume: null,
    avatarUrl:"",
    is_edit: "no",
    canvasHidden:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    that.setData({
      myInfo: wecache.get("myInfo"),
      myresume: wecache.get("myresume", null)
    })
    if (that.data.myresume != null) {
      that.setData({
        is_edit: "yes"
      })
      setTimeout(function () {
        that.setData({
          gender: that.data.myresume.gender,
          old: that.data.myresume.old,
          birth: that.data.myresume.birth,
          search: that.data.myresume.search,
          time: that.data.myresume.time,
          school: that.data.myresume.school,
          professional: that.data.myresume.professional,
          edubg: that.data.myresume.edubg,
          workexp: that.data.myresume.workexp
        })
      }, 500)
    }
  },
  saveImageToPhotosAlbum: function () {
    wx.showLoading({
      title: '生成中...',
    })
    that.setData({
      canvasHidden: false
    })
    var wunit = wx.getSystemInfoSync().windowWidth / 100
    var hunit = wx.getSystemInfoSync().windowHeight / 100
    var nickname = that.data.myresume.wx_nickname
    var username = that.data.myresume.username
    var avatarUrl = that.data.avatarUrl
    console.log("头像" + avatarUrl)
    var gender = that.data.myresume.gender
    var old = that.data.myresume.old
    var birth = that.data.myresume.birth
    var search = that.data.myresume.search
    var time = that.data.myresume.time
    var school = that.data.myresume.school
    var professional = that.data.myresume.professional
    var edubg = that.data.myresume.edubg
    var workexp = that.data.myresume.workexp

    var context = wx.createCanvasContext('shareCanvas')

    context.setFillStyle('rgba(0,0,0,0.8)')
    context.fillRect(0, 0, wunit * 100, hunit * 160)

    context.setStrokeStyle()
    context.setFillStyle('white')
    context.strokeRect(wunit * 5, hunit * 10, wunit * 90, hunit * 75)
    context.fillRect(wunit * 5, hunit * 10, wunit * 90, hunit * 75)

    context.setFontSize(8 * wunit)
    context.setFillStyle('black')
    context.fillText(nickname, wunit * 36, hunit * 19)

    context.moveTo(wunit * 36, hunit * 22)
    context.lineTo(wunit * 88, hunit * 22)
    context.stroke()

    context.setFontSize(4 * wunit)
    context.fillText(username, wunit * 36, hunit * 26)

    context.setFontSize(4 * wunit)
    context.fillText("基本信息: " , wunit * 13, hunit * 33)
    context.fillText("性别: " + gender, wunit * 13, hunit * 38)
    context.fillText("年龄: " + old, wunit * 13, hunit * 43)
    context.fillText("出生日期: " + birth, wunit * 13, hunit * 48)
    context.fillText("求职状态: " + search, wunit * 13, hunit * 53)

    context.fillText("教育经历: " , wunit * 60, hunit * 33)
    context.fillText("时间: " + time, wunit * 60, hunit * 38)
    context.fillText("学校: " + school, wunit * 60, hunit * 43)
    context.fillText("专业: " + professional, wunit * 60, hunit * 48)
    context.fillText("学历: " + edubg, wunit * 60, hunit * 53)

    var chr = workexp.split("");//这个方法是将一个字符串分割成字符串数组
    var temp = "";
    var row = [];
    for (var a = 0; a < chr.length; a++) {
      if (context.measureText(temp).width < 250) {
        temp += chr[a];
      }
      else {
        a--; //这里添加了a-- 是为了防止字符丢失，效果图中有对比
        row.push(temp);
        temp = "";
      }
    }
    row.push(temp);

    //如果数组长度大于2 则截取前两个
    if (row.length > 3) {
      var rowCut = row.slice(0, 3);
      var rowPart = rowCut[1];
      var test = "";
      var empty = [];
      for (var a = 0; a < rowPart.length; a++) {
        if (context.measureText(test).width < 220) {
          test += rowPart[a];
        }
        else {
          break;
        }
      }
      empty.push(test);
      var group = empty[0] + "..."//这里只显示两行，超出的用...表示
      rowCut.splice(1, 1, group);
      row = rowCut;
    }

    context.fillText("工作经历: ", wunit * 13, hunit * 60)
    for (var b = 0; b < row.length; b++) {
      context.fillText(row[b], wunit * 13, hunit * 65 + b * hunit * 2.5, wunit * 65);
    }
    // context.fillText(workexp, wunit * 13, hunit * 63, wunit *65)


    context.setFillStyle('white')
    context.fillText("照片已经生成在您的相册啦~ ", wunit * 20, hunit * 90)
    // context.fillText("电话: ", wunit * 25, hunit * 58)

    context.save()
    context.beginPath()
    context.setStrokeStyle('#333333')
    context.arc(wunit * 22, hunit * 20, hunit * 6, 0, 1.5 * Math.PI)
    context.stroke()
    context.fill()
    context.clip()
    context.drawImage(avatarUrl, wunit * 12, hunit * 14, hunit * 14, hunit * 14)
    context.restore()

    context.draw(false, function () {
      setTimeout(function () {
        wx.canvasToTempFilePath({
          x: wunit * 5,
          y: hunit * 10,
          width: wunit * 90,
          height: hunit * 75,
          destWidth: 1800,
          destHeight: 2100,
          canvasId: 'shareCanvas',
          success: function (res) {
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
                setTimeout(function () {
                  that.setData({
                    canvasHidden: true
                  })
                  wx.hideLoading()
                }, 2000)
              }
            })
          }
        })
      }, 500)
    });
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
    wx.downloadFile({
      url: that.data.myresume.wx_headimg,
      success: function (sres) {
        console.log(sres);
        that.data.avatarUrl = sres.tempFilePath
      },
      fail: function (fres) {

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