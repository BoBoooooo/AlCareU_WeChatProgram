var app = getApp()

var WxParse = require('../../wxParse/wxParse.js');

Page({
  data: {
    currentType: 0,
    tabClass: ["", ""],
       orderDetail: "",
    orderId: "",
    statusType: ["原始报告", "报告解读","健康建议"],
    Des:""
  },
  statusTap: function (e) {
    var curType = e.currentTarget.dataset.index;
    this.data.currentType = curType
    this.setData({
      currentType: curType
    });
    console.log(curType);
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
        'Content-Type': "application/x-www-form-urlencoded"
      },
      success: (res) => {
        wx.hideLoading();
        console.log(res);

        var article = res.data;
        WxParse.wxParse('article', 'html', article, that, 5);
      }
    });


    wx.request({
      url: 'https://www.aicareu.com/api/report/PullReportDetail_Analysis',
      method: "post",
      data: {
        id: orderId
      },
      header: {
        'auth': token,
        'Content-Type': "application/x-www-form-urlencoded"
      },
      success: (res) => {
        wx.hideLoading();
        console.log(res);
        that.setData({
          Des: res.data
        });
      }
    })
  },

  
})