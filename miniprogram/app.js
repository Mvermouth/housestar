//app.js
//线上调试模式。
wx.setEnableDebug({
  enableDebug: true
});
wx.clearStorageSync();
const { userLogin } = require('./apis/login.js');
App({
  onLaunch: function () {
    const updateManager = wx.getUpdateManager();
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，为了更好体验，请重启应用。',
        showCancel:false,
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    });
    console.log("app");
    console.log("token:" +  wx.getStorageSync('token'));
    console.log("userid:" + wx.getStorageSync('userid'));
    if (wx.getStorageSync('token') == "" || !wx.getStorageSync('token')) {
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          wx.setStorageSync('loginCode', res.code);
          //这里成功后要设置token userid 用户唯一标识
          userLogin(res.code).then(respon => {
            console.log(respon);
            if (respon && respon.code == 0){
              wx.setStorageSync('userid', respon.data.id);
              wx.setStorageSync('openId', respon.data.openId);
              wx.setStorageSync("token", true);
            }
          });
          console.log("code~:");
          console.log(res.code);
          wx.getSetting({
            success: res02 => {
              if (res02.authSetting['scope.userInfo']) {
                wx.redirectTo({
                  url: '/pages/message/message'
                });
              } else {
                //未授权
                wx.redirectTo({
                  url: '/pages/index/index?code=' + res.code
                });
              }
            }
          })
        }
      })
    } else {
      var userInfo = wx.getStorageSync("userInfo");
      var userid = wx.getStorageSync('userid');
      console.log("userInfo:" + userInfo);
      console.log("userid:" + userid);
      if (!userInfo) return;
      setTimeout(function(){
        wx.redirectTo({
          url: '/pages/message/message'
        });
      },1000);
    }
  },
  globalData: {
    userInfo: null
  }
})