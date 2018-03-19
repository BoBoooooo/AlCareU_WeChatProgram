var app = getApp();
var WxParse = require('../../wxParse/wxParse.js');

Page({
  data: {
    orderDetail: "",
    orderId: "",

  },
  onLoad: function (e) {
    var orderId = e.id;

    var that = this;
    var token = wx.getStorageSync('Token');
console.log(orderId);
    wx.request({
      url: 'https://www.aicareu.com/api/report/PullReportDetail',
      method: "post",
      data: {
        id: orderId
      },
      header: {
        'auth': token,
        'Content-Type':"application/x-www-form-urlencoded"
      },
      success: (res) => {
        wx.hideLoading();
        console.log(res);
      
        var article = res.data;
        WxParse.wxParse('article', 'html', article, that, 5);
      }
    })
  },
 
})