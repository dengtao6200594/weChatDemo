import { getGoodsSearch } from '../../../api/category'
// pages/category/goodsList/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [{ id: 0, value: '综合', isActive: true }, { id: 1, value: '销量', isActive: false }, { id: 2, value: '价格', isActive: false }]
    },
    handleTabsChange(e) {
        const { index } = e.detail
        const _tabs = this.data.tabs.map((v, i) => {
            index === i ? v.isActive = true : v.isActive = false
            return v
        })
        this.setData({ tabs: _tabs })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const { cid } = options
        cid && getGoodsSearch({ cid, pagenum: 1, pagesize: 5 }).then(({ message }) => {
            console.log(message)
        })

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})