// pages/login/login.js
const app = getApp();
const { area_List} = require("../../json/arealist.js");
const { createHouse } = require('../../apis/houseInfo.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    formData:{
      name:"",
      tel:"",
      addr:""
      , province:""
    }
    , focus:{
      name: false,
      tel: false,
      addr: false
      , province: false // area choose alert
    }
    , show:false //success alert
    , areaList: {}
    , provinceArray:[]
    , vxAccount:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = wx.getStorageSync("userInfo");
    var vxAccount = wx.getStorageSync("vxAccount");
    if (!app.globalData) app.globalData = userInfo;
    this.setData({
      userInfo: userInfo
      , areaList: area_List
      , vxAccount: "caishenyevivi"
    })
  },
  inputValue:function(e){
    var oldData = this.data.formData;
    var key = e.target.id;
    oldData[key] = e.detail.value
    this.setData({
      formData: oldData
    })
  },
  //Cheng城市数据
  provinceOk:function(e){
    console.log(e);
    var provinceStr = "";
    if(e.detail && e.detail.values){
      for (var i = 0; i < e.detail.values.length;i++){
        provinceStr += e.detail.values[i].name;
      }
      this.setData({
        provinceArray: e.detail.values
      });
    }
    e.detail.value = provinceStr;
    this.inputValue(e);
    this.onoverlayclick(e);
  }
  //ok btn
  ,okHandle:function(){
    if (!this.canAPI()) return;
    var flag = this.checkForm();
    if(!flag) return;
    console.log(this.data.formData);
    this.setData({
      show:true
    });
    
  },
  //ajax okbtn
  okhandle_ajax:function(){
    this.setData({
      show: false
    });
    var ajaxData = this.handleTheData();
    console.log(ajaxData);
    var that = this;
    //do ajax
    createHouse(ajaxData).then(res => {
      console.log(res);
      var title = "";
      var content = "";
      if (res && res.code == 20000){//完全成功上存
        content = res.msg;
        title = "上存成功";
        that.repeatHandle();
      } else if (res && res.code == 20002){//成功上存但是 数据重复了
        content = res.msg;
        title = "上存成功";
        that.repeatHandle();
      } else {//完全失败。
        content = res.msg;
        title = "上存失败";
      }
      wx.showModal({
        title,
        content,
        showCancel:false,
        success(res) {}
      })
      // wx.showToast({
      //   title,
      //   icon,
      //   duration: 2000
      // });    
    }).catch(res =>{
      wx.showToast({
        title : "上存失败",
        icon : "",
        duration: 2000
      }); 
      console.log(res);
    });
  },
  //处理数据字段
  handleTheData:function(){
    /*name:"业主姓名" ->contact <list> -> id , name , phone
      ,tel:"电话" 
      ,addr:"地址" ->address
      , province:"区域"->district   */ 
    var uploaderId = wx.getStorageSync('userid');
    this.data.formData;
    var contact = [{ 
      name: this.data.formData.name
      , phone: this.data.formData.tel
    }];
    console.log(this.data.provinceArray);
    var address = this.data.formData.addr;
    var province = this.data.provinceArray[0].name;
    var city = this.data.provinceArray[1].name;
    var district = this.data.provinceArray[2].name;
    return {
      contact
      , address
      , district
      , province
      , city
      , uploaderId
    };
  },
  //repeat btn
  repeatHandle:function(){
    this.setData({
      formData:{
        tel:""
        ,name:""
        ,addr:""
      }
    })
  },
  //手机验证
  checkPhone:function(){
    var phone = this.data.formData.tel;
    if (!(/^1[3|4|5|7|8]\d{9}$/.test(phone))){
      wx.showToast({
        title: '请填写正确的电话',
        icon: 'none',
        duration: 2000
      });
      return false; 
    } else return true;
  },
  //表单验证
  checkForm:function(){
    var hash = {
      name:"业主姓名"
      ,tel:"电话"
      ,addr:"地址"
      , province:"区域"
    };
    var flag = true;
    if(this.data.formData){
      for (var k in this.data.formData){
        if (!this.data.formData[k]){
          flag = false;
          wx.showToast({
            title: '请填写正确的' + hash[k],
            icon: 'none',
            duration: 2000
          });
          break;
        }
      }
      if (flag) flag = this.checkPhone();
    }
    return flag;
  },
  changeColor:function(e){
    console.log(e);
    var key = e.target.id.split("_")[0];
    var obj = {
      name: false,
      tel: false,
      addr: false
      , province:false
    }
    for(var k in obj){
      if (k == key) obj[k] = true;
    }
    this.setData({
      focus: obj
    });
  }
  //蒙板点击
  ,onoverlayclick:function(e){
    console.log(e);
    this.setData({
      show: false,
      focus: {
        name: false,
        tel: false,
        addr: false
        , province: false // area choose alert
      }
    });
  }
  //我的房源
  , mineHouse:function(){
    if (!this.canAPI()) return;
    wx.navigateTo({
      url: '../personDetail/personDetail',
      success: function (res) {
       console.log(res);
      }
    })
  }
  //判断是否可以操作api
  ,canAPI:function(){
    return wx.getStorageSync('userid') ? true : false;
  }
})