Page({
  data: {
    username: '',
    password: ''
  },
  onload:function(){
    wx.setNavigationBarTitle({
      title: wx.getStorageSync('mallName')
    })

  },
register:function(){
  wx.redirectTo({
    url: '/pages/mine_home/mine_home',
  })
},
  // 获取输入账号 
  phoneInput: function (e) {
    this.setData({
      username: e.detail.value
    })
  },

  // 获取输入密码 
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  // 登录 
  login: function () {
    var that = this;
    if (this.data.username.length == 0 || this.data.password.length == 0) {
      wx.showModal({
        title: '提示',
        content: '用户名密码不能为空！',
        showCancel:false
     
      })
    } else {

      wx.request({
        url: 'https://www.aicareu.com/api/login/post',
        data: {
          "UserName": that.data.username,
          "Password":that.data.password
        },
        method: "post",
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res);

          if (res.data.Success) {
            wx.setStorageSync('Token', res.data.Token);
            wx.showModal({
              title: '提示',
              content: res.data.Message,
              showCancel:false,
              success: function (res) {
                if (res.confirm) {
                  console.log(1);
                  wx.switchTab({
                    url: "/pages/index/index"
                  });
                } 
              }
            })

           
          }
          else {
            wx.showModal({
              title: '提示',
              content: res.data.Message,
              showCancel: false

            })
          }

        }
      })


    }
  }
})