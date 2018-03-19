var app = getApp();
Page({
  data: {
    showTopTips: false,
    toast1Hidden: true,
    modalHidden: true,
    modalHidden2: true,  
   
    userInfo:{
      username:"",
      password:"",
      realname:"",
      qq:"",
      phone:"",
      idcard:""
    },
    isAgree: false
  },
  showTopTips: function () {
    var that = this;
    this.setData({
      showTopTips: true
    });
    setTimeout(function () {
      that.setData({
        showTopTips: false
      });
    }, 3000);
  },
 

  onLoad:function(){
    console.log(1)
    wx.request({
      url: 'https://www.aicareu.com/api/login/GetOkResult',
      success: function (res) {
        console.log(res)
      },
      fail:function(res){
        console.log(res)

      }
    });
    wx.setNavigationBarTitle({
      title: wx.getStorageSync('mallName')
    });

  },

   isCardNo:function(card) 
{ 
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X 
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
    if(reg.test(card) === false) {
     
      return false;
    }
    else
    return true;
  },
  formSubmit: function (e) {
    var that = this;
    var formData = e.detail.value;
 
    console.log(formData);
    if (formData.UserName == "" || formData.Password == "") {
      wx.showModal({
        title: '提示',
        content: '用户名密码不能为空!',
        showCancel:false
      });
      return;
    }
    if (formData.IDCard == "" ) {
      wx.showModal({
        title: '提示',
        content: '身份证不能为空!',
        showCancel: false
      });
      return;
    }
    if (!that.isCardNo(formData.IDCard)){
      wx.showModal({
        title: '提示',
        content: '请输入正确的身份证号',
        showCancel:false
      })
      return;

    }


    wx.request({
      url: 'https://www.aicareu.com/api/login/register',
      data: formData,
      method:"post",
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (!res.data.Success)
        {
          wx.showToast({
            title: res.data.Message,
            icon: 'success',
            duration: 2000,
            complete: function () { 
              wx.redirectTo({
                url: "/pages/start/start",
              })
            } 
          })
        }
        else
        {
          wx.showToast({
            title: res.data.Message,
            icon: 'none',
            duration: 2000
          })
        }
       
      }
    })
  },  
  login:function(){
    wx.redirectTo({
      url: '/pages/login/login',
    })

  }
});