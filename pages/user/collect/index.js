// pages/user/collect/index.js
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		tabs: [
			{ id: 0, value: '商品收藏', isActive: true },
			{ id: 1, value: '品牌收藏', isActive: false },
			{ id: 2, value: '店铺收藏', isActive: false },
			{ id: 3, value: '浏览收藏', isActive: false }
		],
		collect: []
	},
	handleTabsChange(e) {
		const { index } = e.detail
		const tabs = this.data.tabs.map((v, i) => {
			index === i ? (v.isActive = true) : (v.isActive = false)
			return v
		})
		this.setData({ tabs })
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
	onShow: function () {
		this.setData({ collect: wx.getStorageSync('collect') })
	},

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
