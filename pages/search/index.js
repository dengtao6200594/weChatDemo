import { getGoodsSearch } from '../../api/category'
// pages/search/index.js
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		value: null,
		goods: []
	},
	time: null,
	// 搜索
	search(e) {
		const { value } = e.detail
		if (!value.trim()) return
		clearTimeout(this.time)
		this.time = setTimeout(() => this.getSearch(value), 1000)
	},
	// 搜索请求
	getSearch(value) {
		getGoodsSearch({ query: value }).then(({ message }) =>
			this.setData({ goods: message.goods })
		)
	},
	// 清除搜索栏
	clear() {
		this.setData({ goods: [], value: null })
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {}
})
