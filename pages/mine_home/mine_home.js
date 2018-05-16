var app = getApp();
Page({
  data: {
    IsFeMale: false,
    Smoke: false,
    array: ['少于半包', '1整包', '2整包', '2整包以上'],
    select: "请选择"
  },
  onLoad:function(e){
    var token = wx.getStorageSync('Token');
    console.log(token);

    wx.showLoading();
    var that = this;
    wx.request({
      url: 'https://www.aicareu.com/api/report/PullGender',
      header: {
        'auth': token

      },
      method: "post",
      success: (res) => {
        console.log(res);
        wx.hideLoading();
          var a = res.data;
          if (a=="女"){
            that.setData({
              IsFeMale:true
            });
          }   
      }

    });

  },


  bindPickerChange: function (e) {


    var index = e.detail.value;
    var str = this.data.array[index];

    this.setData({
      select: str
    })
  },

  isCardNo: function (card) {
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X 
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (reg.test(card) === false) {

      return false;
    }
    else
      return true;
  },
  switchChange: function (e) {
    var val = e.detail.value;
    this.setData({
      Smoke: val
    });

  },
  formSubmit: function (e) {
    var that = this;
    var formData = e.detail.value;

    console.log(formData);
    var token = wx.getStorageSync('Token');

    wx.request({
      url: 'https://www.aicareu.com/api/report/SaveTestForm',
      data: formData,
      method: "post",
      header: {
        'auth': token,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.Success) {
          wx.showToast({
            title: res.data.Message,
            duration: 2000,
            complete: function () {
              wx.redirectTo({
                url: "/pages/home/home",
              })
            }
          })
        }
        else {
          wx.showToast({
            title: res.data.Message,
            duration: 2000
          })
        }

      }
    })
  }

});