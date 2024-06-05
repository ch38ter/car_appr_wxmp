// const { textAttributes } = require("XrFrame/components/text/Text")

// pages/home/2.js
Page({

  /**
   * Page initial data
   */
  data: {
    
    // yearlist: ['2022年', '2023年', '2024年']
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    var currenttime = new Date()
    var currentyear = currenttime.getFullYear()
    this.setData({
      yearlist:[currentyear-2 + '年', currentyear-1 + '年', currentyear + '年'],
      list:[]
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
    this.setData({
      "toptabcurrent":'2'
    });

    var jwt = wx.getStorageSync('token')
    var currenttime = new Date()
    var year = currenttime.getFullYear()+"年"
    var that = this
    wx.request({
      url: 'https://wxmp.chester.plus/wxmp/his',
      method: 'POST',
      data:{
        "jwt_token":{"jwt":jwt},
        "year":{"year":year}
      },
      success(res){
        if (res.data.code == '404'){
          that.setData({list:[]})
          wx.showToast({
            title: '没有数据！',
            icon: 'error'
          })
        }else if(res.data.code == '401'){
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
          var status = "";
          if(x[i][11] == "0"){
            status = "已提交"
          }else if(x[i][11] == "1"){
            status = "已撤回"
          }else if(x[i][11] == "2"){
            status = "已批准"
          }else if(x[i][11] == "3"){
            status = "已拒绝"
          }else{
            status = "已过期"
          }
          let setList1 = "list["+i+"].summitdate"
          let setList2 = "list["+i+"].summittime"
          let setList3 = "list["+i+"].time"
          let setList4 = "list["+i+"].name"
          let setList5 = "list["+i+"].comm"
          let setList6 = "list["+i+"].apprtime"
          let setList7 = "list["+i+"].approver"
          let setList8 = "list["+i+"].reason"
          let setList9 = "list["+i+"].department"
          let setList10 = "list["+i+"].cc"
          let setList11 = "list["+i+"].status"
          let setList12 = "list["+i+"].statusnum"
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
            [setList11]: status,
            [setList12]: x[i][11],
          })
        }}
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

  change(e){
    var jwt = wx.getStorageSync('token')
    var year = e.detail.name
    var that = this
    wx.request({
      url: 'https://wxmp.chester.plus/wxmp/his',
      method: 'POST',
      data:{
        "jwt_token":{"jwt":jwt},
        "year":{"year":year}
      },
      success(res){
        if (res.data.code == '404'){
          that.setData({list:[]})
          wx.showToast({
            title: '没有数据！',
            icon: 'error'
          })
        }else if(res.data.code == '401'){
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
          var status = "";
          if(x[i][11] == "0"){
            status = "已提交"
          }else if(x[i][11] == "1"){
            status = "已撤回"
          }else if(x[i][11] == "2"){
            status = "已批准"
          }else if(x[i][11] == "3"){
            status = "已拒绝"
          }else{
            status = "已过期"
          }
          let setList1 = "list["+i+"].summitdate"
          let setList2 = "list["+i+"].summittime"
          let setList3 = "list["+i+"].time"
          let setList4 = "list["+i+"].name"
          let setList5 = "list["+i+"].comm"
          let setList6 = "list["+i+"].apprtime"
          let setList7 = "list["+i+"].approver"
          let setList8 = "list["+i+"].reason"
          let setList9 = "list["+i+"].department"
          let setList10 = "list["+i+"].cc"
          let setList11 = "list["+i+"].status"
          let setList12 = "list["+i+"].statusnum"
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
            [setList11]: status,
            [setList12]: x[i][11],
          })
        }}
      }
    })

  }
})

