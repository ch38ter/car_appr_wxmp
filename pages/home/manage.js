// pages/home/manage.js
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    var token = wx.getStorageSync('token')
    var that = this
    wx.request({
      url: 'https://wxmp.chester.plus/wxmp/userinfo',
      method: 'POST',
      data: {
        jwt: token
      },
      success(res){
        console.log(res)
        that.setData({
          userlist:res.data.data
        })
      }
    })
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
  namechange(e){
    console.log(e)
    var id = e.currentTarget.id
    // console.log('before',this.data.userlist)
    for(var i=0;i<this.data.userlist.length;i++){
      if(this.data.userlist[i].id == id){
        this.setData({
          ["userlist["+i+"].name"]: e.detail.value
        })
      }
    }
    // console.log('after',this.data.userlist)
  },
  authchange(e){
    // console.log(e)
    var id = e.currentTarget.id
    for(var i=0;i<this.data.userlist.length;i++){
      if(this.data.userlist[i].id == id){
        this.setData({
          ["userlist["+i+"].authority"]: e.detail.value
        })
      }
    }
  },
  edituser(e){
    var id = e.currentTarget.id
    var username, userauth
    for(var i=0;i<this.data.userlist.length;i++){
      if(this.data.userlist[i].id == id){
        username = this.data.userlist[i].name
        userauth = this.data.userlist[i].authority
      }
    }
    if(userauth>3){
      wx.showToast({
        title: '0~3',
        icon: 'error'
      })
    }else{
      this.setusernameandauth(id, username, userauth)
    }
  },

  setusernameandauth(a,b,c){
    var jwt = wx.getStorageSync('token')
    wx.request({
      url: 'https://wxmp.chester.plus/wxmp/userset',
      method: 'POST',
      data:{
        "jwt_token":{"jwt":jwt},
        "form":{"id":a,"name":b,"authority":c}
      },
      success(res){
        if (res.data.code == '401'){
          wx.navigateTo({
            url: 'login',
          })
        }else if (res.data.code == '403'){
          wx.showToast({
            title: '无权限',
            icon:"error"
          })
        }else{
          wx.showToast({
            title: 'OK',
          })
        }
      }
    })
  }

})