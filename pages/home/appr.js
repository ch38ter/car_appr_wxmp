// pages/home/appr.js
var dateTimePicker = require('../utils/datatimepicker.js');
let ddmRange_depart
let ddmRange_approver
let ddmRange_cc
Page({

  /**
   * Page initial data
   */
  data: {
    input: String,
    price: Float32Array,
    tax: Float32Array,
    user_applicant: '',
    companions: '',
    reason: '',
    
		range_depart: '请选择',
    rangeShow_depart: false,
    range_approver: '请选择',
    rangeShow_approver: false,
    range_cc: '请选择',
    rangeShow_cc: false,
    hourrange: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    start_time: 
      {year:'2000', month:'03', day:'18', hour:'15', minute:'20', second:'00'},
    end_time:
      {year:'2004', month:'06', day:'20', hour:'18', minute:'03', second:'05'},
    temp:
    {dep:'', name:'', reason:'', companions:'', start_time:'', end_time:'', approver:'', cc:''}
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
      

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {
    ddmRange_depart = this.selectComponent("#ddmRange_depart");
    ddmRange_approver = this.selectComponent("#ddmRange_approver");
    ddmRange_cc = this.selectComponent("#ddmRange_cc");
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {
    this.getDepartList()
    this.getApproverList()
    this.getCCList()
    var currenttime = new Date()
    this.setData(
      {
      'start_time.year':currenttime.getFullYear(),
      'start_time.month':(currenttime.getMonth()+1).toString().padStart(2,'0'),
      'start_time.day':(currenttime.getDate()).toString().padStart(2,'0'),
      'start_time.hour':currenttime.getHours(),
      'end_time.year':currenttime.getFullYear(),
      'end_time.month':(currenttime.getMonth()+1).toString().padStart(2,'0'),
      'end_time.day':(currenttime.getDate()).toString().padStart(2,'0'),
      'end_time.hour':currenttime.getHours(),
    },
    )
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

filterTap_depart() {
  ddmRange_depart && ddmRange_depart.show()

  this.setData({
    rangeShow_depart: true
  })
},
rangeItemClick_depart(e) {
  this.setData({
    range_depart: e.detail.text
  })
  this.rangeClose_depart()
},

rangeClose_depart() {
  this.setData({
    rangeShow_depart: false
  })
},

filterTap_approver() {
  ddmRange_approver && ddmRange_approver.show()

  this.setData({
    rangeShow_approver: true
  })
},

rangeItemClick_approver(e) {
  this.setData({
    range_approver: e.detail.text
  })
  this.rangeClose_approver()
},

rangeClose_approver() {
  this.setData({
    rangeShow_approver: false
  })
},

filterTap_cc() {
  ddmRange_cc && ddmRange_cc.show()
  this.setData({
    rangeShow_cc: true
  })
},

rangeItemClick_cc(e) {
  this.setData({
    range_cc: e.detail.text
  })
  this.rangeClose_cc()
},

rangeClose_cc() {
  this.setData({
    rangeShow_cc: false
  })
},

  getDepartList(){
    var jwt = wx.getStorageSync('token')
    var that = this
    wx.request({
      url: 'https://wxmp.chester.plus/wxmp/getdepartlist', 
      data: { jwt: jwt },
      method: "POST",
      success (res) {
        if(res.data.code == 200){
          that.setData({options_depart: res.data.data})
        }else if(res.data.code == '401'){
          wx.showToast({
            title: '过期',
            duration: 2000
          })
          wx.navigateTo({
            url: 'login',
          })
        }else{}
      }
    })
  },

  getApproverList(){
    var jwt = wx.getStorageSync('token')
    var that = this
    wx.request({
      url: 'https://wxmp.chester.plus/wxmp/getapproverlist', 
      data: { jwt: jwt },
      method: "POST",
      success (res) {
        if(res.data.code == 200){
          that.setData({options_cc: res.data.data})
        }else if(res.data.code == '401'){
          wx.showToast({
            title: '过期',
            duration: 2000
          })
          wx.navigateTo({
            url: 'login',
          })
        }else{}
      }
    })
  },

  getCCList(){
    var jwt = wx.getStorageSync('token')
    var that = this
    wx.request({
      url: 'https://wxmp.chester.plus/wxmp/getcclist', 
      data: { jwt: jwt },
      method: "POST",
      success (res) {
        if(res.data.code == 200){
          that.setData({options_approver: res.data.data})
        }else if(res.data.code == '401'){
          wx.showToast({
            title: '过期',
            duration: 2000
          })
          wx.navigateTo({
            url: 'login',
          })
        }else{}
      }
    })
  },

  startDateChange: function(e){
    this.setData(
      {
        'start_time.year':e.detail.value.slice(0,4),
        'start_time.month':e.detail.value.slice(5,7),
        'start_time.day':e.detail.value.slice(8,10)
      }
      )
  },
  startHourChange: function(e){
    this.setData(
      {
        'start_time.hour':e.detail.value
      }
    )
  },
  endDateChange: function(e){
    this.setData(
      {
        'end_time.year':e.detail.value.slice(0,4),
        'end_time.month':e.detail.value.slice(5,7),
        'end_time.day':e.detail.value.slice(8,10)
      }
      )
  },
  endHourChange: function(e){
    this.setData(
      {
        'end_time.hour':e.detail.value
      }
    )
  },
  summitappr(){
    var jwt = wx.getStorageSync('token')
    var that = this
    var time_from_1 = this.data.start_time.year + '-' + this.data.start_time.month + '-' + this.data.start_time.day + ' ' + this.data.start_time.hour
    var time_to_1 = this.data.end_time.year + '-' + this.data.end_time.month + '-' + this.data.end_time.day + ' ' + this.data.end_time.hour
    // 判断提交信息正确性↓
    if(this.data.range_depart=='请选择'){
      wx.showToast({
        title: '提交选择部门！',
        icon: 'error'
      })
    }else if(this.data.user_applicant==''){
        wx.showToast({
          title: '请填写申请人！',
          icon: 'error'
        })
      }
      else if(this.data.reason==''){
        wx.showToast({
          title: '请填写用车事由！',
          icon: 'error'
        })
      }
      else if(this.data.range_approver=='请选择'){
        wx.showToast({
          title: '请选择审批人！',
          icon: 'error'
        })
      }
      else if (this.compareTime()){
        wx.showToast({
          title: '时间设置错误！',
          icon: 'error'
        })
      }
      else if (this.checkResummit()){
        wx.showToast({
          title: '请勿重复提交！',
          icon: 'error'
        })
      }
      else {
    // 判断提交信息正确性↑
    wx.request({
      url: 'https://wxmp.chester.plus/wxmp/appr',
      method: "POST",
      data:{
        "jwt_token":{"jwt":jwt},
        "form":{
          "wx_id": "",
          "user_department": that.data.range_depart,
          "user_applicant": that.data.user_applicant,
          "reason": that.data.reason,
          "time_from": time_from_1,
          "time_to": time_to_1,
          "user_approver": that.data.range_approver,
          "user_cc": that.data.range_cc,
          "companions": that.data.companions
        }
    },
      success(res) {
        if(res.data.code == '401'){
          wx.showToast({
            title: '过期',
            duration: 2000
          })
          wx.navigateTo({
            url: 'login',
          })
        }
        else if (res.data.code == '403'){
          wx.showToast({
            title: '无权限！',
            duration: 2000,
            icon: 'error'
          })
        }else{
          wx.showToast({
            title: '提交成功！',
            duration: 2000,
            icon: 'success'
          });
          // 保留临时数据↓
          that.setData(
            {'temp.dep': that.data.range_depart,
            'temp.name': that.data.user_applicant,
            'temp.reason': that.data.reason,
            'temp.companions': that.data.companions,
            'temp.start_time': time_from_1,
            'temp.end_time': time_to_1,
            'temp.approver': that.data.range_approver,
            'temp.cc': that.data.range_cc,
            }
          )
          // 保留临时数据↑
        }
      },

  })
}
  },

  inputApplicant(e){
    this.setData({user_applicant: e.detail.value})
  },
  inputCompanions(e){
    this.setData({companions: e.detail.value})
  },
  inputReason(e){
    this.setData({reason: e.detail.value})
  },
  compareTime(){
    var startt = this.data.start_time.year + '-' + this.data.start_time.month + '-' + this.data.start_time.day + 'T' + this.data.start_time.hour + ':00:00Z';
    var endt = this.data.end_time.year + '-' + this.data.end_time.month + '-' + this.data.end_time.day + 'T' + this.data.end_time.hour + ':00:00Z';
    // const dateString = "2023-07-19T12:34:56Z";
    var startts = Date.parse(startt);
    var endts = Date.parse(endt);
    var diff_ms = endts - startts;
    if (diff_ms < 3600000){return true} else {return false}
  },
  checkResummit(){
    var time_from_2 = this.data.start_time.year + '-' + this.data.start_time.month + '-' + this.data.start_time.day + ' ' + this.data.start_time.hour
    var time_to_2 = this.data.end_time.year + '-' + this.data.end_time.month + '-' + this.data.end_time.day + ' ' + this.data.end_time.hour
    if(this.data.range_depart == this.data.temp.dep && 
      this.data.user_applicant == this.data.temp.name &&
      this.data.reason == this.data.temp.reason &&
      time_from_2 == this.data.temp.start_time &&
      time_to_2 == this.data.temp.end_time &&
      this.data.range_approver == this.data.temp.approver &&
      this.data.range_cc == this.data.temp.cc &&
      this.data.companions == this.data.temp.companions)
      {return true}else{return false}
  },
  storeSummitInfo(){
    return false
  }
})
