Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      "text": "申请",
      "iconPath": "../pages/components/icon/order.png",
      "pagePath": "appr",
      "selectedIconPath": "../pages/components/icon/order_s.png"
    },
    {
      "text": "历史",
      "iconPath": "../pages/components/icon/record.png",
      "pagePath": "his",
      "selectedIconPath": "../pages/components/icon/record_s.png"
    },
    {
      "text": "我的",
      "iconPath": "../pages/components/icon/user.png",
      "pagePath": "my",
      "selectedIconPath": "../pages/components/icon/user_s.png"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})