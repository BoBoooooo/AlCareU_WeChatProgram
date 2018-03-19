var app = getApp()
Page({
  data:{
    orderList:null
  },
  
  orderDetail : function (e) {
    var orderId = e.currentTarget.dataset.id;
    console.log(orderId);
    wx.navigateTo({
      url: "/pages/order-details-report/index?id=" + orderId
    })
  },
 
  onLoad:function(options){
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
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
 
  },

  onShow:function(){
    // 获取订单列表
    var token = wx.getStorageSync('Token');
    console.log(token);

    wx.showLoading();
    var that = this;
    wx.request({
      url: 'https://www.aicareu.com/api/report/PullReportList',
      header: {
        'auth': token
      },
      method:"post",
      success: (res) => {
        if(res.data.length>0){

          that.setData({
            orderList: res.data
          });
        }
        console.log(res);
        wx.hideLoading();

      }
    })
    
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
 
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
 
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
   
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
  
  }
})