Page({
  data: {
    imgUrls: [
      'https://www.aicareu.com/dit1.jpg?' + Math.random() / 9999,
      'https://www.aicareu.com/dit2.jpg?' + Math.random() / 9999,
      'https://www.aicareu.com/dit3.jpg?' + Math.random() / 9999,
      'https://www.aicareu.com/dit4.jpg?' + Math.random() / 9999

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