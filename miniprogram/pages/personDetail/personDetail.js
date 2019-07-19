const { getUserHouse, deleteUserHouse } = require('../../apis/houseInfo.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aniLeft:null
    ,aniRight:null
    , contentLeft:null
    , contentRight:null
    , tapStatus:true
    , leftArray:[]
    , rightArray:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHouseInfoByUserId();
    this.tap_events({
      target:{
        id:"okmsg"
      }
    });
  }
  , deleteMyHouseById:function(e){
    console.log(e);
    var houseId = e.target.id;
    var uploaderId = wx.getStorageSync('userid');
    var openId = wx.getStorageSync('openId');
    var that = this;
    console.log(uploaderId);
    wx.showModal({
      title: '',
      content: '确认删除?',
      success(res) {
        if (res.confirm) {
          //delete alax 根据id去删除数组
          if (uploaderId && openId && houseId){
            deleteUserHouse({
              uploaderId
              , openId
              , houseId
            }).then(res => {
                if(res && res.code == 0){
                  var data = that.data.rightArray;
                  wx.showToast({
                    title: '删除成功',
                    icon: 'success',
                    duration: 2000
                  });
                  if (data && data.length > 0) {
                    that.setData({
                      rightArray: data.filter((item) => { return item.id != houseId })
                    })
                  }
                } else {
                  wx.showToast({
                    title: '删除失败',
                    icon: 'none',
                    duration: 2000
                  });
                }
            }).catch(err => {
              console.log(err);
              wx.showToast({
                title: '删除失败',
                icon: 'none',
                duration: 2000
              });
            })
          }
          console.log('用户点击确定')
        }
      }
    });
  }
  //页签事件
  ,tap_events:function(e){
    var id = e.target.id;
    var left = id == "okmsg" ? "60%" : "30%";
    var right = id == "okmsg" ? "30%" : "60%";
    var tapStatus = id == "okmsg" ? true : false;
    this.setData({
      tapStatus
    });
    this.initAni(left,right);
  }
  //请求房源数据
  , getHouseInfoByUserId:function(){
      /*name:"业主姓名" ->contact <list> -> id , name , phone
      ,tel:"电话" 
      ,addr:"地址" ->address
      , province:"区域"->district
      */
    var id = wx.getStorageSync('userid');
    getUserHouse(id).then(res => {
      console.log(res);
      if(res && res.code == 0){
        var data = res.data;
        var leftArray = [];
        var rightArray = [];
        if (data && data.length > 0) {
          for (var i = 0; i < data.length; i++) {
            var item = data[i];
            var tempObj = {};
            tempObj.addr = item.address;
            tempObj.province = item.city + item.district;
            tempObj.id = item.id;
            tempObj.reason = item.auditResult;
            tempObj.name = "";
            tempObj.tel = "";
            
            if (item.contact && item.contact.length > 0) {
              for (var j = 0; j < item.contact.length; j++) {
                tempObj.name += item.contact[j].name + ((item.contact.length - 1 != j) ? "、" : "");
                tempObj.tel += item.contact[j].phone + ((item.contact.length - 1 != j) ? "、" : "");
              }
            }
            tempObj.status = item.status;
            if (item.status == 1) leftArray.push(tempObj);
            else rightArray.push(tempObj);
          }
        }
        this.setData({
          rightArray
          , leftArray
        });
      }
    });
  }
  //动画
  , initAni: function (left, right){
    var animationLeft = wx.createAnimation({
      duration: 600,
      timingFunction: 'ease'
    });
    var animationRight = wx.createAnimation({
      duration: 600,
      timingFunction: 'ease'
    });
    var contentLeft = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease'
    });
    var contentRight = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease'
    });
    animationLeft.width(left).step();
    animationRight.width(right).step();
    contentLeft.opacity(1).step();
    contentRight.opacity(1).step();
    this.setData({
      aniLeft: animationLeft.export()
      , aniRight: animationRight.export()
      ,contentLeft: contentLeft.export()
      , contentRight: contentRight.export()
    });
  }
})