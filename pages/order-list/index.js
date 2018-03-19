var app = getApp()
Page({
  data: {
    orderList: null
  },

 

  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    var a = wx.getStorageSync('Token');
    console.log(a);
    if (a == null || a == "") {


      wx.showModal({
        title: '提示',
        content: '请先登录',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            wx.redirectTo({
              url: "/pages/mine_home/mine_home"

            })
          }
        }
      })

    }

  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },

  onShow: function () {
    // 获取订单列表
    var token = wx.getStorageSync('Token');
    console.log(token);

    wx.showLoading();
    var that = this;
    wx.request({
      url: 'https://www.aicareu.com/api/appointment/PullAppointmentList',
      header: {
        'auth': token
      },
      method: "post",
      success: (res) => {
        console.log(res);
        wx.hideLoading();
   if(res.data.length>0){
     that.setData({
       orderList: res.data
     });

   }
     
      },
      
    })

  },
  GetNo:function(){
    var that = this;
    var token = wx.getStorageSync('Token');

    wx.request({
      url: 'https://www.aicareu.com/api/appointment/SaveApp',
      header: {
        'auth': token
      },
      method: "post",
      success: (res) => {
        console.log(res);
        if (res.data.Success) {
          wx.hideLoading();
          that.setData({
            orderList: res.data
          });
          wx.showModal({
            title: '提示',
            content: res.data.Message,
            showCancel: false
          });
        }

        else {
          wx.hideLoading();
          wx.showModal({
            title: '提示',
            content: res.data.Message,
            showCancel: false
          });
        }
        that.onShow();

      }

    })
  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载

  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数

  }
})