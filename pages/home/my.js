// pages/home/2.js
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
      url: 'https://wxmp.chester.plus/wxmp/checktoken', 
      data: {
        jwt: token
      },
      method: "POST",
      success (res) {
          if(res.data.auth == '3'){
          that.setData({
            manage:true
          })
        }
      else{}
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
    var jwt = wx.getStorageSync('token')
    var that = this
    wx.request({
      url: 'https://wxmp.chester.plus/wxmp/statistic',
      method: 'POST',
      data:{
        "jwt":jwt
      },
      success(res){
        if(res.data.code == '401'){
          wx.showToast({
            title: '过期',
            duration: 2000
          })
          wx.navigateTo({
            url: 'login',
          })
        }else{
          that.setData({
          'total_summit': res.data.data.total,
          'month_summit': res.data.data.month
        })}
      }
    });
    wx.request({
      url: 'https://wxmp.chester.plus/wxmp/wfs',
      method: 'POST',
      data:{
        "jwt":jwt
      },
      success(res){
        if (res.data.code == '404'){
          that.setData({to_appr_list:[]})
        }else if (res.data.code == '401'){
          wx.showToast({
            title: '过期',
            duration: 2000
          })
          wx.navigateTo({
            url: 'login',
          })
        }else{
          var x = res.data.data
        for (var i = 0; i < x.length; i++) {
          var app_time = x[i][10];
          if(app_time==null){
            app_time = '未审批                         '
          }
          let setList1 = "to_appr_list["+i+"].summitdate"
          let setList2 = "to_appr_list["+i+"].summittime"
          let setList3 = "to_appr_list["+i+"].time"
          let setList4 = "to_appr_list["+i+"].name"
          let setList5 = "to_appr_list["+i+"].comm"
          let setList6 = "to_appr_list["+i+"].apprtime"
          let setList7 = "to_appr_list["+i+"].approver"
          let setList8 = "to_appr_list["+i+"].reason"
          let setList9 = "to_appr_list["+i+"].department"
          let setList10 = "to_appr_list["+i+"].cc"
          let setList11 = "to_appr_list["+i+"].id"
          that.setData({
            [setList1]: x[i][9].slice(0,10),
            [setList2]: x[i][9].slice(0,19),
            [setList3]: x[i][2]+"时~"+x[i][3]+"时",
            [setList4]: x[i][5],
            [setList5]: x[i][4],
            [setList6]: app_time.slice(0,19),
            [setList7]: x[i][6],
            [setList8]: x[i][1],
            [setList9]: x[i][8],
            [setList10]: x[i][7],
            [setList11]: x[i][11]
          })
        }
      }
    }});
    wx.request({
      url: 'https://wxmp.chester.plus/wxmp/apprlist',
      method: 'POST',
      data:{
        "jwt":jwt
      },
      success(res){
        console.log(res)
        if(res.data.code == '401'){
          wx.showToast({
            title: '过期',
            duration: 2000
          })
          wx.navigateTo({
            url: 'login',
          })
        }
        else if (res.data.code == '200'){
          that.setData({appr:true})
          var x = res.data.data
          for (var i = 0; i < x.length; i++) {
            var app_time = x[i][10];
            if(app_time==null){
              app_time = '未审批                         '
            }
            let setList1 = "appr_list["+i+"].summitdate"
            let setList2 = "appr_list["+i+"].summittime"
            let setList3 = "appr_list["+i+"].time"
            let setList4 = "appr_list["+i+"].name"
            let setList5 = "appr_list["+i+"].comm"
            let setList6 = "appr_list["+i+"].apprtime"
            let setList7 = "appr_list["+i+"].approver"
            let setList8 = "appr_list["+i+"].reason"
            let setList9 = "appr_list["+i+"].department"
            let setList10 = "appr_list["+i+"].cc"
            let setList11 = "appr_list["+i+"].id"
            that.setData({
              [setList1]: x[i][9].slice(0,10),
              [setList2]: x[i][9].slice(0,19),
              [setList3]: x[i][2]+"时~"+x[i][3]+"时",
              [setList4]: x[i][5],
              [setList5]: x[i][4],
              [setList6]: app_time.slice(0,19),
              [setList7]: x[i][6],
              [setList8]: x[i][1],
              [setList9]: x[i][8],
              [setList10]: x[i][7],
              [setList11]: x[i][11]
            })
          }
        }else{}
      }
    })
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

  dealappr(e){
    this.setData({
      appring_id: e.currentTarget.id
    })
    this.showPopup()

  },
  showPopup(type) {
    this.setData({
      bottomshow: true
     })
  },
  closePopup(type) {
    this.setData({
      bottomshow: false
    })
  },

  withdraw(e){
    var id = e.currentTarget.id
    var jwt = wx.getStorageSync('token')
    var that = this
    var list = this.data.to_appr_list
    wx.request({
      url: 'https://wxmp.chester.plus/wxmp/withdraw',
      method: 'POST',
      data:{
        "id":{"id":id},
        "jwt_token":{"jwt":jwt}
      },
      success(res){
        if(res.data.code == '401'){
          wx.showToast({
            title: '过期',
            duration: 2000
          })
          wx.navigateTo({
            url: 'login',
          })
        }else if(res.data.code == '200'){
          for(let i = 0; i < list.length; i++){
            if(list[i].id == id){
              list.splice(i,1)
            }
          }

          that.setData({to_appr_list:list})
          wx.showToast({
            title: '撤回成功！',
            icon: 'success'
          })
        }else{
          wx.showToast({
            title: '撤回失败！',
            icon: 'error'
          })
        }
      }
    })
  },

  allowappr(e){
    var id = this.data.appring_id
    var jwt = wx.getStorageSync('token')
    var that = this
    var list = this.data.appr_list
    wx.request({
      url: 'https://wxmp.chester.plus/wxmp/allowappr',
      method: 'POST',
      data:{
        "id":{"id":id},
        "jwt_token":{"jwt":jwt}
      },
      success(res){
        if(res.data.code == '401'){
          wx.showToast({
            title: '过期',
            duration: 2000
          })
          wx.navigateTo({
            url: 'login',
          })
        } else if(res.data.code == '200'){
          for(let i = 0; i<list.length;i++){
            if(list[i].id==id){
              list.splice(i,1)
            }
          }
          that.setData({appr_list:list})
          wx.showToast({
            title: '已同意！',
            icon: 'success'
          })
        }else{
          wx.showToast({
            title: '失败！',
            icon: 'error'
          })
        }
      }
    })
  },
  denyappr(e){
    var id = this.data.appring_id
    var jwt = wx.getStorageSync('token')
    var that = this
    var list = this.data.appr_list
    wx.request({
      url: 'https://wxmp.chester.plus/wxmp/denyappr',
      method: 'POST',
      data:{
        "id":{"id":id},
        "jwt_token":{"jwt":jwt}
      },
      success(res){
        if(res.data.code == '401'){
          wx.showToast({
            title: '过期',
            duration: 2000
          })
          wx.navigateTo({
            url: 'login',
          })
        }else if(res.data.code == '200'){
          for(let i = 0; i<list.length;i++){
            if(list[i].id==id){
              list.splice(i,1)
            }
          }
          that.setData({appr_list:list})
          wx.showToast({
            title: '已拒绝！',
            icon: 'success'
          })
        }else{
          wx.showToast({
            title: '失败！',
            icon: 'error'
          })
        }
      }
    })
  },
  tomanage(){
    wx.navigateTo({
      url: 'manage',
    })
  }
})
