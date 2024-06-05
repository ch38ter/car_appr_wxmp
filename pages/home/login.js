// pages/home/3.js

Page({

  /**
   * Page initial data
   */
  data: {
    canlog: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  async onLoad(options) {
    var token = wx.getStorageSync('token');
    if (token){
      var ok = await this.checkTOKEN(token);
      if(ok){
        this.setData({canlog:true})
      }else{
        this.logIN()
      }
    }else{
      this.logIN()
    }
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  },
  getUI() {
    wx.switchTab({
      url: 'appr',
    })
  },

  logIN(){
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          var that=this
          wx.request({
            url: 'https://wxmp.chester.plus/wxmp/login',
            data: {
              code: res.code
            },
            method: "POST",
            success (res2){

              if(res2.statusCode == '200'){
                wx.setStorageSync('token', res2.data);
                that.setData({canlog:true})
                wx.showToast({
                title: '登录成功！',
                duration: 2000,
                icon: 'success'
              })
              }
              
            }
          })
        } 
        else {
          wx.showToast({
            title: '登录失败！',
            duration: 2000,
            icon: 'error'
          })
        }
      }
    })

  },
  async checkTOKEN(stoken){
    var ok = false
    const promise = new Promise(function(resolve, reject){
      wx.request({
        url: 'https://wxmp.chester.plus/wxmp/checktoken', 
        data: {
          jwt: stoken
        },
        method: "POST",
        success (res) {
          console.log(res)
          if(res.data.status == 'true'){
            ok = true
          }else{
            ok = false
          }
          resolve();
        }
      })

    })
    return promise.then(function(){
      return ok;
    },function(){})

  }

})

