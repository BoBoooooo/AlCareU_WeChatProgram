const app = getApp()

Page({
	data: {
    balance:0,
    freeze:0,
    score:0,
    score_sign_continuous:0
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
  }
  
})