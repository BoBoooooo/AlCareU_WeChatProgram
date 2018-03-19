Page({
  data: {
    imgUrls: [
      '/images/banner/1.jpg',
      '/images/banner/2.jpg',
      '/images/banner/3.jpg'


    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
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
})