const app = getApp()

Page({
	data: {
    balance:0,
    freeze:0,
    score:0,
    score_sign_continuous:0,
    hidden:true,
    inputValue:""
  },
	onLoad() {
    
	},	
  onShow() {
    this.getUserInfo();
  
  },	
  getUserInfo: function (cb) {
      var that = this
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.setData({
                userInfo: res.userInfo
              });
            }
          })
        }
      })
  },
  aboutUs : function () {
    wx.showModal({
      title: '关于我们',
      content: 'AlCare健康服务系统',
      showCancel:false
    })
  },
  CheckOut:function(){

    wx.removeStorage({
      key: 'Token',
      success: function (res) {

        wx.showModal({
          title: '提示',
          content: '请重新登录',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              wx.redirectTo({
                url: "/pages/login/login"

              })
            }
          }
        })
      }
    })
  },
  ChangePassword:function(){
    this.setData({
      hidden: false


    });

  },
  cancel: function () {
    this.setData({
      hidden: true
    });
  },
  //确认  
  confirm: function () {
  var that =this;
    wx.request({
      url: 'https://www.aicareu.com/api/login/ChangePassword',
      data: {
        "Password": that.data.inputValue
      },
      method: "post",
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if(data.res.Success){
          wx.removeStorage({
            key: 'Token',
            success: function (res) {

              wx.showModal({
                title: '提示',
                content: '修改成功,请重新登录',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    wx.redirectTo({
                      url: "/pages/login/login"

                    })
                  }
                }
              })
            }
          })
         
        }
        
      },
      fail: function (res) {
        console.log(res)

      }
    });
   

    this.setData({
      hidden: true
    })
  },
  bindKeyInput:function(e){
    this.setData({
      inputValue: e.detail.value
    })

  }  
  
})