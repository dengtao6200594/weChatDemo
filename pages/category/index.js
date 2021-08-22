import { getCategoryData } from '../../api/category'
// pages/category/index.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        leftMenu: [],
        rightMenu: [],
        currentIndex: 0,
        scrollTop: 0 // 右侧滑动块距顶部的距离
    },
    categoryData: null,
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.categoryData = wx.getStorageSync('categoryData')
        this.categoryData ? this.setData({ leftMenu: this.categoryData.message.map(v => v.cat_name) }) :
            this._getCategoryData()

    },
    // 点击左侧菜单栏
    tapIndex(event) {
        this.setData({ currentIndex: event.target.dataset.index })
        this.getRightMenu(this.data.currentIndex)
        this.setData({ scrollTop: 0 })
    },

    getRightMenu(index) {
        // getCategoryData().then(({ message }) => this.setData({ rightMenu: message[index].children }))
        this.setData({ rightMenu: this.categoryData.message[index].children })
    },
    _getCategoryData() {
        getCategoryData().then(({ message }) => {
            const leftMenu = message.map(v => v.cat_name)
            this.categoryData = { date: Date.now(), message }
            wx.setStorageSync('categoryData', this.categoryData)
            this.setData({ leftMenu })
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        this.getRightMenu(this.data.currentIndex)
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {},
    /**
     * 监听页面卸载
     */
    onUnload: function() {
        wx.removeStorageSync('categoryData')
    }
})