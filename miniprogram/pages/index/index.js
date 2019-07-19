//index.js
//获取应用实例
const app = getApp()
const { userInfoUp } = require('../../apis/login.js');
Page({
  data: {
    canIUse:false,
    canGetPhone:true
    ,loadingPic:true
    , ani:null
  },

  onLoad: function (option) {
    console.log("code:");
    console.log(option);
    var animation = wx.createAnimation({
      duration: 4000,
      timingFunction: 'ease'
    });
    animation.scale(1.2).step();
    this.setData({
      ani: animation.export()
    });
    console.log("index");
    var that = this;
    if(JSON.stringify(option) == "{}") {
      setTimeout(function(){
        var pages = getCurrentPages();
        var currentPage = pages[pages.length - 1];
        var url = currentPage.route;
        //避免异步信息混乱。
        if (wx.getStorageSync('token') && wx.getStorageSync("userInfo")){
          if (url == "pages/message/message" || url == "pages/personDetail/personDetail") return;
          wx.redirectTo({
            url: '/pages/message/message'
          });
        } else {
          if (url == "pages/index/index"){
            that.setData({
              loadingPic: false
            });
          }
        }
      },4000);
      return;
    }
    this.setData({
      loadingPic:false
    });
  },

  //,获取手机
  getPhoneNum: function (e) {
    console.log(e);
    var encryptedData = e && e.detail && e.detail.encryptedData;
    var iv = e && e.detail && e.detail.iv;
    if (encryptedData && iv) {
      this.setData({
        canGetPhone: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
      });
      wx.setStorageSync('mobilephone', {
        encryptedData: encryptedData,
        iv: iv
      });
      wx.showToast({
        title: '认证成功，请微信登陆。',
        icon: 'none',
        duration: 2000
      });
    } else {
      wx.showToast({
        title: '认证失败',
        icon: 'none',
        duration: 2000
      });
    }
  },
  //微信登陆
  bindGetUserInfo:function(e){
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    wx.setStorageSync("userInfo",e.detail.userInfo);
    var phone = wx.getStorageSync("mobilephone");
    var user = e.detail;
    var ajaxObj = user.userInfo;
    ajaxObj.phone = {
      encryptedData: phone.encryptedData
      , iv: phone.iv
    };
    ajaxObj.unionId = {
      encryptedData: user.encryptedData
      , iv: user.iv
    };
    ajaxObj.id = wx.getStorageSync('userid');
    delete ajaxObj.language;
    //传递数据
    userInfoUp(ajaxObj).then(res =>{});
    wx.redirectTo({
      url: '/pages/message/message'
    });
  }
})
