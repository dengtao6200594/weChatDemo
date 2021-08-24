import { getGoodsSearch } from '../../../api/category'
// pages/category/goodsList/index.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        tabs: [
            { id: 0, value: '综合', isActive: true },
            { id: 1, value: '销量', isActive: false },
            { id: 2, value: '价格', isActive: false }
        ],
        goodLists: []
    },
    params: {
        cid: null,
        pagenum: 1,
        pagesize: 10
    },
    total: null,

    handleTabsChange(e) {
        const { index } = e.detail
        const tabs = this.data.tabs.map((v, i) => {
            index === i ? (v.isActive = true) : (v.isActive = false)
            return v
        })
        this.setData({ tabs })
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {;
        (this.params.pagenum < Math.ceil(this.total / this.params.pagesize) &&
            this.params.pagenum++ &&
            getGoodsSearch(this.params).then(({ message }) =>
                this.setData({ goodLists: [...this.data.goodLists, ...message.goods] })
            )) ||
        wx.showToast({ title: '我的忍耐是有极限的' })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.params.cid = options.cid
        this.params.cid &&
            getGoodsSearch(this.params).then(({ message }) => {
                const { goods, total } = message
                this.setData({ goodLists: goods })
                this.total = total
            })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},

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
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {}
})